import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  User,
  LogOut,
  FileText,
  DollarSign,
  CalendarCheck,
  CheckCircle2,
  Clock,
  Download,
  Plus,
  Search,
  Users,
  AlertCircle,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Printer,
  Sparkles,
} from 'lucide-react';
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { auth, googleProvider } from '../../lib/firebase';
import {
  MemberProfile,
  MeetingMinute,
  ExpenseClaim,
  PortalEvent,
  getMemberProfile,
  saveMemberProfile,
  fetchMeetingMinutes,
  addMeetingMinute,
  submitExpenseClaim,
  subscribeToMemberExpenses,
  fetchPortalEvents,
  toggleTaskVolunteer,
  addPortalEvent,
} from '../../lib/memberPortalService';

interface MemberPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberPortalModal: React.FC<MemberPortalModalProps> = ({ isOpen, onClose }) => {
  // Auth state
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [memberProfile, setMemberProfile] = useState<MemberProfile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [authError, setAuthError] = useState('');
  const [authSubmitting, setAuthSubmitting] = useState(false);

  // Sign-in / Sign-up form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [badgeNumber, setBadgeNumber] = useState('204');
  const [memberRole, setMemberRole] = useState('Active Volunteer Firefighter');

  // Active portal tab
  const [activeTab, setActiveTab] = useState<'minutes' | 'expenses' | 'events'>('minutes');

  // Minutes State
  const [minutes, setMinutes] = useState<MeetingMinute[]>([]);
  const [selectedMinute, setSelectedMinute] = useState<MeetingMinute | null>(null);
  const [minuteSearch, setMinuteSearch] = useState('');
  const [minuteCategory, setMinuteCategory] = useState('all');
  const [showAddMinuteModal, setShowAddMinuteModal] = useState(false);
  const [newMinute, setNewMinute] = useState({
    title: '',
    meetingDate: '',
    category: 'Regular Monthly',
    location: 'Station 2 Bay Floor & Association Hall',
    presidedBy: 'Dave Solway, President',
    recordedBy: 'Association Secretary',
    summary: '',
    motions: '',
    attendeesCount: 20,
  });

