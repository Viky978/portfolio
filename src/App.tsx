/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Moon, 
  Sun, 
  ArrowUpRight, 
  BarChart3, 
  Target, 
  Zap, 
  Layers, 
  PieChart, 
  Activity,
  Mail,
  Github,
  Linkedin,
  Cloud,
  Eye,
  Store,
  ShoppingBag,
  Search,
  Database,
  Terminal,
  X,
  Maximize2
} from 'lucide-react';

// --- Types ---
interface CaseStudy {
  id: string;
  title: string;
  headline: string;
  metrics: Record<string, string | number>;
  problem: string[];
  strategy: string[];
  impact: string[];
  tags: string[];
  category?: string;
  imageUrl: string;
}

interface VerticalContent {
  sectionId: string;
  title: string;
  hero: {
    headline: string;
    subheadline: string;
    statChips: { label: string; value: string }[];
    disclaimer?: string;
  };
  cases: CaseStudy[];
}

// --- Data ---
const PROPERTY_CONTENT: VerticalContent = {
  sectionId: "property",
  title: "Property Industry",
  hero: {
    headline: "Data-driven property marketing",
    subheadline: "I design and optimize full-funnel digital systems for property developments, focused on booking efficiency, sales impact, and measurable outcomes.",
    statChips: [
      { label: "Focus", value: "Bookings & Sales" },
      { label: "Approach", value: "Market Research + A/B Testing" },
      { label: "Strength", value: "Automated Reporting Dashboards" }
    ],
    disclaimer: "Metrics shown are campaign outcomes; creative assets and client-sensitive details are excluded."
  },
  cases: [
    {
      id: "sunway-aviana",
      title: "Sunway Aviana",
      headline: "Scaled a long-cycle launch while optimizing for cost per booking, not just cost per lead (CPL).",
      category: "Double-Storey Homes | Iskandar Puteri",
      metrics: { "Bookings": 127, "Sales": "RM104M", "CPL": "RM38", "Eff. Rate": "0.51%" },
      tags: ["Landing page", "Meta Lead Gen & Whatsapp", "Google SEM & Discovery"],
      problem: [
        "Launching a new 349-unit development with low initial awareness while needing to generate 10,000+ qualified leads in a highly competitive Johor property market.",
      ],
      strategy: [
        "Two-phase funnel: Teaser → Conversion scaling (retargeting pool build-up before launch).",
        "Audience segmentation: property + investor + Singapore-focused localization; geo-targeted and competitors keywords in SEM.",
        "Landing page optimization guided by user behaviour, incorporating urgency cues to improve conversion.",
        "Creative intelligence: location + investment + nature-inspired angles; agent-style visuals to optimise cost."
      ],
      impact: ["Exceeded projections with 5% more bookings and 38% more qualified leads while reducing cost per lead (CPL) by 27%."],
      imageUrl: "https://lh3.googleusercontent.com/d/1KyW5fLy9nNDT9wI7PfYU5C55ha7oW6qN"
    },
    {
      id: "iconia-garden-residence",
      title: "Iconia Garden Residence",
      headline: "Used objection analytics + platform efficiency signals to improve booking efficiency across phases.",
      category: "Double-Storey Homes | Taman Impian Emas",
      metrics: { "Bookings": "77", "Sales": "RM57.6M", "CPL": "RM15", "Eff. Rate": "0.1%" },
      tags: ["Landing page", "Meta Lead Gen", "Google PMAX"],
      problem: [
        "Faced buyer perception and accessibility concerns prior to launch, with proximity to Sungai Skudai, nearby low-income areas, and limited access roads raising worries over cleanliness, safety, and traffic congestion."
      ],
      strategy: [
        "Platform efficiency & ad language analysis to allocate budget by hot leads.",
        "Objection-led messaging: social proof (“hot selling”) + guarded community + affordable pricing cues.",
        "Retargeting + lookalikes seeded from qualified lead pools; exclusions to reduce wasted spend.",
        "Phase-based landing page refresh to maintain relevance and conversion momentum."
      ],
      impact: ["Generated over 4,000 leads within 10 months, contributing to a 100% unit take-up on launch day."],
      imageUrl: "https://lh3.googleusercontent.com/d/1DI_UqpCPwBpHs8L030xPfWb1akRxK7lM"
    },
    {
      id: "honeydale-residence",
      title: "Honeydale Residence",
      headline: "Maintained sub-RM20 CPL in a premium segment by filtering for luxury intent signals.",
      category: "Premium Cluster Homes | Taman Impian Emas",
      metrics: { "Bookings": 6, "Sales": "RM8M", "CPL": "RM19", "Eff. Rate": "0.3%" },
      tags: ["Landing page", "Meta Lead Gen + traffic", "Google SEM"],
      problem: [
        "With unit prices starting above RM1.3 million, Phase 2 needed to attract high-income buyers in a market where affordability strongly influences purchasing decisions."
      ],
      strategy: [
        "Luxury/high-income targeting + strongest lookalike segments to improve lead quality.",
        "Emotion-led, multilingual creatives focused on lifestyle and exclusivity, delivered through video-first storytelling.",
        "Budget shifted toward channels with better booking efficiency; reduced inefficient allocations.",
        "Tracked lead response & price preference to refine audience pools & creatives respectively."
      ],
      impact: ["Generated over 1,200 qualified leads within three months, with just 0.3% of booking value spent on advertising."],
      imageUrl: "https://lh3.googleusercontent.com/d/14pUkIZIjj-xrsWJjobe1sXhwDYr9tfXd"
    },
    {
      id: "impian-link-38",
      title: "Impian Link 38",
      headline: "Turned a zero-booking account into a revenue-generating acquisition system.",
      category: "Retail Development | Skudai",
      metrics: { "Bookings": 3, "Sales": "RM2.5M", "CPL": "RM37", "Eff. Rate": "3%" },
      tags: ["Landing page", "Meta Lead Gen", "Google SEM"],
      problem: [
        "After six months of digital campaigns by a previous agency produced mostly uncontactable or low-intent leads, the project recorded zero bookings and stagnant inventory."
      ],
      strategy: [
        "Lead-quality diagnosis using CRM outcomes to pinpoint uncontactable/low-intent pools.",
        "A/B test audience structure: investor intent, retargeting, and lookalike expansion.",
        "Message repositioning toward location, ROI and ready-for-occupancy value to overcome price perception concern.",
        "High-intent SEM capture via geographic and competitor keyword segmentation."
      ],
      impact: ["Reversed months of inactivity within 4 months, generating 2,059 leads, with only 3% marketing spend relative to total sales."],
      imageUrl: "https://lh3.googleusercontent.com/d/1FHWIFwqCu4JoOYAgP_4vT34fd24a7QTr"
    },
    {
      id: "langkawi-avenue",
      title: "Langkawi Avenue",
      headline: "Built early demand for a high-ticket commercial launch by prioritizing audience intent signals and product-led creatives.",
      category: "Retail Shops & Offices | Langkawi City",
      metrics: { "Bookings": 2, "Sales": "RM4.6M", "CPL": "RM60", "Eff. Rate": "3.5%" },
      tags: ["Meta Lead Gen", "Google SEM"],
      problem: [
        "Launching a new commercial development with limited market awareness while needing to attract buyers for high-value units starting from RM2.3 million."
      ],
      strategy: [
        "Channel role design: used Facebook/Instagram Lead Gen as the primary conversion driver (majority of leads), with Google SEM/Discovery supporting awareness and branded search capture.",
        "Intent-based audience segmentation: prioritized commercial + investor + luxury interest groups (identified as top converters and source of hot leads).",
        "Creative-to-signal matching: scaled product-led visuals (highest lead volume) and supported with location/value/price angles to address ‘why here’ + ‘why now’ objections.",
        "Funnel hygiene: monitored lead status distribution and follow-up outcomes to refine targeting and reduce low-intent traffic."
      ],
      impact: ["Generated 70% of website traffic from paid campaigns within three months while maintaining strong cost efficiency on a limited budget."],
      imageUrl: "https://lh3.googleusercontent.com/d/1EojiRIOlGCXkXeGX0mpKCyAPdDhSMIju"
    }
  ]
};

