import {
  isValidObjectId,
  Model,
  models,
  Schema,
  UpdateQuery,
  model,
} from 'mongoose';
    
const messageInvalidMongoId = 'Invalid mongo id';
abstract class AbstractODM<T> {
  protected model: Model<T>;
  protected schema: Schema;
  protected modelName: string;
    
  constructor(schema: Schema, modelName: string) {
    this.schema = schema;
    this.modelName = modelName;
    this.model = models[this.modelName] || model(this.modelName, this.schema);
  }
    
  public async create(obj: T): Promise<T> {
    return this.model.create({ ...obj });
  }

  public async find(): Promise<T[]> {
    return this.model.find();
  }
    
  public async findById(_id: string): Promise<T[] | null> {
    const regex = /^[0-9a-fA-F]{24}$/;
    const check = regex.test(_id);
    if (!check) throw Error(messageInvalidMongoId);
    // if (!isValidObjectId(_id)) throw Error('Car not found');
    const vehicleFound = await this.model.find({ _id });
    if (vehicleFound.length === 0) throw Error('Car not found');
    return vehicleFound;
  }

  public async update(_id: string, obj: Partial<T>): Promise<T | null> {
    const regex = /^[0-9a-fA-F]{24}$/;
    const check = regex.test(_id);
    if (!check) throw Error(messageInvalidMongoId);
    // if (!isValidObjectId(_id)) throw Error('Car not found');
    const updated = this.model.findByIdAndUpdate(
      { _id },
      { ...obj } as UpdateQuery<T>,
      { new: true },
    );
    if (!updated) throw Error('Car not found');
    return updated;
  }

  public async delete(_id: string) {
    if (!isValidObjectId(_id)) throw Error('Invalid Mongo id');
    return this.model.deleteOne({ _id });
  }
}
    
export default AbstractODM;