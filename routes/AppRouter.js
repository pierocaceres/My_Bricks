const Router = require('express').Router()
// const controller = require('../controller/AllController')
// const authController = require('../controller/AuthController')
// const middleware = require('../middleware')

//##################  AUTHENTICATION ROUTE  ######################//
// Router.post('/register', authController.Register)
// Router.put('/logout', authController.Logout)
// Router.post('/login', authController.Login)
// Router.get('/session', middleware.stripToken, middleware.verifyToken, authController.CheckSession)

//##################  BLOG ROUTE  ######################//
//Calls Blog Orders by Date Created. Homepage
// Router.get('/blog/all', controller.GetAllBlogs)
//Blog Endpoint, Pulls comments, Where user reads article
Router.get('/blog/:blog_id', controller.GetBlogById)
//Author Mypage. Find Blog by Author Id
Router.get('/blog/author/:author_id', controller.GetBlogByAuthId)
//Create New Blog
// Router.post('/blog/create', middleware.stripToken, middleware.verifyToken, controller.CreateBlog)
Router.post('/blog/create', controller.CreateBlog)
// Update Blog Post
// Router.put('/blog/update/:blog_id', middleware.stripToken, middleware.verifyToken,controller.EditBlog)
Router.put('/blog/update/:blog_id', controller.EditBlog)
//Delete Blog Post
// Router.delete('/blog/delete/:blog_id', middleware.stripToken, middleware.verifyToken, controller.DeleteBlog)
Router.delete('/blog/delete/:blog_id', controller.DeleteBlog)



module.exports = Router