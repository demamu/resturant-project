const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Menu = require('../models/Menu');

// @rout   GET api/menu
// @desc   Get all users menu
// @access Public

router.get('/', async (req, res) => {
  try {
    const menu = await Menu.find().sort({
      date: -1,
    });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @rout   GET api/menu
// @desc   Get a single user menu
// @access Public

router.get('/:id', async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id)
    res.json(menu);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @rout   POST api/menu
// @desc   Add new menu
// @access Private

router.post(
  '/',
  [auth, [check('name', 'Name is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, price, calories, imageURL } = req.body;

    try {
      const newMenu = new Menu({
        name,
        price,
        calories,
        imageURL,
        
      });

      const menu = await newMenu.save();

      res.json(menu);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @rout   PUT api/menu/id
// @desc   Update menu
// @access Private

router.put('/:id', auth, async (req, res) => {
  const { name, price, calories, imageURL } = req.body;

  // Build menu object
  const menuFields = {};
  if (name) menuFields.name = name;
  if (price) menuFields.price = price;
  if (calories) menuFields.calories = calories;
  if (imageURL) menuFields.imageURL = imageURL;
  

  try {
    let menu = await Menu.findById(req.params.id);

    if (!menu) return res.status(404).json({ msg: 'Menu not found' });
    
    menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: menuFields },
      { new: true }
    );

    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/menus/:id
// @desc      Delete menu
// @access    Private

router.delete('/:id', auth, async (req, res) => {
  try {
    let menu = await Menu.findById(req.params.id);

    if (!menu) return res.status(404).json({ msg: 'Menu not found' });

   await Menu.findByIdAndRemove(req.params.id);

    res.json({ msg: 'menu removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
