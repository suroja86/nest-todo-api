import { IsString, IsInt } from 'class-validator';

export class CreateTestDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  age: number;
}