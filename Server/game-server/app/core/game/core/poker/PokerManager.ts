import {PokerCard} from "./pokerCard";
import {PokerSuit} from "../../../../constant/poker";
import {PokerClientDto} from "./pokerDto";

export class PokerManager {
    cards: PokerCard[] = [];

    protected constructor(config: { [key in PokerSuit]?: Array<number> }) {
        for (let _suit in config) {
            const suit: PokerSuit = parseInt(_suit);
            const cards: Array<number> = config[suit];
            cards.forEach(rank => {
                this.cards.push(new PokerCard(suit, rank))
            })
        }
    }


    static generateStandardCard() {
        const config: { [key in PokerSuit]?: Array<number> } = {}
        config[PokerSuit.ADVERT] = [];
        config[PokerSuit.JOKER] = [1, 2];
        config[PokerSuit.SPADE] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.HEART] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.DIAMOND] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        config[PokerSuit.CLUB] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
        return config;
    }

    static generateCardClientData(cards: Array<PokerCard>): Array<PokerClientDto> {
        const rlt: Array<PokerClientDto> = [];
        cards.forEach(card => {
            rlt.push(card.makeClient())
        })
        return rlt;
    }

}