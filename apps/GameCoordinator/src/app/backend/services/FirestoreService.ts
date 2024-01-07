import { Injectable } from '@angular/core';
import { BoardGame, BoardGameFactory } from '../models/BoardGame';
import { User, UserFactory } from '../models/User';
import { AuthService } from './AuthService';
import { BehaviorSubject } from 'rxjs';
import { IDataBaseEntity } from '../models/IDataBaseEntity';
import { Group, GroupFactory, CompactGroup } from '../models/Group';
import { IDataBaseEntityFactory } from '../models/IDatabaseEntityFactory';
import { GroupCache } from '../caches/GroupCache';
import { GroupPost, GroupPostFactory } from '../models/GroupPost';
import {
  Firestore,
  collection,
  collectionData,
  onSnapshot,
  collectionSnapshots,
  doc,
  docData,
  CollectionReference,
  DocumentData,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDoc,
  QuerySnapshot,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  FieldValue,
  arrayUnion,
} from '@angular/fire/firestore';
import { Event, EventFactory } from '../models/Event';

export type QueryObservable<T> = {
  observable: BehaviorSubject<T>;
  unsubscribeCallBackFunction: () => void; // Invoke this when the data listener is not needed anymore. It unsubscribes the listener to the database.
};

@Injectable()
export class FirestoreService {
  private groupCache: GroupCache;

  constructor(public afs: Firestore, private _authService: AuthService) {
    this.groupCache = new GroupCache(_authService);
  }

  //#region Base methods

  // Region: Generic methods that should be used by all public functions
  private async queryCollection<
    TEntity extends IDataBaseEntity<TEntity>,
    TFactory
  >(
    path: string,
    objectFactory: IDataBaseEntityFactory<TFactory>
  ): Promise<TEntity[]> {
    // TODO: Add filter input
    const toReturn = [];

    await getDocs(collection(this.afs, path)).then((snapshot) => {
      snapshot.forEach((doc) => toReturn.push(objectFactory.fromDbObject(doc)));
    });
    console.log('Reutring collection ', toReturn);
    return toReturn;
  }

  private async queryCollectionWithListener<
    TEntity extends IDataBaseEntity<TEntity>,
    TFactory
  >(
    path: string,
    objectFactory: IDataBaseEntityFactory<TFactory>
  ): Promise<QueryObservable<TEntity[]>> {
    const listener = new BehaviorSubject<any[]>(null);

    const _unsubscribeCallBack = collectionSnapshots(
      collection(this.afs, path)
    ).subscribe((snapshot) => {
      const updatedData = [];
      snapshot.forEach((doc) =>
        updatedData.push(objectFactory.fromDbObject(doc))
      );
      listener.next(updatedData);
    });

    return {
      observable: listener,
      unsubscribeCallBackFunction: () => _unsubscribeCallBack.unsubscribe(),
    } as QueryObservable<any>;
  }

  private async querySingleDocument<
    TEntity extends IDataBaseEntity<TEntity>,
    TFactory
  >(
    collectionPath: string,
    docID: string,
    objectFactory: IDataBaseEntityFactory<TFactory>
  ): Promise<TEntity> {
    return objectFactory.fromDbObject<TEntity>(
      await docData(doc(this.afs, collectionPath + '/' + docID)).toPromise()
    );
  }

  private async querySingleDocumentWithListener<
    TEntity extends IDataBaseEntity<TEntity>,
    TFactory
  >(
    collectionPath: string,
    docID: string,
    objectFactory: IDataBaseEntityFactory<TFactory>
  ): Promise<QueryObservable<TEntity>> {
    const listener = new BehaviorSubject<TEntity>(null);
    const _unsubscribeCallBack = onSnapshot(
      doc(this.afs, collectionPath + '/' + docID),
      (snap) => listener.next(objectFactory.fromDbObject(snap))
    );

    return {
      observable: listener,
      unsubscribeCallBackFunction: _unsubscribeCallBack,
    } as QueryObservable<any>;
  }

  private getCollectionReference(
    collectionPath: string
  ): CollectionReference<DocumentData> {
    return collection(this.afs, collectionPath);
  }

  //#endregion Base methods

  //#region Authentication

