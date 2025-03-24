const db = require('../config/db');

class User {
    static async createUser(name, email, hashedPassword) {
        const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        return db.execute(query, [name, email, hashedPassword]);
    }

    static async findByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        const [rows] = await db.execute(query, [email]);
        return rows[0];
    }
}

module.exports = User;
