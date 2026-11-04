import { pool } from "../config/db.js";
export const createCart = async (userId) => {
    const result = await pool.query(
        `
        insert into carts (user_id) values($1) on conflict (user_id)
        do update set user_id=excluded.user_id returning *
        `,
        [userId],
    );
    return result.rows[0];
}; //run for once
export const getCartbyUserId = async (userId) => {
    const result = await pool.query(
        `
        select 
        c.id as cart_id, 
        ci.id as item_id, 
        p.id as product_id, 
        p.name, p.price, p.description,  p.cat_id, p.stock,
        ci.quantity, 
        p.price * ci.quantity as total
        from carts c
        left join cart_items ci ON ci.cart_id = c.id
        left join products p ON p.id=ci.product_id
        where c.user_id = $1
        `,
        [userId],
    );
    return result.rows;
};
// add and increase
export const addCartItem = async (cartId, productId, quantity, stock) => {
    const result = await pool.query(
        `
    insert into cart_items (cart_id, product_id, quantity)values($1, $2, $3)
    on conflict (cart_id, product_id) 
    do update set quantity = cart_items.quantity + excluded.quantity
    where cart_items.quantity + excluded.quantity <= $4
    returning *
    `,
        [cartId, productId, quantity, stock],
    );
    return result.rows[0];
};
//increase 
export const increaseQuantity = async (cartId, productId) => {
    const result = await pool.query(`
    update cart_items as ci set quantity= ci.quantity+1
    from products as p
    where ci.cart_id=$1
    and ci.product_id=$2
    and p.id=ci.product_id
    and ci.quantity < p.stock
    returning *
    `, [cartId, productId]);

    return result.rows[0]
};

// decrease
export const decreaseQuantity = async (cartId, productId) => {
    const result = await pool.query(`
    update cart_items set quantity= quantity-1 where cart_id = $1
    and product_id = $2
    and quantity > 1
    returning *
    `, [cartId, productId]);
    if (result.rows.length > 0) {
        return result.rows[0]
    }
    const deleted = await pool.query(`
        delete from cart_items
        where cart_id = $1 and product_id=$2
        and quantity=1
        returning *
        `)
    return deleted.rows[0]
};
