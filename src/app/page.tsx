"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Database,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Handshake,
  LineChart,
  Mail,
  MapPin,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

/**
 * Single-page collaborator website for "Institutions in Your Pocket".
 *
 * How to customize quickly:
 * 1) Update PROJECT + CONTACT blocks.
 * 2) Replace placeholder text in SECTIONS.
 * 3) Add/remove "Use cases" and "Opportunities" cards.
 * 4) Wire the contact form to your backend (currently mailto).
 */
const PROJECT = {
  name: "Institutions in Your Pocket",
  tagline:
    "AI as legal infrastructure: lowering the cost of accessing law where institutions are stretched.",
  oneLiner:
    "We study whether AI-based legal tools can reduce informational frictions in land and property disputes during periods of institutional transition.",
  areas: [
    "Institutional economics",
    "Property rights & land markets",
    "Legal empowerment",
    "Field experiments (RCTs)",
    "AI & access to justice",
    "Development economics",
  ],
  highlights: [
    {
      title: "Institutional gap",
      desc: "Economic change expands de jure rights faster than citizens’ de facto access and understanding.",
      icon: LineChart,
    },
    {
      title: "AI as infrastructure",
      desc: "AI delivers standardized, context-specific legal information at scale, complementing courts and legal aid.",
      icon: ShieldCheck,
    },
    {
      title: "Causal evidence",
      desc: "We evaluate impacts using a Kenyan field experiment focused on land and property disputes.",
      icon: Handshake,
    },
  ],
};

const CONTACT = {
  emails: [
    "felix.hasselblad@iies.su.se",
    "matteo.pianella@iies.su.se",
  ],
  affiliation: "Stockholm University / IIES",
  location: "Stockholm, Sweden",
  links: {
    website: "https://institutionsinyourpocket.org",
    github: "https://github.com/institutions-in-your-pocket",
    preprint: "https://institutionsinyourpocket.org/preprint",
  },
};

const SECTIONS = {
  about: {
    title: "Project overview",
    bullets: [
      "Periods of urbanization and formalization increase land values faster than institutional capacity to interpret and enforce property rights.",
      "In Kenya, overlapping customary, colonial, and statutory systems generate uncertainty around ownership, boundaries, and inheritance.",
      "Institutions in Your Pocket studies whether AI-based legal tools can reduce these informational frictions at scale.",
    ],
  },
  why: {
    title: "Why land and property disputes",
    bullets: [
      "Most disputes are informational before they become adversarial: users lack clarity about claim validity and procedures.",
      "Formalization efforts (titling, registration, digitization) often surface inconsistencies before resolving them.",
      "Affordable legal assistance and legal interpretation remain scarce precisely when stakes are rising.",
    ],
  },
  principles: {
    title: "Research approach",
    bullets: [
      "AI as a complement to institutions, not a substitute for courts or legal professionals.",
      "Focus on early-stage dispute navigation and procedural understanding.",
      "Partnerships with local legal-aid organizations to reach users far from formal law.",
      "The AI tool is developed by a third-party partner; our role centers on research, evaluation, and safeguards.",
      "Evaluation centered on access, resolution pathways, and institutional engagement.",
    ],
  },
};

const USE_CASES = [
  {
    title: "Citizen-facing land law guidance",
    subtitle: "Kenyan land and property disputes",
    tags: ["Citizens", "Rural & peri-urban", "Land"],
    icon: Scale,
    points: [
      "Explain whether a land or property claim is potentially valid under Kenyan law.",
      "Clarify required documentation, registries, and administrative steps.",
      "Help users choose between informal resolution, legal aid, or formal courts.",
    ],
  },
  {
    title: "Support for legal aid organizations",
    subtitle: "Paralegals and community outreach",
    tags: ["NGOs", "Legal aid", "Paralegals"],
    icon: FileText,
    points: [
      "Standardized explanations of land law across staff and locations.",
      "Structured intake and triage of land and property cases.",
      "Reduced time spent on repetitive legal explanations.",
    ],
  },
  {
    title: "Institutional evaluation",
    subtitle: "Field experiment in Kenya",
    tags: ["RCT", "Institutions", "Development"],
    icon: Database,
    points: [
      "Measure changes in legal understanding, dispute escalation, and resolution paths.",
      "Study how AI affects engagement with courts and land offices.",
      "Estimate heterogeneous effects across tenure systems and locations.",
    ],
  },
];

