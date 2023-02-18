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
import { TracksService } from './tracks.service';
import { TrackEntity } from './entities/tracks.entities';
import { CreateTrackDTO, UpdateTrackDTO } from './dto/tracks.dto';

@Controller('track')
export class TracksController {
  constructor(readonly tracksService: TracksService) {}
  @Get()
  getAllTracks(): Promise<TrackEntity[]> {
    return this.tracksService.getAllTracks();
  }

  @Get(':id')
  getTrackById(@Param('id') id: string): Promise<TrackEntity> {
    return this.tracksService.getTrackById(id);
  }

  @Post()
  createTrack(@Body() trackData: CreateTrackDTO) {
    return this.tracksService.createTrack(trackData);
  }

  @Put(':id')
  updateTrack(@Param('id') id: string, @Body() trackData: UpdateTrackDTO) {
    return this.tracksService.updateTrack(id, trackData);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteTrackById(@Param('id') id: string) {
    return this.tracksService.deleteTrackById(id);
  }
}
