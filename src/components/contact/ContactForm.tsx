'use client'

import Link from 'next/link'
import { useActionState, useEffect, useRef, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/Button'
import { submitContact } from '@/lib/contact-action'
import { initialContactState, subjects, type FieldName } from '@/lib/schema'

const emptyValues = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialContactState)
  const [values, setValues] = useState(emptyValues)
  const openedAtRef = useRef<HTMLInputElement>(null)
  const alertRef = useRef<HTMLDivElement>(null)

  // Form açılış zamanı — bot tespiti için. Sunucuda üretilse hidratasyon
  // uyuşmazlığı olurdu, o yüzden tarayıcıda dolduruyoruz.
  useEffect(() => {
    if (openedAtRef.current) {
      openedAtRef.current.value = String(Date.now())
    }
  }, [])

  // Gönderim sonucu ekranda değişince odağı mesaja taşı ki ekran okuyucular duysun.
  useEffect(() => {
    if (state.status === 'success') setValues(emptyValues)
    if (state.status !== 'idle') alertRef.current?.focus()
  }, [state])

  function update(field: keyof typeof emptyValues, value: string) {
    setValues((v) => ({ ...v, [field]: value }))
  }

  if (state.status === 'success') {
    return (
      <div
        ref={alertRef}
        tabIndex={-1}
        role="status"
        className="rounded-sm border border-line bg-surface p-8"
      >
        <p className="font-display text-2xl">Teşekkürler!</p>
        <p className="mt-3 text-muted">{state.message}</p>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6" noValidate>
      {/* Bal küpü — ekran okuyucular ve insanlar görmez, botlar doldurur. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Web siteniz (boş bırakın)</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={openedAtRef} type="hidden" name="openedAt" defaultValue="" />

      {state.status === 'error' && state.message && (
        <div
          ref={alertRef}
          tabIndex={-1}
          role="alert"
          className="rounded-sm border border-accent/40 bg-accent/5 px-4 py-3 text-sm text-accent-dark"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          name="name"
          label="Ad Soyad"
          required
          autoComplete="name"
          value={values.name}
          onChange={update}
          error={state.errors?.name}
        />
        <Field
          name="phone"
          label="Telefon"
          type="tel"
          required
          autoComplete="tel"
          placeholder="0532 000 00 00"
          value={values.phone}
          onChange={update}
          error={state.errors?.phone}
        />
      </div>

      <Field
        name="email"
        label="E-posta"
        type="email"
        autoComplete="email"
        hint="İsteğe bağlı"
        value={values.email}
        onChange={update}
        error={state.errors?.email}
      />

      <div>
        <label htmlFor="subject" className="block text-sm font-medium">
          Konu <span className="text-accent-dark">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          value={values.subject}
          onChange={(e) => update('subject', e.target.value)}
          aria-invalid={state.errors?.subject ? true : undefined}
          aria-describedby={state.errors?.subject ? 'subject-error' : undefined}
          className={`mt-2 w-full rounded-sm border bg-surface px-4 py-3 text-base transition-colors focus:border-accent focus:outline-none ${
            state.errors?.subject ? 'border-accent' : 'border-line'
          }`}
        >
          <option value="">Seçiniz…</option>
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {state.errors?.subject && (
          <p id="subject-error" className="mt-2 text-sm text-accent-dark">
            {state.errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium">
          Mesajınız <span className="text-accent-dark">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Yaklaşık kaç metre, hangi taşı düşünüyorsunuz, işin adresi neresi?"
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={state.errors?.message ? true : undefined}
          aria-describedby={state.errors?.message ? 'message-error' : undefined}
          className={`mt-2 w-full resize-y rounded-sm border bg-surface px-4 py-3 text-base transition-colors focus:border-accent focus:outline-none ${
            state.errors?.message ? 'border-accent' : 'border-line'
          }`}
        />
        {state.errors?.message && (
          <p id="message-error" className="mt-2 text-sm text-accent-dark">
            {state.errors.message}
          </p>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-muted">
          <input
            type="checkbox"
            name="consent"
            className="mt-1 h-4 w-4 shrink-0 accent-[#A0764F]"
            aria-invalid={state.errors?.consent ? true : undefined}
            aria-describedby={state.errors?.consent ? 'consent-error' : undefined}
          />
          <span>
            <Link href="/kvkk" className="underline underline-offset-2">
              KVKK Aydınlatma Metni
            </Link>
            &apos;ni okudum; bilgilerimin bu talep kapsamında işlenmesini kabul
            ediyorum.
          </span>
        </label>
        {state.errors?.consent && (
          <p id="consent-error" className="mt-2 text-sm text-accent-dark">
            {state.errors.consent}
          </p>
        )}
      </div>

      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Gönderiliyor…' : 'Mesajı gönder'}
    </Button>
  )
}

type FieldProps = {
  name: FieldName & keyof typeof emptyValues
  label: string
  value: string
  onChange: (field: keyof typeof emptyValues, value: string) => void
  error?: string
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
  hint?: string
}

function Field({
  name,
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
  autoComplete,
  placeholder,
  hint,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium">
        {label}
        {required && <span className="text-accent-dark"> *</span>}
        {hint && <span className="ml-2 font-normal text-muted">({hint})</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-2 w-full rounded-sm border bg-surface px-4 py-3 text-base transition-colors focus:border-accent focus:outline-none ${
          error ? 'border-accent' : 'border-line'
        }`}
      />
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-accent-dark">
          {error}
        </p>
      )}
    </div>
  )
}
