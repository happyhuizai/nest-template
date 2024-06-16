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

import { DepartmentService } from './department.service';
import {
  CreateDepartmentReqDto,
  FindAllDepartmentReqDto,
  UpdateDepartmentResDto,
} from './dto/department.req.dto';
import {
  DepartmentItem,
  FindAllDepartmentResDto,
} from './dto/department.res.dto';

import { Serialize } from '@/decorators/serialize.decorator';
import { OperationResDto } from '@/shared/dto/res.dto';
import { CustomApiResponse } from '@/shared/swagger';
import { IdReqDto } from '@/shared/dto/req.dto';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @CustomApiResponse(DepartmentItem)
  @Serialize(DepartmentItem)
  @Post()
  create(@Body() createDepartmentDto: CreateDepartmentReqDto) {
    return this.departmentService.create(createDepartmentDto);
  }

  @CustomApiResponse(DepartmentItem, 'list')
  @Serialize(FindAllDepartmentResDto)
  @Get()
  findAll(@Query() query: FindAllDepartmentReqDto) {
    return this.departmentService.findAll(query);
  }

  @CustomApiResponse(DepartmentItem)
  @Serialize(DepartmentItem)
  @Get(':id')
  findOne(@Param() params: IdReqDto) {
    return this.departmentService.findOne(params.id);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Patch(':id')
  update(@Param() params: IdReqDto, @Body() body: UpdateDepartmentResDto) {
    return this.departmentService.update(params.id, body);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Delete(':id')
  remove(@Param() params: IdReqDto) {
    return this.departmentService.remove(params.id);
  }
}
