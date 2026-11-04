// import pool from "../src/config/db.js"
import bcrypt from "bcrypt"
export const seedUsers = async (pool) => {
    try {
        const hashed_password = await bcrypt.hash("Test123", 10)
        await pool.query(`
            insert into users (fname, lname, email, hashed_password, role, avatar, status)
            values
            ($1, $2, $3, $4, $5, $6, $7)
            on conflict (email) do nothing;
            `,
            ["admin", "system", "admin@admin.com", hashed_password, "admin", "www.gogle.com", "approved"])

        console.log('users seed sicessfully');
    } catch (error) {
        console.error("seeds failed", error);
    }
}

