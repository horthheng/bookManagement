import { IsNotEmpty, IsOptional, IsInt } from 'class-validator';

export class CreateBookDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNotEmpty()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsOptional()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsInt()
  authorId?: number;
}
