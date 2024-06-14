import { IsInt, IsDefined, IsDate, IsBoolean, IsString } from "class-validator";
import { GroupRole, PermissionRole } from "./";

export class Role {
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
    groupRoles!: GroupRole[];

    @IsDefined()
    permissions!: PermissionRole[];
}
