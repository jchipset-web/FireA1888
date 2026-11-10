import React from 'react';
import { AlertTriangle, Heart, Key, Lock, ExternalLink, MapPin, Mail, ChevronDown } from 'lucide-react';
import { STATION_INFO } from '../data/associationData';

interface FooterProps {
  onOpenDonation: () => void;
  onOpenMemberPortal: () => void;
  onOpenCalendar: () => void;
  onNavigate: (page: 'home' | 'privacy' | 'terms' | 'fire-safety' | 'rural-checklist') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDonation,
  onOpenMemberPortal,
  onOpenCalendar,
  onNavigate,
}) => {
  const [mobileHQOpen, setMobileHQOpen] = React.useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = React.useState(false);
  const [mobileGovOpen, setMobileGovOpen] = React.useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Emergency Red Warning Strip */}
      <div className="bg-[#DC2626] text-white py-3 px-4 text-center text-xs sm:text-sm font-bold flex items-center justify-center gap-2 tracking-wide">
        <AlertTriangle className="w-4 h-4 shrink-0 animate-pulse" />
        <span>
          EMERGENCY: DIAL 9-1-1. This site and our emails are not monitored 24/7 and are not connected to dispatch.
        </span>
      </div>

      {/* Main 4-Column Footer */}
      <div className="relative bg-[#0B1120] text-slate-300 pt-12 sm:pt-16 pb-12 border-t border-slate-800 overflow-hidden">
        {/* Faded Out Crest Watermark on the Right (matches screenshot) */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[320px] sm:w-[460px] lg:w-[560px] pointer-events-none select-none opacity-25 sm:opacity-30 lg:opacity-35 translate-x-8 sm:translate-x-12 lg:translate-x-6 z-0">
          <img
            src="/images/as-logo.webp"
            alt="Forest Firefighters Association 1888 Crest Watermark"
            className="w-full h-auto object-contain"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
            {/* Column 1: Association Bio & Actions */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500 p-1 flex items-center justify-center">
                  <img
                    src="/images/as-logo.webp"
                    alt="Station 2 Badge"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="font-extrabold text-white text-base tracking-tight uppercase">
                    Forest Firefighters
                  </div>
                  <div className="text-[11px] font-bold text-amber-500 tracking-wider uppercase">
                    ASSOCIATION 1888
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                An independent, registered non-profit organization comprised of active firefighters,
                retirees, and alumni serving Lambton Shores. Serving, supporting, and strengthening
                our community beyond the fireground since 1888.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenDonation}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Support Our Causes</span>
                </button>
                <button
                  onClick={onOpenMemberPortal}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors cursor-pointer border border-slate-700"
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Member Portal</span>
                </button>
              </div>
            </div>

            {/* Column 2: Station Headquarters */}
            <div className="lg:col-span-3 space-y-3 border-t border-slate-800/60 md:border-t-0 pt-4 md:pt-0">
              <button
                type="button"
                onClick={() => setMobileHQOpen(!mobileHQOpen)}
                className="w-full flex items-center justify-between text-left md:pointer-events-none cursor-pointer md:cursor-default"
              >
                <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                  STATION HEADQUARTERS
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-amber-500 md:hidden transition-transform duration-200 ${
                    mobileHQOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div className={`space-y-3 ${mobileHQOpen ? 'block' : 'hidden md:block'}`}>
                <div className="space-y-2 text-xs text-slate-400">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>
                      Lambton Shores Fire Station 2<br />
                      45 Main Street South, P.O. Box 219<br />
                      Forest, Ontario N0N 1J0
                    </span>
                  </p>
                  <p className="flex items-center gap-2 pt-1">
                    <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                    <a href={`mailto:${STATION_INFO.email}`} className="hover:text-amber-400 transition-colors">
                      {STATION_INFO.email}
                    </a>
                  </p>
                </div>

                <div className="pt-2 text-xs">
                  <div className="text-slate-400 mb-1 font-semibold text-[11px]">SOCIAL UPDATES:</div>
                  <div className="flex items-center gap-3">
                    <a
                      href={STATION_INFO.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Facebook
                    </a>
                    <span className="text-slate-600">·</span>
                    <a
                      href={STATION_INFO.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-amber-500 hover:text-amber-400 transition-colors"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 3: Explore the Site */}
            <div className="lg:col-span-2 space-y-3 border-t border-slate-800/60 md:border-t-0 pt-4 md:pt-0">
              <button
                type="button"
                onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                className="w-full flex items-center justify-between text-left md:pointer-events-none cursor-pointer md:cursor-default"
              >
                <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                  EXPLORE THE SITE
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-amber-500 md:hidden transition-transform duration-200 ${
                    mobileExploreOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <ul className={`space-y-2 text-xs text-slate-400 ${mobileExploreOpen ? 'block' : 'hidden md:block'}`}>
                <li>
                  <a
                    href="#home"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#fleet"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Fleet
                  </a>
                </li>
                <li>
                  <a
                    href="#leadership"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Leadership
                  </a>
                </li>
                <li>
                  <a
                    href="#community"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#repository"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Governance & Safety */}
            <div className="lg:col-span-3 space-y-3 border-t border-slate-800/60 md:border-t-0 pt-4 md:pt-0">
              <button
                type="button"
                onClick={() => setMobileGovOpen(!mobileGovOpen)}
                className="w-full flex items-center justify-between text-left md:pointer-events-none cursor-pointer md:cursor-default"
              >
                <h4 className="text-xs font-mono font-bold tracking-widest text-white uppercase">
                  GOVERNANCE & SAFETY
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-amber-500 md:hidden transition-transform duration-200 ${
                    mobileGovOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <ul className={`space-y-2 text-xs text-slate-400 ${mobileGovOpen ? 'block' : 'hidden md:block'}`}>
                <li>
                  <button
                    onClick={() => onNavigate('fire-safety')}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    Smoke Alarm & Fire Safety
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('rural-checklist')}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    Rural Property Checklists
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('privacy')}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('terms')}
                    className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <a
                    href="#events"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Tinted Sponsor Wall
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={() => onNavigate('home')}
                    className="hover:text-amber-400 transition-colors"
                  >
                    Contact Form & Inquiries
                  </a>
                </li>
                <li>
                  <button
                    onClick={onOpenMemberPortal}
                    className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Member Portal Sign-in</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright Strip */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 1888–{currentYear} Forest Firefighters Association 1888. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              <span>Registered Association Non-Profit</span>
              <span>•</span>
              <span>
                Designed by{' '}
                <a
                  href="https://websitestudio.ca"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-slate-400 hover:text-amber-400 transition-colors underline-offset-2 hover:underline"
                >
                  WebsiteStudio.ca
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
