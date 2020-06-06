const express = require('express');
const router = express.Router();
const Item = require('../models/inventory.js');

//custom middleware
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}


// ---- Routes ----
router.get('/seed', (req, res) => {
  Item.create(
    [
      {
        name: 'grapefruit',
        type: 'fruit',
        expiration: 061520,
        readyToEat: true
      }
    ],
    (err, data) => {
      res.redirect('/items')
    }
  )
})

// Index
router.get('/', (req, res) => {
  Item.find({}, (err, allItems) => {
    res.render(
      'items/index.ejs',
      {
        items: allItems,
        currentUser: req.session.currentUser
      }
    )
  })
})

// New
router.get('/new', (req, res) => {
    res.render(
      'items/new.ejs',
      {currentUser: req.session.currentUser}
    )
});

// Delete
router.delete('/:id', (req, res) => {
  Item.findByIdAndRemove(req.params.id, (err, deletedItem) => {
    res.redirect('/items')//redirect to the log index
  })
})

// Edit
router.get('/:id/edit', (req, res) => {
    Item.findById(req.params.id, (err, foundItem) => {
    if (err) {
      console.log(err);
    } else {
      res.render(
          'items/edit.ejs',
        {
          items: foundItem,
          currentUser: req.session.currentUser
        })
    }

  })
})

// Put
router.put('/:id', (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, (err, updateModel) => {
    res.redirect('/items')
  })
})

// Create / Post
router.post('/', (req, res) => {
  if (req.body.readyToEat === 'on') {
    req.body.readyToEat = true
  } else {
    req.body.readyToEat = false
  }
  Item.create(req.body, (err, newItem) => {
    if (err) {
      console.log(err);
    } else {
        console.log(newItem);
        res.redirect('/items')
    }
    // res.send(req.body)
  })
})

// Show
router.get('/:id', (req, res) => {
  if (req.session.currentUser) {
    Item.findById(req.params.id, (err, foundItem) => {
      res.render(
          'items/show.ejs',
        {
          items: foundItem,
          currentUser: req.session.currentUser
        })
    })
  } else {
    res.redirect('/sessions/new')
  }
})

module.exports = router;
