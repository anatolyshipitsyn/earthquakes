import { AppDataSource } from '@/database/data-source';
import { Earthquake } from '@/database/entity/EarthquakeEntity';

export type EarthquakeData = Partial<Earthquake>;

const EARTHQUAKE_NOT_FOUND_ERROR = (id: number) =>
  `Earthquake with ID ${id} not found`;

export class EarthquakeRepository {
  private repository = AppDataSource.getRepository(Earthquake);

  // Fetch all earthquake records
  findAll = () => this.repository.find();

  // Fetch a single earthquake by ID
  findById = (id: number) => this.repository.findOneBy({ id });

  // Create a new earthquake record
  async create(data: EarthquakeData) {
    const earthquake = this.repository.create(data);

    return this.repository.save(earthquake);
  }

  // Update an existing earthquake record
  async update(id: number, data: EarthquakeData) {
    const earthquake = await this.findByIdOrThrow(id);

    Object.assign(earthquake, data);

    return this.repository.save(earthquake);
  }

  async delete(id: number) {
    await this.findByIdOrThrow(id);

    return this.repository.delete(id);
  }

  private async findByIdOrThrow(id: number) {
    const earthquake = await this.findById(id);

    if (!earthquake) {
      throw new Error(EARTHQUAKE_NOT_FOUND_ERROR(id));
    }

    return earthquake;
  }
}
