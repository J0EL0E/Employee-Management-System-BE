import pool from "../config/db.js";

export const getAllUsersService = async () => {
    try{
        const result = await pool.query("SELECT * FROM users");
        return result.rows;
    } catch (err) {
        console.log("Failed to get all users: ", err);
        throw new Error("Failed to get all users: ", err);   
    }
}

export const getUserByEmailService = async (email) => {
    try{
        const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        return result.rows[0];
    } catch (err) {
    console.log("Failed to get user by email:",  err);
    throw new Error("Failed to get user by email:",  err);   
    }
}

export const createUserService = async (email, password) => {
    try{
        console.log(email, password)
        const result = await pool.query("INSERT INTO users( email, password ) VALUES ($1, $2) RETURNING *",
            [email, password]
        );
        return result.rows[0];

    } catch (err) {
    console.log("Failed To create new user: ",err);
    throw new Error("Failed To create new user: ",err);
    }
}

export const updatePasswordService = async (newPassword, email) => {
    try{
        const result = await pool.query("UPDATE users SET password = $1 WHERE email=$2 RETURNING *", [newPassword, email])
        return result.rows[0];
    } catch (err) {
    console.log("Failed to update user details: ", err);
    throw new Error("Failed to update user details: ", err);  
    }
}

export const deleteUserService = async (id) => {
    try{
        const result = await  pool.query(
            "DELETE FROM users WHERE id= $1 RETURNING *"
        , [id]);
        return result.rows[0];
    } catch (err) {
    console.log("Failed to delete user: ", err);
    throw new Error("Failed to delete user: ", err);
    }
}