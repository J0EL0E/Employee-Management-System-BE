import { createNewEmployeeService, deleteEmployeeService, getEmployeeBySearchService, getAllEmployeeByFilterService, updateEmployeeDetailsService, getEmployeeByIdService } from "../models/employee.model.js";

export const createNewEmployee = async(req, res, next) => {
    try {
        const {
            photoUrl
        } = req.body

        const requestBody = req.body
        const isValidated = Object.keys(requestBody).some((input) => 
            requestBody[input] !== ""  && input !== photoUrl 
        );

        if(!isValidated) return res.status(400).json({
            status: 400,
            message: `Some inputs are empty.`
        })

        const newEmployeeEntry = await createNewEmployeeService(requestBody);
        if(!newEmployeeEntry) return res.status(400).json({
            status: 400,
            message: "Failed to create new employee"
        });

        res.status(201).json({
            status: 201,
            message: "Employee data is created successfully",
            data: newEmployeeEntry
        });

    } catch(err) {
        console.log("Unable to create new employee: ", err);
        next(err)
    }
};

export const filterEmployeeByLimit = async (req, res, next) => {
    try{
        const {page, limit} = req.query
        if(!page || !limit) return res.status(400).json({
            status: 400,
            message: "Page and limit is required"
        });

        const filteredEmployees = await getAllEmployeeByFilterService(page, limit);
        const {employees} = filteredEmployees;

        if(employees.length > 0) {
            res.status(200).json({
                status: 200,
                message: `Filtered Employees by the limit of ${limit} per page.`,
                employees: filteredEmployees
            })
        } else {
             res.status(400).json({
                status: 400,
                message: `There is no employee.`,
                employees: filteredEmployees
            })
        }

    } catch (error) {
        console.error(`Failed to filter the employees: `, error);
        next(error);
    }
}

export const searchEmployeeByName = async (req, res, next) => {
    try{
        const {page, limit, searchKey} = req.query; 
        if(!page || !limit || !searchKey) return res.status(400).json({
            status: 400,
            message: "Page, limit and search keyword is required"
        });

        const searchResults = await getEmployeeBySearchService(page, limit, searchKey);
        const {employees} = searchResults;
        console.log(searchResults)
        if(employees.length > 0) {
            res.status(200).json({
                status: 200,
                message: `Employees results by the limit of ${limit} per page.`,
                employees: employees
            })
        } else {
             res.status(400).json({
                status: 400,
                message: `There is no employee.`,
                employees: employees
            })
        }

    } catch (error) {
        console.error(`Failed to retrieve result the employees`, error);
        next(error);
    }
}

export const getEmployeeById = async (req, res, next) => {
     try {
        const {id} = req.query

        if(!id) return res.status(400).json({
            status: 400,
            message: `Id is required`
        });

        const retrievedEmployee = await getEmployeeByIdService(id);
        if(!retrievedEmployee) return res.status(400).json({
            status: 400,
            message: "Failed to retrieved the employee."
        });

        res.status(200).json({
            status: 200,
            message: "Employee data is updated successfully.",
            employee: retrievedEmployee
        });

    } catch(err) {
        console.log("Unable to retieved the employee: ", err);
        next(err)
    }
}

export const updateEmployeeDetails = async (req, res, next) => {
     try {
        const data = req.body
        const isValidated = Object.keys(data).some((input) => 
            data[input] !== ""  && input !== data["photoUrl"] 
        );

        if(!isValidated) return res.status(400).json({
            status: 400,
            message: `Some inputs are empty.`
        });

        const updateEmployeeEntry = await updateEmployeeDetailsService(data);
        if(!updateEmployeeEntry) return res.status(400).json({
            status: 400,
            message: "Failed to update employee."
        });

        res.status(200).json({
            status: 200,
            message: "Employee data is updated successfully.",
            data: updateEmployeeEntry
        });

    } catch(err) {
        console.log("Unable to update employee details: ", err);
        next(err)
    }
}

export const deleteEmployee = async (req, res, next) => {
     try {
        const {id} = req.params

        if(!id) return res.status(400).json({
            status: 400,
            message: `Id is required`
        });

        const employeeToDelete = await deleteEmployeeService(id);
        if(!employeeToDelete) return res.status(400).json({
            status: 400,
            message: "Failed to delete employee."
        });

        res.status(200).json({
            status: 200,
            message: "Employee data is deleted successfully.",
        });

    } catch(err) {
        console.log("Unable to delete employee: ", err);
        next(err)
    }
}