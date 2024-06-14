import { IsInt, IsDefined } from "class-validator";
import { Role, Permission } from "./";

export class PermissionRole {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    role!: Role;

    @IsDefined()
    @IsInt()
    roleId!: number;

    @IsDefined()
    permission!: Permission;

    @IsDefined()
    @IsInt()
    permissionId!: number;
}
