import { GameService } from "../services/game.service";

export class IA {

    private gameService: GameService;

    constructor(gameService: GameService) {
        this.gameService = gameService;
    }

    playTurn() {
        const game = this.gameService.getGame();
        setTimeout(() => {
            if (game.IAPlayedCards.length > 1) {
                this.gameService.attack(game.IAPlayedCards[0])
            }
            else {
                this.gameService.playCard(game.IAHand.pop()!)
            }
        }, 3000);
    }

    defend() {
        const game = this.gameService.getGame();
        if (game.IAPlayedCards.length > 0) {
            console.log("IA defending with: " + game.IAPlayedCards[0].name)
            this.gameService.defend(game.IAPlayedCards[0]);
        } else {
            this.gameService.defend();
        }
    }
}