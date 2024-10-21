import { Card } from "../models/card";
import { PlayerType } from "../models/game";
import { GameService } from "../services/game.service";

export const cards: Card[] = [
    {
        name: "Chamaleon Sniper",
        power: 1,
        extraPower: 0,
        keywords: ["sneaky"],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                game.reduceLife();
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile000.png"
    },
    {
        name: "Gorillion",
        power: 10,
        extraPower: 0,
        keywords: [],
        image: "../assets/tile001.png"
    },
    {
        name: "Mysterious Mermaid",
        power: 7,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.currentPlayer == PlayerType.Player)
                    game.playerLife = game.IALife;
                else
                    game.IALife = game.playerLife;
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile002.png"
    },
    {
        name: "Lone Yeti",
        power: 5,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    if (game.playedCards.length == 1) {
                        game.playedCards[0].extraPower += 5;
                    }
                } else if (!playedByPlayer){
                    if (game.IAPlayedCards.length == 1) {
                        game.IAPlayedCards[0].extraPower += 5;
                    }
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile003.png"
    },
    {
        name: "Compost Dragon",
        power: 3,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.playCardFromDiscard();
            }
        },
        image: "../assets/tile004.png"
    },
    {
        name: "Compost Dragon",
        power: 3,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.playCardFromDiscard();
            }
        },
        image: "../assets/tile005.png"
    },
    {
        name: "Explosive Toad",
        power: 5,
        extraPower: 0,
        keywords: ["frenzy"],
        ability: {
            type: "defeated",
            execute: (gameService: GameService) => {
                gameService.defeatCreature(0);
            }
        },
        image: "../assets/tile006.png"
    },
    {
        name: "Explosive Toad",
        power: 5,
        extraPower: 0,
        keywords: ["frenzy"],
        ability: {
            type: "defeated",
            execute: (gameService: GameService) => {
                gameService.defeatCreature(0);
            }
        },
        image: "../assets/tile007.png"
    },
    {
        name: "Rhino Turtle",
        power: 8,
        extraPower: 0,
        keywords: ["frenzy, tough"],
        image: "../assets/tile008.png"
    },
    {
        name: "Rhino Turtle",
        power: 8,
        extraPower: 0,
        keywords: ["frenzy, tough"],
        image: "../assets/tile009.png"
    },
    {
        name: "Deathweaver",
        power: 2,
        extraPower: 0,
        keywords: ["poisonous"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.IACantActivatePlayEffects = true;
                } else {
                    game.playerCantActivatePlayEffects = true;
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile010.png"
    },
    {
        name: "Tusked Extorter",
        power: 8,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                gameService.discardCardOponent(1);
            }
        },
        image: "../assets/tile011.png"
    },
    {
        name: "Tusked Extorter",
        power: 8,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                gameService.discardCardOponent(1);
            }
        },
        image: "../assets/tile012.png"
    },
    {
        name: "Ferret Bomber",
        power: 2,
        extraPower: 0,
        keywords: ["sneaky"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.discardCardOponent(2);
            }
        },
        image: "../assets/tile013.png"
    },
    {
        name: "Ferret Bomber",
        power: 2,
        extraPower: 0,
        keywords: ["sneaky"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.discardCardOponent(2);
            }
        },
        image: "../assets/tile014.png"
    },
    {
        name: "Tiger Squirrel",
        power: 3,
        extraPower: 0,
        keywords: ["sneaky"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.defeatCreature(7);
            }
        },
        image: "../assets/tile015.png"
    },
    {
        name: "Tiger Squirrel",
        power: 3,
        extraPower: 0,
        keywords: ["sneaky"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.defeatCreature(7);
            }
        },
        image: "../assets/tile016.png"
    },
    {
        name: "Kangasaurus Rex",
        power: 7,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                let cardsToDefeat = [];
                if (game.isPlayer()) {
                    cardsToDefeat = game.IAPlayedCards.filter(card => card.power <= 4);
                } else {
                    cardsToDefeat = game.playedCards.filter(card => card.power <= 4);
                }
                cardsToDefeat.forEach(card => {
                    gameService.defeat(card, game.currentPlayer);
                })
            }
        },
        image: "../assets/tile017.png"
    },
    {
        name: "Kangasaurus Rex",
        power: 7,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                let cardsToDefeat = [];
                if (game.isPlayer()) {
                    cardsToDefeat = game.IAPlayedCards.filter(card => card.power <= 4);
                } else {
                    cardsToDefeat = game.playedCards.filter(card => card.power <= 4);
                }
                cardsToDefeat.forEach(card => {
                    gameService.defeat(card, game.currentPlayer);
                })
            }
        },
        image: "../assets/tile018.png"
    },
    {
        name: "Killer Bee",
        power: 5,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                game.reduceLife();
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile019.png"
    },
    {
        name: "Killer Bee",
        power: 5,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                game.reduceLife();
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile020.png"
    },
    {
        name: "Plated Scorpion",
        power: 2,
        extraPower: 0,
        keywords: ["tough, poisonous"],
        image: "../assets/tile021.png"
    },
    {
        name: "Plated Scorpion",
        power: 2,
        extraPower: 0,
        keywords: ["tough, poisonous"],
        image: "../assets/tile022.png"
    },
    {
        name: "Urchin Hurler",
        power: 5,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.playedCards.forEach(card => {
                        if (card.name != "Urchin Hurler") card.extraPower += 2;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.IA){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name != "Urchin Hurler") card.extraPower += 2;
                    })
                } else if (playedByPlayer && game.currentPlayer == PlayerType.IA) {
                    game.playedCards.forEach(card => {
                        if (card.name != "Urchin Hurler") card.extraPower -= 2;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.IAPlayedCards.forEach(card => {
                        if (card.name != "Urchin Hurler") card.extraPower -= 2;
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile023.png"
    },
    {
        name: "Grave Robber",
        power: 7,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.playCardFromOpponentDiscard();
            }
        },
        image: "../assets/tile024.png"
    },
    {
        name: "Grave Robber",
        power: 7,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.playCardFromOpponentDiscard();
            }
        },
        image: "../assets/tile025.png"
    },
    {
        name: "Luchataur",
        power: 9,
        extraPower: 0,
        keywords: ["frenzy"],
        image: "../assets/tile026.png"
    },
    {
        name: "Luchataur",
        power: 9,
        extraPower: 0,
        keywords: ["frenzy"],
        image: "../assets/tile027.png"
    },
    {
        name: "Bee Bear",
        power: 8,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Bee Bear") card.minPowerBlock = 7;
                    })
                } else if (!playedByPlayer){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Bee Bear") card.minPowerBlock = 7;
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile028.png"
    },
    {
        name: "Spider Owl",
        power: 3,
        extraPower: 0,
        keywords: ["sneaky, poisonous"],
        image: "../assets/tile029.png"
    },
    {
        name: "Spider Owl",
        power: 3,
        extraPower: 0,
        keywords: ["sneaky, poisonous"],
        image: "../assets/tile030.png"
    },
    {
        name: "Sharky Crab-dog-mummypus",
        power: 5,
        extraPower: 0,
        keywords: ["all"],
        image: "../assets/tile031.png"
    },
    {
        name: "Strange Barrel",
        power: 6,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "defeated",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.currentPlayer == PlayerType.Player) {
                    const randomIndex = Math.floor(Math.random() * game.IAHand.length);
                    const [removedElement] = game.IAHand.splice(randomIndex, 1);
                    game.playerHand.push(removedElement);
                } else {
                    const randomIndex = Math.floor(Math.random() * game.playerHand.length);
                    const [removedElement] = game.playerHand.splice(randomIndex, 1);
                    game.IAHand.push(removedElement);
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile032.png"
    },
    {
        name: "Axolotl Healer",
        power: 4,
        extraPower: 0,
        keywords: ["poisonous"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                game.healLife(2);
                gameService.updateGame(game);
                console.log(game)
            }
        },
        image: "../assets/tile033.png"
    },
    {
        name: "Axolotl Healer",
        power: 4,
        extraPower: 0,
        keywords: ["poisonous"],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                game.healLife(2);
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile034.png"
    },
    {
        name: "Snail Hydra",
        power: 9,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.isPlayer()) {
                    if (game.playedCards.length < game.IAPlayedCards.length) {
                        gameService.defeatCreature(0)
                    }
                } else if (!game.isPlayer()){
                    if (game.IAPlayedCards.length < game.playedCards.length) {
                        gameService.defeatCreature(0)
                    }
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile035.png"
    },
    {
        name: "Snail Hydra",
        power: 9,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.isPlayer()) {
                    if (game.playedCards.length < game.IAPlayedCards.length) {
                        gameService.defeatCreature(0)
                    }
                } else if (!game.isPlayer()){
                    if (game.IAPlayedCards.length < game.playedCards.length) {
                        gameService.defeatCreature(0)
                    }
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile036.png"
    },
    {
        name: "Turbo bug",
        power: 4,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.isPlayer()) {
                    game.IALife = 1;
                } else {
                    game.playerLife = 1;
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile037.png"
    },
    {
        name: "Elephantopus",
        power: 7,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Elephantopus") card.minPowerBlock = 5;
                    })
                } else if (!playedByPlayer){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Elephantopus") card.minPowerBlock = 5;
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile038.png"
    },
    {
        name: "Giraffodile",
        power: 7,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                const game = gameService.getGame();
                if (game.isPlayer()) {
                    game.playerHand.push(...game.playerDiscard);
                    game.playerDiscard.splice(0, game.playerDiscard.length);
                } else {
                    game.IAHand.push(...game.IADiscard);
                    game.IADiscard.splice(0, game.IADiscard.length);
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile039.png"
    },
    {
        name: "Brain Fly",
        power: 4,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "play",
            execute: (gameService: GameService) => {
                gameService.takeControl(0);
            }
        },
        image: "../assets/tile040.png"
    },
    {
        name: "Snail Thrower",
        power: 1,
        extraPower: 0,
        keywords: ["poisonous"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.playedCards.forEach(card => {
                        if (card.name != "Snail Thrower" && card.power <= 4) {
                            card.keywords.push(...["hunter", "poisonous"]);
                        }
                    })
                } else if (!playedByPlayer){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name != "Snail Thrower" && card.power <= 4) {
                            card.keywords.push(...["hunter", "poisonous"]);
                        }
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile041.png"
    },
    {
        name: "Shark Dog",
        power: 4,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "attack",
            execute: (gameService: GameService) => {
                gameService.defeatCreature(6);
            }
        },
        image: "../assets/tile042.png"
    },
    {
        name: "Harpy Mother",
        power: 5,
        extraPower: 0,
        keywords: [],
        ability: {
            type: "defeated",
            execute: (gameService: GameService) => {
                gameService.takeControl(5);
                gameService.takeControl(5);
            }
        },
        image: "../assets/tile043.png"
    },
    {
        name: "Shield Bugs",
        power: 4,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.playedCards.forEach(card => {
                        if (card.name != "Shield Bugs") {
                            card.extraPower += 1;
                        }
                    })
                } else if (!playedByPlayer){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name != "Shield Bugs") {
                            card.extraPower += 1;
                        }
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile044.png"
    },
    {
        name: "Shield Bugs",
        power: 4,
        extraPower: 0,
        keywords: ["tough"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer) {
                    game.playedCards.forEach(card => {
                        if (card.name != "Shield Bugs") {
                            card.extraPower += 1;
                        }
                    })
                } else if (!playedByPlayer){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name != "Shield Bugs") {
                            card.extraPower += 1;
                        }
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile045.png"
    },
    {
        name: "Goblin Werewolf",
        power: 2,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower += 6;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.IA){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower += 6;
                    })
                } else if (playedByPlayer && game.currentPlayer == PlayerType.IA) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower -= 6;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower -= 6;
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile046.png"
    },
    {
        name: "Goblin Werewolf",
        power: 2,
        extraPower: 0,
        keywords: ["hunter"],
        ability: {
            type: "permanent",
            check: (gameService: GameService, playedByPlayer: boolean) => {
                const game = gameService.getGame();
                if (playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower += 6;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.IA){
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower += 6;
                    })
                } else if (playedByPlayer && game.currentPlayer == PlayerType.IA) {
                    game.playedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower -= 6;
                    })
                } else if (!playedByPlayer && game.currentPlayer == PlayerType.Player) {
                    game.IAPlayedCards.forEach(card => {
                        if (card.name == "Goblin Werewolf") card.extraPower -= 6;
                    })
                }
                gameService.updateGame(game);
            }
        },
        image: "../assets/tile047.png"
    }
];