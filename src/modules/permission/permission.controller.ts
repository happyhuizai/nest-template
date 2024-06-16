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

import { PermissionService } from './permission.service';
import {
  CreatePermissionReqDto,
  FindAllPermissionReqDto,
  UpdatePermissionResDto,
} from './dto/permission.req.dto';
import {
  PermissionItem,
  FindAllPermissionResDto,
} from './dto/permission.res.dto';

import { Serialize } from '@/decorators/serialize.decorator';
import { OperationResDto } from '@/shared/dto/res.dto';
import { CustomApiResponse } from '@/shared/swagger';
import { IdReqDto } from '@/shared/dto/req.dto';

@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @CustomApiResponse(PermissionItem)
  @Serialize(PermissionItem)
  @Post()
  create(@Body() createPermissionDto: CreatePermissionReqDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @CustomApiResponse(PermissionItem, 'list')
  @Serialize(FindAllPermissionResDto)
  @Get()
  findAll(@Query() query: FindAllPermissionReqDto) {
    return this.permissionService.findAll(query);
  }

  @CustomApiResponse(PermissionItem)
  @Serialize(PermissionItem)
  @Get(':id')
  findOne(@Param() params: IdReqDto) {
    return this.permissionService.findOne(params.id);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Patch(':id')
  update(@Param() params: IdReqDto, @Body() body: UpdatePermissionResDto) {
    return this.permissionService.update(params.id, body);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Delete(':id')
  remove(@Param() params: IdReqDto) {
    return this.permissionService.remove(params.id);
  }
}
