import { IDataBaseEntity } from "./IDataBaseEntity";

export interface IDataBaseEntityFactory {
    fromDbObject(...args: any[]): IDataBaseEntity;
}
