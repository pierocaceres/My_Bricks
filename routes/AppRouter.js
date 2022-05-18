const Router = require('express').Router()
const controller = require('../controller/AllController')

//##################  AUTHENTICATION ROUTE  ######################//
Router.post('/register', controller.Register)
Router.post('/login', controller.Login)
Router.get('/session', controller.StripToken, controller.VerifyToken, controller.CheckSession)

//##################  LEGO SET ROUTE  ######################//
Router.get('/lego_set/all', controller.GetAllLegoSets)
Router.get('/lego_set/:lego_set_id', controller.StripToken, controller.VerifyToken, controller.GetLegoSetById)
Router.get('/lego_set/user/:user_id', controller.GetLegoSetByUserId)
Router.post('/lego_set/create', controller.StripToken, controller.VerifyToken, controller.CreateLegoSet)
Router.put('/lego_set/update/:lego_set_id', controller.StripToken, controller.VerifyToken, controller.EditLegoSet)
Router.delete('/lego_set/delete/:lego_set_id', controller.StripToken, controller.VerifyToken, controller.DeleteLegoSet)

Router.get('/search/set_name/:name', controller.SearchBySet)
Router.get('/search/theme/:theme', controller.SearchByTheme)
Router.get('/search/builder/:builder', controller.SearchByBuilder)

Router.post('/comment/post', controller.StripToken, controller.VerifyToken, controller.AddComment)
Router.put('/comment/edit/:comment_id', controller.StripToken, controller.VerifyToken, controller.EditComment)
Router.delete('/comment/delete/:comment_id', controller.StripToken, controller.VerifyToken, controller.DeleteComment)

module.exports = Router