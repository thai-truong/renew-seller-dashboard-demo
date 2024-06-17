import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import React from "react";
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE, ZodFormType } from "./ListingForm";
import { useFormContext } from "react-hook-form";
import { Cross2Icon, UploadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import FormErrorMessage from "@/components/FormErrorMessage";

const ImageUploadField = () => {
  const { control, formState: { errors: formErrors }, getValues, setValue } = useFormContext<ZodFormType>();

  const removeFileAtIndex = (indexToRemove: number) => {
    setValue("images", getValues().images.filter((_, imageIndex) => imageIndex !== indexToRemove));
  }

  return (
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
};

export default ImageUploadField;
