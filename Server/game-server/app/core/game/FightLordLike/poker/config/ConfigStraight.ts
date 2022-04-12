import {AbstractPokerConfig} from "./PokerConfig";

export class ConfigStraight extends AbstractPokerConfig {
    minLength: number = 5;
    maxLength: number = 13;

    constructor(minLength: number, maxLength: number) {
        super();
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

}