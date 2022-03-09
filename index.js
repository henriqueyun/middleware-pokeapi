const axios = require('axios')
const express = require('express')
const app = express()
const sortAbilitiesBy = require('./sortAbilitiesBy')
const logger = require('pino')()

app.get('/api/pokemons/:pokemonName', async (req, res) => {
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
    abilities = sortAbilitiesBy(abilities, 'alphabetical')
    logger.info(`get at /api/pokemons/${pokemonName}`)
    return res.json({ abilities, pokemonName, id })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`API Serving on: ${ port }`)
})