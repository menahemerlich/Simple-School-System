import express from 'express'
import { connection } from './db.js'
import { studentRouter } from './studentRouter.js'

const app = express()
app.use(express.json())
app.use("/students", studentRouter)

await connection.query("CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT, name VARCHAR(100) , age INT , class_name VARCHAR(20) , PRIMARY KEY(id) )")
console.log("mysql connected");


app.listen(3001, () => {
    console.log(`Server running on http:localhost:3001`);
});