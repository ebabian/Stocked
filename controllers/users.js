//Dependencies
const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/users.js')

//Configuration
const users = express.Router()

// Routes
users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
    currentUser: req.session.currentUser
  })
})

// POST
users.post('/', (req, res) => {
  //overwrite the user password with the hashed password, then pass that in to our database
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  //create a new user
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    //redirect to index
    res.redirect('/items')
  })
})

module.exports = users
