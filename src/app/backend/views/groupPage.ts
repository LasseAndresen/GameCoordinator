import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../models/User";
import { BoardGame } from "../models/BoardGame";
import { BehaviorSubject, Subscription } from "rxjs";
import { Group } from "../models/Group";
import { FirestoreService } from "../services/FirestoreService";
import { GroupPost } from "../models/GroupPost";

export class GroupPageView {
  private _subscriptions: Subscription[] = [];
  private _unsubscribeFuncs: (() => void)[] = [];
  public group: Group;
  public members: User[]; // User[];
  public boardGames: BoardGame[]; // BehaviorSubject<BoardGame[]>;
  public posts: GroupPost[];
  public events; // To be defined
  public history; // To be defined

  constructor(private groupGuid: string,
              private _afs: AngularFirestore,
              private _firestoreService: FirestoreService) {
  }

  public async initialize(): Promise<void> {
    this._subscriptions.push((await this._firestoreService.getGroupOverview(this.groupGuid)).subscribe(g => this.updateView(g)));
  }

  public updateView(group: Group) {
    this.group = group;
    this.members = group.members;
    this.boardGames = group.boardGames;
    this.posts = group.posts;
    console.log('Updated view ', this);
  }

  public destroy(): void {
    this._unsubscribeFuncs.forEach(f => f());
    this._subscriptions.forEach(s => s.unsubscribe());
  }
}
