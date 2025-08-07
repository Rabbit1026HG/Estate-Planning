import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface ExecutorsTrusteesFormProps {
  type: 'executor' | 'trustee';
}

export const ExecutorsTrusteesForm: React.FC<ExecutorsTrusteesFormProps> = ({ type }) => {
  const { register, formState: { errors } } = useFormContext<FormData>();


  const title = type === 'executor' ? 'Executors' : 'Successor Trustees';
  const description = type === 'executor'
    ? 'Select an Executor to wind up your affairs at your death and make sure your wishes are carried out.'
    : 'Select Successor Trustees to manage your trust after your death.';



  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="space-y-4">
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Primary {type === 'executor' ? 'Executor' : 'Trustee'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingLabelInput
                label="Name"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.0.name`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[0]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.0.relationship`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[0]?.relationship?.message}
              />

              {/* <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.0.phone`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[0]?.phone?.message}
              /> */}
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Secondary {type === 'executor' ? 'Executor' : 'Trustee'}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingLabelInput
                label="Name"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.1.name`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[1]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.1.relationship`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[1]?.relationship?.message}
              />

              {/* <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`${type === 'executor' ? 'executors' : 'trustees'}.1.phone`)}
                error={errors[type === 'executor' ? 'executors' : 'trustees']?.[1]?.phone?.message}
              /> */}
            </div>
          </div>
      </div>
    </div>
  );
};

