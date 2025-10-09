import { IsNotEmpty, IsOptional, IsInt, IsString, IsUrl } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsInt()
  authorId?: number;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: 'Image must be a valid URL' })
  image?: string;
}