const ECOMMERCE_CONTENT: VerticalContent = {
  sectionId: "ecommerce",
  title: "Ecommerce Industry",
  hero: {
    headline: "Measurement-first growth for ecommerce",
    subheadline: "I build data-backed growth loops across paid media, and conversion tracking, focused on purchases, revenue efficiency, and ROAS stability.",
    statChips: [
      { label: "FOCUS", value: "Purchases • Sales • ROAS" },
      { label: "APPROACH", value: "Conversion Rate Optimisation" },
      { label: "Strength", value: "Full User Behaviour Tracking" }
    ],
    disclaimer: "Dashboard examples are sanitised; full client dashboards are not shared."
  },
  cases: [
    {
      id: "kl-tower",
      title: "KL Tower",
      headline: "Improved search capture via keyword segmentation, impression-share management, and tracking QA.",
      category: "Entertainment | Ticketing + Dining",
      metrics: { "Purchases": "1,944", "Sales": "RM390K", "ROAS": "21.23" },
      tags: ["Google SEM", "Landing Page"],
      problem: [
        "Establish the newly launched website as the official site while competing with legacy brand sites and sustaining ticket revenue."
      ],
      strategy: [
        "Bid optimisation to drive traffic while maximising purchases.",
        "Intent-based segmentation using 400+ keywords and dual-language messaging to improve CTR and search impression share.",
        "Landing page optimisation with full-funnel tracking to analyse user behaviour and ensure accurate attribution.",
        "Traffic source analysis to identify potential partnerships and marketing expansion opportunities."
      ],
      impact: ["Increased website traffic by 155% within three months with 54% improved conversion rate."],
      imageUrl: "https://lh3.googleusercontent.com/d/1ujp9ktyFMviEdcoYb_u4v2zROWZ3Eie7"
    },
    {
      id: "sugar-and-i",
      title: "Sugar & I",
      headline: "Maintained conversion performance by redesigning measurement signals and objectives.",
      category: "F&B | Festive Promotion",
      metrics: { "Purchases": 475, "Sales": "RM25K", "ROAS": "8.30" },
      tags: ["Meta Traffic + Sales"],
      problem: [
        "Scale online revenue while capitalizing on festive campaign demand."
      ],
      strategy: [
        "A/B testing different campaign objectives (traffic vs. sales) to maximise purchases at a lower cost.",
        "Targeted festive campaigns, including dynamic product ads, retargeting, demographic and geo-sales analysis.",
        "Creative-to-intent matching: reviews for cold audiences; new flavour for engaged users; promotional messaging for retargeting."
      ],
      impact: ["Tripled purchases within one month while maintaining a highly efficient cost per purchase of RM1.70."],
      imageUrl: "https://lh3.googleusercontent.com/d/1bhrgvT1EePC4aBMcgjApeguAcFzWqAXn"
    },
    {
      id: "vcr",
      title: "VCR",
      headline: "Diagnosed ROAS decline and designed a creative + targeting refresh plan to stabilize returns.",
      category: "F&B | Store Launch",
      metrics: { "Purchases": 657, "Sales": "RM21K", "ROAS": "1.49" },
      tags: ["Meta Traffic + Sales"],
      problem: [
        "Increase store sales by promoting newly opened outlets while implementing reliable purchase tracking for campaign measurement."
      ],
      strategy: [
        "Audience segmentation using interest-based targeting, retargeting, and lookalike audiences.",
        "Online store optimisation, including product visibility and promotional mechanisms to drive purchases.",
        "Creative experimentation prioritising brand-first messaging and Instagram placements (video, slideshow, reels), where engagement was strongest."
      ],
      impact: ["Boosted purchases by 13% across both outlets while driving over 200 website visits through the paid campaigns."],
      imageUrl: "https://lh3.googleusercontent.com/d/1s2SoFZBhjy-_-Mwo6M5e2tymoySrKzTm"
    },
    {
      id: "faber-castell",
      title: "Faber-Castell",
      headline: "Orchestrated objective sequencing across promos, contests, and product pushes under year-end competition.",
      category: "Education | Year-End Promo",
      metrics: { "Purchases": 109, "Sales": "RM39K", "ROAS": "1.36" },
      tags: ["Meta Reach + Traffic + CPAS"],
      problem: ["Drive year-end sales through digital campaigns while maintaining strong brand visibility in a competitive seasonal market."],
      strategy: [
        "Campaign portfolio planning by objective (impressions, traffic, purchases) with defined roles across the funnel.",
        "Incrementality approach using contests and awareness campaigns to generate demand while promotions captured purchase intent.",
        "Audience experimentation through CPAS and retargeting to identify high-intent signals such as add-to-cart and checkout events."
      ],
      impact: ["Sustained stable purchase volume while generating over 19 million campaign impressions."],
      imageUrl: "https://lh3.googleusercontent.com/d/1GBa6hgAiceF_jF_0_vL3iPHlxWVpOP8b"
    }
  ]
};

