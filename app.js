const express = require('express');
const app = express();
const port = 6969;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let blogs = []

app.get('/',(req,res)=>{
    res.render('index.ejs',{blogs});
})

app.get('/new',(req,res)=>{
    res.render('new.ejs');
})

app.post('/new',(req,res)=>{
    const { title, content } = req.body;
    blogs.push({id:blogs.length+1,title,content});
    res.redirect('/');
})

app.get('/edit/:id',(req,res)=>{
    const postId = blogs.find(p => p.id === parseInt(req.params.id));
    res.render('edit.ejs',{postId});
})

app.post('/edit/:id',(req,res)=>{
    const { title, content } = req.body;
    const postId = blogs.find(p => p.id === parseInt(req.params.id));
    postId.title = title
    postId.content = content
    res.redirect('/');
})

app.get('/delete/:id',(req,res)=>{
    blogs = blogs.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
})



app.listen(6969,()=>{
    console.log(`Server is running on port ${port}`);
})