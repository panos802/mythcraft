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
  moves: any;

  constructor(public auth: AuthService) { }

  ngOnInit() {
    this.moves = this.auth.getMoves();
  }

}
