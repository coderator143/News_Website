const express = require('express')
const Articles = require('../models/articles')
const auth = require('../middleware/auth')
const multer = require('multer')
const router = new express.Router()

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    // filename: function(req, file, cb) {
    //   cb(null, new Date().toISOString() + file.originalname);
    // }
  });
  
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype == 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
};
  
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

router.get('/articles/submit', async (req, res) => res.render("submit"))

// router.post('/articles', async (req, res, next) => {
//     console.log(req.body)
//     res.send('done')
// })

// upload articles
//upload.single('article_image')

router.post('/articles/submit', auth, async (req, res, next) => {
    const article = new Articles({
        description : req.body.article,
        article_by : req.user.name,
        owner : req.user._id,
        // images : req.file.path
    })
    try {
        await article.save()
        res.redirect('/users/profile')
    } catch (e) { res.status(500).send(e)}
})

router.get('/articles/me/display',auth, async (req, res) => {
    try{
    await req.user.populate({ path : 'articles' }).execPopulate()
    console.log(req.user.articles); 
    res.send({temp : req.user.articles})
   }
   catch(e){ console.log(e);}
})
     
//read articles of logged in user
router.get('/articles/me', auth, async (req, res) => {
    try { res.render("article_user"); }
     catch (e) { res.status(500).send(e)}
})

router.get('/articles', auth, async (req, res) => { res.render("article_editor")})

//read all articles of every user
router.get('/articles/all', auth, async (req, res) => {
    try {
        const articles = await Articles.find({})
        res.send({article : articles})
    } catch (e) { res.status(500).send(e) }
})

router.get('/articles/proof', auth, async (req, res) => { res.render("article_editor_proof")})

//read all articles proof read by editor
router.get('/articles/proof_temp', auth, async (req, res) => {
    try {
        const articles = await Articles.find({isProofRead : true})
        res.send({article : articles})
    } catch (e) { res.status(500).send(e) }
})

//proof read articles
router.get('/editor/proved/:id', auth, async (req, res) => {    
    try {
        const article = await Articles.findOne({_id : req.params.id})
        if(!article) return res.status(404).send()
        article.isProofRead = true
        await article.save()
        res.redirect('back')
    } catch (e) { res.status(400).send(e)}
})

//unproof read articles
router.get('/editor/unproved/:id', auth, async (req, res) => {    
    try {
        const article = await Articles.findOne({_id : req.params.id})
        if(!article) return res.status(404).send()
        article.isProofRead = false
        await article.save()
        res.redirect('back')
    } catch (e) { res.status(400).send(e)}
})

module.exports = {router}