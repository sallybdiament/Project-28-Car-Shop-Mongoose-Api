import { Router } from 'express';
import CarController from '../Controllers/CarControllers';

const routes = Router();

routes.post(
  '/cars',
  (req, res, next) => new CarController(req, res, next).create(),
);

// routes.get(
//   '/cars',
//   (req, res, next) => new CarController(req, res, next).find(),
// );

// routes.get(
//   '/cars/:id',
//   (req, res, next) => new CarController(req, res, next).findById(),
// );

// routes.patch(
//   '/transfer/:id',
//   (req, res, next) => new TransferController(req, res, next).reversalRequest(),
// );

export default routes;