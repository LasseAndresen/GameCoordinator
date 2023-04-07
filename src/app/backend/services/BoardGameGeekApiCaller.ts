import { Injectable } from "@angular/core";
import { BggClient } from 'boardgamegeekclient';
import { BggSearchDto, BggThingDto } from "boardgamegeekclient/dist/esm/dto";

@Injectable()
export class BoardGameGeekApiCaller {
  private _client = BggClient.Create();

  public async search(searchString: string, exact: boolean): Promise<BggSearchDto[]> {
    const result = await this._client.search.query({
      query: searchString,
      type: ['boardgame'],
      exact: exact ? 1 : 0
    });
    console.log('Result from search ', result);

    return result;
  }

  public async getBoardGames(IDs: number[]): Promise<BggThingDto[]> {
    const result: BggThingDto[] = await this._client.thing.query({
      id: IDs,
      stats: 1,
      type: 'boardgame'
    });
    console.log('Fetched thing ', result);

    return result;
  }
}
