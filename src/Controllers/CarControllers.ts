import { NextFunction, Request, Response } from 'express';
import ICar from '../Interfaces/ICar';
import CarServices from '../Services/CarServices';

class CarController {
    private req: Request;
    private res: Response;
    private next: NextFunction;
    private service: CarServices;

    constructor(req: Request, res: Response, next: NextFunction) {
        this.req = req;
        this.res = res;
        this.next = next;
        this.service = new CarServices();
      }

    public async create() {
        const car: ICar = {
            ...this.req.body,
        }
        try {
            const newCar = await this.service.create(car);
            return this.res.status(201).json(newCar);
        } catch (error) {
        this.next(error);
        }
    }
}

export default CarController;