import { IsNumber, IsString, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTrackDTO {
  @IsString()
  name: string;
  @IsUUID()
  artistId: string;
  @IsUUID()
  albumId: string;
  @IsNumber()
  duration: number;
}

export class UpdateTrackDTO extends PartialType(CreateTrackDTO) {}
