export type LanguageCode = "en" | "fr" | "de" | "es" | "it";

export const LANGUAGES: { code: LanguageCode; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

type Dict = Record<string, string>;

const en: Dict = {
  "nav.chooseMeals": "Choose meals",
  "nav.localShops": "Local shops",
  "nav.saveProgress": "Save progress",
  "nav.getStarted": "Get started",
  "nav.login": "Log in",
  "nav.signup": "Sign up",
  "nav.myPlan": "My plan",
  "nav.logout": "Log out",
  "hero.kicker": "Cooking made simple",
  "hero.title": "Stop wondering what to cook every night.",
  "hero.subtitle":
    "Get a complete week of meals and a shopping list in under 30 seconds — priced at Tesco, Aldi, Lidl, Asda, Morrisons and Sainsbury's, with the cheapest basket circled.",
  "hero.cta": "Plan This Week",
  "hero.sample": "Generate a sample plan",
  "hero.freePreview": "Free preview — no signup needed",
  "hero.pricesFrom": "Prices from",
  "hero.perMonth": "/month",
  "menu.suffix": "menu",
  "menu.subtitle": "Built for smaller screens too",
  "pricing.title": "Pick the plan that pays for itself",
  "pricing.subtitle":
    "Most members save more on their weekly shop than the subscription costs.",
  "pricing.mostPopular": "Most popular",
  "pricing.bestValue": "Best value for families",
  "pricing.guarantee": "Cancel anytime. 14-day money-back guarantee.",
  "footer.tagline":
    "Warm, practical meal planning with local shops, progress tracking, and shopping lists that fit real life.",
};

const fr: Dict = {
  "nav.chooseMeals": "Choisissez vos plats",
  "nav.localShops": "Magasins locaux",
  "nav.saveProgress": "Sauvegardez",
  "nav.getStarted": "Commencer",
  "nav.login": "Connexion",
  "nav.signup": "S'inscrire",
  "nav.myPlan": "Mon plan",
  "nav.logout": "Déconnexion",
  "hero.kicker": "La cuisine en toute simplicité",
  "hero.title": "Ne vous demandez plus quoi cuisiner chaque soir.",
  "hero.subtitle":
    "Obtenez une semaine complète de repas et une liste de courses en moins de 30 secondes — avec les prix de vos magasins locaux et le panier le moins cher entouré.",
  "hero.cta": "Planifier ma semaine",
  "hero.sample": "Générer un exemple de plan",
  "hero.freePreview": "Aperçu gratuit — sans inscription",
  "hero.pricesFrom": "À partir de",
  "hero.perMonth": "/mois",
  "menu.suffix": "menu",
  "menu.subtitle": "Adapté aussi aux petits écrans",
  "pricing.title": "Choisissez la formule qui se rentabilise",
  "pricing.subtitle":
    "La plupart des membres économisent plus sur leurs courses que le prix de l'abonnement.",
  "pricing.mostPopular": "Le plus populaire",
  "pricing.bestValue": "Meilleur choix pour les familles",
  "pricing.guarantee": "Annulez à tout moment. Garantie 14 jours satisfait ou remboursé.",
  "footer.tagline":
    "Une planification de repas chaleureuse et pratique, avec magasins locaux, suivi et listes de courses adaptées à la vraie vie.",
};

const de: Dict = {
  "nav.chooseMeals": "Gerichte wählen",
  "nav.localShops": "Lokale Läden",
  "nav.saveProgress": "Fortschritt speichern",
  "nav.getStarted": "Loslegen",
  "nav.login": "Anmelden",
  "nav.signup": "Registrieren",
  "nav.myPlan": "Mein Plan",
  "nav.logout": "Abmelden",
  "hero.kicker": "Kochen leicht gemacht",
  "hero.title": "Nie wieder grübeln, was es heute Abend gibt.",
  "hero.subtitle":
    "Eine komplette Wochenplanung mit Einkaufsliste in unter 30 Sekunden — mit Preisen Ihrer lokalen Läden und dem günstigsten Warenkorb markiert.",
  "hero.cta": "Diese Woche planen",
  "hero.sample": "Beispielplan erstellen",
  "hero.freePreview": "Kostenlose Vorschau — ohne Anmeldung",
  "hero.pricesFrom": "Preise ab",
  "hero.perMonth": "/Monat",
  "menu.suffix": "Menü",
  "menu.subtitle": "Auch für kleine Bildschirme gemacht",
  "pricing.title": "Wählen Sie den Plan, der sich selbst bezahlt",
  "pricing.subtitle":
    "Die meisten Mitglieder sparen beim Wocheneinkauf mehr, als das Abo kostet.",
  "pricing.mostPopular": "Am beliebtesten",
  "pricing.bestValue": "Bester Wert für Familien",
  "pricing.guarantee": "Jederzeit kündbar. 14 Tage Geld-zurück-Garantie.",
  "footer.tagline":
    "Warme, praktische Essensplanung mit lokalen Läden, Fortschrittsverfolgung und Einkaufslisten für das echte Leben.",
};

const es: Dict = {
  "nav.chooseMeals": "Elige tus platos",
  "nav.localShops": "Tiendas locales",
  "nav.saveProgress": "Guarda tu progreso",
  "nav.getStarted": "Empezar",
  "nav.login": "Iniciar sesión",
  "nav.signup": "Registrarse",
  "nav.myPlan": "Mi plan",
  "nav.logout": "Cerrar sesión",
  "hero.kicker": "Cocinar, más fácil",
  "hero.title": "Deja de preguntarte qué cocinar cada noche.",
  "hero.subtitle":
    "Consigue una semana completa de comidas y una lista de la compra en menos de 30 segundos — con precios de tus tiendas locales y la cesta más barata marcada.",
  "hero.cta": "Planificar mi semana",
  "hero.sample": "Generar un plan de ejemplo",
  "hero.freePreview": "Vista previa gratis — sin registro",
  "hero.pricesFrom": "Precios desde",
  "hero.perMonth": "/mes",
  "menu.suffix": "menú",
  "menu.subtitle": "Pensado también para pantallas pequeñas",
  "pricing.title": "Elige el plan que se paga solo",
  "pricing.subtitle":
    "La mayoría de los miembros ahorran más en su compra semanal de lo que cuesta la suscripción.",
  "pricing.mostPopular": "El más popular",
  "pricing.bestValue": "Mejor valor para familias",
  "pricing.guarantee": "Cancela cuando quieras. Garantía de devolución de 14 días.",
  "footer.tagline":
    "Planificación de comidas cálida y práctica, con tiendas locales, seguimiento y listas de compra para la vida real.",
};

const it: Dict = {
  "nav.chooseMeals": "Scegli i piatti",
  "nav.localShops": "Negozi locali",
  "nav.saveProgress": "Salva i progressi",
  "nav.getStarted": "Inizia",
  "nav.login": "Accedi",
  "nav.signup": "Registrati",
  "nav.myPlan": "Il mio piano",
  "nav.logout": "Esci",
  "hero.kicker": "Cucinare, semplicemente",
  "hero.title": "Smetti di chiederti cosa cucinare ogni sera.",
  "hero.subtitle":
    "Una settimana completa di pasti e la lista della spesa in meno di 30 secondi — con i prezzi dei negozi locali e il carrello più economico evidenziato.",
  "hero.cta": "Pianifica la settimana",
  "hero.sample": "Genera un piano di esempio",
  "hero.freePreview": "Anteprima gratuita — senza registrazione",
  "hero.pricesFrom": "Prezzi da",
  "hero.perMonth": "/mese",
  "menu.suffix": "menù",
  "menu.subtitle": "Pensato anche per schermi piccoli",
  "pricing.title": "Scegli il piano che si ripaga da solo",
  "pricing.subtitle":
    "La maggior parte dei membri risparmia sulla spesa settimanale più del costo dell'abbonamento.",
  "pricing.mostPopular": "Il più popolare",
  "pricing.bestValue": "Miglior valore per le famiglie",
  "pricing.guarantee": "Disdici quando vuoi. Garanzia di rimborso di 14 giorni.",
  "footer.tagline":
    "Pianificazione dei pasti calda e pratica, con negozi locali, monitoraggio e liste della spesa per la vita reale.",
};

const DICTS: Record<LanguageCode, Dict> = { en, fr, de, es, it };

export function translate(lang: LanguageCode, key: string): string {
  return DICTS[lang][key] ?? en[key] ?? key;
}
