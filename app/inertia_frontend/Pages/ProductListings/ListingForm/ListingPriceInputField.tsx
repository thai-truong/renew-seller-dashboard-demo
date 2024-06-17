import React from "react";
import { useFormContext } from "react-hook-form";
import { ZodFormType } from "./ListingForm";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/components/FormErrorMessage";

type Props = {
  listingPriceCurrency: string
};

const ListingPriceInputField = ({ listingPriceCurrency }: Props) => {
  const { control, formState: { errors: formErrors } } = useFormContext<ZodFormType>();

  return (
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
}

export default ListingPriceInputField;
