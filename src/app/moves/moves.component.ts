import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgClass } from '@angular/common';
import { Observable } from 'rxjs/Observable';


interface Class {
  name: string;
  description: string;
  type: string;
  archtype?: string;
  moves: string[];
}

interface Move {
  name: string;
  cost?: string;
  type?: string;
  effect: string;
  classes?: string;
  category?: string;
  extras: ConEff[];
  extras_max_index: number;
}

interface ConEff {
  index: number;
  condition: string;
  effect: string;
}

@Component({
  selector: 'app-moves',
  templateUrl: './moves.component.html',
  styleUrls: ['./moves.component.css']
})
export class MovesComponent implements OnInit {

  classes: any;
  movesCol: any;
  moves: any;

  selectedMove: any;
  load: boolean = false;

  move: Move = {
    name: '',
    cost: '',
    type: '',
    effect: '',
    classes: '',
    category: '',
    extras: [],
    extras_max_index: 0
  };

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



}
