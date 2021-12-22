import { gql } from "@apollo/client";

export const GET_POKEMONS_QUERY = gql`
  query getPokemons {
    pokemons(first: 100) {
      id
      name
      image
    }
  }
`;

export const GET_POKEMON_QUERY = gql`
  query getPokemon($id: String) {
    pokemon(id: $id) {
      id
      name
      image
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      weaknesses
      fleeRate
      maxCP
      evolutions {
        id
        name
        image
      }
      evolutionRequirements {
        amount
        name
      }
      maxHP
    }
  }
`;
