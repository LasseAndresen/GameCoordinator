import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'columnHeaderName',
  standalone: true,
})
export class ColumnHeaderNamePipe implements PipeTransform {
  transform(propertyName: string): string {
    switch (propertyName) {
      case 'name':
        return 'Name';
      case 'yearPublished':
        return 'Published';
      case 'minPlayers':
        return 'Minimum players';
      case 'maxPlayers':
        return 'Maximum players';
      case 'minAge':
        return 'Minimum age';
      case 'rating':
        return 'Rating';
      case 'weight':
        return 'Complexity';
      default:
        throw new Error('Unknown property: ' + propertyName);
    }
  }
}
