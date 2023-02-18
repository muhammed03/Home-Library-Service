import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { TrackEntity } from './entities/tracks.entities';
import { db } from '../repository';
import { FIELDS } from '../core/constants';
import StoreService from '../core/StoreService';
import { validateById, ValidatorResponse } from '../utils/validator';
import { getMessage } from '../utils/helpers';
import { CreateTrackDTO, UpdateTrackDTO } from './dto/tracks.dto';

@Injectable()
export class TracksService extends StoreService {
  async getAllTracks(): Promise<TrackEntity[]> {
    return db[FIELDS.TRACKS];
  }

  async getTrackById(id: string): Promise<TrackEntity> {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.TRACKS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).TRACK_NOT_FOUND);
      case ValidatorResponse.VALID:
        return await this.findOne(id, FIELDS.TRACKS);
    }
  }

  async deleteTrackById(id: string) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.TRACKS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).TRACK_NOT_FOUND);
      case ValidatorResponse.VALID:
        await this.deleteOne(id, FIELDS.TRACKS);

        db.favs[FIELDS.TRACKS].filter((trackId) => trackId !== id);
    }
  }

  async createTrack(trackData: CreateTrackDTO) {
    const newTrack: TrackEntity = {
      id: uuidV4(),
      ...trackData,
    };

    db[FIELDS.TRACKS].push(newTrack);
  }

  async updateTrack(id: string, trackData: UpdateTrackDTO) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.TRACKS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).TRACK_NOT_FOUND);
      case ValidatorResponse.VALID:
        const track = db[FIELDS.TRACKS].find((item) => item.id === id);

        const trackIndex = db[FIELDS.TRACKS].findIndex(
          (item) => item.id === id,
        );

        db[FIELDS.TRACKS][trackIndex] = {
          ...track,
          ...trackData,
        };
    }
  }
}