  private async validateUserIsAuthenticated() {
    const loggedInUser = this._authService.user.value;
    if (!loggedInUser) {
      throw new Error('User was not authenticated');
    }
  }

  //#endregion Authentication

  // From here: Back end functions to call from the front end

  public async getUser(guid: string): Promise<User> {
    return this.querySingleDocument<User, UserFactory>(
      'Users',
      guid,
      new UserFactory()
    );
  }

  public async addBoardGameToLibrary(game: BoardGame) {
    this.validateUserIsAuthenticated();
    await addDoc(this.getCollectionReference('BoardGames'), {
      name: game.name,
    });
  }

  public async getBoardGameLibrary(
    withListener: boolean
  ): Promise<BoardGame[] | QueryObservable<any[]>> {
    if (withListener) {
      return await this.queryCollectionWithListener<
        BoardGame,
        BoardGameFactory
      >('BoardGames', new BoardGameFactory());
    } else {
      return await this.queryCollection<BoardGame, BoardGameFactory>(
        'BoardGames',
        new BoardGameFactory()
      );
    }
  }

  //#region Collection

  public async addBoardGameToCollection(game: BoardGame) {
    this.validateUserIsAuthenticated();
    const loggedInUser = this._authService.user.value;
    setDoc(
      doc(this.afs, 'Users/' + loggedInUser.uid + '/BoardGames/' + game.guid),
      {
        name: game.name,
        bggID: game.bggID,
      }
    );
  }

  public async removeBoardGameFromCollection(game: BoardGame) {
    const loggedInUser = this._authService.user.value;
    if (!loggedInUser) {
      throw new Error('User was not authenticated');
    }
    deleteDoc(
      doc(this.afs, 'Users/' + loggedInUser.uid + '/BoardGames/' + game.guid)
    );
  }

  public async getBoardGameCollection(
    userGUID: string = null
  ): Promise<BoardGame[]> {
    if (userGUID === null && !this._authService.authenticated) {
      return [];
    }

    if (userGUID === null) {
      // If not provided, we get for currently logged in user
      userGUID = this._authService.user.value.uid;
    }
    console.log('Getting board games for user ', userGUID);
    return await this.queryCollection<BoardGame, BoardGameFactory>(
      'Users/' + userGUID + '/BoardGames',
      new BoardGameFactory()
    );
  }
  //#endregion Collection

  //#region Groups

