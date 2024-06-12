class PokemonSerializer
  def initialize(pokemon_api_response)
    @pokemon = pokemon_api_response.get
  end

  def hash
    {
      id: pokemon.id,
      name: pokemon.name.capitalize,
      weight: pokemon.weight,
      height: pokemon.height,
      color: pokemon_species.color.name.capitalize,
      shape: pokemon_species.shape.name.capitalize,
      types: pokemon.types.map { |type_resource| type_resource.type.name.capitalize },
    }
  end

  private

  attr_reader :pokemon

  def pokemon_species
    @pokemon_species ||= pokemon.species.get
  end
end
