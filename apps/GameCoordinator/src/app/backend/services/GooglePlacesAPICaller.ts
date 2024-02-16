import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { env } from 'process';
import { environment } from '../../../environments/environment';
import {} from 'googlemaps';
import * as googlemaps from 'googlemaps';

export interface LocationSuggestion {
  description: string;
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
  types: string[];
}

export interface LocationDetails {
  placeID: string;
  position: {
    lat: number;
    long: number;
  };
  boundingBox: {
    sw: {
      lat: number;
      long: number;
    };
    ne: {
      lat: number;
      long: number;
    };
  };
  name: string;
  formattedAddress: string;
  vicinity: string;
  mapsUrl: string;
}

@Injectable()
class GooglePlacesAPICaller {
  private readonly baseUrl: string =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  constructor(private _httpClient: HttpClient) {}

  async search(input: string): Promise<LocationSuggestion[]> {
    if (input.length <= 3) {
      return [];
    }

    const request = {
      input: input,
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
            resolve(
              result.map(
                (location) =>
                  ({
                    description: location.description,
                    place_id: location.place_id,
                    structured_formatting: {
                      main_text: location.structured_formatting.main_text,
                      secondary_text:
                        location.structured_formatting.secondary_text,
                    },
                  } as LocationSuggestion)
              )
            );
          } else {
            resolve([]);
          }});
      } catch (e) {
        reject(e);
      }
    });
  }

  public async getDetails(placeID: string, attributionDiv: HTMLDivElement): Promise<LocationDetails> {
    const service = new google.maps.places.PlacesService(attributionDiv);
    const request = {
      placeId: placeID
    };
    return new Promise<LocationDetails>((resolve, reject) => {
      try {
        service.getDetails(request, (result: google.maps.places.PlaceResult, status: google.maps.places.PlacesServiceStatus) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve({
              placeID: result.place_id,
              position: {
                lat: result.geometry.location.lat(),
                long: result.geometry.location.lng(),
              },
              boundingBox: {
                sw: {
                  lat: result.geometry.viewport.getSouthWest().lat(),
                  long: result.geometry.viewport.getSouthWest().lng(),
                },
                ne: {
                  lat: result.geometry.viewport.getNorthEast().lat(),
                  long: result.geometry.viewport.getNorthEast().lng(),
                },
              },
              name: result.name,
              formattedAddress: result.formatted_address,
              vicinity: result.vicinity,
              mapsUrl: result.url,
            });
          } else {
            resolve(null);
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default GooglePlacesAPICaller;
