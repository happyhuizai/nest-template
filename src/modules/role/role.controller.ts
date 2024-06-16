import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { RoleService } from './role.service';
import {
  CreateRoleReqDto,
  FindAllRoleReqDto,
  UpdateRoleResDto,
} from './dto/role.req.dto';
import { RoleItem, FindAllRoleResDto } from './dto/role.res.dto';

import { Serialize } from '@/decorators/serialize.decorator';
import { OperationResDto } from '@/shared/dto/res.dto';
import { CustomApiResponse } from '@/shared/swagger';
import { IdReqDto } from '@/shared/dto/req.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @CustomApiResponse(RoleItem)
  @Serialize(RoleItem)
  @Post()
  create(@Body() createRoleDto: CreateRoleReqDto) {
    return this.roleService.create(createRoleDto);
  }

  @CustomApiResponse(RoleItem, 'list')
  @Serialize(FindAllRoleResDto)
  @Get()
  findAll(@Query() query: FindAllRoleReqDto) {
    return this.roleService.findAll(query);
  }

  @CustomApiResponse(RoleItem)
  @Serialize(RoleItem)
  @Get(':id')
  findOne(@Param() params: IdReqDto) {
    return this.roleService.findOne(params.id);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Patch(':id')
  update(@Param() params: IdReqDto, @Body() body: UpdateRoleResDto) {
    return this.roleService.update(params.id, body);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Delete(':id')
  remove(@Param() params: IdReqDto) {
    return this.roleService.remove(params.id);
  }
}
