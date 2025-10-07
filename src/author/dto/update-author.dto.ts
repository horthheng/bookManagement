import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthorDto } from './create-author.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
