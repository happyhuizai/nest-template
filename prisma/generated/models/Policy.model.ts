import { Prisma } from "@prisma/client";
import { IsInt, IsDefined, IsDate, IsString, IsOptional, IsBoolean } from "class-validator";
import { PermissionPolicy } from "./";

export class Policy {
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
    @IsString()
    action!: string;

    @IsDefined()
    @IsString()
    subject!: string;

    @IsOptional()
    fields?: Prisma.JsonValue;

    @IsOptional()
    conditions?: Prisma.JsonValue;

    @IsOptional()
    @IsBoolean()
    inverted?: boolean;

    @IsOptional()
    @IsString()
    reason?: string;

    @IsDefined()
    permissions!: PermissionPolicy[];
}
