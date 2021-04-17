import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFirestore, CollectionReference, QuerySnapshot, QueryDocumentSnapshot } from "@angular/fire/firestore";
import AuthProvider = firebase.auth.AuthProvider;
import { BoardGame, BoardGameFactory } from '../models/BoardGame';
import { AuthService } from './AuthService';
import { BehaviorSubject } from 'rxjs';
import { IDataBaseEntity } from '../models/IDataBaseEntity';
import { Group, GroupFactory, CompactGroup } from '../models/Group';
import { IDataBaseEntityFactory } from '../models/IDatabaseEntityFactory';
import { GroupCache } from '../caches/GroupCache';

export class QueryObservable<T> {
  public observable: BehaviorSubject<T>;
  public unsubscribeCallBackFunction: () => void; // Invoke this when the data listener is not needed anymore. It unsubscribes the listener to the database.
}

@Injectable()
export class FirestoreService {
  private groupCache: GroupCache;

  constructor(public afs: AngularFirestore,
              private _authService: AuthService
  ) {
    this.groupCache = new GroupCache(_authService);
  }

  // Region: Generic methods that should be used by all public functions
  private async queryCollection(path: string, objectFactory: IDataBaseEntityFactory): Promise<any[]> { // TODO: Add filter input
    const toReturn = [];

    await this.afs.collection(path).ref.get().then((snapshot: QuerySnapshot<any>) => {
      snapshot.forEach((doc: QueryDocumentSnapshot<any>) => {console.log('Setting return data'); toReturn.push(objectFactory.fromDbObject(doc));});
    });
    console.log('Reutring collection ', toReturn);
    return toReturn;
  }

  private async queryCollectionWithListener(path: string, objectFactory: IDataBaseEntityFactory): Promise<QueryObservable<IDataBaseEntity[]>> {
    const listener = new BehaviorSubject<any[]>(null);

    const _unsubscribeCallBack = this.afs.collection(path).ref.onSnapshot((snapshot: QuerySnapshot<any>) => {
      const updatedData = [];
      snapshot.forEach((doc: QueryDocumentSnapshot<any>) => updatedData.push(objectFactory.fromDbObject(doc)));
      listener.next(updatedData);
    });

    return {observable: listener, unsubscribeCallBackFunction: _unsubscribeCallBack} as QueryObservable<any>;
  }

  private async querySingleDocument(collectionPath: string, docID: string, objectFactory: IDataBaseEntityFactory): Promise<IDataBaseEntity> {
    return objectFactory.fromDbObject(await this.afs.collection(collectionPath).doc(docID).ref.get());
  }

  private async querySingleDocumentWithListener(collectionPath: string, docID: string, objectFactory: IDataBaseEntityFactory): Promise<QueryObservable<IDataBaseEntity>> {
    const listener = new BehaviorSubject<IDataBaseEntity>(null);
    const _unsubscribeCallBack = await this.afs.collection(collectionPath).doc(docID).ref
      .onSnapshot(change => {
        listener.next(objectFactory.fromDbObject(change));
      });

    return {observable: listener, unsubscribeCallBackFunction: _unsubscribeCallBack} as QueryObservable<any>;
  }

  private async getCollectionReference(collectionPath: string) {
    return this.afs.collection(collectionPath).ref;
  }

  private async validateUserIsAuthenticated() {
    const loggedInUser = this._authService.user.value;
    if (!loggedInUser) {
      throw new Error('User was not authenticated');
    }
  }

  // Region: Back end functions to call from the front end

  public async addBoardGameToLibrary(game: BoardGame) {
    this.validateUserIsAuthenticated();
    (await this.getCollectionReference('BoardGames')).add({
      name: game.name
    });
  }

  public async getBoardGameLibrary(withListener: boolean): Promise<BoardGame[] | QueryObservable<any[]>> {
    if (withListener) {
      return await this.queryCollectionWithListener('BoardGames', new BoardGameFactory());
    } else {
      return await this.queryCollection('BoardGames', new BoardGameFactory());
    }
  }

  public async addBoardGameToCollection(game: BoardGame) {
    this.validateUserIsAuthenticated();
    const loggedInUser = this._authService.user.value;
    this.afs.collection('Users/' + loggedInUser.uid + '/BoardGames').doc(game.guid).set({
      name: game.name
    });
  }

