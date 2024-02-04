import {Injectable} from '@angular/core';
import {IViewProvider} from '../interfaces/IViewProvider';
import {WeaviateView} from '../views/WeaviateView/WeaviateView';
import weaviate, {WeaviateClient} from 'weaviate-ts-client';
import {environment} from '../../../../../../databases/BGG-weaviate/environment';
import {WeaviateFilter} from '../views/WeaviateView/WeaviateFilter';

@Injectable()
export class WeaviateService implements IViewProvider {
  private _client: WeaviateClient;

  constructor() {
    this._client = weaviate.client({
      host: 'http://localhost:8080',
      headers: {
        'X-OpenAI-Api-Key': environment.openAI
      }
    });
  }

  public async getView(filter: WeaviateFilter, pageSize: number): Promise<WeaviateView> {
    let getter = this._client.graphql
      .get()
      .withClassName('BoardGame')
      .withFields('name description yearPublished minPlayers maxPlayers minAge rating weight thumbnail');
    const parsedFilter = this.parseFilter(filter);
    if (!!parsedFilter) {
      getter = getter
        .withWhere(parsedFilter);
    }
    const response = await getter
      .withLimit(pageSize)
      .do();

    console.log('Weaviate response ', JSON.stringify(response, null, 2));
    const games = response.data.Get.BoardGame;
    console.log('Games ', games);
    const result = new WeaviateView();
    result.columns = ['name', 'yearPublished', 'minPlayers', 'maxPlayers', 'minAge', 'rating', 'weight'];
    result.rows = games;
    return result;
  }

  private parseFilter(filter: WeaviateFilter): object {
    if (!filter) {
      return null;
    }

    const result = {
      operator: filter.operator,
    } as any;
    if (!!filter.property) {
      result.path = [filter.property];
      result[filter.valueType] = filter.value;
    }
    result.operands = filter.operands?.map(o => this.parseFilter(o));

    return result;
  }
}
