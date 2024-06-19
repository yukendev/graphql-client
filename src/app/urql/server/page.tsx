import React from "react";
import { cacheExchange, createClient, fetchExchange, gql } from "@urql/core";
import { registerUrql } from "@urql/next/rsc";
import { GQL_ENDPOINT } from "@/app/const";

const makeClient = () => {
  return createClient({
    url: GQL_ENDPOINT,
    exchanges: [cacheExchange, fetchExchange],
  });
};

const { getClient } = registerUrql(makeClient);

const PokemonsQuery = gql`
  query samplePokeAPIquery {
    gen3_species: pokemon_v2_pokemonspecies(limit: 10, order_by: { id: asc }) {
      name
      id
    }
  }
`;

export default async function Page() {
  const result = await getClient().query(PokemonsQuery, {});
  return (
    <main>
      <h1>This is rendered as part of an RSC</h1>
      <ul>
        {result.data.gen3_species.map((x: any) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
    </main>
  );
}
