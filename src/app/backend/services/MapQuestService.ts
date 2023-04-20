import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { env } from "process";
import { environment } from "../../../environments/environment";


interface LocationSuggestion {
  name: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  distance: number;
  lat: number;
  lng: number;
  id: string;
}

@Injectable()
class MapQuestClient {
  private readonly baseUrl: string = 'https://www.mapquestapi.com/search/v3/prediction';

  constructor(private _httpClient: HttpClient) {
  }

  async search(query: string): Promise<LocationSuggestion[]> {
    if (query.length < 2 || query.length > 100) {
      return [];
    }
    const collection = [
      "category",
      "airport",
      "address",
      "franchise",
      "adminArea"
    ].join(',');
    const url = `${this.baseUrl}?q=${query}&limit=10&collection=${collection}&key=${environment.mapQuestAPIKey}`;
    const response: any = await this._httpClient.get(url).toPromise();
    console.log('Response', response);
    return response.results.map((location: any) => ({
      name: location.name,
      displayString: location.displayString,
      city: location.adminArea5,
      state: location.adminArea3,
      postalCode: location.postalCode,
      country: location.adminArea1,
      distance: location.distance,
      lat: location.latLng.lat,
      lng: location.latLng.lng,
      id: location.id
    }));
  }
}

export default MapQuestClient;
