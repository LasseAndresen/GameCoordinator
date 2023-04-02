import { QueryDocumentSnapshot } from "@angular/fire/firestore";
import { ObjectUtilities } from "../../frontend/utilities/ObjectUtilities";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";

export class GroupPostFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<any>): GroupPost {
    const groupPost = new GroupPost();
    const data = object.data();
    groupPost.guid = object.id;
    groupPost.groupID = data.groupID;
    groupPost.eventID = data.eventID;
    groupPost.authorID = data.authorGuid;
    groupPost.authorName = data.authorName;
    groupPost.timestamp = data.timestamp;
    groupPost.editTimestamp = data.editTimestamp;
    groupPost.text = data.text;
    groupPost.replies = data.replies?.map(r => {
      const reply = new GroupPostReply();
      reply.guid = r.guid;
      reply.authorID = r.authorID;
      reply.authorName = r.authorName;
      reply.timestamp = r.timestamp;
      reply.editTimestamp = r.editTimestamp;
      reply.replyToGuid = r.replyToGuid;
      return reply;
    });
    return groupPost;
  }

  public toDbObject(post: GroupPost): any {
    const toReturn = ObjectUtilities.deepCopyObject(post);
    delete toReturn['guid'];
    return toReturn;
  }
}

export class GroupPost implements IDataBaseEntity {
  public guid: string;
  public groupID: string;
  public eventID: string;
  public authorID: string;
  public authorName: string;
  // Author profile pic
  public timestamp: any;
  public editTimestamp: any;
  public text: string;
  // Poll
  // Tagged users info
  // Attached files
  // Images / GIF support
  public replies: GroupPostReply[];
}

export class GroupPostReply implements IDataBaseEntity {
  public guid: string;
  public authorID: string;
  public authorName: string;
  // Author profile pic
  public timestamp: Date;
  public editTimestamp: Date;
  public text: string;
  // Tagged users info
  public replyToGuid: string;
}
