const axios = require('axios')
const express = require('express')
const app = express()
const sortAbilitiesBy = require('./sortAbilitiesBy')
const logger = require('pino')()
const cors = require('cors')

app.get('/api/pokemons/:pokemonName', cors(), async (req, res) => {
  const { pokemonName } = req.params
  const pokemon = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    .catch(error => {
      logger.error(error)
      return error
    })
  if (!pokemon.data) {
    return res.send(pokemon.response.statusText)
  }
  let { id, abilities } = pokemon.data
  const imgURL = pokemon.data.sprites.front_default
  abilities = sortAbilitiesBy(abilities, 'alphabetical')
  logger.info(`get at /api/pokemons/${pokemonName}`)
  return res.json({ abilities, imgURL, pokemonName, id })
})

const port = process.env.PORT || 8000
app.listen(port, () => {
  logger.info(`API Serving on: ${port}`)
})