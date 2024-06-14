import { Component, OnInit } from '@angular/core';
import { cards } from '../data/cards'
import { Card } from '../models/card';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { Game } from '../models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf, DragDropModule, AsyncPipe],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;

  constructor(
    public gameService: GameService
  ) {
    this.game$ = this.gameService.getGameObservable();
  }

  ngOnInit(): void {
    this.gameService.initGame();
  }

  

  drop(event: CdkDragDrop<Card[]>) {
    if (!event.container.data || !event.previousContainer.data) return;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
