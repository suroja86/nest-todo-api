export class CreateUserDto {
  readonly email: string;
  readonly password: string;
  readonly banned: boolean;
  readonly banReason: string;
}