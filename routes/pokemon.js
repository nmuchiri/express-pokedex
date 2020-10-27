const express = require('express');
const router = express.Router();
const db = require('../models');
const pokemon = require('../models/pokemon');
const axios = require('axios');

// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(favorites =>{
      res.render('faves', {favorites: favorites})
  })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate(req.body)
    .then(createdFave=>{
    res.redirect('/pokemon')
    // res.send(createdFave)        
    })
  // res.send(req.body);
});

router.get('/:id', function(req, res){
  console.log("something")
  const pokemonUrl = 'http://pokeapi.co/api/v2/pokemon/'
  let pokemonId = req.params.id
  console.log(pokemonId)
  axios.get(pokemonUrl + pokemonId)
  .then(response=>{
      console.log(response.data)
      res.render('show', {pokemon: response.data})
  })
})


module.exports = router;
