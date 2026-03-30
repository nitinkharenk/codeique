"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ScrambleText } from "@/components/ui/ScrambleText";
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
  const [browserTimeZone, setBrowserTimeZone] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);

  const toggleGroupStyle = {
    borderColor: "var(--color-border)",
    backgroundColor: "color-mix(in srgb, var(--color-foreground) 3%, transparent)",
  } as const;

  const getToggleStyle = (active: boolean) =>
    ({
      backgroundColor: active
        ? "color-mix(in srgb, var(--color-accent) 14%, transparent)"
        : "transparent",
      color: active ? "var(--color-foreground)" : "var(--color-muted)",
    }) as const;

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const resolvedLocale =
      Intl.DateTimeFormat().resolvedOptions().locale ||
      navigator.language ||
      navigator.languages?.find(Boolean) ||
      "en-US";

    const nextLocale =
      resolvedLocale;

    const nextCountry = getRegionFromLocale(nextLocale);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const fallbackCountry =
      nextCountry ?? (timeZone === "Asia/Kolkata" ? "IN" : null);

    setBrowserTimeZone(timeZone);
    setLocale(nextLocale);
    if (fallbackCountry) {
      setCountry(fallbackCountry);
    }
  }, []);

  const pricingConfig = useMemo(() => {
    const localeRegion = getRegionFromLocale(locale);

    if (selectedCurrency) {
      return currencyByCountry[selectedCurrency] ?? currencyByCountry.US;
    }

    if (
      localeRegion === "IN" ||
      country === "IN" ||
      browserTimeZone === "Asia/Kolkata"
    ) {
      return currencyByCountry.IN;
    }

    const inferredRegion = localeRegion || country || "US";

    return currencyByCountry[inferredRegion] ?? currencyByCountry.US;
  }, [browserTimeZone, country, locale, selectedCurrency]);

  const activeCurrencyOption = useMemo(() => {
    if (selectedCurrency) {
      return selectedCurrency;
    }

    if (pricingConfig.currency === "INR") {
      return "IN";
    }

    if (pricingConfig.currency === "EUR") {
      return "EU";
    }

    return "US";
  }, [pricingConfig.currency, selectedCurrency]);

  return (
    <section className="section-divider py-12 md:py-16">
      <div className="container-shell pt-6 md:pt-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel label="(PRICING)" />
            <h2 className="type-display-title mt-4">
              <ScrambleText>Pricing</ScrambleText>
            </h2>
            <p className="type-body mt-2 max-w-lg md:text-lg">
              From launch to scale, we&apos;ve got you covered.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border p-1.5" style={toggleGroupStyle}>
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm transition-all duration-300"
                style={getToggleStyle(!annual)}
                onClick={() => setAnnual(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className="rounded-full px-4 py-2 text-sm transition-all duration-300"
                style={getToggleStyle(annual)}
                onClick={() => setAnnual(true)}
              >
                Annual
              </button>
              <span className="ml-1 inline-flex items-center text-xs font-semibold text-[var(--color-accent)]">
                -20%
              </span>
            </div>

            <div className="inline-flex flex-wrap items-center gap-1 rounded-full border p-1.5" style={toggleGroupStyle}>
              {currencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  className="rounded-full px-4 py-2 text-sm transition-all duration-300"
                  style={getToggleStyle(activeCurrencyOption === option.value)}
                  onClick={() => setSelectedCurrency(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Pricing cards — aligned comparison layout ── */}
        <div className="mt-10 mx-auto max-w-6xl">
          <div className="grid items-stretch gap-6 md:grid-cols-3 lg:gap-8">
            {pricingTiers.map((tier, index) => {
              const price = annual ? tier.price.annual : tier.price.monthly;
              const localizedPrice =
                typeof price === "number"
                  ? Math.round(price * pricingConfig.rate)
                  : null;

              return (
                <motion.article
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative flex h-full min-h-[600px] flex-col overflow-hidden rounded-[1.6rem] border p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,80,0,0.16)] md:p-8 ${
                    tier.popular
                      ? "z-10 border-[var(--color-accent)] bg-[linear-gradient(180deg,rgba(255,73,37,0.12),rgba(255,73,37,0.035))] shadow-[0_28px_60px_rgba(255,73,37,0.14)] md:-my-3 md:scale-[1.05]"
                      : "border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]"
                  }`}
                >
                  {/* Popular: accent treatments */}
                  {tier.popular && (
                    <>
                      <div className="absolute inset-x-0 top-0 h-[3px] bg-[var(--color-accent)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,73,37,0.14),transparent_46%)]" />
                    </>
                  )}

                  {/* Hover fill */}
                  <div className="absolute inset-0 bg-white/[0.015] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <span
                          aria-hidden
                          className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {tier.popular ? (
                          <span className="inline-flex rounded-full bg-[var(--color-accent)]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--color-accent)]">
                            Best Value
                          </span>
                        ) : null}
                      </div>

                      <h3 className="display mt-4 text-[2.4rem] leading-none tracking-[-0.01em] text-white">
                        {tier.name}
                      </h3>

                      <div className="mt-5 min-h-[118px]">
                        <p className="font-mono text-[11px] leading-6 tracking-[0.04em] text-white/62">
                          {tier.description}
                        </p>
                      </div>

                      <div className="mt-6 h-px w-full bg-white/8" />

                      <div className="mt-6 min-h-[170px]">
                        <ul className="space-y-3">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3">
                              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                              <span className="font-mono text-[11px] uppercase leading-5 tracking-[0.08em] text-white/72">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-6 h-px w-full bg-white/8" />

                      <div className="mt-6 min-h-[88px]">
                        <p className="display text-[2.4rem] leading-none tracking-[-0.01em] text-white">
                          {localizedPrice
                            ? formatCurrencyValue(localizedPrice, pricingConfig.currency)
                            : "Custom"}
                          {localizedPrice && (
                            <span className="ml-1.5 font-sans text-sm text-white/40">
                              {annual ? "/yr" : "/mo"}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className={`mt-auto pt-6 ${tier.popular ? "flex justify-center" : ""}`}>
                      <Button
                        href="#contact"
                        className={tier.popular ? "w-full max-w-[15rem]" : "w-full"}
                      >
                        {tier.name === "Custom" ? "Contact Us" : "Book This Package"}
                      </Button>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
