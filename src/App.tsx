import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { Footer } from './components/Footer';

import { ArchiveDocument, FleetRig, CommunityEvent, BoardMember, EVENTS_DATA } from './data/associationData';

// Lazy-load Below-the-Fold Home Sections
const AboutSection = lazy(() =>
  import('./components/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const FleetSection = lazy(() =>
  import('./components/FleetSection').then((m) => ({ default: m.FleetSection }))
);
const LeadershipSection = lazy(() =>
  import('./components/LeadershipSection').then((m) => ({ default: m.LeadershipSection }))
);
const EventsSection = lazy(() =>
  import('./components/EventsSection').then((m) => ({ default: m.EventsSection }))
);
const DocumentRepository = lazy(() =>
  import('./components/DocumentRepository').then((m) => ({ default: m.DocumentRepository }))
);
const DonationSection = lazy(() =>
  import('./components/DonationSection').then((m) => ({ default: m.DonationSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);

// Lazy-load Secondary Pages (Only downloaded if a user navigates to them)
const PrivacyPolicyPage = lazy(() =>
  import('./pages/PrivacyPolicyPage').then((m) => ({ default: m.PrivacyPolicyPage }))
);
const TermsOfServicePage = lazy(() =>
  import('./pages/TermsOfServicePage').then((m) => ({ default: m.TermsOfServicePage }))
);
const FireSafetyPage = lazy(() =>
  import('./pages/FireSafetyPage').then((m) => ({ default: m.FireSafetyPage }))
);
const RuralPropertyChecklistPage = lazy(() =>
  import('./pages/RuralPropertyChecklistPage').then((m) => ({ default: m.RuralPropertyChecklistPage }))
);

// Lazy-load Interactive Modals (Only downloaded when needed)
const DocumentModal = lazy(() =>
  import('./components/Modals/DocumentModal').then((m) => ({ default: m.DocumentModal }))
);
const DonationModal = lazy(() =>
  import('./components/Modals/DonationModal').then((m) => ({ default: m.DonationModal }))
);
const MemberPortalModal = lazy(() =>
  import('./components/Modals/MemberPortalModal').then((m) => ({ default: m.MemberPortalModal }))
);
const RigDetailModal = lazy(() =>
  import('./components/Modals/RigDetailModal').then((m) => ({ default: m.RigDetailModal }))
);
const EventDetailModal = lazy(() =>
  import('./components/Modals/EventDetailModal').then((m) => ({ default: m.EventDetailModal }))
);

export type PageView = 'home' | 'privacy' | 'terms' | 'fire-safety' | 'rural-checklist';

export default function App() {
  // Page view routing
  const [currentView, setCurrentView] = useState<PageView>('home');

  // Modal states
  const [selectedDocument, setSelectedDocument] = useState<ArchiveDocument | null>(null);
  const [donationModalOpen, setDonationModalOpen] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(50);
  const [donationImpact, setDonationImpact] = useState<string>(
    'Supports youth athletics equipment for the champion Forest ringette program and maintains holiday fireworks supply reserves.'
  );
  const [memberPortalOpen, setMemberPortalOpen] = useState(false);
  const [selectedRig, setSelectedRig] = useState<FleetRig | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<CommunityEvent | null>(null);

  // Sync with browser hash on initial load and on popstate
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('privacy')) {
        setCurrentView('privacy');
      } else if (hash.includes('terms')) {
        setCurrentView('terms');
      } else if (hash.includes('fire-safety') || hash.includes('smoke-alarm')) {
        setCurrentView('fire-safety');
      } else if (hash.includes('rural-checklist') || hash.includes('rural-property')) {
        setCurrentView('rural-checklist');
      } else {
        setCurrentView('home');
      }
    };

    handleHashChange();
    window.addEventListener('popstate', handleHashChange);
    return () => window.removeEventListener('popstate', handleHashChange);
  }, []);

  const navigateTo = (page: PageView) => {
    setCurrentView(page);
    if (page === 'home') {
      window.history.pushState(null, '', '#home');
    } else {
      window.history.pushState(null, '', `#/${page}`);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDonation = (amount = 50, impact = '') => {
    setDonationAmount(amount);
    if (impact) setDonationImpact(impact);
    setDonationModalOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    const attemptScroll = (attemptsLeft: number) => {
      const elem = document.getElementById(sectionId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else if (attemptsLeft > 0) {
        setTimeout(() => attemptScroll(attemptsLeft - 1), 100);
      }
    };

    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => attemptScroll(10), 100);
    } else {
      attemptScroll(10);
    }
  };

  const handleScrollToContact = () => scrollToSection('contact');
  const handleScrollToEvents = () => scrollToSection('events');

  const handleOpenCalendar = () => {
    setSelectedEvent(EVENTS_DATA[0]);
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-[#FBF9F5] text-slate-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header & Navigation */}
      <Navbar
        onOpenDonation={() => handleOpenDonation(50)}
        onOpenCalendar={handleOpenCalendar}
        onNavigateHome={() => navigateTo('home')}
      />

      {/* Main Content Area: Render Current Page View */}
      <main className="grow overflow-x-hidden">
        {currentView === 'home' ? (
          <>
            {/* Eagerly Loaded Above-the-Fold Content for Instant Paint */}
            <Hero
              onOpenDonation={() => handleOpenDonation(50)}
              onOpenEvents={handleScrollToEvents}
              onOpenCalendar={handleOpenCalendar}
            />

            {/* 4 Statistical Metrics Strip */}
            <StatsStrip />

            {/* Lazy-Loaded Below-the-Fold Sections */}
            <Suspense fallback={<div className="min-h-[400px]" aria-hidden="true" />}>
              {/* About Section: Quality That Lasts & Historic Brigade */}
              <AboutSection />

              {/* Motorized Apparatus Roll: 1922 Bickle & Retired Legends */}
              <FleetSection
                onSelectRig={(rig) => setSelectedRig(rig)}
                onRequestAppearance={handleScrollToContact}
              />

              {/* Executive Board & Leadership */}
              <LeadershipSection
                onContactOfficer={(_officer: BoardMember) => handleScrollToContact()}
              />

              {/* Upcoming Events & Community Traditions + Sponsors */}
              <EventsSection
                onSelectEvent={(event) => setSelectedEvent(event)}
                onOpenCalendar={handleOpenCalendar}
              />

              {/* Community Ledger & Document Repository */}
              <DocumentRepository
                onOpenDocument={(doc) => setSelectedDocument(doc)}
              />

              {/* Direct Local Stewardship: Donations & Philanthropy */}
              <DonationSection
                onTriggerCheckout={(amount, impact) => handleOpenDonation(amount, impact)}
              />

              {/* Official Dispatch & Correspondence */}
              <ContactSection />
            </Suspense>
          </>
        ) : (
          <Suspense
            fallback={
              <div className="min-h-[60vh] flex items-center justify-center text-sm font-medium text-slate-500">
                Loading page...
              </div>
            }
          >
            {currentView === 'privacy' && (
              <PrivacyPolicyPage onBackToHome={() => navigateTo('home')} />
            )}

            {currentView === 'terms' && (
              <TermsOfServicePage onBackToHome={() => navigateTo('home')} />
            )}

            {currentView === 'fire-safety' && (
              <FireSafetyPage onBackToHome={() => navigateTo('home')} />
            )}

            {currentView === 'rural-checklist' && (
              <RuralPropertyChecklistPage onBackToHome={() => navigateTo('home')} />
            )}
          </Suspense>
        )}
      </main>

      {/* Emergency Notice & 4-Column Footer */}
      <Footer
        onOpenDonation={() => handleOpenDonation(50)}
        onOpenMemberPortal={() => setMemberPortalOpen(true)}
        onOpenCalendar={handleOpenCalendar}
        onNavigate={(page) => navigateTo(page)}
      />

      {/* Lazy-Loaded Interactive Modals */}
      <Suspense fallback={null}>
        {selectedDocument && (
          <DocumentModal
            document={selectedDocument}
            onClose={() => setSelectedDocument(null)}
          />
        )}

        {donationModalOpen && (
          <DonationModal
            initialAmount={donationAmount}
            initialImpact={donationImpact}
            isOpen={donationModalOpen}
            onClose={() => setDonationModalOpen(false)}
          />
        )}

        {memberPortalOpen && (
          <MemberPortalModal
            isOpen={memberPortalOpen}
            onClose={() => setMemberPortalOpen(false)}
          />
        )}

        {selectedRig && (
          <RigDetailModal
            rig={selectedRig}
            onClose={() => setSelectedRig(null)}
            onRequestAppearance={handleScrollToContact}
          />
        )}

        {selectedEvent && (
          <EventDetailModal
            event={selectedEvent}
            onClose={() => setSelectedEvent(null)}
            onVolunteer={handleScrollToContact}
          />
        )}
      </Suspense>
    </div>
  );
}
