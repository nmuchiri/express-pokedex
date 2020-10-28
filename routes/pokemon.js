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
    console.log(favorites)
      res.render('faves', {favorites: favorites})
  })
  // res.send('Render a page of favorites here');
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  // console.log(req.body.name)
  db.pokemon.findOrCreate({
        where:{name: req.body.name
          
        }
  
    })
    .then(([foundOrCreatedUser, created])=>{
    res.redirect('/pokemon')        
    })
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
router.delete('/:idx' , (req, res)=>{
  console.log(req.params.idx)
  db.pokemon.destroy({
    where: {id: req.params.idx}
  }).then(()=>{
    res.redirect('/pokemon')
  })
})

module.exports = router;
