"use client";

import {
  Car,
  CheckCircle2,
  Languages,
  MapPinned,
  ShieldCheck
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { useLang } from "@/lib/i18n";
import { LINE_URL, WHATSAPP_URL } from "@/lib/translations";
import { Button } from "./Button";

const trustIcons: LucideIcon[] = [MapPinned, CheckCircle2, Car, ShieldCheck];

type FormData = {
  destination: string;
  travelDate: string;
  travelers: string;
  purpose: string;
  food: string;
  accommodation: string;
  budget: string;
  languages: string[];
  contact: string;
};

type RequiredField = "destination" | "travelDate" | "travelers" | "contact";
type FormErrors = Partial<Record<RequiredField, string>>;
type TravelRequestResponse = {
  success: boolean;
  error?: string;
};

const initialFormData: FormData = {
  destination: "",
  travelDate: "",
  travelers: "",
  purpose: "",
  food: "",
  accommodation: "",
  budget: "",
  languages: [],
  contact: ""
};

export function PlanningCTASection() {
  const { t } = useLang();
  const plan = t.plan;
  const fields = plan.fields;

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function updateField(field: keyof FormData, value: string) {
    setFormData((current) => ({ ...current, [field]: value }));
    setSubmitError("");

    if (field in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as RequiredField];
        return next;
      });
    }
  }

  function toggleLanguage(value: string) {
    setFormData((current) => {
      if (current.languages.includes(value)) {
        return {
          ...current,
          languages: current.languages.filter((language) => language !== value)
        };
      }

      if (current.languages.length >= 2) {
        return current;
      }

      return { ...current, languages: [...current.languages, value] };
    });
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!formData.destination.trim()) {
      nextErrors.destination = plan.errors.destination;
    }

    if (!formData.travelDate) {
      nextErrors.travelDate = plan.errors.travelDate;
    }

    if (!formData.travelers) {
      nextErrors.travelers = plan.errors.travelers;
    }

    if (!formData.contact.trim()) {
      nextErrors.contact = plan.errors.contact;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const message = [
      `想去哪裡玩：${formData.destination}`,
      `旅遊日期：${formData.travelDate}`,
      `旅遊人數：${formData.travelers}`,
      `旅遊目的：${formData.purpose || "未填寫"}`,
      `美食偏好：${formData.food || "未填寫"}`,
      `住宿偏好：${formData.accommodation || "未填寫"}`,
      `每日預算：${formData.budget || "未填寫"}`,
      `語言偏好：${
        formData.languages.length ? formData.languages.join(", ") : "未填寫"
      }`,
      `聯絡方式：${formData.contact}`
    ].join("\n");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "73cec211-5017-4fc4-a381-0e26462302da",
          subject: `FreeGO 新旅遊需求：${formData.destination}（${formData.travelDate}）`,
          from_name: "FreeGO 網站表單",
          botcheck: false,
          message
        })
      });
      const result = (await response.json()) as TravelRequestResponse;

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Request failed");
      }

      trackEvent("generate_lead", {
        lead_source: "travel_request_form"
      });
      trackEvent("qualify_lead", {
        lead_source: "travel_request_form"
      });
      setSubmitted(true);
    } catch {
      setSubmitError(plan.submitError);
    } finally {
      setIsSubmitting(false);
    }
  }

  const fieldClass =
    "min-h-12 rounded-freego border bg-freego-ivory px-4 text-base outline-none transition focus:border-freego-teal focus:bg-white focus:ring-4 focus:ring-freego-teal/10";

  function getFieldClass(field: RequiredField) {
    return `${fieldClass} ${
      errors[field]
        ? "border-freego-orange bg-white ring-4 ring-freego-orange/10"
        : "border-freego-gray"
    }`;
  }

  return (
    <section id="plan" className="section-spacing bg-freego-teal text-white">
      <div className="container-freego grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-start">
        <div>
          <p className="eyebrow mb-4">{plan.eyebrow}</p>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            {plan.title}
          </h2>
          <p className="mt-6 leading-8 text-white/72">{plan.description}</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {plan.trustPoints.map((title, index) => {
              const Icon = trustIcons[index];
              return (
                <div
                  key={title}
                  className="rounded-freego border border-white/12 bg-white/8 p-4"
                >
                  <Icon className="mb-3 h-5 w-5 text-freego-orange" />
                  <p className="font-black">{title}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="rounded-freego bg-white p-5 text-freego-ink shadow-soft md:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <p className="text-2xl font-black text-freego-teal">
              {plan.formTitle}
            </p>
            <Languages className="h-7 w-7 shrink-0 text-freego-orange" />
          </div>
          {submitted ? (
            <div className="grid gap-6 rounded-freego border border-freego-orange/25 bg-freego-ivory p-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-freego-orange text-freego-ink">
                <CheckCircle2 className="h-7 w-7" />
              </span>
              <div>
                <p className="text-2xl font-black leading-snug text-freego-teal">
                  {plan.successTitle}
                </p>
                <p className="mt-4 text-base leading-[1.75] text-freego-ink/72">
                  {plan.successCopy}
                </p>
              </div>
              <div className="grid gap-3">
                <Button
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("contact_click", {
                      contact_channel: "line",
                      contact_location: "travel_request_success"
                    })
                  }
                  full
                >
                  {plan.successLine}
                </Button>
                <Button
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("contact_click", {
                      contact_channel: "whatsapp",
                      contact_location: "travel_request_success"
                    })
                  }
                  variant="secondary"
                  full
                >
                  {plan.successWhatsapp}
                </Button>
                <Button href="#top" variant="secondary" full>
                  {plan.successBack}
                </Button>
              </div>
            </div>
          ) : (
            <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-freego-teal">
                  {fields.destination}
                </span>
                <input
                  type="text"
                  value={formData.destination}
                  onChange={(event) =>
                    updateField("destination", event.target.value)
                  }
                  aria-invalid={Boolean(errors.destination)}
                  placeholder={fields.destinationPlaceholder}
                  className={getFieldClass("destination")}
                />
                {errors.destination ? (
                  <span className="text-sm font-bold text-freego-orange">
                    {errors.destination}
                  </span>
                ) : null}
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {fields.travelDate}
                  </span>
                  <input
                    type="date"
                    value={formData.travelDate}
                    onChange={(event) =>
                      updateField("travelDate", event.target.value)
                    }
                    onInput={(event) =>
                      updateField("travelDate", event.currentTarget.value)
                    }
                    aria-invalid={Boolean(errors.travelDate)}
                    className={getFieldClass("travelDate")}
                  />
                  {errors.travelDate ? (
                    <span className="text-sm font-bold text-freego-orange">
                      {errors.travelDate}
                    </span>
                  ) : null}
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {fields.travelers}
                  </span>
                  <select
                    value={formData.travelers}
                    onChange={(event) =>
                      updateField("travelers", event.target.value)
                    }
                    aria-invalid={Boolean(errors.travelers)}
                    className={getFieldClass("travelers")}
                  >
                    <option value="">{fields.travelersPlaceholder}</option>
                    {fields.travelersOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                  {errors.travelers ? (
                    <span className="text-sm font-bold text-freego-orange">
                      {errors.travelers}
                    </span>
                  ) : null}
                </label>
              </div>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-freego-teal">
                  {fields.purpose}
                </span>
                <select
                  value={formData.purpose}
                  onChange={(event) =>
                    updateField("purpose", event.target.value)
                  }
                  className={`${fieldClass} border-freego-gray`}
                >
                  <option value="">{fields.purposePlaceholder}</option>
                  {fields.purposeOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-freego-teal">
                  {fields.food}
                </span>
                <input
                  type="text"
                  value={formData.food}
                  onChange={(event) => updateField("food", event.target.value)}
                  placeholder={fields.foodPlaceholder}
                  className={`${fieldClass} border-freego-gray`}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {fields.accommodation}
                  </span>
                  <select
                    value={formData.accommodation}
                    onChange={(event) =>
                      updateField("accommodation", event.target.value)
                    }
                    className={`${fieldClass} border-freego-gray`}
                  >
                    <option value="">
                      {fields.accommodationPlaceholder}
                    </option>
                    {fields.accommodationOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2">
                  <span className="text-sm font-bold text-freego-teal">
                    {fields.budget}
                  </span>
                  <select
                    value={formData.budget}
                    onChange={(event) =>
                      updateField("budget", event.target.value)
                    }
                    className={`${fieldClass} border-freego-gray`}
                  >
                    <option value="">{fields.budgetPlaceholder}</option>
                    {fields.budgetOptions.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
              </div>
              <fieldset className="grid gap-3 rounded-freego border border-freego-gray bg-freego-ivory p-4">
                <legend className="px-1 text-sm font-bold text-freego-teal">
                  {fields.languages}
                </legend>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                  {fields.languageOptions.map((language) => {
                    const checked = formData.languages.includes(
                      language.value
                    );
                    const disabled =
                      !checked && formData.languages.length >= 2;

                    return (
                      <label
                        key={language.value}
                        className={`flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-freego border px-3 text-base font-bold transition ${
                          checked
                            ? "border-freego-teal bg-white text-freego-teal ring-2 ring-freego-teal/15"
                            : "border-freego-gray bg-white/65 text-freego-ink/75 hover:border-freego-orange/55 hover:bg-freego-orange/10"
                        } ${
                          disabled
                            ? "cursor-not-allowed border-freego-gray bg-freego-ivory text-freego-ink/70 opacity-60 hover:border-freego-gray hover:bg-freego-ivory"
                            : "cursor-pointer"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          disabled={disabled}
                          onChange={() => toggleLanguage(language.value)}
                          className="h-4 w-4 accent-freego-teal focus:ring-2 focus:ring-freego-teal"
                        />
                        <span className="whitespace-nowrap">
                          {language.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <label className="grid gap-2">
                <span className="text-sm font-bold text-freego-teal">
                  {fields.contact}
                </span>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={(event) =>
                    updateField("contact", event.target.value)
                  }
                  aria-invalid={Boolean(errors.contact)}
                  placeholder={fields.contactPlaceholder}
                  className={getFieldClass("contact")}
                />
                {errors.contact ? (
                  <span className="text-sm font-bold text-freego-orange">
                    {errors.contact}
                  </span>
                ) : null}
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-freego bg-freego-orange px-5 py-3 text-center text-sm font-bold text-freego-ink shadow-[0_12px_28px_rgba(242,140,56,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#e77b24] hover:shadow-lift disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? plan.submitting : plan.submit}
                </button>
                <Button
                  href={LINE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="secondary"
                  full
                >
                  {plan.contactFirst}
                </Button>
              </div>
              {submitError ? (
                <p className="rounded-freego border border-freego-orange/35 bg-freego-orange/10 p-3 text-sm font-bold leading-6 text-freego-orange">
                  {submitError}
                </p>
              ) : null}
            </form>
          )}
          <p className="mt-5 rounded-freego bg-freego-ivory p-4 text-sm leading-6 text-freego-ink/68">
            {plan.note}
          </p>
        </div>
      </div>
    </section>
  );
}
