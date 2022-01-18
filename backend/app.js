const express = require('express')
const cors = require('cors')
require('dotenv').config()
const db = require('./database/db')
const userRouter = require('./routers/userRouter')
const petRouter = require('./routers/petRouter')

const app = express()
const port = process.env.PORT || 3000


app.use(cors({ credentials: true, origin: `http://localhost:${port}` }))

app.use(express.static('public'))
app.use(express.json())


app.use('/pet', petRouter)
app.use('/', userRouter)


app.listen(port, () => {
  console.log(`\nRunning in http://localhost:${port}\n`)
})