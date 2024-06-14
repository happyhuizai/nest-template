import { IsInt, IsDefined, IsBoolean, IsDate, IsString } from "class-validator";
import { GroupRole, UserGroup } from "./";

export class Group {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsBoolean()
    isDeleted!: boolean;

    @IsDefined()
    @IsDate()
    createdAt!: Date;

    @IsDefined()
    @IsDate()
    updatedAt!: Date;

    @IsDefined()
    @IsString()
    name!: string;

    @IsDefined()
    roles!: GroupRole[];

    @IsDefined()
    users!: UserGroup[];
}
