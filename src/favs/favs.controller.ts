import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsEntity } from './entities/favs.entities';
import { FIELDS } from '../core/constants';

@Controller('favs')
export class FavsController {
  constructor(readonly favsService: FavsService) {}

  @Get()
  getAllFavs(): Promise<FavsEntity> {
    return this.favsService.getAllFavs();
  }

  @Post('track/:id')
  addTrackToFavorites(@Param('id') id: string) {
    return this.favsService.addToFavorites(id, FIELDS.TRACKS);
  }

  @Delete('track/:id')
  @HttpCode(204)
  deleteTrackFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteFromFavorites(id, FIELDS.TRACKS);
  }

  @Post('artist/:id')
  addArtistToFavorites(@Param('id') id: string) {
    return this.favsService.addToFavorites(id, FIELDS.ARTISTS);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  deleteArtistFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteFromFavorites(id, FIELDS.ARTISTS);
  }

  @Post('album/:id')
  addAlbumToFavorites(@Param('id') id: string) {
    return this.favsService.addToFavorites(id, FIELDS.ALBUMS);
  }

  @Delete('album/:id')
  @HttpCode(204)
  deleteAlbumFromFavorites(@Param('id') id: string) {
    return this.favsService.deleteFromFavorites(id, FIELDS.ALBUMS);
  }
}
