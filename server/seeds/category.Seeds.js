
export const seedCategories = async (pool) => {
    try {
        await pool.query(`
            insert into categories (name, description, created_by)
            values
            ('Books', 'evey book you want', 1),
            ('elctronics', 'evey book you want', 1),
            ('food', 'evey book you want', 1),
            ('clothes', 'evey book you want', 1),
            ('homes', 'evey book you want', 1),
            ('pets', 'evey book you want', 1),
            ('kids', 'evey book you want', 1),
            ('women', 'evey book you want', 1),
            ('men', 'evey book you want', 1),
            ('makeup', 'evey book you want', 1),
            ('cars', 'evey book you want', 1)
            on conflict (name) do nothing;
            `)

        console.log('categories seed sicessfully');


    } catch (error) {
        console.error("seeds failed", error);
    }
}


