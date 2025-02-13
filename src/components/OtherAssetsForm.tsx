import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

const OTHER_ASSET_TYPES = [
  'Life Insurance',
  'Long Term Care Insurance',
  'Prepaid Funeral/Burial or Cremation',
  'Business Ownership Interest',
  'Foreign Assets',
  'Safe Deposit Boxes',
];

export const OtherAssetsForm: React.FC = () => {
  const { register, formState: { errors } } = useFormContext<FormData>();


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Other Assets</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Yes/No
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
            {OTHER_ASSET_TYPES.map((assetType, index) => (
              <tr key={assetType}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {assetType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    {...register(`otherAssets.${index}.hasAsset`)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Title Type"
                    {...register(`otherAssets.${index}.titleType`)}
                    error={errors.otherAssets?.[index]?.titleType?.message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Joint Owner"
                    {...register(`otherAssets.${index}.jointOwner`)}
                    error={errors.otherAssets?.[index]?.jointOwner?.message}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <FloatingLabelInput
                    label="Beneficiary"
                    {...register(`otherAssets.${index}.beneficiary`)}
                    error={errors.otherAssets?.[index]?.beneficiary?.message}
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