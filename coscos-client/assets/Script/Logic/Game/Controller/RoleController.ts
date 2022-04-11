import {ControllerBase} from "../../Base/ControllerBase";
import {RoleManager} from "../Manager/RoleManager";

export class RoleController extends ControllerBase {
    roleManager: RoleManager;

    public constructor() {
        super();
        this.roleManager = new RoleManager();
    }

    onLoadingFinish() {
        this.roleManager.onLoadingFinish();
    }

    addRole(roleInfos: Array<any>) {
        roleInfos.forEach(ele => {
            this.roleManager.addRole(ele);
        })
    }

    deleteRole(info: any) {
        this.roleManager.deleteRole(info);
    }

}