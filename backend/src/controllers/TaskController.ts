import { Request, Response } from "express";
import { getRepository } from "typeorm";
import * as Yup from "yup";

import Task from "../models/Task";
import taskView from "../views/task_view";

export default {
  async index(request: Request, response: Response) {
    const tasksRepository = getRepository(Task);

    const tasks = await tasksRepository.find();

    return response.status(200).json(taskView.renderMany(tasks));
  },
  
  async show(request: Request, response: Response){
    const { id } = request.params;

    const tasksRepository = getRepository(Task);

    const task = await tasksRepository.findOneOrFail(id);

    return response.status(200).json(taskView.render(task));
  },

  async create(request: Request, response: Response){
    const { 
      name,
      isComplete
    } = request.body;

    const tasksRepository = getRepository(Task);

    const data = {
      name,
      isComplete
    };

    const schema = Yup.object().shape({
      name: Yup.string(),
      isComplete: Yup.boolean()
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    // Creates the task
    const task = tasksRepository.create(data);

    // Save the task in the database
    await tasksRepository.save(task);

    return response.status(201).json(task);
  },

  async update(request: Request, response: Response){
    const { id } = request.params;

    const { 
      name,
      isComplete
    } = request.body;

    const tasksRepository = getRepository(Task);

    const data = {
      name,
      isComplete
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      isComplete: Yup.boolean().required()
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    // Update the task in database
    const task = await tasksRepository.save({
      id: Number(id),
      name: data.name,
      isComplete: data.isComplete
    });

    return response.status(201).json(taskView.render(task));
  },

  async delete(request: Request, response: Response){
    const { id } = request.params;

    const tasksRepository = getRepository(Task);
    
    // Delete the task in the database
    await tasksRepository.delete(id);

    return response.status(200).json({ message: "Task successfully deleted" });
  }
};