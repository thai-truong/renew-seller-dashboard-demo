import { DataTable } from "@/components/ui/data-table";
import { Product } from "@/types";
import React, { ReactNode } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { columns } from "./TableColumns";

type Props = {
  products: Product[]
}

const Index = ({ products }: Props) => {
  return <DataTable columns={columns} data={products} columnToFilter="name" />
}

Index.layout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>

export default Index;
