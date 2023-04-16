import { QueryDocumentSnapshot, Timestamp } from "@angular/fire/firestore";
import { ObjectUtilities } from "../../frontend/utilities/ObjectUtilities";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { User } from "./User";

export class GroupPostFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<any>): Event {
    const groupPost = {} as Event;
    const data = object.data();
    groupPost.guid = object.id;
    groupPost.groupID = data.groupID;
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

export interface Event extends IDataBaseEntity<Event> {
  guid: string;
  groupID: string;
  authorID: string;
  authorName: string;
  // Author profile pic
  timestamp: Timestamp;
  editTimestamp: Timestamp;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  location: {
    name: string;
    description: string;
    address: string; // a maps link
  };
  gamesPoll: {
    options: string[];
    votes: Record<string, number>; // object with game names as keys and number of votes as values
  };
  participants: {
    user: User[],
    invitedStatus: InvitationStatus
  };
  eventChat: { // array of messages in the chat
    author: string;
    message: string;
    timestamp: Timestamp;
  };
}

export enum InvitationStatus {
  invited,
  accepted,
  tentative,
  declined
}
