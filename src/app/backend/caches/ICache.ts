import { BehaviorSubject } from "rxjs";
import { IDataBaseEntity } from "../models/IDataBaseEntity";

export interface ICache {
  cacheInitialized: boolean;
  cachedObjects: {[guid: string]: BehaviorSubject<IDataBaseEntity>};
  cachedCallbackFunctions: { [guid: string]: (() => void)[]}
  cachedForUserGUID: string;
  collectionObservable: BehaviorSubject<IDataBaseEntity[]>

  validateCache(): void;
  addObject(object: IDataBaseEntity): void;
  addUnsubscribeCallbackFunctions(guid: string, funcs: (() => void)[]): void;
  getObject(guid: string): BehaviorSubject<IDataBaseEntity>;
  containsObject(guid: string): boolean;
  getCollection(): BehaviorSubject<IDataBaseEntity[]>;
}