const OPPORTUNITIES = [
  {
    title: "Local legal-aid partnerships",
    who: "NGOs and community organizations",
    desc: "Deploy the AI tool with paralegals and clients facing land and property disputes.",
    bullets: [
      "Access to a customized legal AI tool",
      "Joint design around local procedures and user needs",
      "Shared evidence on user outcomes and dispute pathways",
    ],
    icon: Users,
  },
  {
    title: "Policy and institutional partners",
    who: "Courts, land offices, public agencies",
    desc: "Study how AI-based legal information changes demand for and interaction with institutions.",
    bullets: [
      "Evidence on bottlenecks in property-rights enforcement",
      "Insights into formalization and digitization reforms",
      "Scalable measurement of access-to-justice gaps",
    ],
    icon: Handshake,
  },
  {
    title: "Academic collaboration",
    who: "Researchers in economics, law, and development",
    desc: "Joint work on institutions, property rights, and AI-enabled legal infrastructure.",
    bullets: [
      "Shared experimental design and data",
      "Co-authored papers and policy briefs",
      "Extensions to other countries and institutional domains",
    ],
    icon: GraduationCap,
  },
];

const FAQ = [
  {
    q: "What makes this different from a generic chatbot?",
    a: "We design institution-specific workflows, logging, and evaluation. The goal is not just helpful answers, but measurable improvements in access, consistency, and outcomes under real constraints.",
  },
  {
    q: "How do you handle privacy and sensitive data?",
    a: "We use data minimization, role-based access, redaction where possible, and prefer secure deployment options. We set up audit logs and governance processes consistent with the host institution.",
  },
  {
    q: "What does a typical collaboration look like?",
    a: "Usually: (1) discovery + workflow mapping, (2) shadow-mode pilot, (3) instrumented deployment with agreed safeguards, (4) evaluation (often randomized), (5) iteration and potential scale-up.",
  },
  {
    q: "Can you share code or materials?",
    a: "Yes. We can share non-sensitive components and reproducible evaluation code. For sensitive contexts, sharing is governed by data access agreements.",
  },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function SectionHeader({
  icon: Icon,
  title,
  subtitle,
  right,
}: {
  icon: React.ElementType;
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 rounded-2xl border bg-background p-2 shadow-sm">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-muted-foreground md:text-base">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
      {right ? <div className="hidden md:block">{right}</div> : null}
    </div>
  );
}

function PillRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Badge key={t} variant="secondary" className="rounded-xl">
          {t}
        </Badge>
      ))}
    </div>
  );
}

function Anchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-28" />;
}

