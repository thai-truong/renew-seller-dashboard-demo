import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DefaultLayout from "@/Layouts/DefaultLayout";

type Pokemon = {
  id: number;
  name: string;
  weight: number;
  height: number;
  color: string;
  shape: string;
  types: string[]
}

type Props = {
  pokemons: Pokemon[];
}

const Index = ({ pokemons }: Props) => {
  const pokemonCard = ({ name, weight, height, color, shape, types }: Pokemon) => (
    <Card className="w-[300px] mx-5 my-3">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{types.join(", ")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Weight: {`${weight / 10}kg`}</p>
        <p>Height: {`${height/ 10}m`}</p>
        <p>Color: {color}</p>
        <p>Shape: {shape}</p>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {pokemons.map(pokemon => pokemonCard(pokemon))}
    </div>
  )
}

Index.layout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>

export default Index;
