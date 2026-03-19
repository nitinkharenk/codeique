export type PricingGeo = {
  country: string;
  locale: string;
};

const countryHeaderNames = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
  "x-geo-country",
] as const;

export function detectPricingGeo(headersLike: Headers): PricingGeo {
  const countryFromHeader =
    countryHeaderNames
      .map((name) => headersLike.get(name))
      .find((value) => value && value.length === 2)
      ?.toUpperCase() ?? null;

  const acceptLanguage = headersLike.get("accept-language") ?? "en-US";
  const locale = acceptLanguage.split(",")[0]?.trim() || "en-US";
  const localeCountry = locale.replace("_", "-").split("-")[1]?.toUpperCase() ?? null;

  return {
    country: countryFromHeader ?? localeCountry ?? "US",
    locale,
  };
}
