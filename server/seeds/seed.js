import { pool } from "../src/config/db.js";
import { seedCategories } from "./category.Seeds.js";
import { seedUsers } from "./users.Seeds.js";

const runSeeds = async () => {
    try {
        console.log("starting seeds");
        await seedUsers(pool)
        console.log("users seed");
        await seedCategories(pool)
        console.log("categores seeds");
        console.log("seeds end");
    } catch (error) {
        console.log("error seeds", error);
    } finally {
        await pool.end()
    }
}

runSeeds()