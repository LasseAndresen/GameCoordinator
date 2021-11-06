import { IDataBaseEntity } from "./IDataBaseEntity";
import { QueryDocumentSnapshot, QuerySnapshot } from "@angular/fire/firestore";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { User, UserFactory } from "./User";
import { BoardGame, BoardGameFactory } from "./BoardGame";
import { GroupPost, GroupPostFactory } from "./GroupPost";
import { ObjectUtilities } from "../../frontend/utilities/ObjectUtilities";

export class GroupFactory implements IDataBaseEntityFactory {
  public fromDbObject(groupData: QueryDocumentSnapshot<any>, memberData: QuerySnapshot<any>, boardGameData: QuerySnapshot<any>): Group {
    const group = new Group();
    const groupInfo = groupData.data();

    group.guid = groupData.id;
    group.name = groupInfo.name;

    if (memberData != null) {
      const groupMembers = [];
      memberData.forEach(doc => { if (doc.id !== null) {groupMembers.push(doc.data().name);}});
      group.members = groupMembers;
    }

    if (boardGameData != null) {
      const boardGames = [];
      boardGameData.forEach(doc => { if (doc.id !== null) {boardGames.push(doc.data().name)}});
      group.boardGames = boardGames;
    }

    return group;
  }

  public fromDbCompactObject(groupData: QueryDocumentSnapshot<any>): CompactGroup {
    const group = new CompactGroup();
    const data = groupData.data();

    group.guid = groupData.id;
    group.name = data.name;
    group.memberCount = data.members?.length ?? 0;
    group.boardGameCount = data.boardGames?.length ?? 0;

    return group;
  }
}

export class Group implements IDataBaseEntity {
  public guid: string;
  public name: string;
  public members: User[];
  public boardGames: BoardGame[];
  public posts: GroupPost[];

  public updateBaseGroup(groupData: QueryDocumentSnapshot<any>) {
    const groupInfo = groupData.data();

    this.name = groupInfo.name;
  }

  public updateMembers(memberData: QuerySnapshot<any>) {
    const groupMembers = [];
    const factory = new UserFactory();
    memberData.forEach(doc => { if (doc.id !== null) {groupMembers.push(factory.fromDbObject(doc))}});
    this.members = groupMembers;
  }

  public updateBoardGames(boardGameData: QuerySnapshot<any>) {
    const boardGames = [];
    const factory = new BoardGameFactory();
    boardGameData.forEach(doc => { if (doc.id !== null) {boardGames.push(factory.fromDbObject(doc))}});
    this.boardGames = boardGames;
  }

  public updatePosts(postData: QuerySnapshot<any>) {
    const posts = [];
    const factory = new GroupPostFactory();
    postData.forEach(doc => { if (doc.id !== null) {posts.push(factory.fromDbObject(doc))}});
    ObjectUtilities.convertDate(posts);
    this.posts = posts;
  }
}

export class CompactGroup implements IDataBaseEntity {
  public guid: string;
  public name: string;
  public memberCount: number;
  public boardGameCount: number;

  public update(groupData: QueryDocumentSnapshot<any>) {
    const data = groupData.data();
    this.name = data.name;
    this.memberCount = data.members.length;
    this.boardGameCount = data.boardGames.length;
  }
}
