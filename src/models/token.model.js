import pool from "../config/db.js"

export const createRefreshToken = async (token) => {
    try{
        const result = await pool.query("INSERT INTO refresh_token (token) VALUES ($1) RETURNING *", [token]);
        return result.rows[0];
    } catch (error){
        console.error("Failed to store the refresh Token", error);
        throw new Error("Failed to store the refresh Token", error);
    }
} 

export const getRefreshToken = async (token) => {
    try{
        const result = await pool.query("SELECT * FROM refresh_token WHERE token=$1 RETURNING *", [token]);
        return result.rows[0];
    } catch (error){
        console.error("Failed to retrieve the refresh Token", error);
        throw new Error("Failed to retrieve the refresh Token", error);
    }
}
export const deleteRefreshToken = async (token) => {
    try{
        const result = await pool.query("DELETE FROM refresh_token WHERE token=$1 RETURNING *", [token]);
        return result.rows[0];
    } catch (error){
        console.error("Failed to delete the refresh Token", error);
        throw new Error("Failed to delete the refresh Token", error);
    }
}