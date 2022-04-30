import {BaseUiWindow} from "../../../Base/UI/BaseUiWindow";

export abstract class BaseCreateRoomView extends BaseUiWindow {
    PackageName = "Hall"

    abstract createRoom();
}