const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')


// NEW
sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs', {
      currentUser: req.session.currentUser
  })
})

//POST
sessions.post('/', (req, res) => {
  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.log(err);
      res.send('oops the db had a problem')
    } else if (!foundUser) {
      //if found user is undefined/null/not found etc
      res.send('<a href="/">Sorry, no user found</a>')
    } else {
      //user is foundUser check if passwords match
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        //set up a cookie with a key/value of currentUser set to foundUser
        req.session.currentUser = foundUser
        res.redirect('/items')
      } else {
        //passwords do not matche
        res.send('<a href="/"> password does not match </a>')
      }
    }
  })
})
// DELETE
sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
})

module.exports = sessions
