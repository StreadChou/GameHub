import {PokerManager} from "../../core/poker/PokerManager";
import {PokerSuit} from "../../../../constant/poker";
import {shuffleArray} from "../../../../helper/randomHelper";

export class Table extends PokerManager {
    constructor(config: { [key in PokerSuit]?: Array<number> }) {
        super(config);
    }

    static generateTable(): Table {
        const config = PokerManager.generateStandardCard();
        const table = new Table(config);
        table.cards = shuffleArray(table.cards);
        return table;
    }

}