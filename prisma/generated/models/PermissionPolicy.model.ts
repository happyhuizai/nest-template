import { IsInt, IsDefined } from "class-validator";
import { Policy, Permission } from "./";

export class PermissionPolicy {
    @IsDefined()
    @IsInt()
    id!: number;

    @IsDefined()
    rule!: Policy;

    @IsDefined()
    @IsInt()
    ruleId!: number;

    @IsDefined()
    permission!: Permission;

    @IsDefined()
    @IsInt()
    permissionId!: number;
}
