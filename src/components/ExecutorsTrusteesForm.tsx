import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface ExecutorsTrusteesFormProps {
  type: 'executor' | 'trustee';
}

export const ExecutorsTrusteesForm: React.FC<ExecutorsTrusteesFormProps> = ({ type }) => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: type === 'executor' ? 'executors' : 'trustees',
  });

  const title = type === 'executor' ? 'Executors' : 'Successor Trustees';
  const description = type === 'executor'
    ? 'Select an Executor to wind up your affairs at your death and make sure your wishes are carried out.'
    : 'Select Successor Trustees to manage your trust after your death.';

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
          Add {type === 'executor' ? 'Executor' : 'Trustee'}
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
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.${index}.name`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[index]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.${index}.relationship`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[index]?.relationship?.message}
              />

              <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.${index}.phone`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[index]?.phone?.message}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};