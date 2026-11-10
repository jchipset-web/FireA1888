import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { AboutSection } from './components/AboutSection';
import { FleetSection } from './components/FleetSection';
import { LeadershipSection } from './components/LeadershipSection';
import { EventsSection } from './components/EventsSection';
import { DocumentRepository } from './components/DocumentRepository';
import { DonationSection } from './components/DonationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';
import { FireSafetyPage } from './pages/FireSafetyPage';
import { RuralPropertyChecklistPage } from './pages/RuralPropertyChecklistPage';

import { DocumentModal } from './components/Modals/DocumentModal';
import { DonationModal } from './components/Modals/DonationModal';
import { MemberPortalModal } from './components/Modals/MemberPortalModal';
import { RigDetailModal } from './components/Modals/RigDetailModal';
import { EventDetailModal } from './components/Modals/EventDetailModal';

import { ArchiveDocument, FleetRig, CommunityEvent, BoardMember, EVENTS_DATA } from './data/associationData';

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

  const handleScrollToContact = () => {
    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const contactElem = document.getElementById('contact');
        if (contactElem) contactElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactElem = document.getElementById('contact');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleScrollToEvents = () => {
    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        const eventsElem = document.getElementById('events');
        if (eventsElem) eventsElem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const eventsElem = document.getElementById('events');
      if (eventsElem) {
        eventsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenCalendar = () => {
    setSelectedEvent(EVENTS_DATA[0]);
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FBF9F5] text-slate-800 flex flex-col font-sans selection:bg-amber-200 selection:text-amber-900">
      {/* Top Header & Navigation */}
      <Navbar
        onOpenDonation={() => handleOpenDonation(50)}
        onOpenCalendar={handleOpenCalendar}
        onNavigateHome={() => navigateTo('home')}
      />

      {/* Main Content Area: Render Current Page View */}
      <main className="grow">
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

        {currentView === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              onOpenDonation={() => handleOpenDonation(50)}
              onOpenEvents={handleScrollToEvents}
              onOpenCalendar={handleOpenCalendar}
            />

            {/* 4 Statistical Metrics Strip */}
            <StatsStrip />

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
          </>
        )}
      </main>

      {/* Emergency Notice & 4-Column Footer */}
      <Footer
        onOpenDonation={() => handleOpenDonation(50)}
        onOpenMemberPortal={() => setMemberPortalOpen(true)}
        onOpenCalendar={handleOpenCalendar}
        onNavigate={(page) => navigateTo(page)}
      />

      {/* Interactive Modals */}
      <DocumentModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
      />

      <DonationModal
        initialAmount={donationAmount}
        initialImpact={donationImpact}
        isOpen={donationModalOpen}
        onClose={() => setDonationModalOpen(false)}
      />

      <MemberPortalModal
        isOpen={memberPortalOpen}
        onClose={() => setMemberPortalOpen(false)}
      />

      <RigDetailModal
        rig={selectedRig}
        onClose={() => setSelectedRig(null)}
        onRequestAppearance={handleScrollToContact}
      />

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onVolunteer={handleScrollToContact}
      />
    </div>
  );
}
