import { Group, CompactGroup } from '../models/Group';
import { BehaviorSubject } from 'rxjs';
import { Cache } from './Cache';
import { QueryDocumentSnapshot, QuerySnapshot } from '@angular/fire/firestore';

export class GroupCache extends Cache {
  public cachedObjects: { [guid: string]: BehaviorSubject<Group> } = {};
  public compactGroupCacheInitialized = false;
  private _cachedCompactObjects: {
    [guid: string]: BehaviorSubject<CompactGroup>;
  } = {};
  private _compactObjectCollectionObservable: BehaviorSubject<CompactGroup[]> =
    new BehaviorSubject<CompactGroup[]>([]);
  private _compactGroupCollectionUnsubscribeFunction: (() => void) | null =
    null;
  public collectionObservable: BehaviorSubject<Group[]> = new BehaviorSubject<
    Group[]
  >([]);

  public compactGroupsLoadingBegun = false;

  public clearCache() {
    super.clearCache();
    this._cachedCompactObjects = {};
    this._compactGroupCollectionUnsubscribeFunction?.call(this);
    this._compactGroupCollectionUnsubscribeFunction = null;
  }

  public getObject(guid: string): BehaviorSubject<Group> {
    this.validateCache();
    return this.cachedObjects[guid];
  }

  public updateBaseGroup(guid: string, groupData: QueryDocumentSnapshot<any>) {}

  public updateMembers(guid: string, memberData: QuerySnapshot<any>) {
    (<Group>this.cachedObjects[guid].value).updateMembers(memberData);
  }

  public updateBoardGames(guid: string, boardGameData: QuerySnapshot<any>) {
    (<Group>this.cachedObjects[guid].value).updateBoardGames(boardGameData);
  }

  public updatePosts(guid: string, postData: QuerySnapshot<any>) {
    (<Group>this.cachedObjects[guid].value).updatePosts(postData);
  }

  public addCompactGroup(group: CompactGroup) {
    this.validateCache();
    this._addObject(
      group,
      this._cachedCompactObjects,
      this._compactObjectCollectionObservable
    );
  }

  public updateCompactGroup(groupData: QueryDocumentSnapshot<any>) {
    this.validateCache();
    const group = this._cachedCompactObjects[groupData.id];
    group.value.update(groupData);
  }

  public removeCompactGroup(guid: string) {
    this._removeObject(
      guid,
      this._cachedCompactObjects,
      this._compactObjectCollectionObservable
    );
  }

  public setCompactGroupUnsubscribeFunction(func: () => void) {
    this._compactGroupCollectionUnsubscribeFunction = func;
  }

  public getCompactGroups(): BehaviorSubject<CompactGroup[]> {
    return this._compactObjectCollectionObservable;
  }

  public containsCompactGroup(guid: string): boolean {
    const item = this._cachedCompactObjects[guid].value;
    return item != null && item != undefined;
  }
}
