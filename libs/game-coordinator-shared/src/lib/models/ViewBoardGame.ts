import {BggThingDto} from 'boardgamegeekclient/dist/esm/dto';

export class ViewBoardGame {
  thingID: number;
  thumbnail: string;
  image: string;
  name: string;
  minAge: number;
  rating: number;
  description: string;
  publisher: string;
  yearPublished: number;
  minPlayers: number;
  maxPlayers: number;
  bestPlayerCount: string;
  weight: number;
  minPlayTime: number;
  maxPlayTime: number;

  public static fromBggThing(game: BggThingDto): ViewBoardGame {
    const result = new ViewBoardGame();
    result.thingID = game.id;
    result.thumbnail = game.thumbnail;
    result.image = game.image;
    result.name = game.name;
    result.description = game.description;
    result.minAge = game.minage;
    result.rating = game.statistics.ratings.average;
    result.weight = game.statistics.ratings.averageweight;
    result.publisher = game.links.find((l) => l.type === 'boardgamepublisher').value;
    result.yearPublished = game.yearpublished;
    result.minPlayers = game.minplayers;
    result.maxPlayers = game.maxplayers;
    result.bestPlayerCount = game.polls
      .find((p) => p.name === 'suggested_numplayers')
      .results.sort(
        (a, b) => b.resultItemList[0].numvotes - a.resultItemList[0].numvotes
      )[0].numplayers;
    result.minPlayTime = game.minplaytime;
    result.maxPlayTime = game.maxplaytime;
    return result;
  }
}
