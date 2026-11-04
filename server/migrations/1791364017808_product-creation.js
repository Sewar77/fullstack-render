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
    pgm.createTable("products", {
        id: "id",
        name: {
            type: "varchar(200)",
            notNull: true,
        },
        price: {
            type: "numeric(10, 2)",
            notNull: true
        },
        stock: {
            type: "numeric(10, 2)",
            notNull: true
        },
        image: {
            type: "varchar(255)",

        },
        cat_id: {
            type: "integer",
            notNull: true,
            references: "categories",
            onDelete: "CASCADE"
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func('CURRENT_TIMESTAMP')
        },
        created_by: {
            type: "integer",
            notNull: true,
            references: "users",
            onDelete: "CASCADE"
        },
        updated_by: {
            type: "integer",
            references: "users",
            onDelete: "CASCADE"
        },
        status: {
            type: "varchar(20)",
            notNull: true,
            default: "pending",
            check: "status IN ('pending', 'approved', 'rejected')"
        },
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable("products")
};
