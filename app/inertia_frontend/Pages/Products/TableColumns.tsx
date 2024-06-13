import React from "react";
import { Product } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("imageUrl") as string;

      return (
        <div style={{ width: "100px", height: "100px" }}>
          <img src={imageUrl} style={{ objectFit: "contain" }} />
        </div>
      );
    }
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>List product</DropdownMenuItem>
            <DropdownMenuItem>View product on Shopify</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
    // https://github.com/TanStack/table/discussions/4439
    // https://github.com/TanStack/table/discussions/4097
    meta: {
      style: { textAlign: "center", }
    }
  }
]
