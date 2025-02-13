import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { FloatingLabelInput } from './FloatingLabelInput';
import type { FormData } from '../types';

export const ChildrenForm: React.FC = () => {
  const { control, register, formState: { errors } } = useFormContext<FormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'children',
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Children Information</h2>
        <button
          type="button"
          onClick={() => append({
            name: '',
            dateOfBirth: '',
            thisMarriage: false,
            previousRelationship: false,
            adopted: false,
          })}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Child
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="p-6 bg-gray-50 rounded-lg relative">
          <button
            type="button"
            onClick={() => remove(index)}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-5 w-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingLabelInput
              label="Full Name"
              {...register(`children.${index}.name`)}
              error={errors.children?.[index]?.name?.message}
            />

            <FloatingLabelInput
              label="Date of Birth"
              type="date"
              {...register(`children.${index}.dateOfBirth`)}
              error={errors.children?.[index]?.dateOfBirth?.message}
            />

            <div className="md:col-span-2 flex space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register(`children.${index}.thisMarriage`)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">This Marriage</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register(`children.${index}.previousRelationship`)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Previous Relationship</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  {...register(`children.${index}.adopted`)}
                  className="form-checkbox text-indigo-600"
                />
                <span className="ml-2">Adopted</span>
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};