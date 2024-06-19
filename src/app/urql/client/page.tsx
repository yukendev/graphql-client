"use client";

import { Suspense } from "react";
import { useQuery, gql } from "@urql/next";

export default function Page() {
  return (
    <Suspense>
      <Pokemons />
    </Suspense>
  );
}

const PokemonsQuery = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(limit: 10, order_by: { id: asc }) {
      name
      id
    }
    generations: pokemon_v2_generation {
      name
      pokemon_species: pokemon_v2_pokemonspecies_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

function Pokemons() {
  const [result] = useQuery({ query: PokemonsQuery });
  return (
    <main>
      <h1>This is rendered as part of SSR</h1>
      <ul>
        {result.data.gen3_species.map((x: any) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
    </main>
  );
}
