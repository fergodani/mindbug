import { cards } from "../data/cards";
import { Card } from "./card";

export enum PlayerType {
  Player = 'player',
  IA = 'IA'
}

export class Game {
  cards: Card[] = cards;
  playerDeck: Card[] = [];
  playerHand: Card[] = [];
  IADeck: Card[] = [];
  IAHand: Card[] = [];
  playedCards: Card[] = [];
  IAPlayedCards: Card[] = [];
  playerDiscard: Card[] = [];
  IADiscard: Card[] = [];
  IALife: number = 3;
  playerLife: number = 3;
  IAMindbugs: number = 2;
  playerMindbugs: number = 2;
  currentPlayer: PlayerType = PlayerType.Player;

  lastCardPlayed?: Card;

  // *** Effects ***
  playerCantActivatePlayEffects: boolean = true;
  IACantActivatePlayEffects: boolean = true;

  initGame() {
    const playerDeck = this.drawCards(this.cards, 10);
    this.playerDeck.push(...playerDeck);
    const iaDeck = this.drawCards(this.cards, 10);
    this.IADeck.push(...iaDeck);
    this.playerHand.push(...this.drawCards(this.playerDeck, 5));
    this.IAHand.push(...this.drawCards(this.IADeck, 5));

    // *** TEST ***
    /*
    let testCards = this.cards.filter(card => card.name == "Compost Dragon");
    this.playerHand.push(testCards[0]);
    this.playerDiscard.push(this.cards[13]);
    this.playerDiscard.push(this.cards[14]);
    this.playerDiscard.push(this.cards[15]);
    this.playerDiscard.push(this.cards[15]);
    this.playerDiscard.push(this.cards[16]);
    this.playerDiscard.push(this.cards[18]);
    */
  }

  nextTurn() {
    if (this.isPlayer()) {
      this.currentPlayer = PlayerType.IA;
    } else {
      this.currentPlayer = PlayerType.Player;
    }
  }

  playerDrawCard() {
    this.playerHand.push(...this.drawCards(this.playerDeck, 1));
  }

  iaDrawCard() {
    this.IAHand.push(...this.drawCards(this.IADeck, 1));
  }

  drawCards(array: Card[], cantidad: number): Card[] {
    const resultado: Card[] = [];

    for (let i = 0; i < cantidad; i++) {
      if (array.length === 0) break;

      const indiceAleatorio = Math.floor(Math.random() * array.length);
      const objetoAleatorio = array.splice(indiceAleatorio, 1)[0];
      resultado.push(objetoAleatorio);
    }

    return resultado;
  }

  discardCard(card: Card, deck: PlayerType) {
    console.log(deck)
    if (deck == PlayerType.IA) {
      console.log("Discarding: " + card.name)
      this.IAPlayedCards = this.IAPlayedCards.filter(c => c != card);
      this.IADiscard.push(card)
      console.log(this.IAPlayedCards)
      console.log(this.IADiscard)
    }
    else {
      this.playedCards = this.playedCards.filter(c => c != card);
      this.playerDiscard.push(card);
    }
  }

  isPlayer(): boolean {
    return this.currentPlayer == PlayerType.Player;
  }

  healLife(amount: number) {
    if (this.currentPlayer == PlayerType.Player)
      this.playerLife += amount;
    else
      this.IALife += amount;
  }

  reduceLife() {
    console.log("reducing life")
    if (this.currentPlayer == PlayerType.Player)
      this.IALife -= 1;
    else
      this.playerLife -= 1;
  }
}