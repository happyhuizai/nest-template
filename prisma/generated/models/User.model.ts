import { IsInt, IsDefined, IsDate, IsBoolean, IsString } from "class-validator";
import { UserGroup } from "./";

export class User {
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
    username!: string;

    @IsDefined()
    @IsString()
    email!: string;

    @IsDefined()
    @IsString()
    password!: string;

    @IsDefined()
    groups!: UserGroup[];
}
