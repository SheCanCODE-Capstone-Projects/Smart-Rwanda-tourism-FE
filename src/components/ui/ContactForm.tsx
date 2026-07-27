import { useState, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your full name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email)) errors.email = 'Enter a valid email address.';
  if (!values.subject.trim()) errors.subject = 'Please add a subject.';
  if (!values.message.trim()) errors.message = 'Please add a message.';
  else if (values.message.trim().length < 20)
    errors.message = 'Please add a little more detail (at least 20 characters).';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormState>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function fieldError(key: keyof FormState) {
    return touched[key] ? errors[key] : undefined;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, subject: true, message: true });

    if (Object.keys(nextErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      // Simulated send — swapping this for a real API call should not require
      // changes anywhere else in the component.
      await new Promise((resolve, reject) => {
        setTimeout(() => (Math.random() > 0.05 ? resolve(null) : reject(new Error('network'))), 800);
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="rounded-2xl border border-lime/40 bg-lime/10 p-8 text-center">
        <span className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-lime text-xl text-forest">
          ✓
        </span>
        <h3 className="mb-2 text-lg font-bold text-forest">Message sent</h3>
        <p className="text-sm text-muted">
          Thanks for reaching out — our team usually replies within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass = (key: keyof FormState) =>
    `rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none transition-colors focus:border-forest focus-visible:ring-2 focus-visible:ring-lime ${
      fieldError(key) ? 'border-red-300' : 'border-border'
    }`;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-semibold text-text">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            value={values.name}
            onChange={(e) => updateField('name', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            aria-invalid={!!fieldError('name')}
            aria-describedby={fieldError('name') ? 'name-error' : undefined}
            className={inputClass('name')}
          />
          {fieldError('name') && (
            <p id="name-error" role="alert" className="text-xs text-red-600">
              {fieldError('name')}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-semibold text-text">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={(e) => updateField('email', e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            aria-invalid={!!fieldError('email')}
            aria-describedby={fieldError('email') ? 'email-error' : undefined}
            className={inputClass('email')}
          />
          {fieldError('email') && (
            <p id="email-error" role="alert" className="text-xs text-red-600">
              {fieldError('email')}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="subject" className="text-sm font-semibold text-text">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          value={values.subject}
          onChange={(e) => updateField('subject', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, subject: true }))}
          aria-invalid={!!fieldError('subject')}
          aria-describedby={fieldError('subject') ? 'subject-error' : undefined}
          className={inputClass('subject')}
        />
        {fieldError('subject') && (
          <p id="subject-error" role="alert" className="text-xs text-red-600">
            {fieldError('subject')}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-semibold text-text">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={values.message}
          onChange={(e) => updateField('message', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, message: true }))}
          aria-invalid={!!fieldError('message')}
          aria-describedby={fieldError('message') ? 'message-error' : undefined}
          className={`resize-none ${inputClass('message')}`}
        />
        {fieldError('message') && (
          <p id="message-error" role="alert" className="text-xs text-red-600">
            {fieldError('message')}
          </p>
        )}
      </div>

      {status === 'error' && Object.keys(errors).length === 0 && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          Something went wrong sending your message. Please try again.
        </p>
      )}

      <button type="submit" disabled={status === 'loading'} className="btn-primary w-fit disabled:opacity-60">
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
      <p className="text-xs text-muted">Our team usually replies within 24 hours.</p>
    </form>
  );
}
