import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Errors } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ListingPriceInputField from "./ListingPriceInputField";
import SellerNoteTextAreaField from "./SellerNoteTextareaField";
import ConditionSelectField from "./ConditionSelectField";
import ImageUploadField from "./ImageUploadField";
import { titleCase } from "@/lib/helpers/string";

type Props = {
  listingPriceCurrency: string;
  conditions: string[];
  shopifyProductId: number;
};

// https://github.com/colinhacks/zod/issues/387#issuecomment-1919182950
export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
export const MAX_IMAGE_SIZE = 4; //In MegaBytes
export const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

const formSchema = z.object({
  listingPriceAmount: z
    .coerce
    .number({ required_error: "Listing price amount is required", invalid_type_error: "Listing price amount must be a number" })
    .positive()
    .lt(Number.MAX_SAFE_INTEGER),
  condition: z
    .string()
    .min(1, { message: "Please select a condition before submitting" })
    .refine(
      (condition) => ["excellent", "good", "middling", "worn"].includes(condition),
      { message: "Please select one of the four available options before submitting" }
    ),
  sellerNote: z.string(),
  images: z
    .custom<File>().array()
    .refine((files) => files.length !== 0, "Please upload at least 1 image")
    .refine((files) => files.length <= 5, "Please only upload at most 5 images")
    .refine(
      (files) => files.every((file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE),
      `The maximum image size is ${MAX_IMAGE_SIZE}MB`
    )
    .refine(
      (files) => files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "File type is not supported"
    ),
});

export type FormType = {
  listingPriceAmount: number;
  condition: string;
  sellerNote: string | undefined;
  images: File[];
};
export type ZodFormType = z.infer<typeof formSchema>;

const ListingForm = ({ listingPriceCurrency, conditions, shopifyProductId }: Props) => {
  const form = useForm<ZodFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { listingPriceAmount: 0, condition: "", sellerNote: "", images: [] },
  });
  const { handleSubmit } = form;
  const [backendErrors, setBackendErrors] = useState<Errors>({});

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    const originalData = { ...data, shopifyProductId, listingPriceCurrency };
    const processedData: { [key: string]: any } = {};

    Object.entries(originalData).forEach(([key, value]) => {
      processedData[camelToSnakeCase(key)] = value;
    })

    router.post("/product_listings", processedData, { onError: errors => setBackendErrors(errors) });
  };

  return (
    <Card className="w-4/5">
      <CardHeader className="items-center">
        <CardTitle>Product Listing Form</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        {Object.keys(backendErrors).length > 0 && (
          <div className="w-3/5">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error encountered!</AlertTitle>
              <AlertDescription>
                {Object.entries(backendErrors).map(([key, value]) => `${titleCase(key)}: ${value}`).join(", ")}
              </AlertDescription>
            </Alert>
          </div>
        )}
        <Form {...form}>
          <form className="flex flex-col w-3/5 gap-y-7 my-5" onSubmit={handleSubmit(onSubmit)}>
            <ListingPriceInputField listingPriceCurrency={listingPriceCurrency} />
            <ConditionSelectField conditions={conditions} />
            <SellerNoteTextAreaField />
            <ImageUploadField />
            <Button className="mt-5" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ListingForm;
