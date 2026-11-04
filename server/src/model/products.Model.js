import { pool } from "../config/db.js";

export const createProduct = async ({
  name,
  price,
  stock,
  image_url,
  image_public_id,
  catId,
  createdBy,
  status,
  description,
}) => {
  const result = await pool.query(
    `insert into products (name, price, stock,description, image_url, image_public_id, cat_id, created_by, status) values($1, $2, $3, $4, $5, $6, $7, $8, $9) returning *`,
    [
      name,
      price,
      stock,
      description,
      image_url,
      image_public_id,
      catId,
      createdBy,
      status,
    ],
  );
  return result.rows[0];
};

export const getAllProducts = async () => {
  const result = await pool.query("select * from products");
  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT 
        p.*,
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
    FROM 
        products p
    INNER JOIN 
        categories c ON p.cat_id = c.id 
    WHERE 
        p.id = $1; `,
    [id],
  );
  return result.rows[0];
};

export const getProductsByName = async (name, page) => {
  let offset = [page - 1] * 10;
  const result = await pool.query(
    "select * from products ORDER BY created_at DESC where name=$1 limit 10 offset=$2",
    [name, offset],
  );
  return result.rows;
};
export const updateProduct = async (
  id,
  name,
  price,
  stock,
  image,
  description,
  catId,
  updatedBy,
  status,
) => {
  const result = await pool.query(
    `update products set name=$1, price=$2, stock=$3, image=$4, cat_id=$5, updated_by=$6, status=$7, description=$8 where id=$9 returning *`,
    [name, price, stock, image, catId, updatedBy, status, description, id],
  );
  return result.rows[0];
};

export const deleteProductById = async (id) => {
  const result = await pool.query(
    `delete from products where id=$1 returning *`,
    [id],
  );
  return result.rows[0];
};
export const getProductsByCatId = async (id) => {
  const result = await pool.query(
    `
    SELECT 
        p.*, 
        c.id AS category_id,
        c.name AS category_name,
        c.description AS category_description
    FROM 
        products p
    INNER JOIN 
        categories c ON p.cat_id = c.id 
    WHERE 
        p.cat_id = $1;
    `,
    [id],
  );
  return result.rows;
};
