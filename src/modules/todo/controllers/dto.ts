import { ApiProperty } from '@nestjs/swagger';
import {IsBoolean, IsNotEmpty, IsString} from 'class-validator';

export class CreateDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    required: false,
  })
  @IsBoolean()
  isCompleted?: boolean;
}

export class UpdateDto {
  @ApiProperty()
  title: string;
  @ApiProperty({
    required: false,
  })
  isCompleted?: boolean;
}
