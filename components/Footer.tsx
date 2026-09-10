import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaSpotify } from "react-icons/fa6";
import { cityLocations } from "@/content/locations";
import Reveal from "./Reveal";

const QUICK_LINKS = [
  { label: "Conditions", href: "/conditions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Programs", href: "/programs" },
  { label: "Virtual Program", href: "/programs/virtual" },
  { label: "Patient Stories", href: "/results" },
  { label: "Blog", href: "/blog" },
  { label: "About Dr. Thomas Santucci", href: "/about/dr-thomas-santucci" },
  { label: "Start Here", href: "/start" },
  { label: "Regenerative Services", href: "/out-of-town" },
  { label: "Sitemap", href: "/sitemap" },
] as const;

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/advancedregenmedical/",
    Icon: FaFacebookF,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/advancedregenmedical/?hl=en",
    Icon: FaInstagram,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@advancedregenmedical9879",
    Icon: FaYoutube,
  },
  {
    label: "Spotify",
    href: "https://open.spotify.com/show/3f2IDQIl4ndagua4b8vzXw",
    Icon: FaSpotify,
  },
] as const;

const PHONE_DISPLAY = "(408) 871-8222";
const PHONE_HREF = "tel:+14088718222";
const MAP_QUERY = "20+S+Santa+Cruz+Ave,+Suite+101,+Los+Gatos,+CA+95030";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Visit
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-paper">
              NeuroIntegrative Care
              <br />
              <span className="text-paper/70">of Los Gatos</span>
            </h2>

            <address className="mt-8 space-y-5 not-italic text-paper/85">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 shrink-0 text-amber-b" aria-hidden="true" />
                <div>
                  <p>20 S Santa Cruz Ave, Suite 101</p>
                  <p>Los Gatos, CA 95030</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="mt-1 shrink-0 text-amber-b" aria-hidden="true" />
                <a
                  href={PHONE_HREF}
                  className="transition-colors hover:text-amber-b"
                >
                  {PHONE_DISPLAY}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-1 shrink-0 text-amber-b" aria-hidden="true" />
                <div>
                  <p>Tue &amp; Thu</p>
                  <p className="text-paper/70">9:30–3:00</p>
                </div>
              </div>
            </address>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-4">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Explore
            </p>
            <ul className="mt-6 columns-2 gap-x-6">
              {QUICK_LINKS.map((link) => (
                <li key={link.href} className="mb-3 break-inside-avoid">
                  <Link
                    href={link.href}
                    className="text-sm text-paper/85 transition-colors hover:text-amber-b"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                Follow
              </p>
              <ul className="mt-4 flex items-center gap-3">
                {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-rule-d text-paper/85 transition-all hover:border-amber-b hover:text-amber-b"
                    >
                      <Icon size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240} className="lg:col-span-3">
            <p className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
              Find Us
            </p>
            <div className="mt-6 overflow-hidden rounded-lg border border-rule-d">
              {/* TODO: swap in production Google Maps embed URL / API key. */}
              <iframe
                title="Map to NeuroIntegrative Care of Los Gatos"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-56 w-full border-0 grayscale-[35%] contrast-[0.95]"
              />
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={300}
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-rule-d pt-8"
        >
          <Link
            href="/locations"
            className="font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b transition-colors hover:text-paper"
          >
            Areas We Serve
          </Link>
          {cityLocations.map((city) => (
            <span key={city.slug} className="flex items-center gap-3">
              <span aria-hidden="true" className="text-paper/30">·</span>
              <Link
                href={`/locations/${city.slug}`}
                className="text-sm text-paper/70 transition-colors hover:text-amber-b"
              >
                {city.name}
              </Link>
            </span>
          ))}
        </Reveal>

        <Reveal
          delay={360}
          className="mt-8 flex flex-col gap-4 border-t border-rule-d pt-8 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between"
        >
          <p>
            &copy; {new Date().getFullYear()} NeuroIntegrative Care of Los Gatos. All rights reserved.
          </p>
          <p className="max-w-md sm:text-right">
            Information on this site is educational and not a substitute for medical advice.
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
