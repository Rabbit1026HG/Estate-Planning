import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface HealthCareAgentsFormProps {
  type: 'personal' | 'spouse';
}

export const HealthCareAgentsForm: React.FC<HealthCareAgentsFormProps> = ({ type }) => {
  const {  register, formState: { errors } } = useFormContext<FormData>();


  const title = type === 'personal' ? 'Your Health Care Agents' : 'Spouse\'s Health Care Agents';
  const description = 'A Health Care Power of Attorney is a legal document in which you appoint another person to make decisions regarding your health care treatment when you are unable to give informed consent.';




  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>

      <div className="space-y-4">
     
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Primary Health Care Agent
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingLabelInput
                label="Name"
                {...register(`healthCareAgents.${type}.0.name`)}
                error={errors.healthCareAgents?.[type]?.[0]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`healthCareAgents.${type}.0.relationship`)}
                error={errors.healthCareAgents?.[type]?.[0]?.relationship?.message}
              />

              <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`healthCareAgents.${type}.0.phone`)}
                error={errors.healthCareAgents?.[type]?.[0]?.phone?.message}
              />
            </div>
          </div>
          <div className="p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Alternate Health Care Agent
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FloatingLabelInput
                label="Name"
                {...register(`healthCareAgents.${type}.1.name`)}
                error={errors.healthCareAgents?.[type]?.[1]?.name?.message}
              />

              <FloatingLabelInput
                label="Relationship"
                {...register(`healthCareAgents.${type}.1.relationship`)}
                error={errors.healthCareAgents?.[type]?.[1]?.relationship?.message}
              />

              <FloatingLabelInput
                label="Phone"
                type="tel"
                {...register(`healthCareAgents.${type}.1.phone`)}
                error={errors.healthCareAgents?.[type]?.[1]?.phone?.message}
              />
            </div>
          </div>
      </div>
    </div>
  );
};