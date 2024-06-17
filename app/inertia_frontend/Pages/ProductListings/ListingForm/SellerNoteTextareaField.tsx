import React from "react";
import { useFormContext } from "react-hook-form";
import { ZodFormType } from "./ListingForm";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import FormErrorMessage from "@/components/FormErrorMessage";

const SellerNoteTextAreaField = () => {
  const { control, formState: { errors: formErrors } } = useFormContext<ZodFormType>();

  return (
    <FormField
      control={control}
      name="sellerNote"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Note</FormLabel>
          <FormControl>
            <Textarea className="resize-none min-h-[200px]" {...field} />
          </FormControl>
          <FormDescription>New buyers will be able to read this</FormDescription>
          {formErrors.sellerNote?.message && <FormErrorMessage message={formErrors.sellerNote.message} />}
        </FormItem>
      )}
    />
  );
}

export default SellerNoteTextAreaField;
