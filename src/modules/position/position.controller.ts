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

import { PositionService } from './position.service';
import {
  CreatePositionReqDto,
  FindAllPositionReqDto,
  UpdatePositionResDto,
} from './dto/position.req.dto';
import { PositionItem, FindAllPositionResDto } from './dto/position.res.dto';

import { Serialize } from '@/decorators/serialize.decorator';
import { OperationResDto } from '@/shared/dto/res.dto';
import { CustomApiResponse } from '@/shared/swagger';
import { IdReqDto } from '@/shared/dto/req.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @CustomApiResponse(PositionItem)
  @Serialize(PositionItem)
  @Post()
  create(@Body() createPositionDto: CreatePositionReqDto) {
    return this.positionService.create(createPositionDto);
  }

  @CustomApiResponse(PositionItem, 'list')
  @Serialize(FindAllPositionResDto)
  @Get()
  findAll(@Query() query: FindAllPositionReqDto) {
    return this.positionService.findAll(query);
  }

  @CustomApiResponse(PositionItem)
  @Serialize(PositionItem)
  @Get(':id')
  findOne(@Param() params: IdReqDto) {
    return this.positionService.findOne(params.id);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Patch(':id')
  update(@Param() params: IdReqDto, @Body() body: UpdatePositionResDto) {
    return this.positionService.update(params.id, body);
  }

  @CustomApiResponse(OperationResDto)
  @Serialize(OperationResDto)
  @Delete(':id')
  remove(@Param() params: IdReqDto) {
    return this.positionService.remove(params.id);
  }
}
