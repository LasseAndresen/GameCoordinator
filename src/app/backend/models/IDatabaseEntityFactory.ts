import { IDataBaseEntity } from "./IDataBaseEntity";

export interface IDataBaseEntityFactory<T = void> {
    fromDbObject<T >(...args: any[]): T | any;
}
