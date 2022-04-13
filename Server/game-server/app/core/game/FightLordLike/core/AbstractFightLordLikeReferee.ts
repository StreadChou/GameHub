import {AbstractFightLordLikeGame} from "./AbstractFightLordLikeGame";

export abstract class AbstractFightLordLikeReferee {
    game: AbstractFightLordLikeGame;

    protected constructor(game: AbstractFightLordLikeGame) {
        this.game = game;
    }

}