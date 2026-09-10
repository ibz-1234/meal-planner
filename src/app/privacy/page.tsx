export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm text-muted">
        <p>
          Chef.ai is designed to be private by default. Your meal plans,
          preferences, favourites and login details are stored locally in your
          own browser — we do not send them to a server or share them with
          anyone.
        </p>
        <p>
          We do not use tracking cookies or sell data to third parties. The
          only data that leaves your device is an anonymous request to a public
          exchange-rate service when you change currency.
        </p>
        <p>
          Clearing your browser storage removes all Chef.ai data from your
          device. If you have questions, get in touch via the contact page.
        </p>
      </div>
    </div>
  );
}
