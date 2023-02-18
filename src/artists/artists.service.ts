import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { ArtistEntity } from './entities/artists.entities';
import { FIELDS } from '../core/constants';
import StoreService from '../core/StoreService';
import { validateById, ValidatorResponse } from '../utils/validator';
import { getMessage } from '../utils/helpers';
import { CreateArtistDTO, UpdateArtistDTO } from './dto/artists.dto';
import { db } from '../repository';

@Injectable()
export class ArtistsService extends StoreService {
  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.findAll(FIELDS.ARTISTS);
  }

  async getArtistById(id: string): Promise<ArtistEntity> {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ARTISTS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).ARTIST_NOT_FOUND);
      case ValidatorResponse.VALID:
        return await this.findOne(id, FIELDS.ARTISTS);
    }
  }

  async deleteArtistById(id: string) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ARTISTS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).ARTIST_NOT_FOUND);
      case ValidatorResponse.VALID:
        await this.deleteOne(id, FIELDS.ARTISTS);
        db[FIELDS.ALBUMS].forEach((album) => {
          album.artistId === id ? (album.artistId = null) : album.artistId;
        });

        db[FIELDS.TRACKS].forEach((track) => {
          track.artistId === id ? (track.artistId = null) : track.artistId;
        });
    }
  }

  async createArtist(artistData: CreateArtistDTO) {
    const newArtist: ArtistEntity = {
      id: uuidV4(),
      ...artistData,
    };

    db[FIELDS.ARTISTS].push(newArtist);
  }

  async updateArtist(id: string, artistData: UpdateArtistDTO) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ARTISTS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).ARTIST_NOT_FOUND);
      case ValidatorResponse.VALID:
        const artist = db[FIELDS.ARTISTS].find((item) => item.id === id);

        const artistIndex = db[FIELDS.ARTISTS].findIndex(
          (item) => item.id === id,
        );

        db[FIELDS.ARTISTS][artistIndex] = {
          ...artist,
          ...artistData,
        };
    }
  }
}
