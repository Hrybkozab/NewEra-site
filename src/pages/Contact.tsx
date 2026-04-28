import { useRef, useState, useEffect, type FormEvent, type RefObject } from "react";
import {
  Mail,
  MessageSquare,
  Globe,
  Camera,
  Play,
  Gamepad2,
  Send,
  CheckCircle,
  MessageCircle
} from "lucide-react";

function useInView(ref: RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // Used for lightweight scroll-in animations on the form and FAQ blocks.
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

// Form options and FAQs live in arrays so the page content stays easy to edit.
const contactTypes = [
  { value: "tryout", label: "Player Tryout" },
  { value: "sponsorship", label: "Sponsorship / Partnership" },
  { value: "general", label: "General Question" }
];

const inquiryForms: Record<string, string> = {
  tryout: "contact-tryout",
  sponsorship: "contact-sponsorship",
  general: "contact-general"
};

const socials = [
  { icon: <Globe size={20} />, label: "Twitter / X", handle: "@NewEraGG", href: "#" },
  { icon: <Camera size={20} />, label: "Instagram", handle: "@neweraesports", href: "#" },
  { icon: <Play size={20} />, label: "YouTube", handle: "NewEra Esports", href: "#" },
  { icon: <Gamepad2 size={20} />, label: "Twitch", handle: "neweragg", href: "#" }
];

const faqs = [
  {
    q: "How do I apply for a tryout?",
    a: "Fill out the contact form and select 'Player Tryout'. Include your in-game tag, game experience, and tournament history. We review all applications within 7 days."
  },
  {
    q: "Are you looking for sponsors?",
    a: "Yes. We are open to partnerships with brands that align with our values. Reach out via the form or email partnershipsnewera@gmail.com."
  },
  {
    q: "How can I support the team?",
    a: "Follow us on social media, join our Discord, and watch our streams. Community support means everything to us."
  },
  {
    q: "Do you have a Discord server?",
    a: "Yes. Our Discord is the best place to connect with the team and community."
  }
];

type FormDataState = {
  name: string;
  email: string;
  type: string;
  tag: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormDataState, string>>;

const initialFormData: FormDataState = {
  name: "",
  email: "",
  type: "general",
  tag: "",
  message: ""
};

function validateForm(formData: FormDataState): FormErrors {
  const errors: FormErrors = {};

  if (formData.name.trim().length < 2) {
    errors.name = "Please enter at least 2 characters for your name.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (formData.type === "tryout" && !/^#?[A-Za-z0-9]{3,}$/.test(formData.tag.trim())) {
    errors.tag = "Please enter a valid in-game tag for the tryout request.";
  }

  if (formData.message.trim().length < 20) {
    errors.message = "Your message should be at least 20 characters long.";
  }

  return errors;
}

export default function Contact() {
  const formRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef);
  const faqInView = useInView(faqRef);

  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedInPreview, setSubmittedInPreview] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setHasTriedSubmit(true);
    setSubmitError("");

    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const typeLabel =
      contactTypes.find((item) => item.value === formData.type)?.label || "General Question";
    const formName = inquiryForms[formData.type] || inquiryForms.general;
    const payload = new URLSearchParams();

    payload.append("form-name", formName);
    payload.append("name", formData.name.trim());
    payload.append("email", formData.email.trim());
    payload.append("inquiryType", typeLabel);
    payload.append("message", formData.message.trim());

    if (formData.type === "tryout") {
      payload.append("tag", formData.tag.trim());
    }

    const isLocalPreview =
      window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (isLocalPreview) {
      setSubmittedInPreview(true);
      setSubmitted(true);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: payload.toString()
      });

      if (!response.ok) {
        throw new Error("Could not send the form.");
      }

      setSubmitted(true);
    } catch {
      setSubmitError("The form could not be sent right now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormDataState, value: string) => {
    const nextFormData = { ...formData, [field]: value };

    if (field === "type" && value !== "tryout") {
      nextFormData.tag = "";
    }

    setFormData(nextFormData);

    if (hasTriedSubmit) {
      setFormErrors(validateForm(nextFormData));
    }
  };

  const getFieldClassName = (field: keyof FormDataState) => {
    const hasError = Boolean(formErrors[field]) && hasTriedSubmit;

    return `w-full rounded-xl border px-4 py-3 text-sm text-white placeholder-gray-600 transition-all focus:outline-none ${
      hasError
        ? "border-red-500/60 bg-red-500/10 focus:border-red-400"
        : "border-white/10 bg-white/5 focus:border-[#00ff87]/50 focus:bg-[#00ff87]/5"
    }`;
  };

  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden py-28 md:py-36">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1600&h=800&fit=crop"
            alt="Contact hero"
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(#00ff87 1px, transparent 1px), linear-gradient(90deg, #00ff87 1px, transparent 1px)",
            backgroundSize: "60px 60px"
          }}
        />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">Get In Touch</p>
          <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl">
            Contact <span className="text-[#00ff87]">Us</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Tryouts, partnerships, or general questions - we read every serious message and route it to the right inbox.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div
            ref={formRef}
            className={`grid gap-12 transition-all duration-700 md:grid-cols-2 lg:gap-20 ${
              formInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <div>
              <h2 className="mb-8 text-3xl font-black">Send a Message</h2>
              {submitted ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-[#00ff87]/30 bg-white/3 py-16 text-center">
                  <CheckCircle size={48} className="mb-4 text-[#00ff87]" />
                  <h3 className="mb-2 text-2xl font-black text-white">Message Sent!</h3>
                  <p className="text-gray-400">
                    {submittedInPreview
                      ? "You are in local preview mode. The form logic is valid, but real delivery works after deploy on Netlify."
                      : "Your request was sent through the website and routed to the correct NewEra inbox."}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setSubmittedInPreview(false);
                      setFormData(initialFormData);
                      setFormErrors({});
                      setHasTriedSubmit(false);
                      setSubmitError("");
                    }}
                    className="mt-6 text-sm font-bold text-[#00ff87] hover:underline"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="bot-field" />
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="John Doe"
                        className={getFieldClassName("name")}
                      />
                      {hasTriedSubmit && formErrors.name && (
                        <p className="mt-2 text-xs font-medium text-red-400">{formErrors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(event) => updateField("email", event.target.value)}
                        placeholder="you@example.com"
                        className={getFieldClassName("email")}
                      />
                      {hasTriedSubmit && formErrors.email && (
                        <p className="mt-2 text-xs font-medium text-red-400">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(event) => updateField("type", event.target.value)}
                      className="w-full cursor-pointer appearance-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-all focus:border-[#00ff87]/50 focus:outline-none"
                    >
                      {contactTypes.map((type) => (
                        <option key={type.value} value={type.value} className="bg-gray-900">
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {formData.type === "tryout" && (
                    <div>
                      <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                        In-Game Tag
                      </label>
                      <input
                        type="text"
                        value={formData.tag}
                        onChange={(event) => updateField("tag", event.target.value)}
                        placeholder="#XXXXXXXX"
                        className={getFieldClassName("tag")}
                      />
                      {hasTriedSubmit && formErrors.tag && (
                        <p className="mt-2 text-xs font-medium text-red-400">{formErrors.tag}</p>
                      )}
                      {!hasTriedSubmit && (
                        <p className="mt-2 text-xs text-gray-600">Required only for Player Tryout requests.</p>
                      )}
                    </div>
                  )}

                  <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(event) => updateField("message", event.target.value)}
                      placeholder="Tell us what is on your mind..."
                      className={`${getFieldClassName("message")} resize-none`}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      {hasTriedSubmit && formErrors.message ? (
                        <p className="text-xs font-medium text-red-400">{formErrors.message}</p>
                      ) : (
                        <p className="text-xs text-gray-600">Minimum 20 characters for a serious inquiry.</p>
                      )}
                      <p className="text-xs text-gray-600">{formData.message.trim().length} / 20+</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#00ff87] px-8 py-4 text-sm font-black text-black shadow-lg shadow-[#00ff87]/30 transition-all duration-300 hover:scale-[1.02] hover:bg-white"
                  >
                    <Send size={16} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                  {submitError && <p className="text-sm font-medium text-red-400">{submitError}</p>}
                </form>
              )}
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-3xl font-black">Connect With Us</h2>
                <p className="mb-8 leading-relaxed text-gray-400">
                  We are most active on social media and Discord. For business inquiries, email is the fastest way to reach us.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Partnerships", email: "partnershipsnewera@gmail.com", icon: <Mail size={16} /> },
                  { label: "Tryouts", email: "tryoutsnewera@gmail.com", icon: <Mail size={16} /> },
                  { label: "General", email: "genenewera@gmail.com", icon: <MessageSquare size={16} /> }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/3 p-4 transition-all hover:border-[#00ff87]/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-[#00ff87]/20 bg-[#00ff87]/10 text-[#00ff87]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-500">{item.label}</div>
                      <div className="text-sm font-semibold text-white">{item.email}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://discord.gg/rGVVdZF8"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-[#5865F2]/30 bg-[#5865F2]/10 p-5 transition-all hover:bg-[#5865F2]/20"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#5865F2]">
                  <MessageCircle size={22} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-white">Join Our Discord</div>
                  <div className="text-sm text-gray-500">Chat with the team and community</div>
                </div>
                <div className="ml-auto text-[#5865F2] transition-transform group-hover:translate-x-1">-&gt;</div>
              </a>

              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">Follow Us</h3>
                <div className="grid grid-cols-2 gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-3 transition-all hover:border-white/20 hover:bg-white/5"
                    >
                      <div className="text-gray-400 transition-colors group-hover:text-white">{social.icon}</div>
                      <div>
                        <div className="text-xs font-bold text-white">{social.label}</div>
                        <div className="text-xs text-gray-600">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 bg-[#050505] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-[#00ff87]">FAQ</p>
            <h2 className="text-4xl font-black">Common Questions</h2>
          </div>
          <div ref={faqRef} className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className={`overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-all duration-500 ${
                  faqInView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                } ${openFaq === index ? "border-[#00ff87]/30" : "hover:border-white/20"}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  className="flex min-h-[44px] w-full items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
>
                  <span className="pr-4 font-bold text-white">{faq.q}</span>
                  <span className="flex-shrink-0 text-[#00ff87]">{openFaq === index ? "-" : "+"}</span>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-sm leading-relaxed text-gray-400">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
