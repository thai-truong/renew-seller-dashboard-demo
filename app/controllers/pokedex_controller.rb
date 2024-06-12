class PokedexController < ApplicationController
  PAGE_LIMIT = 20

  def index
    next_page_number = params.permit(:next_page_number)[:next_page_number].presence || 0
    raw_pokemon_resources_response =
      if next_page_number.positive?
        PokeApi.get(pokemon: { limit: PAGE_LIMIT, page: next_page_number.to_i })
      else
        PokeApi.get(pokemon: { limit: PAGE_LIMIT, page: 1 })
      end

    render inertia: 'Pokedex/Index', props: {
      pokemons: raw_pokemon_resources_response.results.map do |result|
        PokemonSerializer.new(result).hash
      end
    }
  end
end
