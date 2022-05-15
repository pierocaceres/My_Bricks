const Router = require('express').Router()
const controller = require('../controller/AllController')
// const middleware = require('../middleware')

//##################  AUTHENTICATION ROUTE  ######################//
Router.post('/register', controller.Register)
Router.post('/login', controller.Login)
// Router.put('/logout', authController.Logout)
// Router.get('/session', middleware.stripToken, middleware.verifyToken, authController.CheckSession)

//##################  LEGO SET ROUTE  ######################//
//Calls LegoSet Orders by Date Created. Homepage
Router.get('/lego_set/all', controller.GetAllLegoSets)
//LegoSet Endpoint, Pulls comments, Where user reads article
Router.get('/lego_set/:lego_set_id', controller.GetLegoSetById)
//User page. Find LegoSet by Author Id
Router.get('/lego_set/user/:user_id', controller.GetLegoSetByUserId)
//Create New LegoSet
// Router.post('/lego_set/create', middleware.stripToken, middleware.verifyToken, controller.CreateLegoSet)
Router.post('/lego_set/create', controller.CreateLegoSet)
// Update LegoSet Post
// Router.put('/lego_set/update/:lego_set_id', middleware.stripToken, middleware.verifyToken,controller.EditLegoSet)
Router.put('/lego_set/update/:lego_set_id', controller.EditLegoSet)
//Delete LegoSet Post
// Router.delete('/lego_set/delete/:lego_set_id', middleware.stripToken, middleware.verifyToken, controller.DeleteLegoSet)
Router.delete('/lego_set/delete/:lego_set_id', controller.DeleteLegoSet)

Router.get('/search/set_name/:name', controller.SearchBySet)
Router.get('/search/theme/:theme', controller.SearchByTheme)
Router.get('/search/builder/:builder', controller.SearchByBuilder)

Router.post('/comment/post', controller.AddComment)
Router.put('/comment/edit/:comment_id', controller.EditComment)
Router.delete('/comment/delete/:comment_id', controller.DeleteComment)

module.exports = Router