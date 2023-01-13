import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;
    
  constructor(
    car: ICar,
  ) {
    super({ 
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      buyValue: car.buyValue,
      status: car.status || false,
    });
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}

export default Car;