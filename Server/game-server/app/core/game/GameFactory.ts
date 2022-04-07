import {RunFast} from "./runFast";

export enum GameType {
    RunFast = 1,
}

export const GameClassMap: { [key in GameType]: any } = {
    [GameType.RunFast]: RunFast.Game
}

export function GameFactory(type: GameType) {
    return GameClassMap[type];
}