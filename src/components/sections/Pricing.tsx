"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { pricingTiers } from "@/lib/data";

const currencyByCountry: Record<string, { currency: string; rate: number }> = {
  IN: { currency: "INR", rate: 83 },
  US: { currency: "USD", rate: 1 },
  GB: { currency: "GBP", rate: 0.79 },
  EU: { currency: "EUR", rate: 0.92 },
  DE: { currency: "EUR", rate: 0.92 },
  FR: { currency: "EUR", rate: 0.92 },
  ES: { currency: "EUR", rate: 0.92 },
  IT: { currency: "EUR", rate: 0.92 },
  NL: { currency: "EUR", rate: 0.92 },
  CA: { currency: "CAD", rate: 1.35 },
  AU: { currency: "AUD", rate: 1.53 },
  SG: { currency: "SGD", rate: 1.34 },
  AE: { currency: "AED", rate: 3.67 },
};

const currencyDisplay: Record<string, { symbol: string; suffix?: string }> = {
  USD: { symbol: "$" },
  INR: { symbol: "Rs. " },
  EUR: { symbol: "EUR " },
  GBP: { symbol: "GBP " },
  CAD: { symbol: "CAD " },
  AUD: { symbol: "AUD " },
  SGD: { symbol: "SGD " },
  AED: { symbol: "AED " },
};

const currencyOptions = [
  { label: "USD", value: "US" },
  { label: "INR", value: "IN" },
  { label: "EUR", value: "EU" },
] as const;

function getRegionFromLocale(locale: string) {
  const parts = locale.replace("_", "-").split("-");
  return parts[1]?.toUpperCase() ?? null;
}

function formatNumber(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrencyValue(value: number, currency: string) {
  const display = currencyDisplay[currency] ?? { symbol: `${currency} ` };
  return `${display.symbol}${formatNumber(value)}`;
}

type PricingProps = {
  initialCountry?: string;
  initialLocale?: string;
};

export function Pricing({
  initialCountry = "US",
  initialLocale = "en-US",
}: PricingProps) {
  const [annual, setAnnual] = useState(false);
  const [locale, setLocale] = useState(initialLocale);
  const [country, setCountry] = useState(initialCountry);
  const [selectedCurrency, setSelectedCurrency] = useState(initialCountry);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const nextLocale =
      navigator.languages?.find(Boolean) ||
      navigator.language ||
      Intl.DateTimeFormat().resolvedOptions().locale ||
      "en-US";

    const nextCountry = getRegionFromLocale(nextLocale);

    setLocale(nextLocale);
    if (nextCountry) {
      setCountry(nextCountry);
      setSelectedCurrency(nextCountry);
    }
  }, []);

  const pricingConfig = useMemo(() => {
    const region = selectedCurrency || country || getRegionFromLocale(locale) || "US";
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (selectedCurrency === "IN" || (!selectedCurrency && (region === "IN" || timeZone === "Asia/Kolkata"))) {
      return currencyByCountry.IN;
    }

    return currencyByCountry[region] ?? currencyByCountry.US;
  }, [country, locale, selectedCurrency]);

  return (
    <section className="section-divider py-12 md:py-16">
      <div className="container-shell pt-6 md:pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel label="(PRICING)" />
            <h2 className="display mt-4 text-[2.8rem] text-[var(--color-foreground)] sm:text-[3.5rem] md:text-[5rem] lg:text-[6rem]">
              Pricing
            </h2>
            <p className="mt-2 max-w-lg text-base leading-7 tracking-[-0.03em] text-[var(--color-muted)] md:text-lg">
              From launch to scale, we&apos;ve got you covered.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/10 p-1.5">
              <button
                type="button"
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  !annual ? "bg-white/16 text-white" : "text-white/60 hover:text-white/80"
                }`}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                  annual ? "bg-white/16 text-white" : "text-white/60 hover:text-white/80"
                }`}
                onClick={() => setAnnual(true)}
              >
                Annual
              </button>
              <span className="ml-1 inline-flex items-center text-xs font-semibold text-[var(--color-accent)]">
                -20%
              </span>
            </div>

            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border border-white/10 p-1.5">
              {currencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                    selectedCurrency === option.value
                      ? "bg-white/16 text-white"
                      : "text-white/60 hover:text-white/80"
                  }`}
                  onClick={() => setSelectedCurrency(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => {
            const price = annual ? tier.price.annual : tier.price.monthly;
            const localizedPrice =
              typeof price === "number"
                ? Math.round(price * pricingConfig.rate)
                : null;

            return (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group flex h-full flex-col rounded-[1.25rem] border p-5 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(255,73,37,0.08)] ${
                  tier.popular
                    ? "border-[var(--color-accent)]/70 bg-[#141010]"
                    : "border-white/10 bg-[#141414]"
                }`}
              >
                {tier.popular ? (
                  <div className="font-mono inline-flex w-fit rounded-full bg-[var(--color-accent)]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                    Popular
                  </div>
                ) : null}
                <h3 className="display mt-3 text-[2.1rem] tracking-[0.01em] text-white">
                  {tier.name}
                </h3>
                <p className="font-mono mt-2 text-[12px] leading-6 tracking-[0.04em] text-[var(--color-muted)]">
                  {tier.description}
                </p>
                <div className="mt-4 border-t border-white/10 pt-4" />
                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <p
                      key={feature}
                      className="font-mono text-[12px] uppercase tracking-[0.08em] text-white/82"
                    >
                      <span className="mr-2 text-[var(--color-accent)]">+</span>
                      {feature}
                    </p>
                  ))}
                </div>
                <p className="display mt-auto pt-6 text-[2.7rem] tracking-[0.01em] text-white">
                  {localizedPrice ? formatCurrencyValue(localizedPrice, pricingConfig.currency) : "Custom"}
                  {localizedPrice ? (
                    <span className="ml-2 font-sans text-sm text-white/55">
                      {annual ? "/yr" : "/mo"}
                    </span>
                  ) : null}
                </p>
                <div className="mt-4">
                  <Button href="#contact" className="w-full">
                    {tier.name === "Custom" ? "Contact Us" : "Book This Package"}
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
