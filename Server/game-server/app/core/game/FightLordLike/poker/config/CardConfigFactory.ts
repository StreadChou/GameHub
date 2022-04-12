import {CardsType} from "../../Interface";
import {TypeSingle} from "../helper/TypeSingle";
import {TypeTreys} from "../helper/TypeTreys";
import {TypeThirtyMiles} from "../helper/TypeThirtyMiles";
import {TypeThirtyMilesWithSingle} from "../helper/TypeThirtyMilesWithSingle";
import {TypeFullHouse} from "../helper/TypeFullHouse";
import {TypeThirtyMilesWithTwo} from "../helper/TypeThirtyMilesWithTwo";
import {TypeFourOfAKind} from "../helper/TypeFourOfAKind";
import {TypeAllJoker} from "../helper/TypeAllJoker";
import {TypeContinuousTreys} from "../helper/TypeContinuousTreys";
import {TypeStraight} from "../helper/TypeStraight";
import {TypeStraightFlush} from "../helper/TypeStraightFlush";

const CardConfigMap = {
    [CardsType.Single]: TypeSingle.getInstance(),
    [CardsType.Treys]: TypeTreys.getInstance(),
    [CardsType.ThirtyMiles]: TypeThirtyMiles.getInstance(),
    [CardsType.ThirtyMilesWithSingle]: TypeThirtyMilesWithSingle.getInstance(),
    [CardsType.FullHouse]: TypeFullHouse.getInstance(),
    [CardsType.ThirtyMilesWithTwo]: TypeThirtyMilesWithTwo.getInstance(),
    [CardsType.FourOfAKind]: TypeFourOfAKind.getInstance(),
    [CardsType.AllJoker]: TypeAllJoker.getInstance(),
    [CardsType.ContinuousTreys]: TypeContinuousTreys.getInstance(),
    [CardsType.Straight]: TypeStraight.getInstance(),
    [CardsType.StraightFlush]: TypeStraightFlush.getInstance(),
}