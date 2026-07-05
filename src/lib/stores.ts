// Country-specific supermarkets. Each store has a relative price index
// (1.0 = national average basket), a store-locator URL so users can find
// their closest branch, and a short note on availability.

export interface StoreInfo {
  name: string;
  logo: string;
  priceIndex: number; // lower = cheaper
  website: string;
  locatorUrl: string; // find-a-store page
  note: string; // e.g. "1,000+ branches nationwide"
}

export const STORES_BY_COUNTRY: Record<string, StoreInfo[]> = {
  GB: [
    { name: "Aldi", logo: "🟠", priceIndex: 0.82, website: "https://www.aldi.co.uk", locatorUrl: "https://stores.aldi.co.uk", note: "1,000+ UK stores" },
    { name: "Lidl", logo: "🟡", priceIndex: 0.83, website: "https://www.lidl.co.uk", locatorUrl: "https://www.lidl.co.uk/store-finder", note: "960+ UK stores" },
    { name: "Asda", logo: "🟢", priceIndex: 0.9, website: "https://groceries.asda.com", locatorUrl: "https://storelocator.asda.com", note: "630+ UK stores" },
    { name: "Tesco", logo: "🔵", priceIndex: 0.94, website: "https://www.tesco.com/groceries", locatorUrl: "https://www.tesco.com/store-locator", note: "2,800+ UK stores, most convenient" },
    { name: "Morrisons", logo: "🟣", priceIndex: 0.95, website: "https://groceries.morrisons.com", locatorUrl: "https://my.morrisons.com/storefinder", note: "500 UK stores" },
    { name: "Sainsbury's", logo: "🟧", priceIndex: 1.0, website: "https://www.sainsburys.co.uk", locatorUrl: "https://stores.sainsburys.co.uk", note: "1,400+ UK stores" },
  ],
  US: [
    { name: "Aldi", logo: "🟠", priceIndex: 0.8, website: "https://www.aldi.us", locatorUrl: "https://stores.aldi.us", note: "2,400+ US stores" },
    { name: "Walmart", logo: "🔵", priceIndex: 0.88, website: "https://www.walmart.com/grocery", locatorUrl: "https://www.walmart.com/store-finder", note: "4,600+ US stores, most convenient" },
    { name: "Costco", logo: "🔴", priceIndex: 0.85, website: "https://www.costco.com", locatorUrl: "https://www.costco.com/warehouse-locations", note: "Bulk buying, membership required" },
    { name: "Kroger", logo: "🟦", priceIndex: 0.95, website: "https://www.kroger.com", locatorUrl: "https://www.kroger.com/stores/search", note: "2,700+ US stores" },
    { name: "Target", logo: "🎯", priceIndex: 1.0, website: "https://www.target.com/c/grocery", locatorUrl: "https://www.target.com/store-locator/find-stores", note: "1,900+ US stores" },
  ],
  DE: [
    { name: "Aldi Süd/Nord", logo: "🟠", priceIndex: 0.82, website: "https://www.aldi-sued.de", locatorUrl: "https://www.aldi-sued.de/de/filialen.html", note: "4,200+ German stores" },
    { name: "Lidl", logo: "🟡", priceIndex: 0.83, website: "https://www.lidl.de", locatorUrl: "https://www.lidl.de/c/filialsuche/s949", note: "3,200+ German stores" },
    { name: "Netto", logo: "🟨", priceIndex: 0.86, website: "https://www.netto-online.de", locatorUrl: "https://www.netto-online.de/filialen", note: "4,100+ German stores" },
    { name: "REWE", logo: "🔴", priceIndex: 0.97, website: "https://www.rewe.de", locatorUrl: "https://www.rewe.de/marktseite", note: "3,700+ German stores" },
    { name: "Edeka", logo: "🟦", priceIndex: 1.0, website: "https://www.edeka.de", locatorUrl: "https://www.edeka.de/marktsuche.jsp", note: "11,000+ German stores, most convenient" },
  ],
  FR: [
    { name: "Lidl", logo: "🟡", priceIndex: 0.83, website: "https://www.lidl.fr", locatorUrl: "https://www.lidl.fr/magasins", note: "1,570+ French stores" },
    { name: "Aldi", logo: "🟠", priceIndex: 0.84, website: "https://www.aldi.fr", locatorUrl: "https://www.aldi.fr/informations/trouver-un-magasin.html", note: "1,300+ French stores" },
    { name: "E.Leclerc", logo: "🟦", priceIndex: 0.88, website: "https://www.e.leclerc", locatorUrl: "https://www.e.leclerc/mag", note: "720+ hypermarkets, cheapest big-box" },
    { name: "Intermarché", logo: "🔴", priceIndex: 0.94, website: "https://www.intermarche.com", locatorUrl: "https://www.intermarche.com/magasins", note: "1,800+ French stores" },
    { name: "Carrefour", logo: "🔵", priceIndex: 1.0, website: "https://www.carrefour.fr", locatorUrl: "https://www.carrefour.fr/magasin", note: "5,000+ French stores, most convenient" },
  ],
  AU: [
    { name: "Aldi", logo: "🟠", priceIndex: 0.84, website: "https://www.aldi.com.au", locatorUrl: "https://store.aldi.com.au", note: "590+ Australian stores" },
    { name: "Woolworths", logo: "🟢", priceIndex: 0.96, website: "https://www.woolworths.com.au", locatorUrl: "https://www.woolworths.com.au/shop/storelocator", note: "1,000+ stores, most convenient" },
    { name: "Coles", logo: "🔴", priceIndex: 1.0, website: "https://www.coles.com.au", locatorUrl: "https://www.coles.com.au/find-stores", note: "850+ Australian stores" },
    { name: "IGA", logo: "🟦", priceIndex: 1.05, website: "https://www.iga.com.au", locatorUrl: "https://www.iga.com.au/stores", note: "1,300+ community stores" },
  ],
  CA: [
    { name: "No Frills", logo: "🟡", priceIndex: 0.85, website: "https://www.nofrills.ca", locatorUrl: "https://www.nofrills.ca/store-locator", note: "280+ Canadian stores" },
    { name: "Walmart", logo: "🔵", priceIndex: 0.88, website: "https://www.walmart.ca/en/grocery", locatorUrl: "https://www.walmart.ca/en/stores-near-me", note: "400+ Canadian stores" },
    { name: "Costco", logo: "🔴", priceIndex: 0.86, website: "https://www.costco.ca", locatorUrl: "https://www.costco.ca/warehouse-locations", note: "Bulk buying, membership required" },
    { name: "Loblaws", logo: "🟧", priceIndex: 1.0, website: "https://www.loblaws.ca", locatorUrl: "https://www.loblaws.ca/store-locator", note: "2,400+ stores incl. banners, most convenient" },
    { name: "Sobeys", logo: "🟢", priceIndex: 1.02, website: "https://www.sobeys.com", locatorUrl: "https://www.sobeys.com/en/store-locator", note: "1,500+ Canadian stores" },
  ],
  IN: [
    { name: "DMart", logo: "🟢", priceIndex: 0.85, website: "https://www.dmart.in", locatorUrl: "https://www.dmart.in/storelocator", note: "380+ Indian stores" },
    { name: "Reliance Smart", logo: "🔵", priceIndex: 0.9, website: "https://www.jiomart.com", locatorUrl: "https://stores.reliancesmart.in", note: "1,500+ Indian stores" },
    { name: "Big Bazaar / Smart Bazaar", logo: "🟠", priceIndex: 0.95, website: "https://www.jiomart.com", locatorUrl: "https://stores.reliancesmart.in", note: "City coverage nationwide" },
    { name: "More Supermarket", logo: "🔴", priceIndex: 1.0, website: "https://www.moreretail.in", locatorUrl: "https://www.moreretail.in/store-locator", note: "900+ Indian stores" },
  ],
  PK: [
    { name: "Imtiaz", logo: "🟢", priceIndex: 0.88, website: "https://imtiaz.com.pk", locatorUrl: "https://imtiaz.com.pk/store-locator", note: "27+ stores in major cities" },
    { name: "Carrefour", logo: "🔵", priceIndex: 0.95, website: "https://www.carrefour.pk", locatorUrl: "https://www.carrefour.pk/mafpak/en/store-finder", note: "Hyperstar branches in big cities" },
    { name: "Metro Cash & Carry", logo: "🟡", priceIndex: 0.92, website: "https://www.metro.pk", locatorUrl: "https://www.metro.pk/store-locator", note: "10+ wholesale stores" },
    { name: "Al-Fatah", logo: "🟠", priceIndex: 1.0, website: "https://alfatah.pk", locatorUrl: "https://alfatah.pk/pages/store-locator", note: "40+ stores, most convenient" },
  ],
  AE: [
    { name: "Lulu Hypermarket", logo: "🟢", priceIndex: 0.9, website: "https://www.luluhypermarket.com", locatorUrl: "https://www.luluhypermarket.com/en-ae/store-finder", note: "100+ UAE stores" },
    { name: "Carrefour", logo: "🔵", priceIndex: 0.92, website: "https://www.carrefouruae.com", locatorUrl: "https://www.carrefouruae.com/mafuae/en/store-finder", note: "320+ UAE stores, most convenient" },
    { name: "Union Coop", logo: "🟡", priceIndex: 0.94, website: "https://www.unioncoop.ae", locatorUrl: "https://www.unioncoop.ae/branches", note: "25+ Dubai branches" },
    { name: "Spinneys", logo: "🟠", priceIndex: 1.1, website: "https://www.spinneys.com", locatorUrl: "https://www.spinneys.com/en-ae/store-locator", note: "75+ premium stores" },
  ],
};

