const express = require('express')
const app = express()
const { authentication } = require('./middleware/auth')
const { generateToken } = require("./utils/jwt")
const PORT = 8000
const teachers = require('./data/teachers.json')
const data = require('./data/user.json')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/teachers", authentication, (req, res) => {
    res.send(teachers)
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body
    const user = await data.find(user => user.username === username && user.password === password)
    try {
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        //generate token
        const token = generateToken({
            id: data.id,
            email: data.email,
            username: data.username
        })

        res.status(200).json({
            token
        })
    } catch (error) {

        res.status(500).json({ message: error.message })
    }

})
app.listen(PORT, () => {
    console.log("Server Running on Port: " + PORT)
})
