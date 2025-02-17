import { z } from 'zod';

export const PersonalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  priorMarriage: z.enum(['none', 'divorced', 'widowed']),
  address: z.string().min(1, 'Address is required'),
  homePhone: z.string().min(8, 'Valid phone number required'),
  cellPhone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Invalid email address'),
  employer: z.string().optional(),
  occupation: z.string().optional(),
  militaryService: z.object({
    served: z.boolean(),
    details: z.string().optional(),
  }).optional(),
});

export const ChildInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  thisMarriage: z.boolean(),
  previousRelationship: z.boolean(),
  adopted: z.boolean(),
});

export const AssetSchema = z.object({
  description: z.string(),
  titleType: z.string().optional(),
  jointOwner: z.string().optional(),
  beneficiary: z.string().optional(),
});

export const LiabilitySchema = z.object({
  description: z.string(),
  debtType: z.string().optional(),
  jointOwner: z.string().optional(),
});

export const BeneficiarySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  percentage: z.number().min(0).max(100),
});

export const ExecutorTrusteeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(10, 'Valid phone number required'),
});

export const HealthCareAgentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  relationship: z.string().min(1, 'Relationship is required'),
  phone: z.string().min(10, 'Valid phone number required'),
});

export const FormDataSchema = z.object({
  hasSpouse: z.boolean(),
  personalInfo: PersonalInfoSchema,
  spouseInfo: PersonalInfoSchema.optional(),
  children: z.array(ChildInfoSchema).optional(),
  familyInfo: z.object({
    hasDeceasedChildren: z.boolean(),
    hasSpecialNeedsChildren: z.boolean(),
    hasChildrenWithBenefits: z.boolean(),
    hasObligationsToEx: z.boolean(),
  }),
  assets: z.array(AssetSchema),
  liabilities: z.array(LiabilitySchema),
  otherAssets: z.array(AssetSchema),
  otherInterests: z.object({
    hasOutOfStateProperty: z.boolean(),
    outOfStatePropertyDetails: z.string().optional(),
    hasPetProvisions: z.boolean(),
    petProvisionDetails: z.string().optional(),
  }),
  beneficiaries: z.array(BeneficiarySchema),
  alternateBeneficiaries: z.array(BeneficiarySchema),
  executors: z.array(ExecutorTrusteeSchema),
  trustees: z.array(ExecutorTrusteeSchema),
  healthCareAgents: z.object({
    personal: z.array(HealthCareAgentSchema),
    spouse: z.array(HealthCareAgentSchema).optional(),
  }),
  otherProperty: z.boolean(),
});

export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;
export type ChildInfo = z.infer<typeof ChildInfoSchema>;
export type Asset = z.infer<typeof AssetSchema>;
export type Liability = z.infer<typeof LiabilitySchema>;
export type Beneficiary = z.infer<typeof BeneficiarySchema>;
export type ExecutorTrustee = z.infer<typeof ExecutorTrusteeSchema>;
export type HealthCareAgent = z.infer<typeof HealthCareAgentSchema>;
export type FormData = z.infer<typeof FormDataSchema>;