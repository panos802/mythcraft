import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { forEach } from '@angular/router/src/utils/collection';
import { error } from 'util';

interface Class { name: string; description: string; type: string; archtype?: string; moves: string[]; }
interface Move {
  name: string;
  cost: string;
  type: string;
  effect: string;
  classRace: string;
  category: string;
  extras: ConEff[];
}
interface ConEff { condition: string; effect: string; }

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {
  // Consts
  categories = ['Class move', 'Racial move', 'Special move'];
  types = [ 'Command', 'Attack', 'Skill', 'Spell', 'Call', 'Call (Eidolon)', 'Ability', 'Trait' ];

  classCategories = ['Επίλεκτος', 'Σοφός', 'Ειδήμονας', 'Φάντασμα'];

  // Firestore Refs
  classesCol: any;
  classes: any;
  movesCol: any;
  moves: any;
  selectedMoveDoc: any;
  // Firestore shorthands (smaller collections containing only the ids)
  classesColSH: any;
  classesSH: any;
  movesColSH: any;
  movesSH: any;

  // page
  moogleSearch = '';
  selectedMove: any;
  load = true;
  currentMove: Move = {
    name: '',
    cost: '',
    type: '',
    effect: '',
    classRace: '',
    category: '',
    extras: [],
  };
  extras: ConEff[] = [];

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.movesCol = this.auth.getMovesRef();
    this.moves = this.movesCol.valueChanges();
    this.load = true;
  }

  setSelection( moveName ) {
    this.selectedMove = moveName;
    // this.selectedMoveDoc = this.movesCol.doc(`${moveName.toLowerCase}`);
  }
  loadList() {
    this.movesCol = this.auth.getMovesRef();
    this.moves = this.movesCol.valueChanges();
    this.load = true;
  }

  removeExtra(i: number) {
    const message = 'Remove this extra effect?';
    // if (!confirm(message)) { return; }
    this.extras.splice(i, 1);
  }
  addExtra() {
    this.extras.push( {/*index: index,*/ condition: '', effect: ''} );
  }

  submitMove() {
    const move = this.currentMove;
    const extras = this.extras;
    if (move.name === '') { alert('You can not have a nameless move.'); return; }
    let movesOK = true;
    let extrasOK = true;
    for (const key in move) {
      if (move[key] === '' && key !== 'cost') {
        movesOK = false;
      }
    }
    if (movesOK === false) {
      const message = 'You have not filled all areas in this move. Are you sure you want to continue?';
      movesOK = confirm(message);
    }
    if (movesOK === false) { alert('Move addition aborted'); return; }
    for (const i in extras) {
      if (extras[i].condition === '' || extras[i].effect === '') {
        extrasOK = false;
      }
    }
    if (extrasOK === false) {
      const message = 'You have empty areas in this move\'s extras. Are you sure you want to continue?';
      extrasOK = confirm(message);
    }
    if (extrasOK === false) { alert('Move addition aborted'); return; }
    move.extras = extras;
    console.log(move.name, move);
    // this.uploadMove(move.name, move);
  }
  uploadMove ( name: string, moveData ) {
    if (this.movesCol) {
      this.movesCol.doc(name.toLowerCase).set( moveData )
        .then( () => console.log( 'Move successfully uploaded :)' ) )
        .catch( (uploadError) => {console.log('Error while uploading the move.'); console.log(uploadError); } );
    }
  }
}
