import "dotenv/config"
import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    user: process.env.DB_USER,     
    host: process.env.DB_HOST,     
    database: process.env.DATABASE,     
    password: process.env.DB_PASSWORD,    
    port: process.env.DB_PORT        
});

pool.connect()
  .then(() => console.log("Database connected successfully!"))
  .catch(err => console.error("Database connection failed:", err));

export default pool;