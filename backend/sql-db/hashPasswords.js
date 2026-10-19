require("dotenv").config();
const db = require("./db");
const bcrypt = require("bcryptjs");

async function migrate() {
    const [users] = await db.query("SELECT u_id, u_pass FROM users");
    let count = 0;
    for (const user of users) {
        if (!user.u_pass || user.u_pass.startsWith("$2")) continue;
        const hashed = await bcrypt.hash(user.u_pass, 10);
        await db.query("UPDATE users SET u_pass=? WHERE u_id=?", [hashed, user.u_id]);
        count++;
    }

    console.log(count + " kullanıcının şifresi hash'lendi");
    process.exit();
}

migrate();