import express from 'express'
import mysql from 'mysql2/promise'

export const studentRouter = express.Router()

const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "1234",
    database: "school_db",
    port: 3306
})

studentRouter.post("/", async (req, res) => {
    const {name, age, class_name} = req.body
    if (name && age && class_name && typeof age === "number"){
        await connection.query("INSERT INTO students (name, age, class_name) VALUES (?, ?, ?)", [name, age, class_name] )
        res.status(200).json({sb: "insert", message: "Added successfully"})
    } else {
        res.status(400).json({db: "error", message: "missing fields"})
    }
})

// studentRouter.get("/", async (req, res) => {
//     const students = await connection.query("SELECT * FROM students")   
//     let count = 0
//     for (const student of students) {
//         count += 1
//     }
//     res.status(200).json({
//         count: count,
//         students: students[0]
//     })
// })

studentRouter.get("/:id", async (req, res) => {
    const {id} =  req.params
    const data = await connection.query("SELECT * FROM students WHERE id = ?", [id]) 
    const students = data[0]  
    if (students.length > 0){
        return res.status(200).send(students)
    }
    return res.status(404).send(`student ${id} not found.`)
})

studentRouter.put("/:id", async (req, res) => {
    const {name, age, class_name} = req.body
    const {id} =  req.params
    const data = await connection.query("SELECT * FROM students WHERE id = ?", [id])
    const students = data[0] 
    if (students.length > 0){
        if (name && age && class_name && typeof age === "number"){
            await connection.query("UPDATE students SET name = ?, age = ?, class_name = ? WHERE id = ? ", [name, age, class_name, id] )
            res.status(200).json({sb: "insert", message: "update successfully"})
        } else {
            res.status(400).json({db: "error", message: "missing fields"})
        }
    }
    return res.status(404).send(`student ${id} not found.`)
})

studentRouter.delete("/:id", async (req, res) => {
    const {id} =  req.params
    const data = await connection.query("SELECT * FROM students WHERE id = ?", [id])
    const students = data[0]  
    if (students.length > 0){
        await connection.query("DELETE FROM students WHERE id = ?", [id])
        res.status(200).send("student deleted.")
    }
    return res.status(404).send(`student ${id} not found.`)
})

studentRouter.get("/", async (req, res) => {
    const {class_name} =  req.query
    if (class_name){
        const data = await connection.query("SELECT * FROM students WHERE class_name = ?", [class_name]) 
        const students = data[0]  
        if (students.length > 0){
            return res.status(200).send(students)
        }
        return res.status(404).send(`student not found.`)
    }
    const data = await connection.query("SELECT * FROM students")   
    const students = data[0] 
    let count = 0
    for (const student of students) {
        count += 1
    }
    res.status(200).json({
        count: count,
        students: students
    })
})