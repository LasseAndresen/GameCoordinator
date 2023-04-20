import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { env } from "process";
import { environment } from "../../../environments/environment";
import {} from 'googlemaps';


interface LocationSuggestion {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

@Injectable()
class GooglePlacesAPICaller {
  private readonly baseUrl: string = 'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  constructor(private _httpClient: HttpClient) {
  }

  async search(input: string): Promise<LocationSuggestion[]> {
    const request = {
      input: input
      // bounds: defaultBounds,
      // componentRestrictions: { country: "us" },
      // fields: ["address_components", "geometry", "icon", "name"],
      // strictBounds: false,
      // types: ["establishment"],
    } as google.maps.places.AutocompletionRequest;
    const service = new google.maps.places.AutocompleteService();
    return new Promise<LocationSuggestion[]>((resolve, reject) => {
      try {
        service.getPlacePredictions(request, (result: google.maps.places.AutocompletePrediction[], status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(result.map(location => ({
              description: location.description,
              place_id: location.place_id,
              structured_formatting: {
                main_text: location.structured_formatting.main_text,
                secondary_text: location.structured_formatting.secondary_text
              }
            } as LocationSuggestion)));
          } else {
            resolve([]);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async search_deprecated(query: string): Promise<LocationSuggestion[]> {
    if (query.length < 2 || query.length > 100) {
      return [];
    }
    const types = [
      "address",
    ].join(',');
    const url = `${this.baseUrl}?key=${environment.googlePlacesAPIKey}&input=${query}`;
                  // &types=${collection}`;
    console.log('Url ', url);
    const response: any = await this._httpClient.get(url).toPromise();
    console.log('Response', response);
    if (response.status === 'OK') {
      return response.results.map((location: any) => ({
        description: location.description,
        place_id: location.place_id,
        structured_formatting: location.structured_formatting,

      } as LocationSuggestion));
    } else {
      console.log('Error from google places api: ' + JSON.stringify(response));
      return [];
    }
  }
}

export default GooglePlacesAPICaller;
