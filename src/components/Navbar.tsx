import React, { useState } from 'react';
import { Heart, Menu, X, Calendar } from 'lucide-react';

interface NavbarProps {
  onOpenDonation: () => void;
  onOpenCalendar: () => void;
  onNavigateHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenDonation,
  onOpenCalendar,
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Fleet', href: '#fleet' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Community', href: '#community' },
    { name: 'Resources', href: '#repository' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // 1. Completely block the native instant HTML jump that hides headers
    e.preventDefault(); 
    setMobileMenuOpen(false);
    
    // 2. Check if we are currently on a subpage (Privacy/Terms)
    const isSubpage = !document.getElementById('home');

    if (isSubpage && onNavigateHome) {
      onNavigateHome(); // Switch React state back to home
      
      // If they clicked a section like #about, wait for the home page to render then scroll to it
      if (href !== '#home') {
        setTimeout(() => {
          const elem = document.getElementById(href.replace('#', ''));
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
      return;
    }

    // 3. If clicking Home, force the browser to Absolute Zero so mobile address bars don't interrupt it
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', '#home');
    } 
    // 4. For all other links, smoothly scroll to their exact spot (respecting our scroll-mt-24 CSS)
    else {
      const elem = document.getElementById(href.replace('#', ''));
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200 w-full">
        {/* Main 3-Zone Navigation */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
            {/* Zone 1: Brand Wordmark (Text-only) */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="flex flex-col justify-center min-w-0 flex-1 sm:flex-initial group py-1"
            >
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 uppercase leading-tight group-hover:text-amber-600 transition-colors truncate">
                Forest Firefighters
              </span>
              <span className="text-[11px] sm:text-xs font-bold text-amber-600 tracking-wider uppercase mt-0.5 leading-tight">
                Association 1888
              </span>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden xl:flex items-center gap-6 text-[14px] font-medium text-slate-700 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-amber-600 transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-500 hover:after:w-full after:transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Zone 3: Primary Actions (Desktop / Tablet) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenCalendar}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-amber-600 transition-colors px-2.5 py-2 rounded-lg hover:bg-stone-100 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Events</span>
              </button>
              <button
                onClick={onOpenDonation}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-all px-4 py-2.5 rounded-lg shadow-xs hover:shadow-md cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-slate-950" />
                <span>Support Us</span>
              </button>
            </div>

            {/* Mobile Action Cluster */}
            <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                onClick={onOpenDonation}
                className="sm:hidden inline-flex items-center gap-1 text-[11px] font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 px-2.5 py-1.5 rounded-lg shadow-xs shrink-0 cursor-pointer"
              >
                <Heart className="w-3 h-3 fill-slate-950" />
                <span>Support</span>
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-stone-100 active:bg-stone-200 transition-colors shrink-0 cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-stone-200 bg-white shadow-xl px-4 pt-3 pb-6 max-h-[calc(100vh-4rem)] overflow-y-auto animate-fadeIn">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block px-3 py-2.5 rounded-md text-base font-medium text-slate-800 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalendar();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-500" />
                <span>View Events Calendar</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonation();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>Support Our Causes</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so the fixed header never overlaps the top of the page content */}
      <div className="h-16 sm:h-20 w-full shrink-0" aria-hidden="true" />
    </>
  );
};
