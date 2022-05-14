import {AbstractManager} from "../../Abstract/AbstractManager";
import {SceneLoading} from "./View/SceneLoading";

export class LoadingManager extends AbstractManager {

    mainScene() {
        return SceneLoading;
    }
}