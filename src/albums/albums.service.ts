import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import { AlbumEntity } from './entities/albums.entities';
import { FIELDS } from '../core/constants';
import { db } from '../repository';
import StoreService from '../core/StoreService';
import { validateById, ValidatorResponse } from '../utils/validator';
import { getMessage } from '../utils/helpers';
import { CreateAlbumDTO, UpdateAlbumDTO } from './dto/albums.dto';

@Injectable()
export class AlbumsService extends StoreService {
  async getAllAlbums(): Promise<AlbumEntity[]> {
    return db[FIELDS.ALBUMS];
  }

  async getAlbumById(id: string): Promise<AlbumEntity> {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ALBUMS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).ALBUM_NOT_FOUND);
      case ValidatorResponse.VALID:
        return await this.findOne(id, FIELDS.ALBUMS);
    }
  }

  async deleteAlbumById(id: string) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ALBUMS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage().ALBUM_NOT_FOUND);
      case ValidatorResponse.VALID:
        await this.deleteOne(id, FIELDS.ALBUMS);
    }
  }

  async createAlbum(albumData: CreateAlbumDTO) {
    const newAlbum: AlbumEntity = {
      id: uuidV4(),
      ...albumData,
    };

    db[FIELDS.ALBUMS].push(newAlbum);
  }

  async updateAlbum(id: string, albumData: UpdateAlbumDTO) {
    const validatorRes = await validateById(
      {
        id,
        fieldName: FIELDS.ALBUMS,
      },
      this,
    );

    switch (validatorRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new NotFoundException(getMessage(id).ALBUM_NOT_FOUND);
      case ValidatorResponse.VALID:
        const album = db[FIELDS.ALBUMS].find((item) => item.id === id);

        const albumIndex = db[FIELDS.ALBUMS].findIndex(
          (item) => item.id === id,
        );

        db[FIELDS.ALBUMS][albumIndex] = {
          ...album,
          ...albumData,
        };
    }
  }
}
