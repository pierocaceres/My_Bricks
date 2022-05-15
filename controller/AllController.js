const { User, Lego_set, Comments} = require('../models')
const { Op, sequelize, } = require("sequelize");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const salt = parseInt(process.env.SALT_ROUNDS)
const secret = process.env.SECRET_PHRASE

const Register = async (req, res) => {
  try {
    const user = await User.findOne({ where: {username: req.body.username} })
    if(user) {
      return res.send({ message: "Username already in use"})
    }

    let hashPassword = await bcrypt.hash(req.body.password, salt)
    const payload = {
      name: req.body.name,
      username: req.body.username,
      password: hashPassword
    }
    const newUser = await User.create({ ...payload })
    console.log(newUser)
    res.send(newUser)
  } catch (error) {
    throw error
  }
}

const Login = async (req, res) => {
  try{
    const user = await User.findOne({
      where: {username: req.body.username},
      raw: true
    })
    if( user && (await bcrypt.compare(req.body.password, user.password)) ){
      let payload = {
        id: user.id,
        username: user.username
      }
      const token = jwt.sign(payload, secret)
      return res.send({user: payload, token})
    } 
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }catch (error){
    throw error
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

const StripToken = (req, res, next) => {
  try{
      const token = req.headers['authorization'].split(' ')[1]
      if(token){
          res.locals.token = token
          return next()
      }
  }catch(error){
      res.status(401).send({ status: 'Error', msg: 'Unauthorized'})
  }
}

const VerifyToken = (req, res, next) => {
  const { token } = res.locals
  try{
      let payload = jwt.verify(token, secret)
      if(payload){
          res.locals.payload = payload
          return next()
      }
      res.status(401).send({ status: 'Error', msg: 'Unauthorized'})
  }catch(error){
      res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  }
}

const GetAllLegoSets = async (req, res) => {
    try {
        const sets = await Lego_set.findAll({
          order: [['createdAt', 'DESC']],
          include: [{model: User, attributes: ['username']}]
        })
        res.send(sets)
    }catch (error) {

        throw error
    }
}

const GetLegoSetById = async (req, res) => {
    try {
        const set = await Lego_set.findOne({
          where: {id: req.params.lego_set_id},
          include: [
            {
              model: User, attributes: ['username']
            },
            {
              model: Comments,
              include: [
                {
                  model: User, attributes: ['username']
                }
                ]},]})
        res.send(set)
    } catch (error) {
      throw error
    }
}

const GetLegoSetByUserId = async (req, res) => {
  try {
    const setOfUser = await Lego_set.findAll({ 
      include: [{model: User, attributes: ['username']}], 
      where: {user_id: req.params.user_id}
    })
    res.send(setOfUser)
  } catch (error) {
    throw error
  }
}

const CreateLegoSet = async (req, res) => {
  try {
    await Lego_set.create({...req.body})
    res.send({ msg: 'LegoSet succesfully posted' })
  } catch (error) {
    throw error
  }
}

const EditLegoSet = async (req, res) => {
  try {
    const update = req.params.lego_set_id
    const set = await Lego_set.findByPk(update)
    set.update({...req.body})
    res.send(set)
  } catch (error) {
    throw error
  }
}

const DeleteLegoSet = async (req, res) => {
    try {
      const remove = req.params.lego_set_id
      const set = await Lego_set.findOne({attributes: ["name"], where: { id: remove }})
      await Lego_set.destroy({ where: { id: remove }})
      res.send({message: `Your lego set titled "${set.dataValues.name}" has been deleted`})
    } catch (error) {
      throw error
    }
}

const SearchBySet = async (req, res) => {
  try {
    const search = req.params.name
    const sets = await Lego_set.findAll({
      where: { name: {[Op.iLike]: `%${search}%`}},
      include: [{model: User, attributes: ['username']}]
    })
    res.send(sets)
  } catch (error) {
    throw error
  }
}

const SearchByTheme = async (req, res) => {
  try {
    const search = req.params.theme
    const sets = await Lego_set.findAll({
      where: { theme: {[Op.iLike]: `%${search}%`}},
      include: [{model: User, attributes: ['username']}]
    })
    res.send(sets)
  } catch (error) {
    throw error
  }
}

const SearchByBuilder = async (req, res) => {
  try {
    const search = req.params.builder
    const sets = await Lego_set.findAll({
      include: [{model: User, attributes: ['username'],
        where: { username: {[Op.iLike]: `%${search}%`}}
      }]
    })
    res.send(sets)
  } catch (error) {
    throw error
  }
}

const AddComment = async (req, res) => {
  try{
    await Comments.create({...req.body})
    res.send({ msg: 'Comment succesfully posted' })
  } catch (error) {
    throw error
  }
}

const EditComment = async (req, res) => {
  try {
    const update = req.params.comment_id
    const comment = await Comments.findByPk(update)
    comment.update({...req.body})
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const DeleteComment = async (req, res) => {
  try {
    const remove = req.params.comment_id
    const comment = await Comments.findOne({attributes: ["response"], where: { id: remove }})
    await Comments.destroy({ where: { id: remove }})
    res.send({message: `Comment "${comment.dataValues.response}" has been deleted`})
  } catch (error) {
    throw error
  }
}

module.exports = {
    Register,
    Login,
    CheckSession,
    StripToken,
    VerifyToken,
    GetAllLegoSets,
    GetLegoSetByUserId,
    GetLegoSetById,
    CreateLegoSet,
    EditLegoSet,
    DeleteLegoSet,
    SearchBySet,
    SearchByTheme,
    SearchByBuilder,
    AddComment,
    EditComment,
    DeleteComment,
}