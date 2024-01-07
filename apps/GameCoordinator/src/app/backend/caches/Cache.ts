import { AuthService } from '../services/AuthService';
import { BehaviorSubject } from 'rxjs';
import { IDataBaseEntity } from '../models/IDataBaseEntity';
import { ICache } from './ICache';

export class Cache implements ICache {
  public cacheInitialized = false;
  public cachedObjects: { [guid: string]: BehaviorSubject<IDataBaseEntity> } =
    {};
  public cachedCallbackFunctions: { [guid: string]: (() => void)[] } = {};
  public cachedForUserGUID: string;
  public collectionObservable: BehaviorSubject<IDataBaseEntity[]> =
    new BehaviorSubject<IDataBaseEntity[]>([]);

  constructor(private authService: AuthService) {}

  public validateCache(): void {
    if (this.cachedForUserGUID != this.authService.user.value?.uid) {
      this.clearCache();
    }
  }

  public clearCache(): void {
    this.cachedObjects = {};
    this.collectionObservable.next([]);
    Object.values(this.cachedCallbackFunctions).forEach((f) =>
      f.forEach((ff) => ff())
    );
    this.cachedForUserGUID = this.authService.user.value?.uid;
    this.cacheInitialized = false;
  }

  public addObject(object: IDataBaseEntity): void {
    this.validateCache();
    this._addObject(object, this.cachedObjects, this.collectionObservable);
  }

  protected _addObject(
    object: IDataBaseEntity,
    cache: { [guid: string]: any },
    observable: BehaviorSubject<any[]>
  ) {
    cache[object.guid] = new BehaviorSubject<IDataBaseEntity>(object);
    const collectionCopy = [...observable.value];
    collectionCopy.push(object);
    observable.next(collectionCopy);
  }

  public addUnsubscribeCallbackFunctions(guid: string, funcs: (() => void)[]) {
    this.cachedCallbackFunctions[guid] = funcs;
  }

  public removeObject(guid: string): void {
    this._removeObject(guid, this.cachedObjects, this.collectionObservable);
  }

  protected _removeObject(
    guid: string,
    cache: { [guid: string]: any },
    observable: BehaviorSubject<any[]>
  ) {
    delete cache[guid];
    const collectionCopy = [...observable.value];
    const index = collectionCopy.findIndex((c) => c.guid === guid);
    collectionCopy.splice(index, 1);
    observable.next(collectionCopy);
  }

  public getObject(guid: string): BehaviorSubject<IDataBaseEntity> {
    this.validateCache();
    return this.cachedObjects[guid];
  }

  public containsObject(guid: string): boolean {
    const object = this.cachedObjects[guid];
    return object !== null && object !== undefined;
  }

  public getCollection(): BehaviorSubject<IDataBaseEntity[]> {
    this.validateCache();
    return this.collectionObservable;
  }
}
