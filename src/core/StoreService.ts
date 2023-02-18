import { db } from '../repository';

export default class StoreService {
  async findAll(field: string) {
    return await db[field];
  }

  async findOne(id: string, field: string) {
    return await db[field].find((item) => item.id === id);
  }

  async deleteOne(id: string, field: string) {
    const deletedItem = await this.findOne(id, field);
    db[field] = await db[field].filter((item) => item.id !== id);

    return deletedItem;
  }
}