export default function InstitutionsInYourPocketSite() {
  const [query, setQuery] = useState("");
  const filteredUseCases = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return USE_CASES;
    return USE_CASES.filter((u) => {
      const hay = [u.title, u.subtitle, ...(u.tags || []), ...(u.points || [])]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const navItems = [
    { label: "Overview", href: "#overview" },
    { label: "Use cases", href: "#use-cases" },
    { label: "Collaboration", href: "#collaboration" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className={cn("min-h-screen bg-background text-foreground")}>
      <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="rounded-2xl border bg-background p-2 shadow-sm">
              <Image
                src="/stockholm-university-logo.png"
                alt="Stockholm University logo"
                width={20}
                height={20}
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{PROJECT.name}</div>
              <div className="text-xs text-muted-foreground">
                Collaborator overview
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((it) => (
              <Button
                key={it.href}
                variant="ghost"
                className="rounded-2xl"
                asChild
              >
                <a href={it.href}>{it.label}</a>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button className="rounded-2xl" asChild>
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact
              </a>
            </Button>
          </div>
        </div>
      </div>

      <Anchor id="overview" />
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-16">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-3xl font-semibold tracking-tight md:text-5xl"
            >
              {PROJECT.tagline}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.06 }}
              className="mt-4 text-base text-muted-foreground md:text-lg"
            >
              {PROJECT.oneLiner}
            </motion.p>
            <div className="mt-5">
              <PillRow items={PROJECT.areas} />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button className="rounded-2xl" asChild>
                <a href="#collaboration">
                  Explore collaboration <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" className="rounded-2xl" asChild>
                <a href="#use-cases">
                  View use cases <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {PROJECT.highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <Card key={h.title} className="rounded-2xl shadow-sm">
                    <CardHeader className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="rounded-2xl border bg-background p-2 shadow-sm">
                          <Icon className="h-4 w-4" />
                        </div>
                        <CardTitle className="text-sm">{h.title}</CardTitle>
                      </div>
                      <CardDescription className="text-xs">
                        {h.desc}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>
          </div>
          <div className="md:col-span-5">
            <Card className="rounded-2xl shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">At a glance</CardTitle>
                <CardDescription>
                  Replace the placeholders with your project details.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3">
                  <div className="flex items-center justify-between gap-3 rounded-2xl border p-3">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">{CONTACT.location}</div>
                    </div>
                    <Badge variant="secondary" className="rounded-xl">
                      Base
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl border p-3">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">{CONTACT.affiliation}</div>
                    </div>
                    <Badge variant="secondary" className="rounded-xl">
                      Affiliation
                    </Badge>
                  </div>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <Button variant="outline" className="w-full rounded-2xl" asChild>
                    <a href={CONTACT.links.website} target="_blank" rel="noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Site
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full rounded-2xl" asChild>
                    <a href={CONTACT.links.github} target="_blank" rel="noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full rounded-2xl" asChild>
                    <a href={CONTACT.links.preprint} target="_blank" rel="noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      Paper
                    </a>
                  </Button>
                </div>
                <div className="rounded-2xl border p-3">
                  <div className="text-xs font-medium text-muted-foreground">
                    Suggested collaborator fit
                  </div>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                      High-volume processes (casework, forms, intake)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                      Clear rule base + documentation standards
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                      Appetite for measurement (logs, rubrics, audits)
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">{SECTIONS.about.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {SECTIONS.about.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">{SECTIONS.why.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {SECTIONS.why.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">
                {SECTIONS.principles.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {SECTIONS.principles.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Anchor id="use-cases" />
          <SectionHeader
            icon={Sparkles}
            title="Use cases"
            subtitle="Filter and reuse these modules when pitching to different collaborator types."
            right={
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search use cases"
                    className="w-72 rounded-2xl pl-9"
                  />
                </div>
              </div>
            }
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {filteredUseCases.map((u) => {
              const Icon = u.icon;
              return (
                <Card key={u.title} className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="rounded-2xl border bg-background p-2 shadow-sm">
                        <Icon className="h-4 w-4" />
                      </div>
                      <PillRow items={u.tags} />
                    </div>
                    <CardTitle className="mt-2 text-base">{u.title}</CardTitle>
                    <CardDescription>{u.subtitle}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {u.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 rounded-2xl border p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-sm font-medium">Add your artifacts</div>
                <div className="text-sm text-muted-foreground">
                  Link to a demo video, pre-analysis plan, or pilot memo.
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" className="rounded-2xl" asChild>
                  <a href="#">Demo video</a>
                </Button>
                <Button variant="outline" className="rounded-2xl" asChild>
                  <a href="#">Protocol</a>
                </Button>
                <Button variant="outline" className="rounded-2xl" asChild>
                  <a href="#">Data dictionary</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Anchor id="collaboration" />
          <SectionHeader
            icon={Handshake}
            title="Collaboration paths"
            subtitle="Choose the path that matches your organization."
          />
          <Tabs defaultValue="paths" className="mt-6">
            <TabsList className="rounded-2xl">
              <TabsTrigger value="paths" className="rounded-2xl">
                Opportunities
              </TabsTrigger>
              <TabsTrigger value="process" className="rounded-2xl">
                Typical process
              </TabsTrigger>
              <TabsTrigger value="requirements" className="rounded-2xl">
                What we need
              </TabsTrigger>
            </TabsList>
            <TabsContent value="paths" className="mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                {OPPORTUNITIES.map((o) => {
                  const Icon = o.icon;
                  return (
                    <Card key={o.title} className="rounded-2xl shadow-sm">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="rounded-2xl border bg-background p-2 shadow-sm">
                            <Icon className="h-4 w-4" />
                          </div>
                          <Badge variant="secondary" className="rounded-xl">
                            {o.who}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-base">
                          {o.title}
                        </CardTitle>
                        <CardDescription>{o.desc}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {o.bullets.map((b, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                              {b}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4">
                          <Button className="w-full rounded-2xl" asChild>
                            <a href="#contact">
                              Start a conversation{" "}
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            <TabsContent value="process" className="mt-4">
              <Card className="rounded-2xl shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">From idea to evidence</CardTitle>
                  <CardDescription>
                    A default sequence you can edit for your context.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ol className="grid gap-3 md:grid-cols-5">
                    {[
                      {
                        t: "1) Discovery",
                        d: "Workflow mapping, constraints, risks, success metrics.",
                      },
                      {
                        t: "2) Prototype",
                        d: "Task-specific prompts, retrieval, templates, guardrails.",
                      },
                      {
                        t: "3) Pilot",
                        d: "Shadow mode; training; usability and safety checks.",
                      },
                      {
                        t: "4) Evaluation",
                        d: "Instrumented deployment; often randomized; monitoring.",
                      },
                      {
                        t: "5) Scale",
                        d: "Iteration, governance, documentation, and handover.",
                      },
                    ].map((s) => (
                      <li key={s.t} className="rounded-2xl border p-3">
                        <div className="text-sm font-medium">{s.t}</div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {s.d}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <div className="mt-6 rounded-2xl border p-4">
                    <div className="text-sm font-medium">Evaluation outcomes</div>
                    <div className="mt-2 grid gap-3 text-sm text-muted-foreground md:grid-cols-3">
                      <div className="rounded-2xl border p-3">
                        <div className="font-medium text-foreground">
                          Productivity
                        </div>
                        <div className="mt-1">
                          Time per case, throughput, backlog reduction, handle time.
                        </div>
                      </div>
                      <div className="rounded-2xl border p-3">
                        <div className="font-medium text-foreground">Quality</div>
                        <div className="mt-1">
                          Rubric scoring, error rates, compliance, consistency.
                        </div>
                      </div>
                      <div className="rounded-2xl border p-3">
                        <div className="font-medium text-foreground">Equity</div>
                        <div className="mt-1">
                          Heterogeneous effects, distributional impacts, access gaps.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="requirements" className="mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Minimum requirements</CardTitle>
                    <CardDescription>
                      Needed to run a credible pilot + evaluation.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "A clear workflow (intake, triage, case handling, support)",
                        "Agreement on measurable outcomes + monitoring",
                        "A designated implementation counterpart",
                        "Data access plan (even if only aggregated logs)",
                        "Ethics and safeguarding protocols where needed",
                      ].map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="rounded-2xl shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base">Optional enhancements</CardTitle>
                    <CardDescription>
                      Adds power and interpretability to results.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {[
                        "Randomization at user/case/office level",
                        "Gold-standard rubric scoring on a sample of outputs",
                        "Longitudinal tracking of outcomes (appeals, resolution)",
                        "Survey modules for staff and users",
                        "Qualitative process tracing (interviews, observations)",
                      ].map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block h-2 w-2 rounded-full bg-foreground/60" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Anchor id="faq" />
          <SectionHeader
            icon={ShieldCheck}
            title="FAQ"
            subtitle="Drop these into grant proposals and partner memos."
          />
          <div className="mt-6">
            <Accordion type="single" collapsible>
              {FAQ.map((f, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="rounded-2xl border px-2"
                >
                  <AccordionTrigger className="text-left">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
          <Anchor id="contact" />
          <SectionHeader
            icon={Mail}
            title="Contact"
            subtitle="Reach us directly for collaboration or research inquiries."
          />
          <div className="mt-6 grid gap-4 md:grid-cols-12">
            <Card className="rounded-2xl shadow-sm md:col-span-5">
              <CardHeader>
                <CardTitle className="text-base">Email contacts</CardTitle>
                <CardDescription>Best for agencies, NGOs, and research groups.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {CONTACT.emails.map((email) => (
                  <div key={email} className="rounded-2xl border p-3">
                    <div className="text-xs text-muted-foreground">Email</div>
                    <div className="mt-1 text-sm font-medium">{email}</div>
                  </div>
                ))}
                <div className="rounded-2xl border p-3">
                  <div className="text-xs text-muted-foreground">Links</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button variant="outline" className="rounded-2xl" asChild>
                      <a
                        href={CONTACT.links.website}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Website
                      </a>
                    </Button>
                    <Button variant="outline" className="rounded-2xl" asChild>
                      <a
                        href={CONTACT.links.github}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl shadow-sm md:col-span-7">
              <CardHeader>
                <CardTitle className="text-base">Coordination note</CardTitle>
                <CardDescription>
                  The AI tool is developed by a third-party partner; our team focuses on
                  research design, evaluation, and governance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <div className="rounded-2xl border p-3">
                    We support partner scoping, workflow mapping, and evaluation
                    design while ensuring deployment governance and measurement.
                  </div>
                  <div className="rounded-2xl border p-3">
                    For sensitive contexts, data sharing and access are governed by
                    partner agreements and local protocols.
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 md:flex-row md:items-center">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {PROJECT.name}. Edit and deploy.
            </div>
            <div className="flex flex-wrap gap-2">
              {navItems.map((it) => (
                <Button
                  key={it.href}
                  variant="ghost"
                  className="rounded-2xl"
                  asChild
                >
                  <a href={it.href}>{it.label}</a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