  // Expenses State
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([]);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [expenseSubmitting, setExpenseSubmitting] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: '1922 Bickle Maintenance',
    amount: '',
    merchant: '',
    expenseDate: new Date().toISOString().split('T')[0],
    description: '',
    receiptNotes: '',
  });

  // Events & Volunteer Tasks State
  const [events, setEvents] = useState<PortalEvent[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    eventDate: '',
    time: '',
    location: 'Station 2 / Dodge Grounds',
    category: 'Community Gathering',
    description: '',
    taskTitles: 'Perimeter Safety Marshal, Refreshment Setup, Post-Event Cleanup',
  });

  // Listen to Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          let prof = await getMemberProfile(user.uid);
          if (!prof) {
            prof = {
              id: user.uid,
              email: user.email || 'member@forestfirefighters1888.ca',
              displayName: user.displayName || displayName || 'Station 2 Volunteer Member',
              badgeNumber: badgeNumber || '204',
              role: memberRole || 'Active Volunteer Firefighter',
              station: 'Lambton Shores Fire Station 2',
              createdAt: new Date().toISOString(),
            };
            await saveMemberProfile(prof);
          }
          setMemberProfile(prof);
        } catch (e) {
          console.warn('Error loading member profile', e);
        }
      } else {
        setMemberProfile(null);
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Load Minutes & Events when authenticated
  useEffect(() => {
    if (currentUser) {
      loadMinutes();
      loadEvents();
      const unsubExpenses = subscribeToMemberExpenses(currentUser.uid, (data) => {
        setExpenses(data);
      });
      return () => unsubExpenses();
    }
  }, [currentUser]);

  const loadMinutes = async () => {
    try {
      const data = await fetchMeetingMinutes();
      setMinutes(data);
    } catch (e) {
      console.warn('Error fetching minutes', e);
    }
  };

  const loadEvents = async () => {
    setEventsLoading(true);
    try {
      const data = await fetchPortalEvents();
      setEvents(data);
    } catch (e) {
      console.warn('Error fetching events', e);
    } finally {
      setEventsLoading(false);
    }
  };

  if (!isOpen) return null;

  // Sign In / Sign Up Handlers
  const handleGoogleSignIn = async () => {
    setAuthError('');
    setAuthSubmitting(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Google sign-in failed');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthSubmitting(true);

    try {
      if (authTab === 'signup') {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const newProf: MemberProfile = {
          id: res.user.uid,
          email: res.user.email || email,
          displayName: displayName || 'Station 2 Volunteer',
          badgeNumber: badgeNumber || '204',
          role: memberRole,
          station: 'Lambton Shores Fire Station 2',
          createdAt: new Date().toISOString(),
        };
        await saveMemberProfile(newProf);
        setMemberProfile(newProf);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Authentication failed. Please check credentials.');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleDemoSignIn = async (roleName: string, name: string, badge: string) => {
    setAuthError('');
    setAuthSubmitting(true);
    const demoEmail = `${name.toLowerCase().replace(/[^a-z]/g, '')}@forestfirefighters1888.ca`;
    const demoPassword = 'Password1888!';

    try {
      try {
        await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      } catch {
        // Create demo account if not exists
        const res = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
        const demoProf: MemberProfile = {
          id: res.user.uid,
          email: demoEmail,
          displayName: name,
          badgeNumber: badge,
          role: roleName,
          station: 'Lambton Shores Fire Station 2',
          createdAt: new Date().toISOString(),
        };
        await saveMemberProfile(demoProf);
        setMemberProfile(demoProf);
      }
    } catch (err: unknown) {
      setAuthError(err instanceof Error ? err.message : 'Demo login failed');
    } finally {
      setAuthSubmitting(false);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setMemberProfile(null);
  };

  // Submit Expense
  const handleSubmitExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !memberProfile) return;

    const amountNum = parseFloat(newExpense.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      alert('Please enter a valid expense dollar amount.');
      return;
    }

    setExpenseSubmitting(true);
    try {
      await submitExpenseClaim({
        memberId: currentUser.uid,
        memberName: memberProfile.displayName,
        memberEmail: currentUser.email || memberProfile.email,
        category: newExpense.category,
        amount: amountNum,
        merchant: newExpense.merchant,
        expenseDate: newExpense.expenseDate,
        description: newExpense.description,
        receiptNotes: newExpense.receiptNotes || 'Paper receipt submitted to Treasurer Wilcox',
        status: 'submitted',
        createdAt: new Date().toISOString(),
      });
      setShowAddExpenseModal(false);
      setNewExpense({
        category: '1922 Bickle Maintenance',
        amount: '',
        merchant: '',
        expenseDate: new Date().toISOString().split('T')[0],
        description: '',
        receiptNotes: '',
      });
    } catch (err) {
      console.error(err);
      alert('Failed to submit expense. Please try again.');
    } finally {
      setExpenseSubmitting(false);
    }
  };

  // Volunteer Task Sign Up Toggle
  const handleTaskToggle = async (eventId: string, taskId: string) => {
    if (!currentUser || !memberProfile) return;
    try {
      await toggleTaskVolunteer(eventId, taskId, {
        memberId: currentUser.uid,
        memberName: memberProfile.displayName,
        memberEmail: currentUser.email || memberProfile.email,
      });
      await loadEvents();
    } catch (err) {
      console.error(err);
      alert('Unable to update volunteer task signup. Please check connection.');
    }
  };

  // Post New Minutes
  const handleCreateMinute = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMinute.title || !newMinute.summary) return;
    try {
      await addMeetingMinute({
        ...newMinute,
        createdAt: new Date().toISOString(),
      });
      setShowAddMinuteModal(false);
      await loadMinutes();
    } catch (err) {
      console.error(err);
    }
  };

  // Post New Event
  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.eventDate) return;

    const parsedTasks = newEvent.taskTitles.split(',').map((t, idx) => ({
      taskId: `t-${Date.now()}-${idx}`,
      title: t.trim(),
      description: 'Volunteer duties as coordinated by committee lead.',
      slotsNeeded: 3,
      volunteers: [],
    }));

    try {
      await addPortalEvent({
        title: newEvent.title,
        eventDate: newEvent.eventDate,
        time: newEvent.time || '18:00 hrs',
        location: newEvent.location,
        description: newEvent.description || 'Community tradition supported by Association membership.',
        category: newEvent.category,
        tasks: parsedTasks,
        createdBy: memberProfile?.displayName,
        createdAt: new Date().toISOString(),
      });
      setShowAddEventModal(false);
      await loadEvents();
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered minutes
  const filteredMinutes = minutes.filter((m) => {
    const matchesCat = minuteCategory === 'all' || m.category === minuteCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(minuteSearch.toLowerCase()) ||
      m.summary.toLowerCase().includes(minuteSearch.toLowerCase()) ||
      m.meetingDate.toLowerCase().includes(minuteSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Calculate expense statistics
  const totalClaimed = expenses.reduce((acc, c) => acc + c.amount, 0);
  const totalApproved = expenses
    .filter((c) => c.status === 'approved' || c.status === 'reimbursed')
    .reduce((acc, c) => acc + c.amount, 0);
  const pendingCount = expenses.filter((c) => c.status === 'submitted' || c.status === 'under_review').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div
        className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] shadow-2xl border border-stone-300 flex flex-col my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="bg-[#0F172A] text-white px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-amber-400">
                FOREST FIREFIGHTERS ASSOCIATION 1888
              </div>
              <h2 className="text-base sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Member Portal</span>
                {currentUser && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Session Active
                  </span>
                )}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Body or Authenticated Dashboard */}
        {!currentUser ? (
          /* ============================================================
             1. MEMBER SIGN IN & SIGN UP SCREENS
             ============================================================ */
          <div className="p-6 sm:p-10 overflow-y-auto max-h-[calc(94vh-80px)]">
            <div className="max-w-md mx-auto space-y-6">
              {/* Tabs */}
              <div className="flex rounded-xl bg-stone-100 p-1 border border-stone-200">
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('signin');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    authTab === 'signin'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  Member Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthTab('signup');
                    setAuthError('');
                  }}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    authTab === 'signup'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-stone-600 hover:text-slate-900'
                  }`}
                >
                  New Member Sign Up
                </button>
              </div>

              {/* Fast Demo Sign-In Quick Picks */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 uppercase tracking-wider text-[10px] mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Quick Test Login (One-Click Roster):</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    disabled={authSubmitting}
                    onClick={() => handleDemoSignIn('Executive Officer', 'Dave Solway', '201')}
                    className="p-2 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-left text-[11px] font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
                  >
                    <div className="font-bold text-amber-900 truncate">Capt. Dave Solway</div>
                    <div className="text-[10px] text-stone-500">President • #201</div>
                  </button>
                  <button
                    type="button"
                    disabled={authSubmitting}
                    onClick={() => handleDemoSignIn('Executive Officer', 'Cody Wilcox', '203')}
                    className="p-2 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-left text-[11px] font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
                  >
                    <div className="font-bold text-amber-900 truncate">Cody Wilcox</div>
                    <div className="text-[10px] text-stone-500">Treasurer • #203</div>
                  </button>
                  <button
                    type="button"
                    disabled={authSubmitting}
                    onClick={() => handleDemoSignIn('Active Volunteer Firefighter', 'Station 2 Member', '204')}
                    className="p-2 bg-white hover:bg-amber-100/60 border border-amber-300 rounded-lg text-left text-[11px] font-semibold text-slate-800 transition-colors cursor-pointer shadow-2xs"
                  >
                    <div className="font-bold text-amber-900 truncate">Station 2 Member</div>
                    <div className="text-[10px] text-stone-500">Volunteer • #204</div>
                  </button>
                </div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                disabled={authSubmitting}
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-slate-800 font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-stone-200" />
                <span className="px-3 text-[11px] font-mono text-stone-400 uppercase">Or with email credentials</span>
                <div className="flex-1 border-t border-stone-200" />
              </div>

              {authError && (
                <div className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-900 text-xs">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              )}

              {/* Email Form */}
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {authTab === 'signup' && (
                  <>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="e.g. John MacDonald"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Badge Number / ID
                        </label>
                        <input
                          type="text"
                          value={badgeNumber}
                          onChange={(e) => setBadgeNumber(e.target.value)}
                          placeholder="e.g. 204"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                          Member Status
                        </label>
                        <select
                          value={memberRole}
                          onChange={(e) => setMemberRole(e.target.value)}
                          className="w-full px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                        >
                          <option value="Active Volunteer Firefighter">Active Volunteer Firefighter</option>
                          <option value="Executive Officer">Executive Officer</option>
                          <option value="Retiree / Alumni">Retiree / Alumni</option>
                          <option value="Auxiliary Member">Auxiliary Member</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="member@forestfirefighters1888.ca"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={authSubmitting}
                  className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 transition-colors shadow-sm cursor-pointer"
                >
                  {authSubmitting
                    ? 'Authenticating...'
                    : authTab === 'signin'
                    ? 'Sign In to Member Portal'
                    : 'Create Member Account'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ============================================================
             2. AUTHENTICATED MEMBER PORTAL DASHBOARD
             ============================================================ */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* User Bar */}
            <div className="bg-stone-100 border-b border-stone-200 px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm shadow-xs">
                  {memberProfile?.badgeNumber ? `#${memberProfile.badgeNumber}` : 'FD'}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-tight">
                    {memberProfile?.displayName || currentUser.displayName || 'Station 2 Volunteer'}
                  </div>
                  <div className="text-[11px] text-amber-800 font-medium">
                    {memberProfile?.role || 'Active Member'} • Station 2 Forest
                  </div>
                </div>
              </div>

              {/* Portal Navigation Tabs */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-stone-300 shadow-2xs">
                <button
                  onClick={() => setActiveTab('minutes')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'minutes'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Meeting Minutes</span>
                </button>
                <button
                  onClick={() => setActiveTab('expenses')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'expenses'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Expense Forms ({expenses.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('events')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                    activeTab === 'events'
                      ? 'bg-[#0F172A] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-50'
                  }`}
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Event Task Sign-Ups</span>
                </button>
              </div>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-bold px-2 py-1.5 rounded hover:bg-rose-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* TAB CONTENTS */}
            <div className="p-5 sm:p-8 overflow-y-auto flex-1">
              {/* TAB 1: MEETING MINUTES */}
              {activeTab === 'minutes' && (
                <div className="space-y-6">
                  {/* Action Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Official Association Meeting Minutes
                      </h3>
                      <p className="text-xs text-slate-500">
                        View, search, and download official records of regular assemblies and executive motions.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddMinuteModal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post New Minutes</span>
                    </button>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={minuteSearch}
                        onChange={(e) => setMinuteSearch(e.target.value)}
                        placeholder="Search minutes by keyword, motion, or date..."
                        className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-stone-50 border border-stone-200 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div className="flex gap-1.5 flex-wrap">
                      {['all', 'Regular Monthly', 'Executive Board', 'Annual General Meeting'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setMinuteCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors cursor-pointer ${
                            minuteCategory === cat
                              ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                              : 'bg-stone-100 text-stone-600 hover:bg-stone-200 border border-transparent'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Minutes Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredMinutes.map((m) => (
                      <div
                        key={m.id}
                        className="bg-white border border-stone-200 rounded-xl p-5 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                            <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {m.category}
                            </span>
                            <span className="text-stone-500">{m.meetingDate}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                            {m.summary}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedMinute(m)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-800 cursor-pointer"
                          >
                            <span>Read Minutes</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedMinute(m);
                              setTimeout(() => window.print(), 300);
                            }}
                            className="inline-flex items-center gap-1 text-xs text-stone-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-stone-100 cursor-pointer"
                            title="Print / Save PDF"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Download / Print</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: EXPENSE FORMS & REIMBURSEMENT */}
              {activeTab === 'expenses' && (
                <div className="space-y-6">
                  {/* Top Stats Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
                      <div className="text-[10px] font-mono font-bold uppercase text-stone-500 mb-1">
                        My Total Claims Submitted
                      </div>
                      <div className="text-2xl font-extrabold text-slate-900">
                        ${totalClaimed.toFixed(2)} CAD
                      </div>
                    </div>
                    <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                      <div className="text-[10px] font-mono font-bold uppercase text-amber-800 mb-1">
                        Pending Treasurer Review
                      </div>
                      <div className="text-2xl font-extrabold text-amber-900">
                        {pendingCount} Claims Pending
                      </div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                      <div className="text-[10px] font-mono font-bold uppercase text-emerald-800 mb-1">
                        Reimbursed / Approved
                      </div>
                      <div className="text-2xl font-extrabold text-emerald-900">
                        ${totalApproved.toFixed(2)} CAD
                      </div>
                    </div>
                  </div>

                  {/* Header & Submit Button */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Online Expense Reimbursement Form
                      </h3>
                      <p className="text-xs text-slate-500">
                        Submit receipts and invoices for Association-approved expenses directly to Treasurer Cody Wilcox.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddExpenseModal(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Submit New Expense Claim</span>
                    </button>
                  </div>

                  {/* Expense Claims Table / List */}
                  {expenses.length === 0 ? (
                    <div className="bg-stone-50 border border-stone-200 rounded-xl p-8 text-center space-y-3">
                      <DollarSign className="w-10 h-10 text-stone-400 mx-auto" />
                      <div className="text-sm font-bold text-slate-700">No Expense Claims Submitted Yet</div>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Purchased fuel for the Bickle pumper, supplies for the Canada Day fireworks, or sports tournament materials? Click above to file your claim.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-[#0F172A] text-white uppercase font-mono text-[10px]">
                          <tr>
                            <th className="py-3 px-4">Date</th>
                            <th className="py-3 px-4">Purpose / Category</th>
                            <th className="py-3 px-4">Merchant</th>
                            <th className="py-3 px-4">Amount</th>
                            <th className="py-3 px-4">Receipt Notes</th>
                            <th className="py-3 px-4 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200 bg-white">
                          {expenses.map((c) => (
                            <tr key={c.id} className="hover:bg-stone-50">
                              <td className="py-3.5 px-4 font-mono text-stone-600">{c.expenseDate}</td>
                              <td className="py-3.5 px-4">
                                <div className="font-bold text-slate-900">{c.category}</div>
                                <div className="text-[11px] text-stone-500 line-clamp-1">{c.description}</div>
                              </td>
                              <td className="py-3.5 px-4 font-medium text-slate-700">{c.merchant}</td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                                ${c.amount.toFixed(2)}
                              </td>
                              <td className="py-3.5 px-4 text-stone-500 text-[11px]">{c.receiptNotes || 'Verified'}</td>
                              <td className="py-3.5 px-4 text-right">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    c.status === 'reimbursed'
                                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                      : c.status === 'approved'
                                      ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                      : 'bg-amber-100 text-amber-800 border border-amber-300'
                                  }`}
                                >
                                  {c.status.replace('_', ' ')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: UPCOMING EVENTS & TASK SIGN-UPS */}
              {activeTab === 'events' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                        Upcoming Association Events & Volunteer Task Sign-Ups
                      </h3>
                      <p className="text-xs text-slate-500">
                        Choose a needed task slot for upcoming assemblies, charity fundraisers, and civic traditions.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddEventModal(true)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs cursor-pointer shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Post Event Shift</span>
                    </button>
                  </div>

                  {eventsLoading ? (
                    <div className="p-8 text-center text-xs text-stone-500">Loading Association event board...</div>
                  ) : (
                    <div className="space-y-6">
                      {events.map((ev) => (
                        <div
                          key={ev.id}
                          className="bg-white border border-stone-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 hover:border-amber-300 transition-all"
                        >
                          {/* Event Header */}
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-stone-100 pb-4">
                            <div>
                              <div className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase text-amber-700 mb-1">
                                <span className="bg-amber-100 px-2 py-0.5 rounded">{ev.category}</span>
                                <span>{ev.eventDate} • {ev.time}</span>
                              </div>
                              <h4 className="text-lg font-bold text-slate-900">{ev.title}</h4>
                              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                                {ev.description}
                              </p>
                            </div>
                            <div className="text-xs font-mono text-stone-500 shrink-0">
                              📍 {ev.location}
                            </div>
                          </div>

                          {/* Task List */}
                          <div>
                            <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5 text-amber-600" />
                              <span>Needed Volunteer Tasks & Shifts:</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                              {ev.tasks.map((task) => {
                                const isUserVolunteered = task.volunteers.some(
                                  (v) => v.memberId === currentUser?.uid
                                );
                                const isFull = task.volunteers.length >= task.slotsNeeded;

                                return (
                                  <div
                                    key={task.taskId}
                                    className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                                      isUserVolunteered
                                        ? 'bg-amber-50/80 border-amber-400 ring-1 ring-amber-400'
                                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100/60'
                                    }`}
                                  >
                                    <div>
                                      <div className="flex items-center justify-between text-[11px] mb-1">
                                        <span className="font-bold text-slate-900">{task.title}</span>
                                        <span
                                          className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded ${
                                            isFull
                                              ? 'bg-stone-200 text-stone-700'
                                              : 'bg-emerald-100 text-emerald-800'
                                          }`}
                                        >
                                          {task.volunteers.length}/{task.slotsNeeded} filled
                                        </span>
                                      </div>
                                      <p className="text-[11px] text-stone-500 mb-2 leading-snug">
                                        {task.description}
                                      </p>

                                      {/* Assigned Volunteer Tags */}
                                      {task.volunteers.length > 0 && (
                                        <div className="space-y-1 mb-3">
                                          <div className="text-[10px] uppercase font-mono font-bold text-stone-400">
                                            Roster:
                                          </div>
                                          <div className="flex flex-wrap gap-1">
                                            {task.volunteers.map((v) => (
                                              <span
                                                key={v.memberId}
                                                className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-white border border-stone-200 font-medium text-slate-700"
                                              >
                                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                                                <span>{v.memberName}</span>
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Volunteer CTA */}
                                    <button
                                      type="button"
                                      disabled={isFull && !isUserVolunteered}
                                      onClick={() => handleTaskToggle(ev.id, task.taskId)}
                                      className={`w-full py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1 ${
                                        isUserVolunteered
                                          ? 'bg-rose-100 hover:bg-rose-200 text-rose-800 border border-rose-300'
                                          : isFull
                                          ? 'bg-stone-200 text-stone-500 cursor-not-allowed'
                                          : 'bg-amber-500 hover:bg-amber-400 active:bg-amber-600 text-slate-950 shadow-2xs'
                                      }`}
                                    >
                                      {isUserVolunteered ? (
                                        <>
                                          <X className="w-3.5 h-3.5" />
                                          <span>Withdraw Shift</span>
                                        </>
                                      ) : isFull ? (
                                        <span>Shift Filled</span>
                                      ) : (
                                        <>
                                          <Plus className="w-3.5 h-3.5" />
                                          <span>Sign Up For This Task</span>
                                        </>
                                      )}
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-MODAL 1: VIEW FULL MEETING MINUTES
            ============================================================ */}
        {selectedMinute && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl border border-stone-300">
              <div className="flex items-start justify-between border-b border-stone-200 pb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 mb-1">
                    OFFICIAL RECORD • {selectedMinute.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-tight">
                    {selectedMinute.title}
                  </h3>
                  <div className="text-xs text-stone-500 mt-1">
                    Date: {selectedMinute.meetingDate} • Location: {selectedMinute.location}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedMinute(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
                <div>
                  <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Presiding Officers & Quorum:
                  </h5>
                  <p>
                    Presided By: {selectedMinute.presidedBy} | Recorded By: {selectedMinute.recordedBy} | Members in
                    Attendance: {selectedMinute.attendeesCount || 20}
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    Assembly Summary & Business Arising:
                  </h5>
                  <p className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 leading-relaxed">
                    {selectedMinute.summary}
                  </p>
                </div>

                {selectedMinute.motions && (
                  <div>
                    <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                      Official Motions Recorded:
                    </h5>
                    <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 whitespace-pre-line font-mono text-[11px] text-amber-950">
                      {selectedMinute.motions}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-900 bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setSelectedMinute(null)}
                  className="px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#0F172A] hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================
            SUB-MODAL 2: SUBMIT NEW EXPENSE FORM
            ============================================================ */}
        {showAddExpenseModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
            <form
              onSubmit={handleSubmitExpense}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl border border-stone-300"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <span>Submit Expense Claim</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Amount ($ CAD) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Date of Expense *
                  </label>
                  <input
                    type="date"
                    required
                    value={newExpense.expenseDate}
                    onChange={(e) => setNewExpense({ ...newExpense, expenseDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Expense Category / Budget Line *
                </label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                >
                  <option value="1922 Bickle Maintenance">1922 Bickle Maintenance & Restoration</option>
                  <option value="Kiwanis Fireworks Supplies">Kiwanis Canada Day Fireworks Supplies</option>
                  <option value="Youth Athletics Sponsorship">Youth Athletics Sponsorship (Ringette/Hockey)</option>
                  <option value="Association Hall Supplies">Station 2 Hall Supplies & Fellowship</option>
                  <option value="Two-Pitch Tournament Operations">Two-Pitch Tournament Operations</option>
                  <option value="Training & Uniforms">Training, Apparel & Badges</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Merchant / Vendor Store Name *
                </label>
                <input
                  type="text"
                  required
                  value={newExpense.merchant}
                  onChange={(e) => setNewExpense({ ...newExpense, merchant: e.target.value })}
                  placeholder="e.g. Forest Home Hardware, NAPA Auto Parts, Local Grocer"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Itemized Description / Justification *
                </label>
                <textarea
                  rows={3}
                  required
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  placeholder="Describe purchased items, purpose for the Association, and who authorized it..."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Receipt Reference / Receipt Note
                </label>
                <input
                  type="text"
                  value={newExpense.receiptNotes}
                  onChange={(e) => setNewExpense({ ...newExpense, receiptNotes: e.target.value })}
                  placeholder="e.g. Physical receipt attached in Treasurer mailbox / receipt #48291"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddExpenseModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-300 text-xs font-bold text-slate-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={expenseSubmitting}
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-xs cursor-pointer"
                >
                  {expenseSubmitting ? 'Submitting...' : 'Submit Claim Online'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================
            SUB-MODAL 3: POST NEW MINUTES (OFFICER ACTION)
            ============================================================ */}
        {showAddMinuteModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
            <form
              onSubmit={handleCreateMinute}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl border border-stone-300"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>Post Official Meeting Minutes</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddMinuteModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Meeting Title *
                </label>
                <input
                  type="text"
                  required
                  value={newMinute.title}
                  onChange={(e) => setNewMinute({ ...newMinute, title: e.target.value })}
                  placeholder="e.g. November 2026 Regular Assembly"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Meeting Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={newMinute.meetingDate}
                    onChange={(e) => setNewMinute({ ...newMinute, meetingDate: e.target.value })}
                    placeholder="e.g. November 11, 2026"
                    className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Classification
                  </label>
                  <select
                    value={newMinute.category}
                    onChange={(e) => setNewMinute({ ...newMinute, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Regular Monthly">Regular Monthly</option>
                    <option value="Executive Board">Executive Board</option>
                    <option value="Annual General Meeting">Annual General Meeting</option>
                    <option value="Special Resolution">Special Resolution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Summary & Discussion *
                </label>
                <textarea
                  rows={4}
                  required
                  value={newMinute.summary}
                  onChange={(e) => setNewMinute({ ...newMinute, summary: e.target.value })}
                  placeholder="Summary of business discussed, treasurer report highlights, and operational announcements..."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Official Motions & Approvals
                </label>
                <textarea
                  rows={2}
                  value={newMinute.motions}
                  onChange={(e) => setNewMinute({ ...newMinute, motions: e.target.value })}
                  placeholder="e.g. Motion 26-11-A: Allocate $1,000 to food bank holiday hampers (Carried)."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddMinuteModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-300 text-xs font-bold text-slate-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-xs cursor-pointer"
                >
                  Publish Minutes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ============================================================
            SUB-MODAL 4: POST NEW EVENT SHIFT
            ============================================================ */}
        {showAddEventModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
            <form
              onSubmit={handleCreateEvent}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl border border-stone-300"
            >
              <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-amber-600" />
                  <span>Post Upcoming Event & Volunteer Shifts</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="e.g. Santa Claus Parade Float & Candy Distribution"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Event Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEvent.eventDate}
                    onChange={(e) => setNewEvent({ ...newEvent, eventDate: e.target.value })}
                    placeholder="e.g. December 5, 2026"
                    className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                    placeholder="e.g. 17:00 - 20:00 hrs"
                    className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tasks Needed (comma-separated) *
                </label>
                <input
                  type="text"
                  required
                  value={newEvent.taskTitles}
                  onChange={(e) => setNewEvent({ ...newEvent, taskTitles: e.target.value })}
                  placeholder="Float Decorating, Parade Walker, Traffic Marshaling"
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
                <span className="text-[10px] text-stone-500 block mt-1">
                  Each comma creates an individual volunteer slot that members can sign up for.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Event Description
                </label>
                <textarea
                  rows={2}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Notes about apparel, arrival muster, and refreshments..."
                  className="w-full px-3.5 py-2 rounded-lg bg-stone-50 border border-stone-300 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="flex-1 py-2.5 rounded-lg border border-stone-300 text-xs font-bold text-slate-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 shadow-xs cursor-pointer"
                >
                  Post Event Roster
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
