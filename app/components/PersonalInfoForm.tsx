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
    watch,
  } = useFormContext<FormData>();

  const prefix = type === 'personal' ? 'personalInfo' : 'spouseInfo';
  const title = type === 'personal' ? 'Personal Information' : 'Spouse Information';
  const militaryService = watch(`${prefix}.militaryService.served`);
  // const hasSpouse = watch('hasSpouse');
  // const isRequired = type === 'personal' || hasSpouse;

  return (
    <div className={`space-y-6 ${type === 'spouse' ? 'relative' : ''}`}>
      {type === 'spouse' && (
        <div className="absolute -top-4 left-0 right-0 h-1 bg-indigo-100 rounded" />
      )}
      
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatingLabelInput
          label="Full Legal Name"
          {...register(`${prefix}.fullName`)}
          error={errors[prefix]?.fullName?.message}
          // required={isRequired}
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
          // required={isRequired}
        />

        <FloatingLabelInput
          label="Home Phone"
          type="tel"
          {...register(`${prefix}.homePhone`)}
          error={errors[prefix]?.homePhone?.message}
          // required={isRequired}
        />

        <FloatingLabelInput
          label="Cell Phone"
          type="tel"
          {...register(`${prefix}.cellPhone`)}
          error={errors[prefix]?.cellPhone?.message}
          // required={isRequired}
        />

        <FloatingLabelInput
          label="Email"
          type="email"
          {...register(`${prefix}.email`)}
          error={errors[prefix]?.email?.message}
          // required={isRequired}
        />

        <FloatingLabelInput
          label="Employer"
          {...register(`${prefix}.employer`)}
        />

        <FloatingLabelInput
          label="Occupation"
          {...register(`${prefix}.occupation`)}
        />

        <div className="md:col-span-2 space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register(`${prefix}.militaryService.served`)}
              className="form-checkbox"
            />
            <span>Have you served in the military?</span>
          </label>

          {militaryService && (
            <FloatingLabelInput
              label="Military Service Details (branch, dates, highest rank)"
              {...register(`${prefix}.militaryService.details`)}
            />
          )}
        </div>
      </div>
    </div>
  );
};