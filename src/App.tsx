import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Header } from "./components/Header";
import { PersonalInfoForm } from "./components/PersonalInfoForm";
import { ChildrenForm } from "./components/ChildrenForm";
import { FamilyInfoForm } from "./components/FamilyInfoForm";
import { AssetsForm } from "./components/AssetsForm";
import { LiabilitiesForm } from "./components/LiabilitiesForm";
import { OtherAssetsForm } from "./components/OtherAssetsForm";
import { OtherInterestsForm } from "./components/OtherInterestsForm";
import { BeneficiariesForm } from "./components/BeneficiariesForm";
import { ExecutorsTrusteesForm } from "./components/ExecutorsTrusteesForm";
import { HealthCareAgentsForm } from "./components/HealthCareAgentsForm";
import { FormDataSchema, type FormData } from "./types";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const methods = useForm<FormData>({
    resolver: zodResolver(FormDataSchema),
    defaultValues: {
      hasSpouse: false,
      personalInfo: {
        priorMarriage: "none",
      },
      spouseInfo:{
        priorMarriage: "none",
      },
      children: [],
      familyInfo: {
        hasDeceasedChildren: false,
        hasSpecialNeedsChildren: false,
        hasChildrenWithBenefits: false,
        hasObligationsToEx: false,
      },
      assets: [
        {
          description: "Cash/CDs, and Bank Accounts",
          hasAsset: false,
        },
        {
          description: "Annuities/Pensions",
          hasAsset: false,
        },
        {
          description: "Residence",
          hasAsset: false,
        },
        {
          description: "Other Real Estate",
          hasAsset: false,
        },
        {
          description: "IRAs, 401(k)s, Other Retirement",
          hasAsset: false,
        },
      ],
      liabilities: [
        {
          description: "Real Estate Mortgages",
          hasLiability: false,
        },
        {
          description: "Vehicle",
          hasLiability: false,
        },
        {
          description: "Other",
          hasLiability: false,
        },
      ],
      otherAssets: [
        {
          description: "Life Insurance",
          hasAsset: false,
        },
        {
          description: "Long Term Care Insurance",
          hasAsset: false,
        },
        {
          description: "Prepaid Funeral/Burial or Cremation",
          hasAsset: false,
        },
        {
          description: "Business Ownership Interest",
          hasAsset: false,
        },
        {
          description: "Foreign Assets",
          hasAsset: false,
        },
        {
          description: "Safe Deposit Boxes",
          hasAsset: false,
        },
      ],
      otherInterests: {
        hasOutOfStateProperty: false,
        hasPetProvisions: false,
      },
      beneficiaries: [],
      alternateBeneficiaries: [],
      executors: [],
      trustees: [],
      healthCareAgents: {
        personal: [],
        spouse: [],
      },
      otherProperty: false,
    },
  });

  const hasSpouse = methods.watch("hasSpouse");

  // Clear spouse-related data when hasSpouse is unchecked
  React.useEffect(() => {
    if (!hasSpouse) {
      methods.setValue("spouseInfo", undefined);
      methods.setValue("healthCareAgents.spouse", []);
    }
  }, [hasSpouse, methods]);

  const onSubmit = async (data: FormData) => {
    console.log("data:", data);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form submitted:", data);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">
            Thank You!
          </h2>
          <p className="mt-2 text-gray-600">
            Your estate planning questionnaire has been submitted successfully.
            We'll review your information and contact you soon.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-6 w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-indigo-700 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl font-bold mb-4">
                Estate Planning Questionnaire
              </h1>
              <p className="text-lg text-indigo-100 max-w-2xl mx-auto">
                Complete this form to help us understand your estate planning
                needs. Your information will be kept strictly confidential.
              </p>
            </div>
          </div>

          {/* Form Sections */}
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
          >
            <div className="bg-white shadow-sm rounded-lg p-8 space-y-12">
              <section id="personal">
                <PersonalInfoForm type="personal" />
              </section>

              <div className="border-t pt-8">
                <label className="flex items-center space-x-3 text-lg font-medium text-gray-900">
                  <input
                    type="checkbox"
                    {...methods.register("hasSpouse")}
                    className="h-5 w-5 text-indigo-600 rounded"
                  />
                  <span>I have a spouse</span>
                </label>
              </div>

              {hasSpouse && (
                <section
                  id="spouse"
                  className="transition-opacity duration-300"
                >
                  <PersonalInfoForm type="spouse" />
                </section>
              )}

              <section id="children">
                <ChildrenForm />
              </section>

              <section id="family-info">
                <FamilyInfoForm />
              </section>

              <section id="assets">
                <AssetsForm />
              </section>

              <section id="liabilities">
                <LiabilitiesForm />
              </section>

              <section id="other-assets">
                <OtherAssetsForm />
              </section>

              <section id="other-interests">
                <OtherInterestsForm />
              </section>

              <section id="beneficiaries">
                <BeneficiariesForm type="primary" />
              </section>

              <section id="alternate-beneficiaries">
                <BeneficiariesForm type="alternate" />
              </section>

              <section id="executors">
                <ExecutorsTrusteesForm type="executor" />
              </section>

              <section id="trustees">
                <ExecutorsTrusteesForm type="trustee" />
              </section>

              <section id="health-care-agents">
                <HealthCareAgentsForm type="personal" />
              </section>

              {hasSpouse && (
                <section
                  id="spouse-health-care"
                  className="transition-opacity duration-300"
                >
                  <HealthCareAgentsForm type="spouse" />
                </section>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit Questionnaire
                </button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </FormProvider>
  );
}

export default App;
