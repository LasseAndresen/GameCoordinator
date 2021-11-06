import { GroupPost } from "../../../backend/models/GroupPost";

export class AddGroupPostDialogArgs {
  constructor(public groupID: string, public taggableUsers: string[], public existingPost: GroupPost) {}
}
