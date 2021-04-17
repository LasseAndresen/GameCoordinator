import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { QueryDocumentSnapshot } from "@angular/fire/firestore";

export class UserFactory implements IDataBaseEntityFactory {
  fromDbObject(userData: QueryDocumentSnapshot<any>): User {
    const user = new User();
    const data = userData.data();

    user.guid = userData.id;
    user.name = data.name;
    user.email = data.email;
    return user;
  }
}

export class User implements IDataBaseEntity {
  guid: string;
  name: string;
  email: string;
}
