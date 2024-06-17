import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import { ZodFormType } from "./ListingForm";
import { useFormContext } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { capitalize } from "@/lib/helpers/string";
import FormErrorMessage from "@/components/FormErrorMessage";

type Props = {
  conditions: string[];
};

const ConditionSelectField = ({ conditions }: Props) => {
  const { control, formState: { errors: formErrors } } = useFormContext<ZodFormType>();

  return (
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
                  value={condition}>{capitalize(condition)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formErrors.condition?.message && <FormErrorMessage message={formErrors.condition.message} />}
        </FormItem>
      )}
    />
  );
}

export default ConditionSelectField;
