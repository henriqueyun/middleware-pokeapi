const logger = require('pino')()
const sortAbilitiesBy = function (pokemonAbilities, sortType = 'alphabetical') {
  const sortTypes = {
    alphabetical: (pokemonAbilities) => {
      const notSorted = pokemonAbilities.slice()
      const sorted = pokemonAbilities.sort((abilityA, abilityB) => {
        return abilityA.ability.name > abilityB.ability.name ? 1 : -1
      })
      console.log('notSorted', notSorted)
      console.log('sorted', sorted)
      return sorted
    }
  }

  if (sortType in sortTypes) {
    return sortTypes[sortType](pokemonAbilities)
  } else {
    const error = new Error('Invalid sorting type')
    logger.error(error)
    throw error
  }
}

module.exports = sortAbilitiesBy