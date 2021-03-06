const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const bodyParser = require('body-parser')
require('dotenv').config();
const AppRouter = require('./routes/AppRouter')
const app = express()

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(logger('dev'))
app.use(bodyParser.json())

// app.use('/auth', AuthRouter)
// app.use('/posts', PostRouter)
app.use('/app', AppRouter)

app.listen(PORT, () => console.log(`Server Running On Port: ${PORT}`))