import { IsNotEmpty } from 'class-validator';

export class CreateAuthorDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  name: string;
}
