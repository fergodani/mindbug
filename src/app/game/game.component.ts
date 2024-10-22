import { Component, OnInit } from '@angular/core';
import { cards } from '../data/cards'
import { Card } from '../models/card';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import { GameService } from '../services/game.service';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { CardListComponent } from "./card-list/card-list.component";

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgFor, NgIf, DragDropModule, AsyncPipe, NgClass, CardListComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit {
  game$: Observable<Game>;
  selectedCard: Card | null = null;

  text: string = "";

  isHidden: boolean = true;
  isDefend: boolean = false;
  showDiscardCards: boolean = false;

  isModalOpen = false;
  modalCards: Card[] = [];
  selectedModalCard: Card | null = null;
  isSelectingDiscardCard: boolean = false;
  isSelectingOpponentDiscardCard: boolean = false;

  constructor(
    public gameService: GameService
  ) {
    this.game$ = this.gameService.getGameObservable();
    this.gameService.turn.subscribe(
      newValue => {
        this.nextTurn();
      }
    );
    this.gameService.isSelectingDiscardCard.subscribe(
      newValue => {
        this.isSelectingDiscardCard = newValue;
        if (newValue)
          this.openModal();
        else
          this.closeModal();
      }
    );
    this.gameService.isSelectingOpponentDiscardCard.subscribe(
      newValue => {
        this.isSelectingOpponentDiscardCard = newValue;
        if (newValue)
          this.openModal();
        else
          this.closeModal();
      }
    );
    this.gameService.isDefend.subscribe(
      newValue => {
        this.isDefend = newValue;
      }
    );
  }

  ngOnInit(): void {
    this.gameService.initGame();
  }

  drop(event: CdkDragDrop<Card[]>, destino: string) {
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
      this.gameService.playCard(event.container.data[0])
    }
  }

  playCard() {
    const game = this.gameService.getGame();
    if (this.isSelectingDiscardCard) {
      game.playerDiscard = game.playerDiscard.filter(card => card !== this.selectedModalCard)
      game.playedCards.push(this.selectedModalCard!);
    } else if (this.isSelectingOpponentDiscardCard) {
      game.IADiscard = game.IADiscard.filter(card => card !== this.selectedModalCard)
      game.IAPlayedCards.push(this.selectedModalCard!);
    }
    this.gameService.playCardWithoutPass(this.selectedModalCard!);
    this.selectedModalCard = null;
  }

  showDiscard() {
    this.showDiscardCards = true;
  }

  closeDiscard() {
    this.showDiscardCards = false;
  }

  selectCard(card: Card): void {
    if (this.selectedCard === card)
      this.selectedCard = null;
    else
      this.selectedCard = card;
  }

  selectModalCard(card: Card): void {
    // TODO: si sale la misma se seleccionan las dos
    if (this.selectedModalCard === card)
      this.selectedModalCard = null;
    else
      this.selectedModalCard = card;
  }

  isSelected(card: Card): boolean {
    return card === this.selectedCard || card === this.selectedModalCard;
  }

  nextTurn() {
    const game = this.gameService.getGame();
    if (game.isPlayer()) {
      this.text = "Your turn"
    } else {
      this.text = "IA's turn"
    }
    this.showText();
  }

  passTurn() {
    this.gameService.nextTurn();
    this.nextTurn();
  }

  attack() {
    if (this.selectedCard){
      this.gameService.attack(this.selectedCard);
      this.selectedCard = null;
    }
  }

  defend() {
    if (this.selectedCard){
      const game = this.gameService.getGame();
      if (this.selectedCard.power < game.lastCardPlayed?.minPowerBlock!) {
        console.log("Cannot defend with " + this.selectedCard.name);
      }
      this.gameService.defend(this.selectedCard);
      this.selectedCard = null;
      //this.passTurn();
    } else {
      this.gameService.defend();
      //this.passTurn();
    }
  }

  showText() {
    this.isHidden = false;
    setTimeout(() => {
      this.isHidden = true;
    }, 1000); // 1 segundo antes de empezar a desvanecer
  }

  isCardAttacking(card: Card) {
    const game = this.gameService.getGame();
    return card == game.lastCardPlayed;
  }

  openModal() {
    const game = this.gameService.getGame();
    this.modalCards = game.playerHand;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
