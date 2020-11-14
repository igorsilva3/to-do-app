import { Router } from "express";

import TaskController from "./controllers/TaskController";

const routes = Router();

routes.get('/tasks', TaskController.index);
routes.get('/tasks/:id', TaskController.show);

routes.post('/tasks', TaskController.create);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete);

export default routes;