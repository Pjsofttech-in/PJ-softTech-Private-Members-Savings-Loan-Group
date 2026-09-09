import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
  DRAFT_STORAGE_KEY,
  initialForm,
  REGISTRATION_FEE,
} from "../constants/formOptions";
import { submitMemberRegistration } from "../services/memberService";
import { getTotalShareValue } from "../utils/formHelpers";
import { validateMemberForm } from "../utils/validation";

function mergeForm(savedForm) {
  if (!savedForm || typeof savedForm !== "object") return null;
  return Object.fromEntries(
    Object.entries(initialForm).map(([section, defaults]) => [
      section,
      { ...defaults, ...(savedForm[section] || {}) },
    ]),
  );
}

function readStoredDraft() {
  try {
    const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
    return savedDraft ? mergeForm(JSON.parse(savedDraft)) : null;
  } catch {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    return null;
  }
}

export function useMemberForm() {
  const [storedDraft] = useState(readStoredDraft);
  const formMethods = useForm({
    defaultValues: storedDraft || initialForm,
    mode: "onBlur",
  });
  const form = useWatch({ control: formMethods.control });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalShareValue = useMemo(
    () => getTotalShareValue(form.membershipDetails),
    [form.membershipDetails],
  );

  const updateField = (section, field, value) => {
    formMethods.setValue(`${section}.${field}`, value, {
      shouldDirty: true,
      shouldValidate: false,
    });
    setErrors((current) => {
      const next = { ...current };
      delete next[`${section}.${field}`];
      return next;
    });
  };

  const validateForm = () => {
    const nextErrors = validateMemberForm(form);
    setErrors(nextErrors);
    return nextErrors;
  };

  const loadDraft = () => {
    const restoredForm = readStoredDraft();
    if (restoredForm) {
      formMethods.reset(restoredForm);
      setMessage({ type: "success", text: "Saved draft restored." });
      return true;
    }
    return false;
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify(formMethods.getValues()),
      );
      setMessage({ type: "success", text: "Draft saved successfully." });
      window.setTimeout(() => setMessage(null), 3000);
    } catch {
      setMessage({
        type: "error",
        text: "Draft could not be saved on this device.",
      });
    }
  };

  const resetForm = () => {
    if (
      JSON.stringify(form) !== JSON.stringify(initialForm) &&
      !window.confirm("Reset all entered registration data?")
    )
      return;
    formMethods.reset(initialForm);
    setErrors({});
    setMessage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setMessage({
        type: "error",
        text: "Please review the highlighted fields before submitting.",
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setIsSubmitting(true);
    try {
      const registrationData = {
        ...formMethods.getValues(),
        totalShareValue,
        registrationFee: REGISTRATION_FEE,
      };
      submitMemberRegistration(registrationData);
      formMethods.reset(initialForm);
      setErrors({});
      setMessage({
        type: "success",
        text: "Registration saved successfully. The form is ready for the next member.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Registration could not be stored on this device.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    updateField,
    validateForm,
    resetForm,
    saveDraft,
    loadDraft,
    handleSubmit,
    isSubmitting,
    message,
    totalShareValue,
  };
}
