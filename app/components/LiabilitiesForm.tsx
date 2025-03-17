import React from 'react';
import {  useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

const LIABILITY_TYPES = [
  'Real Estate Mortgages',
  'Vehicle',
  'Other',
];

export const LiabilitiesForm: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Liabilities</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Debt Held Individually or Jointly?
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                If Joint, With Whom?
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {LIABILITY_TYPES.map((liabilityType, index) => (
              <tr key={liabilityType}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {liabilityType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Debt Type"
                    {...register(`liabilities.${index}.debtType`)}
                    error={errors.liabilities?.[index]?.debtType?.message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Joint Owner"
                    {...register(`liabilities.${index}.jointOwner`)}
                    error={errors.liabilities?.[index]?.jointOwner?.message}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};