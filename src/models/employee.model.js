import pool from "../config/db.js";

export const getAllEmployeeByFilterService = async (page, limit) => {  
    try{
        let currentPage = parseInt(page);
        let pageLimit = parseInt(limit);
        const offset = (currentPage - 1) *  pageLimit;

        // Query for paginated data
        const result = await pool.query(
          "SELECT * FROM employees ORDER BY id LIMIT $1 OFFSET $2",
          [pageLimit, offset]
        );

        const totalEmployees = await pool.query("SELECT COUNT(*) FROM employees");
        const totalItems = parseInt(totalEmployees.rows[0].count);
        const totalPages = Math.ceil(totalItems /  pageLimit);
        const pagination = {
            page: currentPage,
            limit: pageLimit,
            totaltems: totalItems,
            totalPages: totalPages,
            employees: result.rows
        };
        return pagination 
     
    } catch (err) {
        console.log("Failed to retrieve all employees", err);
        throw new Error("Failed to retrieve all employees", err);
    }
}

export const getEmployeeBySearchService = async (page, limit, searchKey) => {
    try{
        let currentPage = parseInt(page);        
        let pageLimit = parseInt(limit);
        const offset = (currentPage - 1) * pageLimit;
        const searchValue = `%${String(searchKey).toLowerCase()}%`;

        const result = await pool.query(
          `SELECT * FROM employees WHERE first_name ILIKE $1 OR last_name ILIKE $1 
           ORDER BY id LIMIT $2 OFFSET $3`,
          [searchValue, pageLimit, offset]
        );

        const totalEmployees = await pool.query(
          `SELECT COUNT(*) FROM employees WHERE first_name ILIKE $1 OR last_name ILIKE $1`,
          [searchValue]
        );
        const totalItems = parseInt(totalEmployees.rows[0].count);
        const totalPages = Math.ceil(totalItems / pageLimit);

        return {
            page: currentPage,
            limit: pageLimit,
            totaltems: totalItems,
            totalPages: totalPages,
            employees: result.rows
        }
    } catch (err) {
        console.log("Failed to retrieve employees", err);
        throw new Error("Failed to retrieve employees", err);
    }
}

export const getEmployeeByIdService = async (id) => {
    try{
     
        const result = await pool.query(
          `SELECT * FROM employees WHERE id = $1`,
          [id]
        );

        return result.rows[0]
        
    } catch (err) {
        console.log("Failed to retrieve employee", err);
        throw new Error("Failed to retrieve employee", err);
    }
}



export const createNewEmployeeService = async (data) => {
    try{
        const {
            country,
            accountType,
            userName,
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            photoUrl
        } = data;
        const result = await pool.query(`INSERT INTO employees(country, account_type, username, first_name, last_name, email_address, phone, photo_url) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [
                country,
                accountType,
                userName,
                firstName,
                lastName,
                emailAddress,
                phoneNumber,
                photoUrl,
                // new Date().toISOString,
                // new Date().toIsoString
            ]
        );
        return result.rows[0];
    } catch (err) {
        console.log("Failed to create new employee: ", err);
        throw new Error("Failed to create new  employee: ", err);
    }
}

export const updateEmployeeDetailsService = async (data) => {
    try{
        const {
            country,
            accountType,
            userName,
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            photoUrl, 
            id
        } = data;
    const result = await pool.query(`UPDATE employees SET country = $1, account_type=$2, username=$3, first_name=$4, 
        last_name=$5, email_address=$6, phone=$7, photo_url=$8 WHERE id=$9 RETURNING *`, 
        [
            country,
            accountType,
            userName,
            firstName,
            lastName,
            emailAddress,
            phoneNumber,
            photoUrl,
            id
        ]
    )
        return result.rows[0];
    } catch (err) {
        console.log("Failed to update employee details: : ", err);
        throw new Error("Failed to update employee details: : ", err);
    }
 
}

export const deleteEmployeeService = async (id) => {
    try{
        const result = await pool.query(
        "DELETE FROM employees WHERE id= $1 RETURNING *"
        , [id]);
    return result.rows[0];
    } catch (err) {
        console.log("Failed to delete employee: ", err);
        throw new Error("Failed to delete employee: ", err);
    }
    
}