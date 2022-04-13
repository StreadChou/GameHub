import {AbstractGame} from "../../core/abstract/abstractGame";
import {PokerClientDto} from "../../../../constant/clientDto/DtoConstant";

export abstract class AbstractFightLordLikeGame extends AbstractGame {

    abstract playerPlayPokers(seat: number, _pokers: Array<PokerClientDto>);

    abstract playerPass(eat: number);
}