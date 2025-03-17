import React from "react";
import { useFormContext } from "react-hook-form";
import { FloatingLabelInput } from "./FloatingLabelInput";
import type { FormData } from "../types";

interface CheckedItems {
  hasOutOfStateProperty: boolean;
  hasPetProvisions: boolean;
}

export const OtherInterestsForm: React.FC = () => {
  const { register, setValue, watch } = useFormContext<FormData>();
  const hasOutOfStateProperty = watch("otherInterests.hasOutOfStateProperty");
  const hasPetProvisions = watch("otherInterests.hasPetProvisions");

  const [checkedItems, setCheckedItems] = React.useState<CheckedItems>({
    hasOutOfStateProperty: false,
    hasPetProvisions: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);

  const handleAllCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedStatus = event.target.checked;
    setCheckedItems({
      hasOutOfStateProperty: newCheckedStatus,
      hasPetProvisions: newCheckedStatus,
    });

    setValue("otherInterests.hasOutOfStateProperty", newCheckedStatus);
    setValue("otherInterests.hasPetProvisions", newCheckedStatus);
  };

  const handleIndividualCheckChange =
    (name: keyof CheckedItems) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      setCheckedItems({
        ...checkedItems,
        [name]: event.target.checked,
      });

      setValue(`otherInterests.${name}`, isChecked);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">
          Other Interests
        </h2>
        <div className="p-6">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllCheckChange}
              className="mt-1"
            />
            <span className="text-gray-700">All check</span>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={checkedItems.hasOutOfStateProperty}
              {...register("otherInterests.hasOutOfStateProperty", {
                onChange: handleIndividualCheckChange("hasOutOfStateProperty"),
              })}
              className="mt-1"
            />
            <span className="text-gray-700">
              Check Box if you or your spouse own any real estate or property
              located outside of Nevada.
            </span>
          </label>

          {hasOutOfStateProperty && (
            <div className="ml-8">
              <FloatingLabelInput
                label="Explain"
                {...register("otherInterests.outOfStatePropertyDetails")}
              />
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 rounded-lg space-y-4">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={checkedItems.hasPetProvisions}
              {...register("otherInterests.hasPetProvisions", {
                onChange: handleIndividualCheckChange("hasPetProvisions"),
              })}
              className="mt-1"
            />
            <span className="text-gray-700">
              Check Box if you or your spouse wish to provide for any pets under
              your estate plan.
            </span>
          </label>

          {hasPetProvisions && (
            <div className="ml-8">
              <FloatingLabelInput
                label="Explain"
                {...register("otherInterests.petProvisionDetails")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
