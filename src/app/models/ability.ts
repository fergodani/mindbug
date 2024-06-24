import { GameService } from "../services/game.service";

export interface Ability {
    type: string;
    execute?: (gameService: GameService) => void;
    check?: (gameService: GameService, playedByPlayer: boolean) => void;
}