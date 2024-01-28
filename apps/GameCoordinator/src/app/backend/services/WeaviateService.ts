import {Injectable} from '@angular/core';
import {IViewProvider} from '../interfaces/IViewProvider';
import {WeaviateView} from '../views/WeaviateView/WeaviateView';
import weaviate, {WeaviateClient} from 'weaviate-ts-client';
import {environment} from '../../../../../../databases/BGG-weaviate/environment';

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

  public async getView(): Promise<WeaviateView> {
    const response = await this._client.graphql
      .get()
      .withClassName('BoardGame')
      .withFields('name description yearPublished minPlayers maxPlayers minAge rating weight thumbnail')
      .do();
    console.log('Weaviate response ', JSON.stringify(response, null, 2));
    const games = response.data.Get.BoardGame;
    console.log('Games ', games);
    const result = new WeaviateView();
    result.columns = ['name', 'yearPublished', 'minPlayers', 'maxPlayers', 'minAge', 'rating', 'weight'];
    result.rows = games;
    return result;
  }
}
