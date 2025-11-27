import {Router} from 'express';
import { createNewEmployee, deleteEmployee, filterEmployeeByLimit, searchEmployeeByName, updateEmployeeDetails } from '../controllers/employee.controller.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const employeeRouter = Router();

employeeRouter.get("/employee", authMiddleware, filterEmployeeByLimit);
employeeRouter.get("/employee/search", authMiddleware, searchEmployeeByName);
employeeRouter.post("/employee/create", authMiddleware, createNewEmployee);
employeeRouter.put("/employee/update", authMiddleware, updateEmployeeDetails);
employeeRouter.delete("/employee/delete/:id", authMiddleware, deleteEmployee);