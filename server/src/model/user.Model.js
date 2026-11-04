import { pool } from "../config/db.js";
export const getAllUsers = async () => {
    const result = await pool.query(`
    SELECT id, fname, lname, email, role, created_at, avatar, updated_at, status
	FROM users  
    `);
    return result.rows;
};
export const getUserById = async (id) => {
    const result = await pool.query(
        `select id, fname, lname, email, role, created_at, avatar, updated_at ,status from users where id = $1`,
        [id],
    );
    return result.rows[0];
};
export const deletUserById = async (id) => {
    const result = await pool.query(
        `delete from users where id = $1 returning *`,
        [id],
    );
    return result.rows[0];
};
export const updateUser = async ({
    id,
    fname,
    lname,
    email,
    avatar
}) => {
    const result = await pool.query(
        `
        UPDATE users
        SET
            fname = COALESCE($1, fname),
            lname = COALESCE($2, lname),
            email = COALESCE($3, email),
            avatar = COALESCE($4, avatar),
            updated_at = NOW()
        WHERE id = $5
        RETURNING *
        `,
        [fname ?? null, lname ?? null, email ?? null, avatar ?? null, id],
    );
    return result.rows[0];
};
export const updateUserStatus = async (id, newStatus) => {
    const result = await pool.query(
        `update users set status=$1 where id=$2 returning *`,
        [newStatus, id],
    );
    return result.rows[0];
};
