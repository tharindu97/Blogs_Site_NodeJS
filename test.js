 const mongoose = require('mongoose')

 const Post = require('./database/models/Post')

 mongoose.connect('mongodb://localhost/node-js-test-blog')

 Post.findByIdAndUpdate("5de2384075602930f871bd43",{
     title:'Panama Brooo'
 }, (error,post)=>{
     console.log(error,post)
 })

/*
 Post.findById("5de2384075602930f871bd43", (error,post) =>{
     console.log(error, post)
 })*/
/*
 Post.find({}, (error,posts) =>{
     console.log(error, posts)
 })*/

 /*Post.create({
     title: 'My first blog post',
     description: 'Blog post description',
     content: 'Location ipsum content'
 }, (error, post) => {
     console.log(error, post)
 })*/