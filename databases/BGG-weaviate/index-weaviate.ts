import weaviate, {WeaviateClient, ApiKey, ObjectsBatcher} from 'weaviate-ts-client';
import {environment} from './environment';

main();
async function main(): Promise<void> {
  const client: WeaviateClient = weaviate.client({
    host: 'http://localhost:8080/',
    apiKey: new ApiKey('learn-weaviate'),  // Replace w/ your Weaviate instance API key
    headers: {
      'X-OpenAI-Api-Key': environment.openAI
    }
  });

  await ensureClassCreated(client);
  await insertMockData(client);
}

async function ensureClassCreated(client: WeaviateClient): Promise<void> {
  if (!await client.schema.exists('BoardGame')) {
    await createBoardGameClass(client);
  }
}

async function forceUpdateClass(client: WeaviateClient): Promise<void> {
  if (await client.schema.exists('BoardGame')) {
    await client.schema.classDeleter().withClassName('BoardGame').do();
  }
  await createBoardGameClass(client);
}

async function createBoardGameClass(client: WeaviateClient): Promise<void> {
  await client.schema.classCreator().withClass(getBoardGameClass()).do();
}

function getBoardGameClass(): object {
  return {
    class: 'BoardGame',
    vectorizer: 'text2vec-openai',  // If set to "none" you must always provide vectors yourself. Could be any other "text2vec-*" also.
    moduleConfig: {
      'text2vec-openai': {
        model: 'ada',
        modelVersion: '002',
        type: 'text'
      },
      'generative-openai': {}  // Ensure the `generative-openai` module is used for generative queries
    },
  };
}

async function insertMockData(client: WeaviateClient): Promise<void> {
  const data = getMockData();

  let batcher: ObjectsBatcher = client.batch.objectsBatcher();
  let counter = 0;
  const batchSize = 100;

  for (const item of data) {
    const obj = {
      class: 'BoardGame',
      properties: item.properties
    };

    batcher = batcher.withObject(obj);

    if (counter++ === batchSize) {
      // flush the batch queue
      const res = await batcher.do();
      console.log(res);

      // restart the batch queue
      counter = 0;
      batcher = client.batch.objectsBatcher();
    }
  }

  // Flush the remaining objects
  const res = await batcher.do();
  console.log(res);
}

function getMockData(): any {
  return [{
    ID: 266192,
    thumbnail: 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__thumb/img/VNToqgS2-pOGU6MuvIkMPKn_y-s=/fit-in/200x150/filters:strip_icc()/pic4458123.jpg',
    image: 'https://cf.geekdo-images.com/yLZJCVLlIx4c7eJEWUNJ7w__original/img/cI782Zis9cT66j2MjSHKJGnFPNw=/0x0/filters:format(jpeg)/pic4458123.jpg',
    name: 'Wingspan',
    description: 'Wingspan is&amp;nbsp;a competitive, medium-weight, card-driven, engine-building board game from Stonemaier Games. It\'s designed by Elizabeth Hargrave and features over 170 birds illustrated by Beth Sobel, Natalia Rojas, and Ana Maria Martinez.&amp;#10;&amp;#10;You are bird enthusiasts&amp;mdash;researchers, bird watchers, ornithologists, and collectors&amp;mdash;seeking to discover and attract the best birds to your network of wildlife preserves. Each bird extends a chain of powerful combinations in one of your habitats (actions). These habitats  focus on several key aspects of growth:&amp;#10;&amp;#10;&amp;#10;     Gain food tokens via custom dice in a birdfeeder dice tower&amp;#10;     Lay eggs using egg miniatures in a variety of colors&amp;#10;     Draw from hundreds of unique bird cards and play them&amp;#10;&amp;#10;&amp;#10;The winner is the player with the most points after 4 rounds.&amp;#10;&amp;#10;&amp;mdash;description from the publisher&amp;#10;&amp;#10;From the 7th printing on, the base game box includes Wingspan: Swift-Start Promo Pack.&amp;#10;&amp;#10;',
    yearPublished: 2019,
    minPlayers: 1,
    maxPlayers: 5,
    minAge: 10,
    rating: 8.0613,
    weight: 2.4613,
  },
  {
    ID: 169786,
    thumbnail: 'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__thumb/img/eQ69OEDdjYjfKg6q5Navee87skU=/fit-in/200x150/filters:strip_icc()/pic3163924.jpg',
    image: 'https://cf.geekdo-images.com/7k_nOxpO9OGIjhLq2BUZdA__original/img/HlDb9F365w0tSP8uD1vf1pfniQE=/0x0/filters:format(jpeg)/pic3163924.jpg',
    name: 'Scythe',
    description: 'It is a time of unrest in 1920s Europa. The ashes from the first great war still darken the snow. The capitalistic city-state known simply as &amp;ldquo;The Factory&amp;rdquo;, which fueled the war with heavily armored mechs, has closed its doors, drawing the attention of several nearby countries.&amp;#10;&amp;#10;Scythe is an engine-building game set in an alternate-history 1920s period. It is a time of farming and war, broken hearts and rusted gears, innovation and valor. In Scythe, each player represents a character from one of five factions of Eastern Europe who are attempting to earn their fortune and claim their faction\'s stake in the land around the mysterious Factory. Players conquer territory, enlist new recruits, reap resources, gain villagers, build structures, and activate monstrous mechs.&amp;#10;&amp;#10;Each player begins the game with different resources (power, coins, combat acumen, and popularity), a different starting location, and a hidden goal. Starting positions are specially calibrated to contribute to each faction&amp;rsquo;s uniqueness and the asymmetrical nature of the game (each faction always starts in the same place). Scythe uses a streamlined action-selection mechanism (no rounds or phases) to keep gameplay moving at a brisk pace and reduce downtime between turns. While there is plenty of direct conflict for players who seek it, there is no player elimination.&amp;#10;&amp;#10;Scythe gives players almost complete control over their fate. Other than each player&amp;rsquo;s individual hidden objective card, the only elements of luck or variability are &amp;ldquo;encounter&amp;rdquo; cards that players will draw as they interact with the citizens of newly explored lands. Each encounter card provides the player with several options, allowing them to mitigate the luck of the draw through their selection. Combat is also driven by choices, not luck or randomness. Every part of Scythe has an aspect of engine-building to it. Players can upgrade actions to become more efficient, build structures that improve their position on the map, enlist new recruits to enhance character abilities, activate mechs to deter opponents from invading, and expand their borders to reap greater types and quantities of resources. These engine-building aspects create a sense of momentum and progress throughout the game. The order in which players improve their engine adds to the unique feel of each game, even when playing one faction multiple times.&amp;#10;&amp;#10;',
    yearPublished: 2016,
    minPlayers: 1,
    maxPlayers: 5,
    minAge: 14,
    rating: 8.15302,
    weight: 3.443
  }];
}
