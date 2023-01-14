import { Router } from 'express';
import CarController from '../Controllers/CarControllers';
import MotorcycleController from '../Controllers/MotorcycleControllers';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

routes.get(
  '/cars',
  (req, res, next) => new CarController(req, res, next).find(),
);

routes.get(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).findById(),
);

routes.put(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).update(),
);

routes.delete(
  '/cars/:id',
  (req, res, next) => new CarController(req, res, next).delete(),
);

routes.post(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).create(),
);

routes.get(
  '/motorcycles',
  (req, res, next) => new MotorcycleController(req, res, next).find(),
);

const motorcycleById = '/motorcycles/:id';

routes.get(
  motorcycleById,
  (req, res, next) => new MotorcycleController(req, res, next).findById(),
);

routes.put(
  motorcycleById,
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

routes.delete(
  motorcycleById,
  (req, res, next) => new MotorcycleController(req, res, next).delete(),
);

export default routes;