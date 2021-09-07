import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateDto, UpdateDto } from './dto';
import { TodoService } from '../services/todo.module';
import { Todo } from '../entities/todo.entity';
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotFoundResponse} from "./type";

@ApiTags('todo')
@Controller('rest/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all todo', type: [Todo] }) // type: [Todo] - array of todo
  getAllAction(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get todo by id', type: Todo })
  @ApiResponse({ status: 404, description: 'Not Found', type: NotFoundResponse })
  async getOneAction(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    //do not work if, in todo Promise { pending }
    if (todo === undefined) {
      throw new HttpException(
        'Todo with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    return todo;
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Create todo', type: Todo })
  @ApiBody({ type: CreateDto })
  createAction(@Body() createDto: CreateDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createDto.title;
    if (createDto.isCompleted !== undefined) {
      todo.isCompleted = createDto.isCompleted;
    }
    return this.todoService.create(todo);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update todo by id', type: Todo })
  @ApiBody({ type: UpdateDto })
  async updateAction(
    @Param('id') id: string,
    @Body() { title, isCompleted = false }: UpdateDto,
  ): Promise<Todo> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException(
        'Todo with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    todo.title = title;
    todo.isCompleted = isCompleted;
    return this.todoService.update(todo);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete todo by id' })
  @ApiResponse({ status: 404, description: 'Not Found', type: NotFoundResponse })
  async deleteAction(@Param('id') id: string): Promise<{ success: boolean }> {
    const todo = await this.todoService.findOne(id);
    if (todo === undefined) {
      throw new HttpException(
        'Todo with id = ' + id + ' not exists',
        HttpStatus.NOT_FOUND,
      );
    }
    await this.todoService.remove(id);
    return {
      success: true,
    };
  }
}