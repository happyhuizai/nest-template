import { IsInt, IsDefined } from "class-validator";
import { Permission, Menu } from "./";

export class PermissionMenu {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    permission!: Permission;

    @IsDefined()
    @IsInt()
    permissionId!: number;

    @IsDefined()
    menu!: Menu;

    @IsDefined()
    @IsInt()
    menuId!: number;
}
