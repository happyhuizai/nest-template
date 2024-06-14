import { IsInt, IsDefined } from "class-validator";
import { Group, Role } from "./";

export class GroupRole {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    group!: Group;

    @IsDefined()
    @IsInt()
    groupId!: number;

    @IsDefined()
    role!: Role;

    @IsDefined()
    @IsInt()
    roleId!: number;
}
