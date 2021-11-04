import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../../backend/models/User';

@Pipe({
  name: 'gameOwners'
})
export class GameOwnersPipe implements PipeTransform {

  transform(ownerGuids: string[], members: User[]): string[] {
    return members.filter(m => ownerGuids.includes(m.guid)).map(m => m.name);
  }

}
