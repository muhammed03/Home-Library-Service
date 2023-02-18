import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { db } from '../repository';
import { FIELDS } from '../core/constants';
import { FavsEntity } from './entities/favs.entities';
import { validateById, ValidatorResponse } from '../utils/validator';
import StoreService from '../core/StoreService';
import { getMessage } from '../utils/helpers';

@Injectable()
export class FavsService extends StoreService {
  private async findFromFavs(id: string, field: string) {
    return await db.favs[field].find((itemId) => {
      return itemId === id;
    });
  }

  async getAllFavs(): Promise<FavsEntity> {
    return {
      artists: db[FIELDS.ARTISTS].filter((item) =>
        db[FIELDS.FAVORITES].artists.includes(item.id),
      ),
      albums: db[FIELDS.ALBUMS].filter((item) =>
        db[FIELDS.FAVORITES].albums.includes(item.id),
      ),
      tracks: db[FIELDS.TRACKS].filter((item) =>
        db[FIELDS.FAVORITES].tracks.includes(item.id),
      ),
    };
  }

  async addToFavorites(id: string, field: FIELDS) {
    const validationRes = await validateById(
      {
        id,
        fieldName: field,
      },
      this,
    );

    switch (validationRes) {
      case ValidatorResponse.NOT_VALID_ID:
        throw new BadRequestException(getMessage().NOT_VALID_ID);
      case ValidatorResponse.NOT_FOUND:
        throw new UnprocessableEntityException(getMessage(id).NOT_FOUND);
      case ValidatorResponse.VALID:
        const isExist = await this.findFromFavs(id, field);
        if (isExist) {
          throw new ConflictException(getMessage().ALREADY_EXISTS);
        }

        db.favs[field].push(id);
    }
  }

  async deleteFromFavorites(id: string, field: FIELDS) {
    if (!uuidValidate(id)) {
      throw new BadRequestException(getMessage().NOT_VALID_ID);
    }

    const isExist = await this.findFromFavs(id, field);
    if (!isExist) {
      throw new NotFoundException(getMessage().NOT_FOUND);
    }

    db.favs[field] = db.favs[field].filter((itemId) => itemId !== id);
  }
}
