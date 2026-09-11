"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { conditions } from "@/content/conditions";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/dr-thomas-santucci" },
  { label: "Conditions", href: "/conditions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Programs", href: "/programs" },
  { label: "Virtual Program", href: "/programs/virtual" },
] as const;

const BOOK_HREF = "/start";

export default function Nav() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);

  // The Conditions hub page's hero is light, not the dark video used
  // elsewhere — the header can't fade in from transparent there (white nav
  // text disappears against a white background), so it stays permanently in
  // its "scrolled" solid state.
  const isLightHero = pathname === "/conditions";

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 80],
    isLightHero
      ? ["rgba(11, 18, 32, 0.96)", "rgba(11, 18, 32, 0.96)"]
      : ["rgba(11, 18, 32, 0)", "rgba(11, 18, 32, 0.96)"],
  );
  const boxShadow = useTransform(
    scrollY,
    [0, 80],
    isLightHero
      ? [
          "0 10px 30px -18px rgba(11, 18, 32, 0.55)",
          "0 10px 30px -18px rgba(11, 18, 32, 0.55)",
        ]
      : [
          "0 0 0 0 rgba(11, 18, 32, 0)",
          "0 10px 30px -18px rgba(11, 18, 32, 0.55)",
        ],
  );
  const borderColor = useTransform(
    scrollY,
    [0, 80],
    isLightHero
      ? ["rgba(36, 50, 71, 0.6)", "rgba(36, 50, 71, 0.6)"]
      : ["rgba(217, 210, 194, 0)", "rgba(36, 50, 71, 0.6)"],
  );

  useEffect(() => {
    const id = requestAnimationFrame(() => setMobileOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Focus trap + Escape + scroll lock + focus restoration while the mobile drawer is open.
  useEffect(() => {
    if (!mobileOpen) return;

    const previousActive = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const drawer = drawerRef.current;
    const hamburger = hamburgerRef.current;
    const focusables = drawer
      ? Array.from(
          drawer.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const focusFrame = requestAnimationFrame(() => first?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (e.key !== "Tab" || focusables.length === 0) return;
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !drawer?.contains(active))) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && (active === last || !drawer?.contains(active))) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const restore = hamburger ?? previousActive;
      requestAnimationFrame(() => restore?.focus());
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ backgroundColor, boxShadow, borderBottomColor: borderColor }}
        className="fixed inset-x-0 top-0 z-[60] border-b border-transparent text-paper backdrop-blur-[2px]"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3.5 sm:gap-3 sm:px-5 sm:py-4 lg:gap-4 lg:px-8 xl:gap-6 xl:px-10">
          <Link
            href="/"
            aria-label="NeuroIntegrative Care of Los Gatos home"
            className="flex min-w-0 shrink items-center gap-1.5 sm:gap-3"
          >
            <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-paper/25 sm:h-10 sm:w-10">
              <Image
                src="/images/logo/mark-square.webp"
                alt=""
                fill
                sizes="40px"
                priority
                className="object-cover"
              />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate font-serif text-[9px] tracking-[0.01em] text-paper sm:text-[13px] sm:tracking-[0.02em] xl:text-[15px]">
                NEUROINTEGRATIVE CARE
              </span>
              <span className="mt-1 whitespace-nowrap font-mono font-medium text-[11px] uppercase tracking-[0.16em] text-amber-b sm:text-[12px] sm:tracking-[0.18em]">
                Los Gatos
              </span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-0 xl:gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              if (item.label === "About") {
                return (
                  <AboutNavItem key={item.href} href={item.href} active={active} />
                );
              }
              if (item.label === "Conditions") {
                return (
                  <ConditionsNavItem
                    key={item.href}
                    href={item.href}
                    active={active}
                  />
                );
              }
              return (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative inline-block whitespace-nowrap px-2 py-2 text-[13px] transition-colors xl:px-3 xl:text-sm ${
                      active ? "text-paper" : "text-paper/75 hover:text-paper"
                    }`}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-amber-b xl:inset-x-3"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 32,
                        }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
            <StartHereButton />
            <button
              ref={hamburgerRef}
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10 sm:h-10 sm:w-10 lg:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="nav-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              key="nav-drawer"
              id="mobile-nav-drawer"
              ref={drawerRef as React.RefObject<HTMLElement>}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              initial={{ x: "100%", opacity: 0.4 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0.2 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed right-0 top-0 z-50 flex h-full w-[86vw] max-w-sm flex-col bg-ink px-8 pb-10 pt-24 text-paper shadow-2xl lg:hidden"
            >
              <p className="mb-6 font-mono font-medium text-[12px] uppercase tracking-[0.18em] text-amber-b">
                Menu
              </p>
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => {
                  const active = isActive(item.href);
                  if (item.label === "About") {
                    return (
                      <AboutAccordionItem
                        key={item.href}
                        href={item.href}
                        active={active}
                        index={i}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    );
                  }
                  if (item.label === "Conditions") {
                    return (
                      <ConditionsAccordionItem
                        key={item.href}
                        href={item.href}
                        active={active}
                        index={i}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    );
                  }
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.035,
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`block border-b border-rule-d py-4 font-serif text-2xl transition-colors ${
                          active
                            ? "text-amber-b"
                            : "text-paper hover:text-amber-b"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function StartHereButton() {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 22 }}
      className="shrink-0"
    >
      <Link
        href={BOOK_HREF}
        className="group relative inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-gradient-to-r from-amber to-amber-b px-2 py-1.5 text-[10px] font-medium tracking-tight text-ink shadow-[0_6px_18px_-10px_rgba(232,160,32,0.75)] transition-shadow duration-300 hover:shadow-[0_14px_32px_-10px_rgba(232,160,32,0.9)] sm:px-4 sm:py-2 sm:text-xs xl:px-5 xl:py-2.5 xl:text-sm"
      >
        <span className="relative z-10">Schedule Your Consultation</span>
      </Link>
    </motion.div>
  );
}

interface ConditionsNavItemProps {
  href: string;
  active: boolean;
}

// Desktop dropdown: hover OR click reveals the panel; clicking the label
// itself still navigates to /conditions (additive, not a replacement).
// hoverOpen and clickOpen are tracked independently — a real mouse click is
// always preceded by a mouseenter, so a single toggle flag would make the
// click immediately re-close what hover just opened.
function ConditionsNavItem({ href, active }: ConditionsNavItemProps) {
  const [hoverOpen, setHoverOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const open = hoverOpen || clickOpen;
  const itemRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setHoverOpen(false);
      setClickOpen(false);
    }, 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoverOpen(false);
        setClickOpen(false);
      }
    };
    const onClickAway = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setHoverOpen(false);
        setClickOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <li
      ref={itemRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setHoverOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <span className="relative inline-flex items-center">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`relative inline-block whitespace-nowrap py-2 pl-2 pr-1 text-[13px] transition-colors xl:pl-3 xl:text-sm ${
            active ? "text-paper" : "text-paper/75 hover:text-paper"
          }`}
        >
          Conditions
          {active && (
            <motion.span
              layoutId="nav-active-underline"
              className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-amber-b xl:inset-x-3"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="conditions-nav-panel"
          aria-label="Toggle conditions menu"
          onClick={() => setClickOpen((v) => !v)}
          className={`flex items-center px-1 py-2 pr-2 transition-colors xl:pr-3 ${
            active ? "text-paper" : "text-paper/75 hover:text-paper"
          }`}
        >
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="conditions-nav-panel"
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-10 mt-2 w-[19rem] rounded-2xl border border-rule bg-paper p-3 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.35)]"
          >
            <ul>
              {conditions.map((sector) => (
                <li key={sector.slug}>
                  <Link
                    href={`/conditions/${sector.slug}`}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 font-serif text-[15px] text-ink transition-colors hover:bg-amber-soft/50 hover:text-amber"
                  >
                    {sector.name}
                  </Link>
                  {sector.subConditions && sector.subConditions.length > 0 && (
                    <ul>
                      {sector.subConditions.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/conditions/${sector.slug}/${sub.slug}`}
                            role="menuitem"
                            className="block rounded-lg py-1.5 pl-7 pr-3 text-[13px] text-muted transition-colors hover:bg-amber-soft/40 hover:text-amber"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

interface ConditionsAccordionItemProps {
  href: string;
  active: boolean;
  index: number;
  onNavigate: () => void;
}

// Mobile drawer accordion: expands in place rather than a hover dropdown.
function ConditionsAccordionItem({
  href,
  active,
  index,
  onNavigate,
}: ConditionsAccordionItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.08 + index * 0.035,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-rule-d"
    >
      <div className="flex items-center justify-between py-4">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={`font-serif text-2xl transition-colors ${
            active ? "text-amber-b" : "text-paper hover:text-amber-b"
          }`}
        >
          Conditions
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="conditions-accordion-panel"
          aria-label={expanded ? "Collapse conditions list" : "Expand conditions list"}
          onClick={() => setExpanded((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10"
        >
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="conditions-accordion-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-4">
              {conditions.map((sector) => (
                <li key={sector.slug} className="py-1">
                  <Link
                    href={`/conditions/${sector.slug}`}
                    onClick={onNavigate}
                    className="block py-1.5 font-serif text-lg text-paper/90 transition-colors hover:text-amber-b"
                  >
                    {sector.name}
                  </Link>
                  {sector.subConditions && sector.subConditions.length > 0 && (
                    <ul>
                      {sector.subConditions.map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/conditions/${sector.slug}/${sub.slug}`}
                            onClick={onNavigate}
                            className="block py-1.5 pl-5 text-sm text-paper/60 transition-colors hover:text-amber-b"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

const ABOUT_LINKS = [
  {
    label: "About Dr. Thomas Santucci",
    href: "/about/dr-thomas-santucci",
    description: "Meet the doctor & credentials",
  },
  {
    label: "Blog",
    href: "/blog",
    description: "Articles on joint pain & nerve health",
  },
] as const;

interface AboutNavItemProps {
  href: string;
  active: boolean;
}

// Desktop dropdown listing the About sub-pages, mirrors ConditionsNavItem.
function AboutNavItem({ href, active }: AboutNavItemProps) {
  const [hoverOpen, setHoverOpen] = useState(false);
  const [clickOpen, setClickOpen] = useState(false);
  const open = hoverOpen || clickOpen;
  const itemRef = useRef<HTMLLIElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setHoverOpen(false);
      setClickOpen(false);
    }, 120);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setHoverOpen(false);
        setClickOpen(false);
      }
    };
    const onClickAway = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setHoverOpen(false);
        setClickOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, [open]);

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  return (
    <li
      ref={itemRef}
      className="relative"
      onMouseEnter={() => {
        cancelClose();
        setHoverOpen(true);
      }}
      onMouseLeave={scheduleClose}
    >
      <span className="relative inline-flex items-center">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          className={`relative inline-block whitespace-nowrap py-2 pl-2 pr-1 text-[13px] transition-colors xl:pl-3 xl:text-sm ${
            active ? "text-paper" : "text-paper/75 hover:text-paper"
          }`}
        >
          About
          {active && (
            <motion.span
              layoutId="nav-active-underline"
              className="absolute inset-x-2 -bottom-0.5 h-[2px] rounded-full bg-amber-b xl:inset-x-3"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
            />
          )}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="about-nav-panel"
          aria-label="Toggle about menu"
          onClick={() => setClickOpen((v) => !v)}
          className={`flex items-center px-1 py-2 pr-2 transition-colors xl:pr-3 ${
            active ? "text-paper" : "text-paper/75 hover:text-paper"
          }`}
        >
          <ChevronDown
            size={14}
            aria-hidden="true"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </span>

      <AnimatePresence>
        {open && (
          <motion.div
            id="about-nav-panel"
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-10 mt-2 w-[14rem] rounded-2xl border border-rule bg-paper p-3 shadow-[0_24px_60px_-24px_rgba(11,18,32,0.35)]"
          >
            <ul>
              {ABOUT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    role="menuitem"
                    className="block rounded-lg px-3 py-2 transition-colors hover:bg-amber-soft/50"
                  >
                    <span className="block font-serif text-[15px] text-ink">
                      {link.label}
                    </span>
                    <span className="block text-[12px] text-muted">
                      {link.description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

interface AboutAccordionItemProps {
  href: string;
  active: boolean;
  index: number;
  onNavigate: () => void;
}

// Mobile drawer accordion counterpart to AboutNavItem.
function AboutAccordionItem({ href, active, index, onNavigate }: AboutAccordionItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, x: 18 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        delay: 0.08 + index * 0.035,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-rule-d"
    >
      <div className="flex items-center justify-between py-4">
        <Link
          href={href}
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={`font-serif text-2xl transition-colors ${
            active ? "text-amber-b" : "text-paper hover:text-amber-b"
          }`}
        >
          About
        </Link>
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="about-accordion-panel"
          aria-label={expanded ? "Collapse about menu" : "Expand about menu"}
          onClick={() => setExpanded((v) => !v)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-paper/25 text-paper transition-colors hover:bg-paper/10"
        >
          <ChevronDown
            size={16}
            aria-hidden="true"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id="about-accordion-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="pb-4">
              {ABOUT_LINKS.map((link) => (
                <li key={link.href} className="py-1">
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    className="block py-1.5 font-serif text-lg text-paper/90 transition-colors hover:text-amber-b"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}
