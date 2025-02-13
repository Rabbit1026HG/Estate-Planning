import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

interface PersonalInfoFormProps {
  type: 'personal' | 'spouse';
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormData>();

  const prefix = type === 'personal' ? 'personalInfo' : 'spouseInfo';
  const title = type === 'personal' ? 'Personal Information' : 'Spouse Information';

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingLabelInput
          label="Full Legal Name"
          {...register(`${prefix}.fullName`)}
          error={errors[prefix]?.fullName?.message}
        />
        
        <div className="space-y-2">
          <label className="text-sm text-gray-600">Prior Marriages</label>
          <div className="space-x-4">
            {['none', 'divorced', 'widowed'].map((value) => (
              <label key={value} className="inline-flex items-center">
                <input
                  type="radio"
                  {...register(`${prefix}.priorMarriage`)}
                  value={value}
                  className="form-radio text-indigo-600"
                />
                <span className="ml-2 capitalize">{value}</span>
              </label>
            ))}
          </div>
        </div>

        <FloatingLabelInput
          label="Home Address"
          {...register(`${prefix}.address`)}
          error={errors[prefix]?.address?.message}
        />

        <FloatingLabelInput
          label="Cell Phone"
          type="tel"
          {...register(`${prefix}.cellPhone`)}
          error={errors[prefix]?.cellPhone?.message}
        />

        <FloatingLabelInput
          label="Email"
          type="email"
          {...register(`${prefix}.email`)}
          error={errors[prefix]?.email?.message}
        />

        <FloatingLabelInput
          label="Employer"
          {...register(`${prefix}.employer`)}
        />

        <FloatingLabelInput
          label="Occupation"
          {...register(`${prefix}.occupation`)}
        />
      </div>
    </div>
  );
};