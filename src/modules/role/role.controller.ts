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
  UpdateRoleReqDto,
} from './dto/role-req.dto';
import { Serialize } from '../../decorators/serialize.decorator';
import { FindAllRoleResDto, RoleItem } from './dto/role-res.dto';
import { CustomApiResponse } from '../../shared/swagger';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() createRoleReqDto: CreateRoleReqDto) {
    return this.roleService.create(createRoleReqDto);
  }

  @Serialize(FindAllRoleResDto)
  @CustomApiResponse(RoleItem)
  @Get()
  findAll(@Query() findAllRoleReqDto: FindAllRoleReqDto) {
    return this.roleService.findAll(findAllRoleReqDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleReqDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
