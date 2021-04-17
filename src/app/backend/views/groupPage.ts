import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "../models/User";
import { BoardGame } from "../models/BoardGame";
import { BehaviorSubject } from "rxjs";
import { Group } from "../models/Group";
import { FirestoreService } from "../services/FirestoreService";

export class GroupPageView {
  private unsubscribeFuncs: (() => void)[] = [];
  public group: Group;
  public members: User[]; // User[];
  public boardGames: BoardGame[]; // BehaviorSubject<BoardGame[]>;
  public events; // To be defined
  public history; // To be defined

  constructor(private groupGuid: string,
              private _afs: AngularFirestore,
              private _firestoreService: FirestoreService) {
  }

  public async initialize(): Promise<void> {
    (await this._firestoreService.getGroupOverview(this.groupGuid)).subscribe(g => this.updateView(g));
  }

  public updateView(group: Group) {
    this.group = group;
    this.members = group.members;
    this.boardGames = group.boardGames;
    console.log('Updated view ', this);
  }

  public destroy(): void {
    this.unsubscribeFuncs.forEach(f => f());
  }
}