// Generic fallback for countries without curated store data
export const GENERIC_STORES: StoreInfo[] = [
  { name: "Local discount supermarket", logo: "🟠", priceIndex: 0.85, website: "#", locatorUrl: "https://www.google.com/maps/search/discount+supermarket+near+me", note: "Usually the cheapest option" },
  { name: "National supermarket chain", logo: "🔵", priceIndex: 0.95, website: "#", locatorUrl: "https://www.google.com/maps/search/supermarket+near+me", note: "Best balance of price & choice" },
  { name: "Local market / greengrocer", logo: "🟢", priceIndex: 0.9, website: "#", locatorUrl: "https://www.google.com/maps/search/grocery+market+near+me", note: "Great for fresh produce" },
  { name: "Convenience store", logo: "🟡", priceIndex: 1.2, website: "#", locatorUrl: "https://www.google.com/maps/search/convenience+store+near+me", note: "Closest but priciest" },
];

export function getStoresForCountry(countryCode: string): StoreInfo[] {
  return STORES_BY_COUNTRY[countryCode] ?? GENERIC_STORES;
}

export interface StoreComparison extends StoreInfo {
  basketCostGBP: number; // weekly basket at this store, GBP base
  savingsVsAvgGBP: number; // vs the average store
  isCheapest: boolean;
}

export function compareStores(
  weeklyBasketGBP: number,
  countryCode: string
): StoreComparison[] {
  const stores = getStoresForCountry(countryCode);
  const avgIndex =
    stores.reduce((s, st) => s + st.priceIndex, 0) / stores.length;
  const sorted = [...stores].sort((a, b) => a.priceIndex - b.priceIndex);
  return sorted.map((store, i) => {
    const cost = weeklyBasketGBP * (store.priceIndex / avgIndex);
    const avgCost = weeklyBasketGBP;
    return {
      ...store,
      basketCostGBP: Math.round(cost * 100) / 100,
      savingsVsAvgGBP: Math.round((avgCost - cost) * 100) / 100,
      isCheapest: i === 0,
    };
  });
}
