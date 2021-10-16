import { QueryDocumentSnapshot } from "@angular/fire/firestore";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";

export class BoardGameFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<any>): BoardGame {
    const boardGame = new BoardGame();
    const data = object.data();

    boardGame.guid = object.id;
    boardGame.name = data.name;
    boardGame.owners = data.owners;
    boardGame.isFavorite = data.isFavorite;

    return boardGame;
  }
}

export class BoardGame implements IDataBaseEntity {
  public guid: string = '';
  public name: string = '';
  public owners: string[] = [];
  public isFavorite: boolean = false;
}
