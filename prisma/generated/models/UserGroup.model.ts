import { IsInt, IsDefined, IsDate } from "class-validator";
import { User, Group } from "./";

export class UserGroup {
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
    user!: User;

    @IsDefined()
    @IsInt()
    userId!: number;

    @IsDefined()
    group!: Group;

    @IsDefined()
    @IsInt()
    groupId!: number;
}
