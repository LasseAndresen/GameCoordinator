import { Pipe, PipeTransform } from "@angular/core";
import { BggThingDto } from "boardgamegeekclient/dist/esm/dto";

@Pipe({
  name: 'bestPlayerCount',
  standalone: true
})
export class BestPlayerCountPipe implements PipeTransform {
  transform(game: BggThingDto): string {
    console.log('Pipe, ', game.polls.find(p => p.name === 'suggested_numplayers'));
    console.log('Sorted, ', game.polls.find(p => p.name === 'suggested_numplayers')
        .results.sort((a, b) => a.resultItemList[0].numvotes - b.resultItemList[0].numvotes));
    return game.polls.find(p => p.name === 'suggested_numplayers')
    .results.sort((a, b) => b.resultItemList[0].numvotes - a.resultItemList[0].numvotes)[0].numplayers;
  }
}
