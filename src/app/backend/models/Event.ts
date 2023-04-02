import { QueryDocumentSnapshot } from "@angular/fire/firestore";
import { ObjectUtilities } from "../../frontend/utilities/ObjectUtilities";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { User } from "./User";

export class GroupPostFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<any>): Event {
    const groupPost = new Event();
    const data = object.data();
    groupPost.guid = object.id;
    groupPost.groupID = data.groupID;
    groupPost.eventID = data.eventID;
    groupPost.authorID = data.authorGuid;
    groupPost.authorName = data.authorName;
    groupPost.timestamp = data.timestamp;
    groupPost.editTimestamp = data.editTimestamp;
    groupPost.title = data.title;
    groupPost.description = data.description;
    return groupPost;
  }

  public toDbObject(post: Event): any {
    const toReturn = ObjectUtilities.deepCopyObject(post);
    delete toReturn['guid'];
    return toReturn;
  }
}

export class Event implements IDataBaseEntity {
  public guid: string;
  public groupID: string;
  public eventID: string;
  public authorID: string;
  public authorName: string;
  // Author profile pic
  public timestamp: any;
  public editTimestamp: any;
  public title: string;
  public description: string;
  public startTime: Date;
  public endTime: Date;
  public locationDescription: string;
  public location: {lat: number, long: number};
  public locationMapsUrl: string;
  public participants: {user: User[], invitedStatus: InvitationStatus};

}

export enum InvitationStatus {
  invited,
  accepted,
  maybe,
  declined
}
