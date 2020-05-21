const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail} = require('../emails/account')
const router = new express.Router()
const cookieParser = require('cookie-parser')

router.use(cookieParser())

router.get('/homepage', async (req, res) => res.render("page1_logged_out"))

// Create Editors
router.post('/users/editor', async (req, res) => {
    const user = new User(req.body)
    user.isEditor = true
    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/users/register', async (req, res) => res.render("register"))

//Register users
router.post('/users/register', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        //sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.cookie('auth', token)
        //res.status(201).send({ user, token })
        res.redirect('/users/me')
    } catch (e) {
        //res.status(400).send(e)
        console.log('register error')
        res.redirect('/users/register')
    }
})

router.get("/users/login", async (req,res)=> res.render("login"))

//Login users
router.post('/users/login', async (req, res) => {
    try {
        
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.cookie('auth', token)       
        // res.send(`Hello ${user.name}`)
        // res.send({ user, token })
        res.redirect("/users/me")        
    } catch (e) {
        res.redirect('/users/login')
    }
})

// Logout users
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.redirect("/homepage")
    } catch (e) {
        res.redirect('/homepage')
    }
})

//read profile on users in homepage
router.get('/users/me', auth, async (req, res) => {
    res.render("page1_logged_in"/*, { name : req.user.name,}*/)
})

//read profile on users in profile page
router.get('/users/profile', auth, async (req, res) => {
    if(req.user.isEditor) {
        res.render("editor_profile", {
            name : req.user.name,
            email : req.user.email
        })
    }
    else {
        res.render("profile", { 
            name : req.user.name,
            email : req.user.email
        })
    }
})

module.exports = router