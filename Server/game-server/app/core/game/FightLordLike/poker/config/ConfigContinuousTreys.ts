import {AbstractPokerConfig} from "./PokerConfig";

export class ConfigContinuousTreys extends AbstractPokerConfig {
    minLength: number = 3;
    maxLength: number = 13;

    constructor(minLength: number, maxLength: number) {
        super();
        this.minLength = minLength;
        this.maxLength = maxLength;
    }

}