  public async getUserGroups(): Promise<BehaviorSubject<CompactGroup[]>> {
    if (!this._authService.authenticated) {
      return new BehaviorSubject<CompactGroup[]>([]);
    }

    if (this.groupCache.compactGroupCacheInitialized) {
      return this.groupCache.getCompactGroups();
    }

    this.groupCache.compactGroupCacheInitialized = true;

    const loggedInUserGUID = this._authService.user.value.uid;
    const groupFactory = new GroupFactory();
    let firstPass = true;
    await new Promise<void>(async (resolve) => {
      const unsubscribeFunc = onSnapshot(
        query(
          this.getCollectionReference('Groups'),
          where('members', 'array-contains', loggedInUserGUID)
        ),
        (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const group = groupFactory.fromDbCompactObject(change.doc);
              this.groupCache.addCompactGroup(group);
            } else if (change.type === 'modified') {
              this.groupCache.updateCompactGroup(change.doc);
            } else if (change.type === 'removed') {
              this.groupCache.removeCompactGroup(change.doc.id);
            }
          });

          if (firstPass) {
            resolve();
            firstPass = false;
          }
        }
      );
      this.groupCache.setCompactGroupUnsubscribeFunction(unsubscribeFunc);
    });

    return this.groupCache.getCompactGroups();
  }

  public async getGroupOverview(guid: string): Promise<BehaviorSubject<Group>> {
    console.log('Getting overview for guid ', guid);
    if (!this._authService.authenticated) {
      return new BehaviorSubject(null);
    }
    if (this.groupCache.containsObject(guid)) {
      return this.groupCache.getObject(guid);
    }
    const loggedInUserGUID = this._authService.user.value.uid;
    const groupFactory = new GroupFactory();
    const promises = [];
    const document = await getDoc(doc(this.afs, 'Groups/' + guid));
    this.groupCache.addObject(groupFactory.fromDbObject(document, null, null));
    const unsubscribeCallbackFunctions = [];
    let firstMemberGetDone = false;
    promises.push(
      new Promise<void>((resolve) => {
        unsubscribeCallbackFunctions.push(
          onSnapshot(
            collection(this.afs, document.ref.path + '/Members'),
            (snapshot) => {
              this.groupCache.updateMembers(guid, snapshot);
              if (!firstMemberGetDone) {
                firstMemberGetDone = true;
                resolve();
              }
            }
          )
        );
      })
    );
    let firstBoardGamesGetDone = false;
    promises.push(
      new Promise<void>((resolve) => {
        unsubscribeCallbackFunctions.push(
          onSnapshot(
            collection(this.afs, document.ref.path + '/BoardGames'),
            (snapshot) => {
              this.groupCache.updateBoardGames(guid, snapshot);
              if (!firstBoardGamesGetDone) {
                firstBoardGamesGetDone = true;
                resolve();
              }
            }
          )
        );
      })
    );
    let firstPostsGetDone = false;
    promises.push(
      new Promise<void>(async (resolve) => {
        unsubscribeCallbackFunctions.push(
          onSnapshot(
            query(
              this.getCollectionReference('GroupPosts'),
              where('groupID', '==', guid),
              orderBy('timestamp', 'desc'),
              limit(5)
            ),
            (snapshot) => {
              this.groupCache.updatePosts(guid, snapshot);
              if (!firstPostsGetDone) {
                firstPostsGetDone = true;
                resolve();
              }
            }
          )
        );
      })
    );
    this.groupCache.addUnsubscribeCallbackFunctions(
      guid,
      unsubscribeCallbackFunctions
    );
    await Promise.all(promises);
    return this.groupCache.getObject(guid);
  }

  public async createGroup(group: Group): Promise<void> {
    this.validateUserIsAuthenticated();
    const loggedInUser = this._authService.user.value;
    const addedDocument = await addDoc(collection(this.afs, 'Groups'), {
      name: group.name,
      members: [loggedInUser.uid],
    });
    setDoc(doc(this.afs, addedDocument.path + '/Members', loggedInUser.uid), {
      name: loggedInUser.displayName,
      isAdmin: true,
    });
  }

  public async addMemberToGroup(email: string, groupID: string) {
    // TODO: send invitation
    this.validateUserIsAuthenticated();
    const userDoc = (
      await getDocs(
        query(this.getCollectionReference('Users'), where('Email', '==', email))
      )
    )[0];
    if (userDoc == null) {
      console.log('User does not exist');
      return; // TODO throw exception when error handing is made
    }
    const userData = userDoc.data() as any;
    console.log('Adding user');
    updateDoc(doc(this.afs, 'Groups/' + groupID), {
      members: arrayUnion(userDoc.id),
    });
    setDoc(doc(this.afs, 'Groups/' + groupID + '/Members', userDoc.id), {
      name: userData.Name,
      email: userData.Email,
      isAdmin: false,
    });
  }

  public async removeUserFromGroup(userGuid: string, groupGuid: string) {
    this.validateUserIsAuthenticated();
    deleteDoc(doc(this.afs, 'Groups/' + groupGuid + '/Members/' + userGuid));
  }

  public async toggleFavoriteGroupBoardGame(
    gameGuid: string,
    groupGuid: string,
    favorite: boolean
  ) {
    this.validateUserIsAuthenticated();
    await updateDoc(
      doc(this.afs, 'Groups/' + groupGuid + 'BoardGames/' + gameGuid),
      {
        isFavorite: favorite,
      }
    );
  }

  public async addNewGroupPost(post: GroupPost) {
    this.validateUserIsAuthenticated();
    const groupPostFactory = new GroupPostFactory();
    const toPost = groupPostFactory.toDbObject(post);
    // delete toPost.timestamp;
    await addDoc(this.getCollectionReference('GroupPosts'), {
      ...toPost,
      // timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  //#endregion

  //#region Events

  public async addEvent(event: Event) {
    this.validateUserIsAuthenticated();
    const eventFactory = new EventFactory();
    const toPost = eventFactory.toDbObject(event);
    await addDoc(this.getCollectionReference('Events'), {
      ...toPost,
    });
  }

  //#endregion Events
}
