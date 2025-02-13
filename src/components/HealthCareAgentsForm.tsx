import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface HealthCareAgentsFormProps {
  type: 'personal' | 'spouse';
}

export const HealthCareAgentsForm: React.FC<HealthCareAgentsFormProps> = ({ type }) => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append } = useFieldArray({
    control,
    name: `healthCareAgents.${type}`,
  });

  const title = type === 'personal' ? 'Your Health Care Agents' : 'Spouse\'s Health Care Agents';
  const description = 'A Health Care Power of Attorney is a legal document in which you appoint another person to make decisions regarding your health care treatment when you are unable to give informed consent.';

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
              {index === 0 ? 'Primary' : 'Alternate'} Health Care Agent
            </h3>

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