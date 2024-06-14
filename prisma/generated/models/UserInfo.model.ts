import { IsInt, IsDefined, IsString } from "class-validator";
import "./";

export class UserInfo {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    @IsString()
    email!: string;
}
