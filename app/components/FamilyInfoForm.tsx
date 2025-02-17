'use client'
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';

// Define the type for the state
interface CheckedItems {
  hasDeceasedChildren: boolean;
  hasSpecialNeedsChildren: boolean;
  hasChildrenWithBenefits: boolean;
  hasObligationsToEx: boolean;
}

export const FamilyInfoForm: React.FC = () => {
  const { register, setValue } = useFormContext<FormData>();

  // State for managing checkbox status
  const [checkedItems, setCheckedItems] = useState<CheckedItems>({
    hasDeceasedChildren: false,
    hasSpecialNeedsChildren: false,
    hasChildrenWithBenefits: false,
    hasObligationsToEx: false,
  });

  const allChecked = Object.values(checkedItems).every(Boolean);

  // Typed handler to toggle all checkboxes
  const handleAllCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckedStatus = event.target.checked;

    // Update local state
    setCheckedItems({
      hasDeceasedChildren: newCheckedStatus,
      hasSpecialNeedsChildren: newCheckedStatus,
      hasChildrenWithBenefits: newCheckedStatus,
      hasObligationsToEx: newCheckedStatus,
    });

    // Update form values using setValue from react-hook-form
    setValue('familyInfo.hasDeceasedChildren', newCheckedStatus);
    setValue('familyInfo.hasSpecialNeedsChildren', newCheckedStatus);
    setValue('familyInfo.hasChildrenWithBenefits', newCheckedStatus);
    setValue('familyInfo.hasObligationsToEx', newCheckedStatus);
  };

  // Typed handler to toggle individual checkboxes
  const handleIndividualCheckChange = (name: keyof CheckedItems) => 
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const isChecked = event.target.checked;

      // Update local state
      setCheckedItems({
        ...checkedItems,
        [name]: isChecked,
      });

      // Update form value using setValue from react-hook-form
      setValue(`familyInfo.${name}`, isChecked);
    };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Other Family Information</h2>
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
        {Object.keys(checkedItems).map((key) => (
          <div key={key} className="p-6 bg-gray-50 rounded-lg">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={checkedItems[key as keyof CheckedItems]}
                {...register(`familyInfo.${key as keyof CheckedItems}`, {
                  onChange: handleIndividualCheckChange(key as keyof CheckedItems),
                })}
                className="mt-1"
              />
              <span className="text-gray-700">
                {getCheckboxLabel(key as keyof CheckedItems)}
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility function to map keys to labels
function getCheckboxLabel(key: keyof CheckedItems): string {
  switch (key) {
    case 'hasDeceasedChildren':
      return 'Are any of the previously listed children deceased?';
    case 'hasSpecialNeedsChildren':
      return 'Does any child have special needs (e.g., long-term medical problems, financial irresponsibility, incompetence, etc.)?';
    case 'hasChildrenWithBenefits':
      return 'Is any child or grandchild above (or other anticipated beneficiary) qualified to receive governmental benefits as a result of any mental or physical impairment?';
    case 'hasObligationsToEx':
      return 'Do you or your spouse have any obligations to any ex-spouse or children from a previous marriage under a separation agreement or divorce decree?';
    default:
      return '';
  }
}
