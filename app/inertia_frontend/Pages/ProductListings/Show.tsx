import DefaultLayout from "@/Layouts/DefaultLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { capitalize } from "@/lib/helpers/string";
import { ProductListing } from "@/types";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React, { ReactNode } from "react";

type Props = {
  productListing: ProductListing
}

const ConditionInformation = ({ condition }: { condition: string; }) => {
  const conditionTextColor = () => {
    switch (condition) {
      case "excellent":
        return "text-green-500 dark:text-green-900";
      case "good":
        return "text-blue-500 dark:text-blue-900";
      case "middling":
        return "text-yellow-500 dark:text-yellow-900";
      case "worn":
        return "text-red-500 dark:text-red-900";
    }
  }

  return (
    <div className="flex gap-x-1">
      <p>Condition:</p>
      <p className={conditionTextColor()}>{capitalize(condition)}</p>
    </div>
  )
}

const NoteInformation = ({ note }: { note: string | null; }) => (
  note ? (
    <div className="flex flex-col gap-x-1 gap-y-2">
      <p>Note to buyers:</p>
      <div className="flex flex-col min-h-[100px] px-6 py-6 items-center justify-center rounded-md border text-sm border-gray-500">
        <p>{note}</p>
      </div>
    </div>
  ) : (
    <div className="flex gap-x-1">
      <p>Note to buyers:</p>
      <p className="text-gray-500 dark:text-gray-700">N/A</p>
    </div>
  )
);

const ImageCarousel = ({ imageUrls }: { imageUrls: string[] }) => {
  const toImageCarouselItem = (imageUrl: string, imageIndex: number) => (
    <CarouselItem key={imageUrl} className="md:basis-1/2 lg:basis-1/3">
      <Dialog>
        <DialogTrigger style={{ width: "200px", height: "200px", cursor: "pointer" }} asChild>
          <img style={{ objectFit: "contain" }} src={imageUrl} />
        </DialogTrigger>
        <DialogContent className="flex flex-col items-center min-w-max" style={{ maxWidth: "1000px" }}>
          <DialogHeader>Uploaded image {imageIndex + 1}</DialogHeader>
          <img className="max-h-[600px] max-w-[1000px]" src={imageUrl} />
        </DialogContent>
      </Dialog>
    </CarouselItem>
  )

  return (
    <div className="flex flex-col gap-y-2">
      <p>Uploaded images ({imageUrls.length}):</p>
      <Carousel>
        <CarouselContent>
          {imageUrls.map((imageUrl, index) => toImageCarouselItem(imageUrl, index))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const Show = ({ productListing }: Props) => {
  const { id, shopifyProductUrl, listingPrice, condition, sellerNote, imageUrls } = productListing;

  return (
    <Card className="w-3/5">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <CardTitle>{`Listing #${id}`}</CardTitle>
            <CardDescription>
              <a className="hover:underline" href={shopifyProductUrl}>View product on Shopify</a>
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <DotsVerticalIcon className="cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit product listing</DropdownMenuItem>
              <DropdownMenuItem>Remove product listing</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <p>Listing price: {listingPrice}</p>
          <ConditionInformation condition={condition} />
          <NoteInformation note={sellerNote} />
          <ImageCarousel imageUrls={imageUrls} />
        </div>
      </CardContent>
    </Card>
  );
}

Show.layout = (page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>

export default Show;
