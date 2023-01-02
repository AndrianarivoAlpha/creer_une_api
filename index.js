const express = require('express')
const app = express()
require('./models/mongoBdConfig')
const PostsRoutes = require('./routes/postsController')
const bodyParser = require('body-parser')

const mongoose =  require('mongoose')
const cors = require('cors');

mongoose.set('strictQuery', true)

app.use(cors({origin: "https://cpn.io"})) //use cors() to make api public and set origin for specified url
app.use(bodyParser.json())
app.use('/posts', PostsRoutes)

app.listen(5500, () => console.log(">> App start on PORT: 5500"))