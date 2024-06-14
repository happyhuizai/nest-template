import { IsInt, IsDefined, IsDate, IsBoolean, IsString, IsIn, IsOptional } from "class-validator";
import { PermissionMenu } from "./";
import { getEnumValues } from "../helpers";
import { MenuType } from "../enums";

export class Menu {
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
    @IsIn(getEnumValues(MenuType))
    type!: MenuType;

    @IsOptional()
    @IsString()
    icon?: string;

    @IsOptional()
    @IsInt()
    order?: number;

    @IsOptional()
    @IsString()
    route?: string;

    @IsOptional()
    @IsString()
    component?: string;

    @IsOptional()
    @IsBoolean()
    keepAlive?: boolean;

    @IsOptional()
    @IsBoolean()
    hidden?: boolean;

    @IsOptional()
    @IsString()
    outlink?: string;

    @IsOptional()
    @IsInt()
    parentId?: number;

    @IsDefined()
    permissions!: PermissionMenu[];
}
