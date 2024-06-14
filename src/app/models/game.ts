import { cards } from "../data/cards";
import { Card } from "./card";

export class Game {
    playerHand: Card[] = [];
    IAHand: Card[] = [];
    playedCards: Card[] = [];
    IAPlayedCards: Card[] = [];

    initGame() {
        const objetosAleatorios = this.drawCards(cards, 5);
        this.playerHand.push(...objetosAleatorios);
        this.IAHand.push(...objetosAleatorios);
    }

    drawCards(array: Card[], cantidad: number): Card[] {
        const resultado: Card[] = [];
        const arrayCopia = [...array];
    
        for (let i = 0; i < cantidad; i++) {
          if (arrayCopia.length === 0) break;
    
          const indiceAleatorio = Math.floor(Math.random() * arrayCopia.length);
          const objetoAleatorio = arrayCopia.splice(indiceAleatorio, 1)[0];
          resultado.push(objetoAleatorio);
        }
    
        return resultado;
      }
}