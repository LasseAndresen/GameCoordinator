import { Pipe, PipeTransform } from "@angular/core";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";

@Pipe({
  name: 'gamePublisher',
  standalone: true
})
export class GamePublisherPipe implements PipeTransform {
  transform(game: BggThingDto): string {
    return game.links.find(l => l.type === 'boardgamepublisher').value;
  }
}
