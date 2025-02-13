import React from 'react';
import { useFormContext } from 'react-hook-form';
import type { FormData } from '../types';

export const FamilyInfoForm: React.FC = () => {
  const { register } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Other Family Information</h2>
      
      <div className="space-y-4">
        <div className="p-6 bg-gray-50 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('familyInfo.hasDeceasedChildren')}
              className="mt-1"
            />
            <span className="text-gray-700">
              Are any of the previously listed children deceased?
            </span>
          </label>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('familyInfo.hasSpecialNeedsChildren')}
              className="mt-1"
            />
            <span className="text-gray-700">
              Does any child have special needs (e.g., long-term medical problems, financial irresponsibility, incompetence, etc.)?
            </span>
          </label>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('familyInfo.hasChildrenWithBenefits')}
              className="mt-1"
            />
            <span className="text-gray-700">
              Is any child or grandchild above (or other anticipated beneficiary) qualified to receive governmental benefits as a result of any mental or physical impairment?
            </span>
          </label>
        </div>

        <div className="p-6 bg-gray-50 rounded-lg">
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              {...register('familyInfo.hasObligationsToEx')}
              className="mt-1"
            />
            <span className="text-gray-700">
              Do you or your spouse have any obligations to any ex-spouse or children from a previous marriage under a separation agreement or divorce decree?
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};