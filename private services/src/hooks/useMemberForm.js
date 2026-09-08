import { useMemo, useState } from "react";
import { DRAFT_STORAGE_KEY, initialForm } from "../constants/formOptions";
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
  const [form, setForm] = useState(() => storedDraft || initialForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(() =>
    storedDraft ? { type: "success", text: "Saved draft restored." } : null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalShareValue = useMemo(
    () => getTotalShareValue(form.membershipDetails),
    [form.membershipDetails],
  );

  const updateField = (section, field, value) => {
    setForm((current) => ({
      ...current,
      [section]: { ...current[section], [field]: value },
    }));
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
      setForm(restoredForm);
      setMessage({ type: "success", text: "Saved draft restored." });
      return true;
    }
    return false;
  };

  const saveDraft = () => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(form));
      setMessage({ type: "success", text: "Draft saved successfully." });
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
    setForm(initialForm);
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
      const registrationData = { ...form, totalShareValue };
      submitMemberRegistration(registrationData);
      setMessage({
        type: "success",
        text: "Registration details are ready for processing.",
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
