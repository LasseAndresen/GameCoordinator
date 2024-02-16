import {GeoPoint, QueryDocumentSnapshot, Timestamp } from '@angular/fire/firestore';
import { ObjectUtilities } from '../../frontend/utilities/ObjectUtilities';
import { IDataBaseEntity } from './IDataBaseEntity';
import { IDataBaseEntityFactory } from './IDatabaseEntityFactory';
import { User } from './User';

export class EventFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<any>): Event {
    const event = {} as Event;
    const data = object.data();
    event.guid = object.id;
    event.groupID = data.groupID;
    event.authorID = data.authorGuid;
    event.authorName = data.authorName;
    event.timestamp = data.timestamp;
    event.editTimestamp = data.editTimestamp;
    event.title = data.title;
    event.description = data.description;
    return event;
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
  editTimestamp?: Timestamp;
  title: string;
  description: string;
  startTime: Date;
  endTime?: Date;
  location: {
    description: string;
    address: string; // a maps link
    position: GeoPoint;
  };
  gamesPoll?: {
    options: string[];
    votes: Record<string, number>; // object with game names as keys and number of votes as values
  };
  participants: {
    user: User;
    invitedStatus: InvitationStatus;
  }[];
  eventChat?: {
    // array of messages in the chat
    author: string;
    message: string;
    timestamp: Timestamp;
  };
}

export enum InvitationStatus {
  invited,
  accepted,
  tentative,
  declined,
}
