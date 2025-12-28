import mysql from 'mysql2/promise'

export const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "school_db",
    port: 3306
})