export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <p className="mt-4 text-muted">
        Questions, feedback or a supermarket price that looks off? We&apos;d
        love to hear from you.
      </p>
      <div className="mt-8 rounded-2xl border border-card-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted">Email us at</p>
        <a
          href="mailto:hello@chef.ai"
          className="mt-1 block text-lg font-semibold text-primary"
        >
          hello@chef.ai
        </a>
        <p className="mt-4 text-sm text-muted">
          We aim to reply within two working days.
        </p>
      </div>
    </div>
  );
}
