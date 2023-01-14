import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleServices {
  private createCarDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createCarDomain(newMotorcycle);
  }

  public async find() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.find();
    const motosArray = motorcycles.map((motorcycle) => this.createCarDomain(motorcycle));
    return motosArray;
  }

  public async findById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motos = await motorcycleODM.findById(id);
    if (!motos) throw new Error('Car not found');
    const motosArr = motos.map((motorcycle) => this.createCarDomain(motorcycle));
    return motosArr[0];
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const updatedMoto = await motorcycleODM.update(id, motorcycle);
    if (!updatedMoto) throw new Error('Car not found');
    return this.createCarDomain(updatedMoto);
  }

  public async delete(id: string) {
    const carODM = new MotorcycleODM();
    return carODM.delete(id);
  }
}

export default MotorcycleServices;