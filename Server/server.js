const express = require ("express")
const bodyParser = require ('body-parser')
const usersRoutes = require('./routes/users.routes')
const travelsRoutes = require('./routes/travels.routes')
const cookieParser = require('cookie-parser')
require('dotenv').config({path: './config/.env'})
require('./config/db')
const {checkUser, requireAuth} = require('./middleware/auth.middleware')
const cors = require ("cors")
const app = express();

app.use(cors({origin: process.env.CLIENT_URL}))

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(cors(corsOptions))

app.use(bodyParser.json())
app.use (bodyParser.urlencoded({extended:true}))
app.use(cookieParser())

//jwt
app.get('*', checkUser)
app.get('/jwtid', requireAuth, (req,res) => {
    res.status(200).send(res.locals.user._id)
})

//routes
app.use('/api/users', usersRoutes)
app.use('/api/travels', travelsRoutes)

//serveur

app.listen(process.env.PORT, () => {
    console.log(`,tout va bien, on se cale sur le port ${process.env.PORT}`)
})