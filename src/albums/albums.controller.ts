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
import { AlbumsService } from './albums.service';
import { AlbumEntity } from './entities/albums.entities';
import { CreateAlbumDTO, UpdateAlbumDTO } from './dto/albums.dto';

@Controller('album')
export class AlbumsController {
  constructor(readonly albumsService: AlbumsService) {}

  @Get()
  getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getAlbumById(@Param('id') id: string): Promise<AlbumEntity> {
    return this.albumsService.getAlbumById(id);
  }

  @Post()
  createAlbum(@Body() albumData: CreateAlbumDTO) {
    return this.albumsService.createAlbum(albumData);
  }

  @Put(':id')
  updateAlbum(@Param('id') id: string, @Body() albumData: UpdateAlbumDTO) {
    return this.albumsService.updateAlbum(id, albumData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteAlbumById(@Param('id') id: string) {
    return this.albumsService.deleteAlbumById(id);
  }
}
