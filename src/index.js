const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user_router')
const {router} = require('./routers/articles_router')
const hbs= require("hbs")

const app = express()
app.set("view engine","hbs")
const port = process.env.PORT || 4000
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(userRouter)
app.use(express.static('uploads'))
app.use(router)
const path = require("path")
const publicDir= path.join(__dirname,"../")
const cookieParser = require('cookie-parser')

app.use(cookieParser())
app.use(express.static(publicDir))
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

 
// app.get('/articles/submit',(req,res) =>{

//     console.log(req.query.text);

//     res.render('submit');
// });