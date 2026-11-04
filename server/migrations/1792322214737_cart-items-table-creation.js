/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable("cart_items",
        {
            id: "id",
            cart_id: {
                type: "integer",
                notNull: true,
                references: "carts(id)",
                onDelete: "CASCADE"
            },
            product_id: {
                type: "integer",
                notNull: true,
                references: "products(id)",
                onDelete: "CASCADE",
            },
            quantity: {
                type: "integer",
                notNull: true,
                default: "1",
                check: "quantity > 0"
            }
        }
    );
    pgm.addConstraint(
        "cart_items",
        "unique_cart_product", {
        unique: ["cart_id", "product_id"]
        // now allowed the product inside the cart not the table
    }
    )
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("cart_items")
};
