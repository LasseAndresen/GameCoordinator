import { Injectable } from '@angular/core';
import { BggClient } from 'boardgamegeekclient';
import {
  BggCollectionDto,
  BggSearchDto,
  BggThingDto,
} from 'boardgamegeekclient/dist/esm/dto';
import { BggSearchItemDto } from 'boardgamegeekclient/dist/esm/dto/concrete/subdto';

@Injectable()
export class BoardGameGeekApiCaller {
  private _client = BggClient.Create();

  public async search(
    searchString: string,
    exact: boolean
  ): Promise<BggSearchItemDto[]> {
    const result = await this._client.search.query({
      query: searchString,
      type: ['boardgame'],
      exact: exact ? 1 : 0,
    });
    console.log('Result from search ', result);

    return result[0].items;
  }

  public async getBoardGames(IDs: number[]): Promise<BggThingDto[]> {
    console.log('Fetching IDs ', IDs);
    const result: BggThingDto[] = await this._client.thing.query({
      id: IDs,
      stats: 1,
      type: ['boardgame', 'boardgameexpansion'],
    });
    console.log('Fetched thing ', result);

    return result;
  }

  public async getCollection(bggUsername: string): Promise<BggCollectionDto[]> {
    return this._client.collection.query({
      username: bggUsername,
      subtype: 'boardgame',
    });
  }

  public async getHotGames() {
    return this._client.hot.query({
      type: 'boardgame',
    });
  }
}
