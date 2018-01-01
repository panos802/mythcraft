import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';

interface Class { name: string; description: string; type: string; archtype?: string; moves: string[]; }
interface Move {
  name: string;
  cost: string;
  type: string;
  effect: string;
  classRace: string;
  category: string;
  extras: ConEff[];
  // extras_max_index?: number;
}
interface ConEff { /*index: number;*/ condition: string; effect: string; }

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {
  categories = ['Class move', 'Boss move', 'Special move'];
  types = [ 'Command', 'Attack', 'Skill', 'Spell', 'Call', 'Call (Summon)', 'Ability', 'Trait' ];

  classes: any;
  movesCol: any;
  moves: any;

  selectedMove: any;
  load: boolean = true;

  currentMove: Move = {
    name: '',
    cost: '',
    type: '',
    effect: '',
    classRace: '',
    category: '',
    extras: [],
    // extras_max_index: 0
  };
  extras: ConEff[] = [
    // {index: 0, condition: 'Saeros', effect: 'Lasts for 4 turns.'},
    // {index: 1, condition: 'Gray Sage', effect: 'Cast Massive on a team.'},
    // {index: 2, condition: 'Gray Mentor', effect: 'Turn by turn you play 4 extra turns.'}
  ];

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  fillList() {
    this.movesCol.doc('Haste').set({name: 'Haste'});
    this.movesCol.doc('Regen').set({name: 'Regen'});
    this.movesCol.doc('Float').set({name: 'Float'});
    this.movesCol.doc('Kalankas').set({name: 'Kalankas'});
    this.movesCol.doc('Meteo').set({name: 'Meteo'});
  }
  setSelection( moveName ) {
    this.selectedMove = moveName;
  }
  loadList() {
    this.movesCol = this.auth.getMovesRef();
    this.moves = this.movesCol.valueChanges();
    this.load = true;
  }

  removeExtra(i: number) {
    this.extras.splice(i, 1);
    // this.currentMove.extras_max_index = this.extras.length;
    // let index = 0;
    // this.extras.forEach(element => {
    //   element.index = index++;
    // });
  }
  addExtra() {
    // const index = this.currentMove.extras_max_index++;
    this.extras.push( {/*index: index,*/ condition: '', effect: ''} );
  }

  submitMove() {
    const move = this.currentMove;
    const extras = this.extras;
    move.extras = extras;
    // const extras = this.extras;
    // move.extras = extras;
    console.log('move:');
    console.log(move);
    // console.log('extras:');
    // console.log(this.extras);
  }
}
