import { DocumentData, QueryDocumentSnapshot } from "@angular/fire/firestore";
import { IDataBaseEntity } from "./IDataBaseEntity";
import { IDataBaseEntityFactory } from "./IDatabaseEntityFactory";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";

export class BoardGameFactory implements IDataBaseEntityFactory {
  public fromDbObject(object: QueryDocumentSnapshot<DocumentData>): BoardGame {
    const boardGame = new BoardGame();
    const data = object.data();

    boardGame.guid = object.id;
    boardGame.name = data.name;
    boardGame.owners = data.owners;
    boardGame.isFavorite = data.isFavorite;
    boardGame.bggID = data.bggID;

    return boardGame;
  }
}

export class BoardGame implements IDataBaseEntity {
  public guid: string = '';
  public bggID: number = null;
  public name: string = '';
  public owners: string[] = [];
  public isFavorite: boolean = false;
  public bggThing: BggThingDto = null;
}
