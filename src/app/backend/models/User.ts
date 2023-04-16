import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export class UserFactory implements IDataBaseEntityFactory {
  fromDbObject(userData: QueryDocumentSnapshot<any>): User {
    const user = {} as User;
    const data = userData.data();

    user.guid = userData.id;
    user.name = data.name;
    user.email = data.email;
    return user;
  }
}

export interface User extends IDataBaseEntity<User> {
  guid: string;
  name: string;
  email: string;
}
