import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';

@Controller('rest/todo')
export class TodoController {
  @Get()
  getAllAction(): string {
    return 'Get All';
  }

  @Get(':id')
  getOneAction(@Param('id') id: string): string {
    return 'Gat one by id ' + id;
  }

  @Post()
  createAction(@Body() todo: CreateDto): CreateDto {
    console.log(todo);
    return todo;
  }

  @Put()
  updateAction(
      @Param('id') id: string,
      @Body() todo: UpdateDto
  ): UpdateDto {
    console.log('Search by id', id);
    console.log(todo, 'saved');
    return todo;
  }

  @Delete(':id')
  deleteAction(@Param('id') id: string): string {
    return 'Delete todo by id ' + id;
  }
}