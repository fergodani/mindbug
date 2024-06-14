import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: BehaviorSubject<Game>;
  
  constructor() { 
    this.game = new BehaviorSubject(new Game());
  }

  getGameObservable() {
    return this.game.asObservable();
  }

  private getGame() {
    return this.game.value;
  }

  private updateGame(game: Game) {
    this.game.next(game);
  }

  initGame() {
    const game = this.getGame();
    game.initGame();
    this.updateGame(game);
  }


  
}
