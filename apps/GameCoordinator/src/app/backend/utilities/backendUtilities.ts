import { BoardGame } from '../models/BoardGame';
import { BoardGameGeekApiCaller } from '../services/boardGameGeekApiCaller';

export class BackendUtilities {
  public static async fillBggDataForBoardGames(
    bggApi: BoardGameGeekApiCaller,
    games: BoardGame[]
  ): Promise<void> {
    const ids = games.map((g) => g.bggID);
    const things = await bggApi.getBoardGames(ids);
    const dict = {};
    for (const thing of things) {
      dict[thing.id] = thing;
    }
    for (const game of games) {
      game.bggThing = dict[game.bggID];
    }
  }
}