  public async removeBoardGameFromCollection(game: BoardGame) {
    const loggedInUser = this._authService.user.value;
    if (!loggedInUser) {
      throw new Error('User was not authenticated');
    }
    this.afs.collection('Users/' + loggedInUser.uid + '/BoardGames').doc(game.guid).delete();
  }

  public async getBoardGameCollection(userGUID: string = null): Promise<BoardGame[]> {
    if (userGUID === null && !this._authService.authenticated) {
      return [];
    }

    if (userGUID === null) { // If not provided, we get for currently logged in user
      userGUID = this._authService.user.value.uid;
    }
    console.log('Getting board games for user ', userGUID);
    return await this.queryCollection('Users/' + userGUID + '/BoardGames', new BoardGameFactory());
  }

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
    await new Promise<void>(async resolve => {
      console.log('Starting promise');
      const unsubscribeFunc = (await this.getCollectionReference('Groups')).where('members', 'array-contains', loggedInUserGUID).onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const group = groupFactory.fromDbCompactObject(change.doc);
            this.groupCache.addCompactGroup(group);
          } else if (change.type === "modified") {
            this.groupCache.updateCompactGroup(change.doc);
          } else if (change.type === "removed") {
            this.groupCache.removeCompactGroup(change.doc.id);
          }
        });
        if (firstPass) {
          resolve();
          firstPass = false;
        }
      });
      this.groupCache.setCompactGroupUnsubscribeFunction(unsubscribeFunc);
    });
    console.log('Done getting groups')
    return this.groupCache.getCompactGroups();
  }

  public async getGroupOverview(guid: string): Promise<BehaviorSubject<Group>> {
    if (!this._authService.authenticated) {
      return new BehaviorSubject(null);
    }
    if (this.groupCache.containsObject(guid)) {
      return this.groupCache.getObject(guid);
    }
    const loggedInUserGUID = this._authService.user.value.uid;
    const groupFactory = new GroupFactory();
    const promises = [];
    const doc = await this.afs.collection('Groups').doc(guid).ref.get();
    this.groupCache.addObject(groupFactory.fromDbObject(doc, null, null));
    const unsubscribeCallbackFunctions = [];
    let firstMemberGetDone = false;
    promises.push(new Promise<void>(resolve => {
      unsubscribeCallbackFunctions.push(doc.ref.collection('Members').onSnapshot(snapshot => {
        this.groupCache.updateMembers(guid, snapshot);
        if (!firstMemberGetDone) {
          firstMemberGetDone = true;
          resolve();
        }
      }));
    }));
    let firstBoardGamesGetDone = false;
    promises.push(new Promise<void>(resolve => {
      unsubscribeCallbackFunctions.push(doc.ref.collection('BoardGames').onSnapshot(snapshot => {
        this.groupCache.updateBoardGames(guid, snapshot);
        if (!firstBoardGamesGetDone) {
          firstBoardGamesGetDone = true;
          resolve();
        }
      }));
    }));
    this.groupCache.addUnsubscribeCallbackFunctions(guid, unsubscribeCallbackFunctions);
    await Promise.all(promises);
    return this.groupCache.getObject(guid);
  }

  public async createGroup(group: Group): Promise<void> {
    this.validateUserIsAuthenticated();
    const loggedInUser = this._authService.user.value;
    const addedDocument = await this.afs.collection('Groups').add({
      name: group.name,
      members: [loggedInUser.uid]
    });
    addedDocument.collection('Members').doc(loggedInUser.uid).set({
      name: loggedInUser.displayName,
      isAdmin: true
    })
  }

  public async addMemberToGroup(email: string, groupID: string) {
    // TODO: send invitation
    this.validateUserIsAuthenticated();
    const userDoc = await (await (await this.getCollectionReference('Users')).where('Email', '==', email).get()).docs[0];
    if (userDoc == null) {
      console.log('User does not exist');
      return; // TODO throw exception when error handing is made
    }
    const userData = userDoc.data() as any;
    console.log('Adding user');
    this.getCollectionReference('Groups').then(c => c.doc(groupID).update({
      members: firebase.firestore.FieldValue.arrayUnion(userDoc.id)
    }));
    this.getCollectionReference('Groups/' + groupID + '/Members').then(c => c.doc(userDoc.id).set({
      name: userData.Name,
      email: userData.Email,
      isAdmin: false
    }));
  }
}
