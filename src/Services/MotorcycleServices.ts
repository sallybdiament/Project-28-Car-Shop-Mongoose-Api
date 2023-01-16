import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import ErrorResponse from '../Middleware/ErrorResponse';

const motoNotFound = 'Motorcycle not found';

class MotorcycleServices {
  private createCarDomain(motorcycle: IMotorcycle): Motorcycle {
  // private createCarDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    // if (motorcycle) {
    return new Motorcycle(motorcycle);
    // }
    // return null;
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
    if (!motos) throw new Error('Motorcycle not found');
    if (motos.length === 0) throw new ErrorResponse(404, motoNotFound);
    const motosArr = motos.map((motorcycle) => this.createCarDomain(motorcycle));
    return motosArr[0];
  }

  public async update(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const updatedMoto = await motorcycleODM.update(id, motorcycle);
    if (!updatedMoto) throw new ErrorResponse(404, motoNotFound);
    return this.createCarDomain(updatedMoto);
  }

  public async delete(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motos = await motorcycleODM.findById(id);
    if (!motos) throw new Error(motoNotFound);
    // if (motos.length === 0) throw new ErrorResponse(404, motoNotFound);
    return motorcycleODM.delete(id);
  }
}

export default MotorcycleServices;