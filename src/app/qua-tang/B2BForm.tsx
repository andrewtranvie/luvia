"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { GIFTS, LEAD_FORMS } from "@/content/vi";

const fieldClass =
  "w-full rounded-clay bg-surface-container-low px-space-md py-space-sm text-body-md text-on-surface outline-none ring-1 ring-outline-variant/60 transition focus:ring-2 focus:ring-primary";

/** Biểu mẫu nhu cầu hợp tác doanh nghiệp — gửi về /api/lead. */
export default function B2BForm() {
  const [form, setForm] = useState({
    organization: "",
    contactName: "",
    contactChannel: "",
    need: "",
    quantity: "",
    budget: "",
    timeline: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "b2b", fields: form }),
      });
      const data = await res.json();
      if (data.ok) setSuccess(true);
      else setError(data.error || LEAD_FORMS.error);
    } catch {
      setError(LEAD_FORMS.error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="rounded-clay-lg bg-surface-container-low p-space-xl text-center">
        <Icon name="check_circle" className="text-[32px] text-primary" fill />
        <p className="mt-space-sm text-label-lg text-primary">{LEAD_FORMS.b2b.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-sm">
      <p className="text-body-sm text-on-surface-variant">{GIFTS.b2b.formIntro}</p>

      <label className="flex flex-col gap-1">
        <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.organization} *</span>
        <input
          required
          type="text"
          value={form.organization}
          onChange={(e) => setForm({ ...form, organization: e.target.value })}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.contactName} *</span>
        <input
          required
          type="text"
          value={form.contactName}
          onChange={(e) => setForm({ ...form, contactName: e.target.value })}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.contactChannel} *</span>
        <input
          required
          type="text"
          placeholder={LEAD_FORMS.b2b.placeholders.contactChannel}
          value={form.contactChannel}
          onChange={(e) => setForm({ ...form, contactChannel: e.target.value })}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.need} *</span>
        <textarea
          required
          rows={2}
          placeholder={LEAD_FORMS.b2b.placeholders.need}
          value={form.need}
          onChange={(e) => setForm({ ...form, need: e.target.value })}
          className={fieldClass}
        />
      </label>
      <div className="grid gap-space-sm sm:grid-cols-2">
        <label className="flex flex-col gap-1">
          <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.quantity}</span>
          <input
            type="text"
            placeholder={LEAD_FORMS.b2b.placeholders.quantity}
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className={fieldClass}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.budget}</span>
          <input
            type="text"
            placeholder={LEAD_FORMS.b2b.placeholders.budget}
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={fieldClass}
          />
        </label>
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-label-md text-on-surface">{LEAD_FORMS.b2b.fields.timeline}</span>
        <input
          type="text"
          placeholder={LEAD_FORMS.b2b.placeholders.timeline}
          value={form.timeline}
          onChange={(e) => setForm({ ...form, timeline: e.target.value })}
          className={fieldClass}
        />
      </label>

      {error && <p className="text-body-sm text-error">{error}</p>}

      <div className="pt-space-xs">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-primary-container px-space-lg py-space-sm text-label-md text-on-primary clay-press transition hover:bg-primary disabled:opacity-60"
        >
          {loading ? LEAD_FORMS.b2b.submitting : LEAD_FORMS.b2b.submit}
        </button>
      </div>
    </form>
  );
}
