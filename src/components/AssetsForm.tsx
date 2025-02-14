import React from 'react';
import {  useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

const ASSET_TYPES = [
  'Cash/CDs, and Bank Accounts',
  'Annuities/Pensions',
  'Residence',
  'Other Real Estate',
  'IRAs, 401(k)s, Other Retirement',
];

export const AssetsForm: React.FC = () => {
  const {  register, formState: { errors } } = useFormContext<FormData>();


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Assets</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                How is Asset Titled
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                If Joint, With Whom?
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Designated Beneficiary?
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ASSET_TYPES.map((assetType, index) => (
              <tr key={assetType}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assetType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Title Type"
                    {...register(`assets.${index}.titleType`)}
                    error={errors.assets?.[index]?.titleType?.message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Joint Owner"
                    {...register(`assets.${index}.jointOwner`)}
                    error={errors.assets?.[index]?.jointOwner?.message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Beneficiary"
                    {...register(`assets.${index}.beneficiary`)}
                    error={errors.assets?.[index]?.beneficiary?.message}
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