import express from 'express';
import { TaskController } from '../controllers/tasks.controller.js';


function TasksRoutes(){



const Router = express.Router();


Router.post('/createtask', TaskController.createTask);
Router.delete('/deletetask/:id', TaskController.deleteTask);
Router.patch('/markascompleted/:id', TaskController.markAsCompleted);
Router.get('/getlist', TaskController.getList);




return Router;
};



export default  TasksRoutes;