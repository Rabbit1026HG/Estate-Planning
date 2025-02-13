import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface ExecutorsTrusteesFormProps {
  type: 'executor' | 'trustee';
}

export const ExecutorsTrusteesForm: React.FC<ExecutorsTrusteesFormProps> = ({ type }) => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append } = useFieldArray({
    control,
    name: type === 'executor' ? 'executors' : 'trustees',
  });

  const title = type === 'executor' ? 'Executors' : 'Successor Trustees';
  const description = type === 'executor'
    ? 'Select an Executor to wind up your affairs at your death and make sure your wishes are carried out.'
    : 'Select Successor Trustees to manage your trust after your death.';

  // Ensure there are always two entries (primary and alternate)
  React.useEffect(() => {
    if (fields.length < 1) {
      const entriesToAdd = 1 - fields.length;
      for (let i = 0; i < entriesToAdd; i++) {
        append({ name: '', relationship: '', phone: '' });
      }
    }
  }, [fields.length, append]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {index === 0 ? 'Primary' : 'Alternate'} {type === 'executor' ? 'Executor' : 'Trustee'}
            </h3>

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