import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod"
import { Control, FieldErrors, SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Errors } from "@inertiajs/core";
import { router } from "@inertiajs/react";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import FormErrorMessage from "@/components/FormErrorMessage";
import Banner from "@/components/Banner";

type Props = {
  listingPriceCurrency: string;
  conditions: string[];
  shopifyProductId: number;
};

// https://github.com/colinhacks/zod/issues/387#issuecomment-1919182950
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4; //In MegaBytes
const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
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

type FormType = {
  listingPriceAmount: number;
  condition: string;
  sellerNote: string | undefined;
  images: File[];
};
type ZodFormType = z.infer<typeof formSchema>;

type InputFieldProps = {
  control: Control<ZodFormType>;
  formErrors: FieldErrors<ZodFormType>;
};

const ListingPriceInputField = ({ control, listingPriceCurrency, formErrors }: InputFieldProps & { listingPriceCurrency: string; }) => (
  <FormField
    control={control}
    name="listingPriceAmount"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Listing Price</FormLabel>
        <FormControl>
          <div className="flex items-center gap-x-1">
            <p className="text-sm rounded-md border border-gray-200 dark:border-gray-800 py-2 px-2">{listingPriceCurrency}</p>
            <Input type="number" placeholder="0" {...field} />
          </div>
        </FormControl>
        {formErrors.listingPriceAmount?.message && <FormErrorMessage message={formErrors.listingPriceAmount.message} />}
      </FormItem>
    )}
  />
);

const SellerNoteTextAreaField = ({ control, formErrors }: InputFieldProps) => (
  <FormField
    control={control}
    name="sellerNote"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Note</FormLabel>
        <FormControl>
          <Textarea className="resize-none" {...field} />
        </FormControl>
        <FormDescription>New buyers will be able to read this</FormDescription>
        {formErrors.sellerNote?.message && <FormErrorMessage message={formErrors.sellerNote.message} />}
      </FormItem>
    )}
  />
);

const ListingForm = ({ listingPriceCurrency, conditions, shopifyProductId }: Props) => {
  const form = useForm<ZodFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: { listingPriceAmount: 0, condition: "", sellerNote: "", images: [] },
  });
  const { handleSubmit, control, getValues, setValue, formState: { errors: formErrors } } = form;
  const [backendErrors, setBackendErrors] = useState<Errors>({});

  const ConditionSelectField = () => (
    <FormField
      control={control}
      name="condition"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Condition</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select the condition of the product you plan to list" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {conditions.map(condition => (
                <SelectItem
                  key={condition}
                  value={condition}>{condition.charAt(0).toUpperCase() + condition.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.condition?.message && <FormErrorMessage message={formErrors.condition.message} />}
        </FormItem>
      )}
    />
  );

  const removeFileAtIndex = (indexToRemove: number) => {
    setValue("images", getValues().images.filter((_, imageIndex) => imageIndex !== indexToRemove));
  }
  const ImageUploadField = () => (
    <FormField
      control={control}
      name="images"
      render={({ field }) => (
        <div className="flex flex-col gap-y-3">
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <div className="flex flex-col min-h-[200px] items-center justify-center rounded-md border border-dashed text-sm border-gray-500">
                <label style={{ cursor: "pointer" }}>
                  <div className="flex gap-x-2"><UploadIcon />Choose files to upload</div>
                  <Input
                    style={{ display: "none" }}
                    type="file"
                    multiple
                    onChange={(event) => field.onChange([...Array.from(event.target.files ?? [])])}
                  />
                </label>
                <div className="flex flex-col items-center mt-3 text-xs">
                  <p className="text-gray-500 dark:text-gray-400">
                    Accepted file types: {ACCEPTED_IMAGE_TYPES.map(type => type.split("/")[1].toUpperCase()).join(", ")}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">File size must not exceed {MAX_IMAGE_SIZE}MB</p>
                </div>
              </div>
            </FormControl>
            <FormDescription>You must upload at least 1 and at most 5 images for the listing</FormDescription>
            {formErrors.images?.message && <FormErrorMessage message={formErrors.images.message} />}
          </FormItem>
          <div className="flex flex-col gap-y-1">
            {getValues().images.length > 0 && <p style={{ fontSize: "14px" }}>Uploaded Images</p>}
            {getValues().images.map((imageFile, index) => (
              <div key={`${imageFile.name}-${index}`} className="flex items-center gap-x-1 text-sm">
                <Cross2Icon className="cursor-pointer" onClick={() => removeFileAtIndex(index)} />
                {imageFile.name} - {(imageFile.size / (1024 * 1024)).toFixed(2)}MB
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );

  const onSubmit: SubmitHandler<FormType> = (data) => {
    const camelToSnakeCase = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

    const originalData = { ...data, shopifyProductId, listingPriceCurrency };
    const processedData: { [key: string]: any } = {};

    Object.entries(originalData).forEach(([key, value]) => {
      processedData[camelToSnakeCase(key)] = value;
    })

    router.post("/product_listings", processedData, { onError: errors => setBackendErrors(errors) });
  };

  const titleCase = (s: string) =>
    s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())       // Initial char (after -/_)
      .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase()) // First char after each -/_

  return (
    <Card className="w-4/5">
      <CardHeader className="items-center">
        <CardTitle>Product Listing Form</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center items-center">
        {Object.keys(backendErrors).length > 0 && (
          <div className="w-3/5">
            <Banner type="error" message={Object.entries(backendErrors).map(([key, value]) => `${titleCase(key)}: ${value}`).join(", ")} />
          </div>
        )}
        <Form {...form}>
          <form className="flex flex-col w-3/5 gap-y-7 my-5" onSubmit={handleSubmit(onSubmit)}>
            <ListingPriceInputField control={control} formErrors={formErrors} listingPriceCurrency={listingPriceCurrency} />
            <ConditionSelectField />
            <SellerNoteTextAreaField control={control} formErrors={formErrors} />
            <ImageUploadField />
            <Button className="mt-5" type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ListingForm;
