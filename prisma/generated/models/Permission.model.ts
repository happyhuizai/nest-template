import { IsInt, IsDefined, IsDate, IsBoolean, IsString } from "class-validator";
import { PermissionRole, PermissionMenu, PermissionPolicy } from "./";

export class Permission {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    @IsBoolean()
    isDeleted!: boolean;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    roles!: PermissionRole[];

    @IsDefined()
    menus!: PermissionMenu[];

    @IsDefined()
    rules!: PermissionPolicy[];
}
