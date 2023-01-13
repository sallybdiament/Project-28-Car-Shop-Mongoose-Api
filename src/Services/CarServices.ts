import Car from "../Domains/Car";
import ICar from "../Interfaces/ICar";
import CarODM from "../Models/CarODM";

class CarServices {
    private createCarDomain(car: ICar | null): Car | null {
        if(car) {
            return new Car(
                car.id,
                car.model,
                car.year,
                car.color,
                car.status,
                car.buyValue,
                car.doorsQty,
                car.seatsQty,
            );
        }
        return null;
    }

    public async create(car: ICar) {
        const carODM = new CarODM();
        const newCar = await carODM.create(car);
        return this.createCarDomain(newCar);
    }
}

export default CarServices;