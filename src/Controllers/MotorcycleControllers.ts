import { NextFunction, Request, Response } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleServices from '../Services/MotorcycleServices';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleServices;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleServices();
  }

  public async create() {
    const Motorcycle: IMotorcycle = {
      ...this.req.body,
    };
    try {
      const newMotorcycle = await this.service.create(Motorcycle);
      return this.res.status(201).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async find() {
    try {
      const allMotorcycles = await this.service.find();
      return this.res.status(200).json(allMotorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    const { id } = this.req.params;
    try {
      const newMotorcycle = await this.service.findById(id);
      return this.res.status(200).json(newMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }

  public async update() {
    const { id } = this.req.params;
    const Motorcycle: IMotorcycle = { ...this.req.body };
  
    try {
      const updatedMotorcycle = await this.service.update(id, Motorcycle);
      return this.res.status(200).json(updatedMotorcycle);
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;