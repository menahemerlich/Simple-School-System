import express from 'express'
import mysql from 'mysql2/promise'
import { studentRouter } from './studentRouter.js'

const app = express()
app.use(express.json())
app.use("/students", studentRouter)

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "school_db",
    port: 3306
})

await connection.query("CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT, name VARCHAR(100) , age INT , class_name VARCHAR(20) , PRIMARY KEY(id) )")
console.log("mysql connected");


app.listen(3001, () => {
    console.log(`Server running on http:localhost:3001`);
});