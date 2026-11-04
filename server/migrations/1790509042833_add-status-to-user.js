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
    pgm.addColumn("users",
        {
            status: {
                type: 'text',
                notNull: true,
                default: 'pending',
            }
        }
    )
    pgm.addConstraint("users", "status_value", {
        check: "status = ANY(ARRAY['pending', 'approved', 'rejected']) "
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropColumn("users", "status")
    pgm.dropConstraint("users", "status_value")
};
