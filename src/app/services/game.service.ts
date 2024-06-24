import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game, PlayerType } from '../models/game';
import { Card } from '../models/card';
import { IA } from '../models/IA';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game: BehaviorSubject<Game>;
  public turn: BehaviorSubject<string>;
  public isDefend: BehaviorSubject<boolean>;

  private ia: IA;

  constructor() {
    this.game = new BehaviorSubject(new Game());
    this.turn = new BehaviorSubject(PlayerType.Player.toString());
    this.isDefend = new BehaviorSubject(false);
    this.ia = new IA(this);
  }

  getGameObservable() {
    return this.game.asObservable();
  }

  getTurnObservable() {
    return this.turn.asObservable();
  }

  getIsgameObservable() {
    return this.isDefend.asObservable();
  }

  public getGame() {
    return this.game.value;
  }

  public updateGame(game: Game) {
    this.game.next(game);
  }

  initGame() {
    const game = this.getGame();
    game.initGame();
    this.updateGame(game);
  }

  nextTurn() {
    const game = this.getGame();
    game.nextTurn();
    this.turn.next(game.currentPlayer);
    if (!game.isPlayer()) {
      this.ia.playTurn();
    }
    this.updateGame(game);
  }

  playCardFromDiscard() { 

  }

  playCardFromOpponentDiscard() { }

  defeatCreature(minPower: number) { }

  discardCardOponent(amount: number) { }

  takeControl(maxPower: number, mindbug: boolean = false) { }

  playCard(card: Card) {
    const game = this.getGame();
    if (card.ability && card.ability.type == "play")
      card.ability.execute?.(this);
    if (!game.isPlayer()) {
      game.IAPlayedCards.push(card);
      game.IAHand = game.IAHand.filter(c => c != card);
      game.iaDrawCard();
    } else {
      game.playerDrawCard();
    }
    game.lastCardPlayed = undefined;
    this.nextTurn();
  }

  discardCard(card: Card, deck: PlayerType) {
    const game = this.getGame();
    game.discardCard(card, deck);
    this.updateGame(game);
  }

  attack(card: Card) {
    console.log("Attacking with:")
    console.log(card)
    const game = this.getGame();
    if (card.ability && card.ability.type == "attack")
      card.ability.execute?.(this);
    game.lastCardPlayed = card;
    if (game.isPlayer()) {
      this.ia.defend();
    } else {
      this.isDefend.next(true);
    }
    // obtener carta que defiende dependiendo de quién sea el atacante (ia o jugador)
    // se resuelve el enfrentamiento de ambas cartas
    // y si no se bloquea, se quita uno de vida al oponente

  }

  defend(card?: Card) {
    const game = this.getGame();
    console.log("Attacking with:")
    console.log(game.lastCardPlayed)
    if (card) {
      console.log("Defending with:")
      console.log(card)
      // se resuelve el enfrentamiento de las cartas
      // falta poder obtener aquí la carta que ataca para enfrentarse con la que defiende
      if (card.power > game.lastCardPlayed?.power!) {
        this.defeat(game.lastCardPlayed!, game.currentPlayer);
      } else if (card.power == game.lastCardPlayed?.power!) {
        this.defeat(card, game.isPlayer() ? PlayerType.IA : PlayerType.Player);
        this.defeat(game.lastCardPlayed!, game.currentPlayer);
      } else {
        this.defeat(card, game.isPlayer() ? PlayerType.IA : PlayerType.Player);
      }
    } else {
      // si no se defiende con una carta, se quita uno de vida al oponente
      game.reduceLife();

    }
    game.lastCardPlayed = undefined;
    this.isDefend.next(false);
    this.nextTurn();
  }

  defeat(card: Card, deck: PlayerType) {
    const game = this.getGame();
    if (card.ability && card.ability.type == "defeated")
      card.ability.execute?.(this);
    game.discardCard(card, deck);
    this.updateGame(game);
  }
}
