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

    // public async find() {
    //     try {
    //         const allCars = await this.service.find();
    //         return this.res.status(200).json(allCars);
    //     } catch (error) {
    //     this.next(error);
    //     }
    // }

    // public async findById(id) {
    //     const { id } = this.req.params;
    //     try {
    //         const newCar = await this.service.create(car);
    //         return this.res.status(201).json(newCar);
    //     } catch (error) {
    //     this.next(error);
    //     }
    // }

}

export default CarController;