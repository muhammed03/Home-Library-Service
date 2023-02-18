import { IsBoolean, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArtistDTO {
  @IsString()
  name: string;
  @IsBoolean()
  grammy: boolean;
}

export class UpdateArtistDTO extends PartialType(CreateArtistDTO) {}
