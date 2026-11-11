/**
 * Biểu mẫu gửi về Luvia (không qua thanh toán):
 * - "b2b": Trao đổi nhu cầu hợp tác (tài liệu mục 6)
 * Dùng chung client (useLeadForm) và server (/api/lead).
 */
import { LEAD_FORMS, fill } from "@/content/vi";

export type LeadKind = "b2b";

type FieldSpec = { required: boolean; max: number };

export const LEAD_FIELDS: Record<LeadKind, Record<string, FieldSpec>> = {
  b2b: {
    organization: { required: true, max: 120 },
    contactName: { required: true, max: 80 },
    contactChannel: { required: true, max: 120 },
    need: { required: true, max: 1000 },
    quantity: { required: false, max: 60 },
    budget: { required: false, max: 60 },
    timeline: { required: false, max: 60 },
  },
};

const LABELS: Record<LeadKind, Record<string, string>> = {
  b2b: LEAD_FORMS.b2b.fields,
};

export type LeadResult =
  | { ok: true; fields: Record<string, string> }
  | { ok: false; error: string; errors: Record<string, string> };

export function validateLead(kind: LeadKind, raw: unknown): LeadResult {
  const spec = LEAD_FIELDS[kind];
  if (!spec) return { ok: false, error: LEAD_FORMS.error, errors: {} };
  const src = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const fields: Record<string, string> = {};
  const errors: Record<string, string> = {};
  for (const [name, s] of Object.entries(spec)) {
    const v = typeof src[name] === "string" ? (src[name] as string).trim().slice(0, s.max) : "";
    if (s.required && !v) {
      const label = LABELS[kind][name].split(" (")[0].toLowerCase();
      errors[name] = fill(LEAD_FORMS.missing, { field: label });
    }
    fields[name] = v;
  }
  if (fields.contactChannel && fields.contactChannel.replace(/\D/g, "").length < 9 && !fields.contactChannel.includes("@")) {
    errors.contactChannel ??= "Vui lòng nhập số điện thoại hoặc email để Luvia liên hệ lại.";
  }
  const first = Object.values(errors)[0];
  return first ? { ok: false, error: first, errors } : { ok: true, fields };
}
