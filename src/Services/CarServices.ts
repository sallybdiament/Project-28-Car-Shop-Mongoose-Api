import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';
import ErrorResponse from '../Middleware/ErrorResponse';

const messCarNotFound = 'Car not found';

class CarServices {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async find() {
    const carODM = new CarODM();
    const cars = await carODM.find();
    const carArray = cars.map((car) => this.createCarDomain(car));
    return carArray;
  }

  public async findById(id: string) {
    const carODM = new CarODM();
    const cars = await carODM.findById(id);
    if (!cars) throw new Error('Car not found');
    if (cars.length === 0) throw new ErrorResponse(404, messCarNotFound);
    const carArray = cars.map((car) => this.createCarDomain(car));
    return carArray[0];
  }

  public async update(id: string, car: ICar) {
    const carODM = new CarODM();
    const updatedCar = await carODM.update(id, car);
    if (!updatedCar) throw new ErrorResponse(404, messCarNotFound);
    return this.createCarDomain(updatedCar);
  }

  public async delete(id: string) {
    const carODM = new CarODM();
    const cars = await carODM.findById(id);
    if (!cars) throw new Error('Car not found');
    if (cars.length === 0) throw new ErrorResponse(404, messCarNotFound);
    return carODM.delete(id);
  }
}

export default CarServices;