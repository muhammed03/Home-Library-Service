import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ArtistEntity } from './entities/artists.entities';
import { ArtistsService } from './artists.service';
import { CreateArtistDTO, UpdateArtistDTO } from './dto/artists.dto';

@Controller('artist')
export class ArtistsController {
  constructor(readonly artistsService: ArtistsService) {}

  @Get()
  getAllArtists(): Promise<ArtistEntity[]> {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  getArtistById(@Param('id') id: string): Promise<ArtistEntity> {
    return this.artistsService.getArtistById(id);
  }

  @Post()
  createArtist(@Body() artistData: CreateArtistDTO) {
    return this.artistsService.createArtist(artistData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteArtistById(@Param('id') id: string) {
    return this.artistsService.deleteArtistById(id);
  }

  @Put(':id')
  updateArtistById(
    @Param('id') id: string,
    @Body() artistData: UpdateArtistDTO,
  ) {
    return this.artistsService.updateArtist(id, artistData);
  }
}
