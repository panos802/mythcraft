import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(moves: any, moogleSearch: any): any {
    // chexk if search is undefined
    if (moogleSearch === undefined || moogleSearch === '') { return moves; }

    return moves.filter( move => {
      return move.name.toLowerCase().includes(moogleSearch.toLowerCase());
    });
  }

}