const OTHERS_CONTENT: VerticalContent = {
  sectionId: "others",
  title: "Multiple Verticals",
  hero: {
    headline: "Experiment-Driven Acquisition",
    subheadline: "I design and optimise acquisition funnel, focused on improving lead quality, lowering acquisition costs, and scaling measurable growth.",
    statChips: [
      { label: "FOCUS", value: "Leads • Registrations • CPA" },
      { label: "APPROACH", value: "Audience & keyword experimentation" },
      { label: "Strength", value: "Acquisition Funnel analytics" }
    ]
  },
  cases: [
    {
      id: "rakuten-trade",
      title: "Rakuten Trade",
      category: "Fintech | User Acquisition",
      metrics: { "Registrations": "+11K", "Impressions": "+17Mil", "CAC": "RM20" },
      headline: "Support acquisition and new product launch.",
      problem: ["Build a structured acquisition framework with reliable tracking to support the launch of the new investment product, Raku-Invest, while increasing completed registrations."],
      strategy: [
        "Designed audience experimentation across new investors, seasonal investors, non-investors, retargeting pools, and lookalike segments to identify high-conversion cohorts.",
        "Conducted 30+ creative experiments over six months to determine the best-performing combinations and scale winning variants.",
        "Implemented keyword segmentation across brand and generic terms with optimised bidding strategies to maximise registration volume."
      ],
      impact: ["Achieved a 2× increase in completed registrations within the first two weeks while reducing acquisition cost by 60%."],
      tags: ["Google SEM + PMAX", "Meta Conversion", "Programmatic Ads"],
      imageUrl: "https://lh3.googleusercontent.com/d/1GNSDRlJFRUudAQnLLt6G2NGCpgoPXOnP"
    },
    {
      id: "rrw-printing",
      title: "RRW Printing",
      category: "Printing | Lead Acquisition",
      metrics: { "Leads": "158+", "CPA": "RM18", "ROAS": "1.71" },
      headline: "",
      problem: ["Expand brand visibility and increase inbound enquiries and sales in a competitive printing services market."],
      strategy: [
        "Tested 300+ search keywords across product categories (bunting, banner, sticker) to improve search impression share and capture high-intent queries.",
        "Optimised landing pages with clearer CTAs and product descriptions to improve click-through rates and enquiry conversions.",
        "Conducted platform efficiency analysis comparing WhatsApp and website lead forms to optimise budget allocation.",
        "Implemented keyword-level lead tracking to align messaging such as same-day delivery and service coverage with search intent."
      ],
      impact: ["Increased leads by 70% while reducing acquisition cost by 42% within one month."],
      tags: ["Search Keywords", "Landing Page", "Lead Tracking"],
      imageUrl: "https://lh3.googleusercontent.com/d/1nLXgSjISd8yoX0prAeMiZVkWMKR_P9zN"
    },
    {
      id: "jmc",
      title: "JMC",
      category: "Pick-up Truck | Lead Acquisition",
      metrics: { "Leads": "4,158", "Impressions": "18 Mil", "CPL": "RM38" },
      headline: "",
      problem: ["As a newly introduced imported pickup truck, JMC faced low brand awareness and declining leads following the initial launch phase."],
      strategy: [
        "Implemented hyper-personalised targeting based on user signals such as vehicle features, price sensitivity, competitor brand interest, and geographic clusters of previous buyers.",
        "Maximised Google Ads inventory across Search, Display, and YouTube, using the resulting engagement data to build retargeting and lookalike audiences.",
        "Leveraged festive campaign incentives such as cash rebates and free accessories to stimulate demand and re-engage interested prospects."
      ],
      impact: ["Improved website engagement rate by over 960% within three months while maintaining stable lead generation at 67% lower acquisition cost."],
      tags: ["Hyper-targeting", "Google Ads", "Festive Campaigns"],
      imageUrl: "https://lh3.googleusercontent.com/d/1AlsR_f3vGA-lhBlDTajY8pD-uSZJO_hG"
    },
    {
      id: "foton",
      title: "Foton",
      category: "Commercial Truck | Lead Acquisition",
      metrics: { "Leads": "2,149", "Impressions": "9.6 Mil", "CPL": "RM34" },
      headline: "",
      problem: ["Entering the Malaysian market as a new commercial truck brand, Foton needed to build credibility and generate qualified leads in a low-awareness environment."],
      strategy: [
        "Shifted from basic content boosting to dedicated performance-driven ad campaigns to improve lead acquisition efficiency.",
        "Conducted geo-segmentation and multilingual ad analysis to identify high-performing regions and optimise budget allocation.",
        "Implemented custom lead forms directing enquiries to specific showrooms, enabling faster follow-up and filtering low-quality enquiries."
      ],
      impact: ["Generated 10× increase in website traffic within one month while maintaining a steady flow of qualified leads."],
      tags: ["Performance Ads", "Geo-segmentation", "Lead Forms"],
      imageUrl: "https://lh3.googleusercontent.com/d/11sJ7RCqtG3ngB2u5Kts6RWgvjyi52DTB"
    }
  ]
};

