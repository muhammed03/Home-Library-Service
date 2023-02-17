import { IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateAlbumDTO {
  @IsString()
  name: string;
  @IsNumber()
  year: number;
  @IsUUID()
  artistId: string | null;
}

export class UpdateAlbumDTO extends PartialType(CreateAlbumDTO) {}
