import { pokeApi } from "@/api";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PokemonFull } from "@/interfaces/pokemon-full";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getPokemonInfo, localFavorites } from "@/utils";
import { useState } from "react";

import confetti from "canvas-confetti";

interface Props {
  pokemon: PokemonFull;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const router = useRouter();
  const { id } = router.query;

  const [isInFavorites, setIsInFavorites] = useState(
    localFavorites.existInFavorites(pokemon.id)
  );

  console.log("id", id);

  const onToggleFavorite = () => {
    localFavorites.toggleFavorite(pokemon.id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };

  return (
    <MainLayout title={pokemon.name}>
      <div>
        <h1>Pokemon Page</h1>
        <div>{pokemon.name}</div>
        <div>
          <button onClick={onToggleFavorite}> Add to Favorite</button>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // We generate 151 pages on build time
  // Must return id of type string, not number
  const pokemons151 = Array.from({ length: 151 }, (_, i) => ({
    params: { id: `${i + 1}` },
  }));

  return {
    paths: pokemons151,
    // fallback: false, // will return 404 if id is not in paths
    fallback: "blocking",
  };
};
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const pokemon = await getPokemonInfo(id);

  if (!pokemon) {
    // If no pokemon is found, redirect to home page
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    revalidate: 86400, // 60 * 60 * 24, //revaildate every 24 hours
  };
};

export default PokemonPage;