const METHODS = [
  { name: 'Excel', icon: <BarChart3 className="w-4 h-4" /> },
  { name: 'Looker Studio', icon: <Activity className="w-4 h-4" /> },
  { name: 'DOMO', icon: <Database className="w-4 h-4" /> },
  { name: 'Google Analytics 4', icon: <PieChart className="w-4 h-4" /> },
  { name: 'Google Tag Manager', icon: <Target className="w-4 h-4" /> },
  { name: 'Google Cloud Console', icon: <Cloud className="w-4 h-4" /> },
  { name: 'Microsoft Clarity', icon: <Eye className="w-4 h-4" /> },
  { name: 'Supermetric', icon: <Layers className="w-4 h-4" /> },
  { name: 'StoreHub', icon: <Store className="w-4 h-4" /> },
  { name: 'WooCommerce', icon: <ShoppingBag className="w-4 h-4" /> }
];

const DASHBOARD_IMAGES = [
  "https://lh3.googleusercontent.com/d/1VerVTbri4EN9igWTyyfAfp46AEKT-B8N",
  "https://lh3.googleusercontent.com/d/1LJvFTv9fVNIbRnPImsmNiJhuTgvZLBNp",
  "https://lh3.googleusercontent.com/d/1LXQndm-eif1rCbOUMNEvJlnLV3J1S-CQ",
  "https://lh3.googleusercontent.com/d/1bFkEZS3pm_2eg2oW39erBHQx4aLItjz-",
  "https://lh3.googleusercontent.com/d/1SfgmFn7LbEQUAuoAMCO3pQUDYHi8yCRU",
  "https://lh3.googleusercontent.com/d/1djqHRK6Mt4PsiaGGpL3bx61cgcf6FoDd",
  "https://lh3.googleusercontent.com/d/1H2AMFW3WWKk63l6KgwSqJyN9tkorwk0d",
  "https://lh3.googleusercontent.com/d/1eOz1tX5BuCrgxve95a5R11cDtpmuVB-J",
  "https://lh3.googleusercontent.com/d/1FDVZ0Ikw6r631hFlkUClXZ1lr2b_JFw_",
  "https://lh3.googleusercontent.com/d/1aL4Am5EdZnwKZL3hRvVHLD5T3sJhqgUx",
  "https://lh3.googleusercontent.com/d/1lhg2h3UFvleKcIajrLMdwr7ta1tvGy9T"
];

