import { FIELDS } from '../core/constants';
import { validate as uuidValidate } from 'uuid';
import StoreService from '../core/StoreService';

interface ValidatorParams {
  id: string;
  fieldName: FIELDS;
}

export enum ValidatorResponse {
  NOT_FOUND = 'NOT_FOUND',
  NOT_VALID_ID = 'NOT_VALID_ID',
  VALID = 'VALID',
}

export const validateById = async (
  params: ValidatorParams,
  service: StoreService,
): Promise<ValidatorResponse> => {
  const { id, fieldName } = params;

  if (!uuidValidate(id)) {
    return ValidatorResponse.NOT_VALID_ID;
  }

  const entity = await service?.findOne(id, fieldName);

  if (!entity) {
    return ValidatorResponse.NOT_FOUND;
  }

  return ValidatorResponse.VALID;
};
