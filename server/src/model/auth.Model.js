import { pool } from "../config/db.js"
// sql injection 
export const createUser = async ({ fname, lname, email, hashed_password, role, avatar, status }) => {
    const result = await pool.query(`insert into users (fname, lname, email, hashed_password, role, avatar, status)
        values($1, $2, $3, $4, $5, $6, $7) returning *
        `, [fname, lname, email, hashed_password, role, avatar, status])
    return result.rows[0]
    // last row
}
export const findUserByEmail = async (email) => {
    const result = await pool.query(`select * from users where email = $1`, [email])
    return result.rows
}
// debugging 