const { User, Lego_set, Comment} = require('../models')
const { Op, sequelize, } = require("sequelize");

const GetAllLegoSets = async (req, res) => {
    try {
        const blogs = await Lego_set.findAll({
          order: [['createdAt', 'DESC']],
          include: [{model: User, attributes: ['username']}]
        })
        res.send(blogs)
    }catch (error) {

        throw error
    }
}

const GetLegoSetByUserId = async (req, res) => {
try {
  const blog = await Lego_set.findAll({ include: [{model: User, attributes: ['username', 'profilepic']}], where: {author_id: req.params.author_id}})
  res.send(blog)
} catch (error) {
 throw error
}
}

const GetLegoSetById = async (req, res) => {
    try {
        const blog = await Lego_set.findOne({
          where: {id: req.params.blog_id},
          include: [
            {model: User, attributes: ["username", 'profilepic']},
            {
              model: Comment,
              include: [
                {
                  model: User, attributes: ["username", 'profilepic']
                }
                ]},]})
        res.send(blog)
    } catch (error) {
      throw error
    }
}

const CreateLegoSet = async (req, res) => {
    try {
      const blog = await Lego_set.create({...req.body})
      res.send({ msg: 'LegoSet succesfully posted' })
    } catch (error) {
      throw error
    }
}

const EditLegoSet = async (req, res) => {
  try {
    const upd = req.params.blog_id
    const blog = await Lego_set.findByPk(upd)
    blog.update({...req.body})
    res.send(blog)
  } catch (error) {
    throw error
  }
}

const DeleteLegoSet = async (req, res) => {
    try {
        const del = req.params.blog_id
        const blog = await Lego_set.findOne({attributes: ["title"], where: { id: del }})
        await Lego_set.destroy({ where: { id: del }})
        res.send({message: `Your lego  with a title of "${blog.dataValues.title}" has been deleted`})
    } catch (error) {
    throw error
    }
}

module.exports = {
    GetAllLegoSets,
    GetLegoSetByUserId,
    GetLegoSetById,
    CreateLegoSet,
    EditLegoSet,
    DeleteLegoSet,
}