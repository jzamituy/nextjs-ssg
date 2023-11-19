import { FC } from "react";

import styles from "@/styles/Home.module.css";
import { MainLayout } from "@/components/layouts/MainLayout";

import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  list: Array<SmallPokemon>;
}
const Home: NextPage<Props> = ({ list }) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/pokemon/${id}`);
  };

  return (
    <MainLayout title="Pokemon app">
      <div style={{ height: "100%" }}>
        <h1>Home page</h1>
        <div>
          {list.map(({ id, name, image }) => {
            return (
              <div style={{ display: "block" }} key={id}>
                <Image
                  src={image}
                  alt={name}
                  height={100}
                  width={100}
                  onClick={() => handleClick(id)}
                />

                {name}
              </div>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;

// Only runs on build time
export const getStaticProps = async () => {
  const resp = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const withImages = resp.data.results.map((pokemon) => {
    const id = pokemon.url.split("/")[6];

    return {
      ...pokemon,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
      id,
    };
  });

  return {
    props: { list: withImages },
  };
};
