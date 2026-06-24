"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import { submitRsvp } from "@/lib/rsvp";
import { SectionHeading } from "@/components/ui/section-heading";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { GoldButton } from "@/components/ui/gold-button";
import { SparkleBurst } from "@/components/effects/sparkle-burst";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { MagicDust } from "@/components/effects/magic-dust";
import { cn } from "@/lib/utils";

const schema = z
  .object({
    name:       z.string().min(2, "Please enter your full name."),
    email:      z.string().email("Please enter a valid email address."),
    attending:  z.enum(["yes", "no"]),
    guestCount: z.coerce.number().int().min(1).max(wedding.rsvp.maxGuests),
    meal:       z.string().min(1, "Please choose a meal preference."),
    message:    z.string().max(500).optional(),
  })
  .refine((d) => d.attending === "no" || !!d.meal, {
    message: "Please choose a meal preference.",
    path: ["meal"],
  });

type FormValues = z.input<typeof schema>;

const labelCls =
  "font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/70";
const inputCls =
  "w-full rounded-xl border px-4 py-3 font-serif text-[1.05rem] text-ink outline-none transition focus:ring-2 placeholder:text-ink/35";
const errCls = "mt-1 font-sans text-xs text-rose";

export function Rsvp() {
  const [done, setDone]             = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { attending: "yes", guestCount: 1, meal: "" },
  });

  const attending = watch("attending");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    const result = await submitRsvp({
      name: values.name,
      email: values.email,
      attending: values.attending,
      guestCount: Number(values.guestCount),
      meal: values.meal,
      message: values.message,
    });
    if (result.ok) setDone(true);
    else setServerError(result.error);
  });

  return (
    <section
      id="rsvp"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "var(--color-petal)" }}
    >
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,130,154,0.5) 50%, transparent)" }} />
      <MagicDust count={20} intensity="soft" className="opacity-45" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-lantern/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-2xl px-6">
        <SectionHeading
          eyebrow={wedding.rsvp.eyebrow}
          title={wedding.rsvp.title}
          intro={wedding.rsvp.intro}
          theme="light"
        />
        <p className="mt-4 text-center font-sans text-[11px] uppercase tracking-[0.3em] text-rose/80">
          Kindly respond by {wedding.rsvp.deadline}
        </p>

        <div className="relative mt-12">
          <LuxuryCard variant="light" className="storybook-panel">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex flex-col items-center py-10 text-center"
                >
                  <SparkleBurst />
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 14 }}
                    className="flex h-20 w-20 items-center justify-center rounded-full text-night"
                    style={{
                      background: "linear-gradient(135deg, #f4c444, #e8829a)",
                      boxShadow: "0 0 40px rgba(244,196,68,0.5)",
                    }}
                  >
                    <Check className="h-9 w-9" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-3xl font-semibold text-ink">Thank You!</h3>
                  <p className="mt-3 max-w-md font-serif text-[1.05rem] leading-[1.85] text-ink/80">
                    {attending === "no"
                      ? "We'll miss you dearly, but we're so grateful you let us know. Sending love your way."
                      : "Your response has been received. We can't wait to celebrate our happily ever after with you!"}
                  </p>
                  <div className="mt-6 flex items-center gap-2 font-serif italic text-rose">
                    <Heart className="h-4 w-4" />
                    {wedding.meta.hashtag}
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                  noValidate
                >
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className={labelCls}>Full Name</label>
                    <input
                      id="name" type="text" autoComplete="name"
                      placeholder="Your name"
                      className={cn(inputCls, "mt-2 border-rose/25 bg-cream/80 shadow-inner focus:border-rose/60 focus:ring-rose/20")}
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                    {errors.name && <p className={errCls}>{errors.name.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input
                      id="email" type="email" autoComplete="email"
                      placeholder="you@example.com"
                      className={cn(inputCls, "mt-2 border-rose/25 bg-cream/80 shadow-inner focus:border-rose/60 focus:ring-rose/20")}
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                    {errors.email && <p className={errCls}>{errors.email.message}</p>}
                  </div>

                  {/* Attendance */}
                  <div>
                    <span className={labelCls}>Will you attend?</span>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      <RadioCard value="yes" label="Joyfully Accept"    register={register("attending")} checked={attending === "yes"} />
                      <RadioCard value="no"  label="Regretfully Decline" register={register("attending")} checked={attending === "no"}  />
                    </div>
                  </div>

                  {/* Conditional: guest count + meal */}
                  <AnimatePresence initial={false}>
                    {attending === "yes" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-5 pt-1">
                          <div>
                            <label htmlFor="guestCount" className={labelCls}>Number of Guests</label>
                            <select
                              id="guestCount"
                              className={cn(inputCls, "mt-2 border-rose/25 bg-cream/80 focus:border-rose/60 focus:ring-rose/20")}
                              {...register("guestCount")}
                            >
                              {Array.from({ length: wedding.rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
                                <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                              ))}
                            </select>
                            {errors.guestCount && <p className={errCls}>{errors.guestCount.message}</p>}
                          </div>
                          <div>
                            <label htmlFor="meal" className={labelCls}>Meal Preference</label>
                            <select
                              id="meal"
                              className={cn(inputCls, "mt-2 border-rose/25 bg-cream/80 focus:border-rose/60 focus:ring-rose/20")}
                              aria-invalid={!!errors.meal}
                              {...register("meal")}
                            >
                              <option value="">Select an option</option>
                              {wedding.rsvp.mealOptions.map((m) => (
                                <option key={m} value={m}>{m}</option>
                              ))}
                            </select>
                            {errors.meal && <p className={errCls}>{errors.meal.message}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className={labelCls}>Special Requests / Message</label>
                    <textarea
                      id="message" rows={3}
                      placeholder="Dietary needs, a note for the couple, a song request..."
                      className={cn(inputCls, "mt-2 resize-none border-rose/25 bg-cream/80 shadow-inner focus:border-rose/60 focus:ring-rose/20")}
                      {...register("message")}
                    />
                    {errors.message && <p className={errCls}>{errors.message.message}</p>}
                  </div>

                  {serverError && (
                    <p className="text-center font-sans text-sm text-rose">{serverError}</p>
                  )}

                  <GoldButton type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full">
                    {isSubmitting ? (
                      <><Loader2 className="h-4 w-4 animate-spin" />Sending...</>
                    ) : (
                      "Send My RSVP"
                    )}
                  </GoldButton>
                </motion.form>
              )}
            </AnimatePresence>
          </LuxuryCard>

          <AnimatePresence>
            {done && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 -z-0"
              >
                <FloatingLanterns count={12} intensity="festival" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function RadioCard({
  value, label, register, checked,
}: {
  value: string;
  label: string;
  register: ReturnType<ReturnType<typeof useForm>["register"]>;
  checked: boolean;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3 text-center font-serif text-[1rem] transition-all duration-300",
        checked
          ? "border-rose/60 bg-rose/10 text-ink shadow-[0_0_0_3px_rgba(232,130,154,0.15)]"
          : "border-rose/20 bg-cream/60 text-ink/70 hover:border-rose/40"
      )}
    >
      <input type="radio" value={value} className="sr-only" {...register} />
      {label}
    </label>
  );
}
