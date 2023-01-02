const express = require('express');
const router = express.Router();
const ObjectID = require("mongoose").Types.ObjectId

const { PostsModel } = require('../models/postsModel')

router.get('/', (req, res) => {
  PostsModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log("Error : " + err)
  })
});

router.get("/:id", (req, res) => {
  PostsModel.findById(
    req.params.id,
    (err, docs) => {
    if (!err) res.send(docs)
    else console.log("Error : " + err)
  }
  )
})

//add
router.post('/', (req, res) => {
  const newPost = new PostsModel({
    author : req.body.author,
    message : req.body.message
  })

  newPost.save((err, docs) => {
    if (!err) res.send(docs);
    else console.log('Error : ' + err);
  })
})

//update
router.put('/:id', (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown ID : " + req.params.id)
  }

  const updatePost = {
    author: req.body.author,
    message: req.body.message
  }

  PostsModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatePost },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log("Error while updating : " + err)
    }
  )
})

//delete
router.delete("/:id", (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Unknown ID : " + req.params.id)
  }

  PostsModel.findByIdAndRemove(
    req.params.id,
    (err, docs) => {
      if (!err) res.send(docs, "deleted successfuly")
      else console.log("Error on deletion : " + err);
    }
  )
})

module.exports = router