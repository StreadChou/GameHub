import {AbstractFightLordLikeGame} from "./AbstractFightLordLikeGame";

export abstract class AbstractFightLordLikeTable {
    game: AbstractFightLordLikeGame;

    protected constructor(game: AbstractFightLordLikeGame) {
        this.game = game;
    }

}