// --- Components ---

const Lightbox = ({ src, onClose }: { src: string | null; onClose: () => void }) => (
  <AnimatePresence>
    {src && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-10 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.button
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-6 right-6 p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white border border-zinc-800"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </motion.button>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative max-w-7xl w-full max-h-full flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img 
            src={src} 
            alt="Dashboard Zoom" 
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl border border-zinc-800"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-10 left-0 right-0 text-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Press ESC or Click outside to close</span>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const StatChip = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col px-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900/50 backdrop-blur-sm shadow-inner min-w-[180px] flex-1 sm:flex-none">
    <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold mb-1">{label}</span>
    <span className="text-sm font-mono text-indigo-400">{value}</span>
  </div>
);

const CaseCard: React.FC<{ study: CaseStudy; onSelect: (id: string) => void }> = ({ study, onSelect }) => (
  <motion.div 
    whileHover={{ y: -4, borderColor: 'rgba(99, 102, 241, 0.6)' }}
    className="group relative overflow-hidden bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col h-64 cursor-pointer transition-all"
    onClick={() => onSelect(study.id)}
  >
    {/* Background Image */}
    <div className="absolute inset-0 z-0">
      <img 
        src={study.imageUrl} 
        alt={study.title}
        className="w-full h-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
    </div>

    <div className="relative z-10 p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
          {study.category}
        </div>
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
      </div>
      
      <h3 className="text-2xl font-bold mt-auto mb-4 group-hover:text-white transition-colors leading-tight">
        {study.title}
      </h3>
      
      <div className="flex items-center text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400 group-hover:text-indigo-400 transition-colors">
        VIEW CASE <ArrowUpRight className="ml-2 w-3 h-3" />
      </div>
    </div>
  </motion.div>
);

const AccordionItem: React.FC<{ 
  study: CaseStudy; 
  isOpen: boolean; 
  onToggle: () => void;
  itemRef: (el: HTMLDivElement | null) => void;
}> = ({ 
  study, 
  isOpen, 
  onToggle, 
  itemRef 
}) => (
  <div 
    ref={itemRef}
    id={`details-${study.id}`}
    className="border-b border-zinc-200 dark:border-zinc-800 last:border-0 scroll-mt-32"
  >
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full py-6 flex items-center justify-between text-left group"
    >
      <div className="flex flex-col">
        <span className="text-xs text-zinc-400 uppercase tracking-widest mb-1">{study.category}</span>
        <span className="text-lg font-medium group-hover:translate-x-1 transition-transform">
          {study.title}
        </span>
      </div>
      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pb-8 space-y-8">
            {/* Snapshot Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {Object.entries(study.metrics).map(([key, value], i) => (
                <div key={i} className="p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-inner">
                  <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1 font-bold">{key}</div>
                  <div className="text-lg font-mono font-bold text-indigo-400">{value}</div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {study.tags.map((tag, i) => (
                <span key={i} className="text-[10px] text-zinc-400 border border-zinc-800 px-3 py-1 rounded-full bg-zinc-900/50 font-mono min-w-[80px] text-center">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-indigo-500 font-bold mb-4 flex items-center">
                  <span className="w-4 h-px bg-indigo-500 mr-2"></span> CHALLENGE
                </h4>
                <ul className="space-y-3">
                  {study.problem.map((p, i) => (
                    <li key={i} className="text-sm text-zinc-300 leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-emerald-500 font-bold mb-4 flex items-center">
                  <span className="w-4 h-px bg-emerald-500 mr-2"></span> IMPACT
                </h4>
                <ul className="space-y-3">
                  {study.impact.map((imp, i) => (
                    <li key={i} className="text-sm text-zinc-100 font-bold leading-relaxed flex items-start">
                      <span className="mr-2 text-emerald-500 mt-1">•</span>
                      {imp}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-zinc-800">
              <h4 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4 flex items-center">
                <span className="w-4 h-px bg-zinc-800 mr-2"></span> STRATEGY
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                {study.strategy.map((s, i) => (
                  <li key={i} className="flex items-start text-sm text-zinc-400 leading-relaxed">
                    <span className="mr-2 text-indigo-500 mt-1.5 w-1 h-1 rounded-full bg-indigo-500 shrink-0"></span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function App() {
  const [openCaseId, setOpenCaseId] = useState<string | null>(null);
  const [selectedDashboardImage, setSelectedDashboardImage] = useState<string | null>(null);
  const caseRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    document.documentElement.classList.add('dark');
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedDashboardImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleSelectCase = (id: string) => {
    setOpenCaseId(id);
    // Increased timeout to allow previous accordions to close and layout to settle
    setTimeout(() => {
      const element = caseRefs.current[id];
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold tracking-tighter text-xl flex items-center">
            <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
            DS.
          </div>
          <div className="hidden md:flex items-center space-x-8 text-[10px] uppercase tracking-[0.2em] font-bold">
            <a href="#home" className="text-zinc-400 hover:text-white transition-colors">Home</a>
            <a href="#property" className="text-zinc-400 hover:text-white transition-colors">Property</a>
            <a href="#ecommerce" className="text-zinc-400 hover:text-white transition-colors">Ecommerce</a>
            <a href="#others" className="text-zinc-400 hover:text-white transition-colors">Others</a>
            <a href="#dashboards" className="text-zinc-400 hover:text-white transition-colors">DASHBOARDS</a>
            <a href="#contact" className="text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>
          <div className="text-[10px] font-mono text-zinc-600 hidden sm:block">
            STATUS: OPTIMIZING
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* Hero Section */}
        <section id="home" className="py-24 md:py-40 px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-8"
            >
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] uppercase tracking-widest font-bold mb-6">
                <Activity className="w-3 h-3 mr-2" /> Data Strategy & Performance Marketing
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
                Delivered Growth <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">&gt; 2000% ROAS.</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl leading-relaxed font-light">
                Bridging the gap between raw data and business outcomes. Specializing in various commercial brands especially property and ecommerce.
              </p>
              <div className="flex flex-wrap gap-4">
                <StatChip label="Method" value="Diagnose → Test → Scale" />
                <StatChip label="Focus" value="Revenue & Efficiency" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Property Vertical */}
        <section id="property" className="py-24 bg-[#080808] px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-indigo-500 mb-4 flex items-center">
                  <span className="w-8 h-px bg-indigo-500 mr-3"></span> {PROPERTY_CONTENT.title}
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{PROPERTY_CONTENT.hero.headline}</h3>
                <p className="text-xl text-zinc-400 max-w-2xl">{PROPERTY_CONTENT.hero.subheadline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {PROPERTY_CONTENT.hero.statChips.map((chip, i) => (
                  <div key={i} className="px-4 py-2 border border-zinc-800 rounded bg-zinc-900/30 min-w-[140px] flex-1 sm:flex-none">
                    <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">{chip.label}</div>
                    <div className="text-xs font-mono text-zinc-300">{chip.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {PROPERTY_CONTENT.cases.map(study => (
                <CaseCard key={study.id} study={study} onSelect={handleSelectCase} />
              ))}
            </div>

            <div className="max-w-5xl">
              <div className="flex items-center mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Terminal Output: Case Details</h3>
                <div className="ml-4 flex-grow h-px bg-zinc-800"></div>
              </div>
              <div className="border border-zinc-800 rounded-xl bg-black/40 overflow-hidden">
                <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6">
                  {PROPERTY_CONTENT.cases.map(study => (
                    <AccordionItem 
                      key={study.id} 
                      study={study} 
                      isOpen={openCaseId === study.id}
                      onToggle={() => setOpenCaseId(openCaseId === study.id ? null : study.id)}
                      itemRef={(el) => { caseRefs.current[study.id] = el; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ecommerce Vertical */}
        <section id="ecommerce" className="py-24 px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-emerald-500 mb-4 flex items-center">
                  <span className="w-8 h-px bg-emerald-500 mr-3"></span> {ECOMMERCE_CONTENT.title}
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{ECOMMERCE_CONTENT.hero.headline}</h3>
                <p className="text-xl text-zinc-400 max-w-2xl">{ECOMMERCE_CONTENT.hero.subheadline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {ECOMMERCE_CONTENT.hero.statChips.map((chip, i) => (
                  <div key={i} className="px-4 py-2 border border-zinc-800 rounded bg-zinc-900/30 min-w-[140px] flex-1 sm:flex-none">
                    <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">{chip.label}</div>
                    <div className="text-xs font-mono text-zinc-300">{chip.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-20">
              {ECOMMERCE_CONTENT.cases.map(study => (
                <CaseCard key={study.id} study={study} onSelect={handleSelectCase} />
              ))}
            </div>

            <div className="max-w-5xl">
              <div className="flex items-center mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Terminal Output: Case Details</h3>
                <div className="ml-4 flex-grow h-px bg-zinc-800"></div>
              </div>
              <div className="border border-zinc-800 rounded-xl bg-black/40 overflow-hidden">
                <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6">
                  {ECOMMERCE_CONTENT.cases.map(study => (
                    <AccordionItem 
                      key={study.id} 
                      study={study} 
                      isOpen={openCaseId === study.id}
                      onToggle={() => setOpenCaseId(openCaseId === study.id ? null : study.id)}
                      itemRef={(el) => { caseRefs.current[study.id] = el; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Others Vertical */}
        <section id="others" className="py-24 bg-[#080808] px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-amber-500 mb-4 flex items-center">
                  <span className="w-8 h-px bg-amber-500 mr-3"></span> {OTHERS_CONTENT.title}
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{OTHERS_CONTENT.hero.headline}</h3>
                <p className="text-xl text-zinc-400 max-w-2xl">{OTHERS_CONTENT.hero.subheadline}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {OTHERS_CONTENT.hero.statChips.map((chip, i) => (
                  <div key={i} className="px-4 py-2 border border-zinc-800 rounded bg-zinc-900/30 min-w-[140px] flex-1 sm:flex-none">
                    <div className="text-[8px] uppercase tracking-widest text-zinc-600 font-bold mb-1">{chip.label}</div>
                    <div className="text-xs font-mono text-zinc-300">{chip.value}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-20">
              {OTHERS_CONTENT.cases.map(study => (
                <CaseCard key={study.id} study={study} onSelect={handleSelectCase} />
              ))}
            </div>

            <div className="max-w-5xl">
              <div className="flex items-center mb-8">
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Terminal Output: Case Details</h3>
                <div className="ml-4 flex-grow h-px bg-zinc-800"></div>
              </div>
              <div className="border border-zinc-800 rounded-xl bg-black/40 overflow-hidden">
                <div className="px-4 py-2 bg-zinc-900/50 border-b border-zinc-800 flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
                </div>
                <div className="p-6">
                  {OTHERS_CONTENT.cases.map(study => (
                    <AccordionItem 
                      key={study.id} 
                      study={study} 
                      isOpen={openCaseId === study.id}
                      onToggle={() => setOpenCaseId(openCaseId === study.id ? null : study.id)}
                      itemRef={(el) => { caseRefs.current[study.id] = el; }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-24 bg-[#080808] px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-[10px] uppercase tracking-[0.4em] font-bold text-zinc-500 mb-16 text-center">TOOLS</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {METHODS.map((method, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-xl group-hover:border-indigo-500/50 transition-all group-hover:bg-zinc-800">
                    <div className="text-indigo-400 group-hover:scale-110 transition-transform">
                      {React.cloneElement(method.icon as React.ReactElement, { className: "w-6 h-6" })}
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">{method.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboards & Analytics Collage Section */}
        <section id="dashboards" className="py-24 px-6 border-b border-zinc-900">
          <div className="max-w-6xl mx-auto px-6 mb-16 text-center">
            <h2 className="text-xs uppercase tracking-[0.3em] font-bold text-indigo-500 mb-4">Visual Intelligence</h2>
            <h3 className="text-4xl font-bold mb-6">Dashboards & Analytics</h3>
            <p className="text-zinc-400 max-w-2xl mx-auto">Custom-built reporting environments for real-time decision making and funnel diagnostics.</p>
          </div>
          
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
              {DASHBOARD_IMAGES.map((src, i) => {
                // Collage layout spans optimized for "nice" arrangement
                let span = "col-span-1 row-span-1";
                if (i === 0) span = "col-span-2 row-span-2"; // Large main
                if (i === 1) span = "col-span-1 row-span-2"; // Tall
                if (i === 2) span = "col-span-1 row-span-1";
                if (i === 3) span = "col-span-1 row-span-1";
                if (i === 4) span = "col-span-2 row-span-1"; // Wide
                if (i === 5) span = "col-span-1 row-span-2"; // Tall
                if (i === 6) span = "col-span-1 row-span-1";
                if (i === 7) span = "col-span-2 row-span-2"; // Large
                if (i === 8) span = "col-span-1 row-span-1";
                if (i === 9) span = "col-span-1 row-span-1";
                if (i === 10) span = "col-span-2 row-span-1"; // Wide
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className={`${span} relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 group cursor-zoom-in`}
                    onClick={() => setSelectedDashboardImage(src)}
                  >
                    <img 
                      src={src} 
                      alt={`Dashboard ${i + 1}`} 
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <Maximize2 className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></div>
                        <span className="text-[10px] font-mono text-zinc-300 uppercase tracking-widest">View Full Module {i + 1}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          {/* Video Insights Sub-section */}
          <div className="max-w-6xl mx-auto px-6 mt-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="aspect-video rounded-2xl border border-zinc-800 bg-black overflow-hidden shadow-2xl relative group">
                  <iframe 
                    src="https://drive.google.com/file/d/1htmDvvVehrzD6m1vVfYQEDExzQSsUVic/preview" 
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    loading="lazy"
                    title="System Walkthrough A"
                  ></iframe>
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="px-2 py-1 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] font-mono text-indigo-400 uppercase tracking-widest">System Walkthrough A</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <a 
                    href="https://drive.google.com/file/d/1htmDvvVehrzD6m1vVfYQEDExzQSsUVic/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-zinc-500 hover:text-indigo-400 transition-colors uppercase tracking-widest flex items-center"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" /> Open in New Tab
                  </a>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="aspect-video rounded-2xl border border-zinc-800 bg-black overflow-hidden shadow-2xl relative group">
                  <iframe 
                    src="https://drive.google.com/file/d/1_SceWSohAW51w4jEm5TWqEjxYd2Qf5MT/preview" 
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen"
                    loading="lazy"
                    title="System Walkthrough B"
                  ></iframe>
                  <div className="absolute top-4 left-4 pointer-events-none">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 uppercase tracking-widest">System Walkthrough B</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <a 
                    href="https://drive.google.com/file/d/1_SceWSohAW51w4jEm5TWqEjxYd2Qf5MT/view" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-widest flex items-center"
                  >
                    <ArrowUpRight className="w-3 h-3 mr-1" /> Open in New Tab
                  </a>
                </div>
              </motion.div>
            </div>
            <p className="mt-8 text-center text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em]">
              [ Note: Use the player settings to adjust playback speed for faster review ]
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block p-2 px-4 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500 mb-8">
              Secure Communication Channel
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Let's build something <span className="text-indigo-500">measurable.</span></h2>
            <p className="text-xl text-zinc-400 mb-12 max-w-xl mx-auto leading-relaxed">
              Available for strategic consulting and data infrastructure projects. Reach out via LinkedIn or Email.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://www.linkedin.com/in/vikneswary-uvaraja-89a607121/" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20 group"
              >
                <Linkedin className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" /> Connect on LinkedIn
              </a>
              <a 
                href="mailto:vikneswary.uvaraja@gmail.com" 
                className="w-full sm:w-auto flex items-center justify-center px-10 py-5 bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition-all group"
              >
                <Mail className="mr-3 w-5 h-5 group-hover:scale-110 transition-transform" /> Send Email
              </a>
            </div>
          </div>
        </section>

      </main>

      <Lightbox 
        src={selectedDashboardImage} 
        onClose={() => setSelectedDashboardImage(null)} 
      />

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-bold">
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div>
            SYSTEM ONLINE
          </div>
          <div className="mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} VIKNESWARY UVARAJA // DATA STRATEGIST
          </div>
        </div>
      </footer>
    </div>
  );
}
