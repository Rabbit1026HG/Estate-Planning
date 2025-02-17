import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface BeneficiariesFormProps {
  type: 'primary' | 'alternate';
}

export const BeneficiariesForm: React.FC<BeneficiariesFormProps> = ({ type }) => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries',
  });

  const title = type === 'primary' ? 'Estate Beneficiaries' : 'Alternate Beneficiaries';
  const description = type === 'primary'
    ? 'Describe how you would like to dispose of the remainder of your estate.'
    : 'List your Alternate beneficiaries to whom you may wish to leave your property.';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', relationship: '', percentage: 0 })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Beneficiary
        </button>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-lg relative">
            <button
              type="button"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingLabelInput
                label="Name"
                {...register(`${type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries'}.${index}.name`)}
                error={errors[type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries']?.[index]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`${type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries'}.${index}.relationship`)}
                error={errors[type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries']?.[index]?.relationship?.message}
              />

              <FloatingLabelInput
                label="Percentage"
                type="number"
                min="0"
                max="100"
                {...register(`${type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries'}.${index}.percentage`, {
                  valueAsNumber: true,
                })}
                error={errors[type === 'primary' ? 'beneficiaries' : 'alternateBeneficiaries']?.[index]?.percentage?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};