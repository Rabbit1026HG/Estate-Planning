import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface HealthCareAgentsFormProps {
  type: 'personal' | 'spouse';
}

export const HealthCareAgentsForm: React.FC<HealthCareAgentsFormProps> = ({ type }) => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `healthCareAgents.${type}`,
  });

  const title = type === 'personal' ? 'Your Health Care Agents' : 'Spouse\'s Health Care Agents';
  const description = 'A Health Care Power of Attorney is a legal document in which you appoint another person to make decisions regarding your health care treatment when you are unable to give informed consent.';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
        <button
          type="button"
          onClick={() => append({ name: '', relationship: '', phone: '' })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Agent
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
                {...register(`healthCareAgents.${type}.${index}.name`)}
                error={errors.healthCareAgents?.[type]?.[index]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`healthCareAgents.${type}.${index}.relationship`)}
                error={errors.healthCareAgents?.[type]?.[index]?.relationship?.message}
              />

              <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`healthCareAgents.${type}.${index}.phone`)}
                error={errors.healthCareAgents?.[type]?.[index]?.phone?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};