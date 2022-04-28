import {AbstractGame} from "../../core/abstract/abstractGame";

export abstract class AbstractFightLordLikeGame extends AbstractGame {

    abstract playerPlayPokers(seat: number, _pokers: Array<any>);

    abstract playerPass(eat: number);
}