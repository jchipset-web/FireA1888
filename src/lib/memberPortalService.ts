import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface MemberProfile {
  id: string;
  email: string;
  displayName: string;
  badgeNumber?: string;
  role: string; // 'Active Volunteer Firefighter' | 'Executive Officer' | 'Retiree / Alumni' | 'Auxiliary Member'
  station?: string;
  createdAt: string;
}

export interface MeetingMinute {
  id: string;
  title: string;
  meetingDate: string;
  category: string; // 'Regular Monthly' | 'Annual General Meeting' | 'Executive Board' | 'Special Resolution'
  location: string;
  presidedBy: string;
  recordedBy: string;
  summary: string;
  motions?: string;
  attendeesCount?: number;
  downloadUrl?: string;
  createdAt: string;
}

export interface ExpenseClaim {
  id?: string;
  memberId: string;
  memberName: string;
  memberEmail?: string;
  category: string; // '1922 Bickle Maintenance' | 'Kiwanis Fireworks Supplies' | 'Youth Athletics Sponsorship' | 'Association Hall Supplies' | 'Apparel & Badges' | 'Training & Fellowship'
  amount: number;
  merchant: string;
  expenseDate: string;
  description: string;
  receiptNotes?: string;
  status: 'submitted' | 'under_review' | 'approved' | 'reimbursed';
  createdAt: string;
}

export interface TaskVolunteer {
  memberId: string;
  memberName: string;
  memberEmail?: string;
  signedUpAt: string;
}

export interface EventTask {
  taskId: string;
  title: string;
  description: string;
  slotsNeeded: number;
  volunteers: TaskVolunteer[];
}

export interface PortalEvent {
  id: string;
  title: string;
  eventDate: string;
  time: string;
  location: string;
  description: string;
  category: string;
  tasks: EventTask[];
  createdBy?: string;
  createdAt: string;
}

// Initial seed minutes if collection is empty
export const INITIAL_MEETING_MINUTES: Omit<MeetingMinute, 'id'>[] = [
  {
    title: 'October 2026 Regular Assembly & Fall Preparedness Review',
    meetingDate: 'October 14, 2026',
    category: 'Regular Monthly',
    location: 'Station 2 Bay Floor & Association Hall',
    presidedBy: 'Dave Solway, President',
    recordedBy: 'Association Secretary',
    summary:
      'Meeting called to order at 19:30. Reviewed autumn apparatus deployment, status of the 1922 Bickle winterization protocol, and approved reimbursement disbursements for the Labour Day parade entry. Treasurer Wilcox presented third-quarter philanthropic surplus report showing $14,200 available for youth sports grants.',
    motions:
      'Motion 26-10-A: Allocate $2,500 to the Forest Minor Hockey ice-time subsidy fund. (Carried unanimously).\nMotion 26-10-B: Authorize $850 for engine valve gasket fabrication for the 1922 Bickle pumper. (Carried).',
    attendeesCount: 22,
    createdAt: new Date('2026-10-15T00:00:00Z').toISOString(),
  },
  {
    title: '2026 Annual Kiwanis Canada Day Fireworks Debrief & Financial Closeout',
    meetingDate: 'July 8, 2026',
    category: 'Executive Board',
    location: 'Lambton Shores Fire Station 2 Conference Room',
    presidedBy: 'Dave Solway, President',
    recordedBy: 'Association Secretary',
    summary:
      'Executive committee and pyrotechnics marshaling leads met to review the July 1st Kiwanis fireworks event at the flat Dodge grounds. Crowd count estimated at over 4,500 attendees. Safety perimeter was maintained with zero incidents. Total donations collected at parking gates amounted to $6,420, split evenly with the Kiwanis Club.',
    motions:
      'Motion 26-07-A: Reinvest $3,210 into the 2027 pyrotechnics purchase deposit fund to lock in early-bird supplier rates. (Carried).',
    attendeesCount: 14,
    createdAt: new Date('2026-07-09T00:00:00Z').toISOString(),
  },
  {
    title: 'Spring 2026 Annual General Meeting & Board Election Ratification',
    meetingDate: 'April 22, 2026',
    category: 'Annual General Meeting',
    location: 'Station 2 Association Hall & Fellowship Room',
    presidedBy: 'Dave Solway, President',
    recordedBy: 'Association Secretary',
    summary:
      'Full membership attendance for the 2026 AGM. Ratified executive board terms, reviewed independent audited statement from chartered accountants confirming 100% local retention of community contributions, and established volunteer committees for the Two-Pitch Tournament and Fall Fair appearance.',
    motions:
      'Motion 26-04-A: Adopt official audited financial statement for fiscal year 2025/2026. (Carried unanimously).\nMotion 26-04-B: Confirm executive appointments of Dave Solway (President) and Cody Wilcox (Treasurer). (Carried).',
    attendeesCount: 31,
    createdAt: new Date('2026-04-23T00:00:00Z').toISOString(),
  },
];

// Initial seed events with volunteer tasks
export const INITIAL_PORTAL_EVENTS: Omit<PortalEvent, 'id'>[] = [
  {
    title: 'Annual Kiwanis Canada Day Fireworks Safety & Firing Crew',
    eventDate: 'July 1, 2026',
    time: '15:00 - 23:30 hrs',
    location: 'Dodge Flat Grounds & Concession 12',
    category: 'Civic Tradition',
    description:
      'Full operational mobilization for the premier civic fireworks celebration in Lambton Shores. Members manage mortar positioning, crowd security perimeter, traffic control, and post-display ground sweeping.',
    createdAt: new Date('2026-05-01T00:00:00Z').toISOString(),
    tasks: [
      {
        taskId: 't1',
        title: 'Mortar Line & Pyrotechnic Perimeter Marshal',
        description: 'Certified/briefed crew to enforce 150m safety perimeter around firing rack.',
        slotsNeeded: 4,
        volunteers: [
          {
            memberId: 'demo-201',
            memberName: 'Dave Solway',
            memberEmail: 'dave@forestfirefighters1888.ca',
            signedUpAt: '2026-06-01T10:00:00Z',
          },
        ],
      },
      {
        taskId: 't2',
        title: 'Spectator Parking & Traffic Marshals',
        description: 'Direct vehicles into Dodge field gates and maintain emergency egress route.',
        slotsNeeded: 6,
        volunteers: [],
      },
      {
        taskId: 't3',
        title: 'Post-Display Hall Cleanup & Rake Crew',
        description: 'Check field for debris at conclusion and return barriers to Station 2 trailer.',
        slotsNeeded: 4,
        volunteers: [],
      },
    ],
  },
  {
    title: 'Firefighters Annual Two-Pitch Tournament & Beer Gardens',
    eventDate: 'August 14-16, 2026',
    time: '08:00 - 20:00 hrs Daily',
    location: 'Coultis Park Diamonds 1 & 2',
    category: 'Fundraiser & Athletics',
    description:
      'Our signature summer fundraiser hosting 16 regional softball squads. Needs volunteers for field prep, umpire hydration, beer garden token sales, and barbecue operations.',
    createdAt: new Date('2026-05-15T00:00:00Z').toISOString(),
    tasks: [
      {
        taskId: 't4',
        title: 'Diamond Lining & Bases Setup (Morning Shift)',
        description: 'Chalk infield baselines, rake batter boxes, and inspect field fence safety.',
        slotsNeeded: 3,
        volunteers: [],
      },
      {
        taskId: 't5',
        title: 'Charity Beer Garden & Token Cashier (Shift A)',
        description: 'SmartServe certified members to dispense beverages and manage donation tickets.',
        slotsNeeded: 4,
        volunteers: [],
      },
      {
        taskId: 't6',
        title: 'BBQ Grillmaster & Burger Crew',
        description: 'Operate commercial Association barbecue trailer for players and families.',
        slotsNeeded: 4,
        volunteers: [],
      },
    ],
  },
  {
    title: '1922 Oldsmobile Bickle Heritage Prep for Fall Fair',
    eventDate: 'September 12, 2026',
    time: '09:00 - 13:00 hrs',
    location: 'Station 2 Apparatus Bay',
    category: 'Heritage Restoration',
    description:
      'Hands-on preservation session for our antique 1922 motorized pumper. Members check engine oil, clean brass fittings, polish bodywork, and load onto the parade float trailer.',
    createdAt: new Date('2026-06-01T00:00:00Z').toISOString(),
    tasks: [
      {
        taskId: 't7',
        title: 'Engine Fluids & Ignition Maintenance',
        description: 'Assisting mechanical guild with spark plug inspection and carburetor tune.',
        slotsNeeded: 2,
        volunteers: [],
      },
      {
        taskId: 't8',
        title: 'Brass Bell & Chrome Polishing',
        description: 'Detailed hand polish of vintage searchlights, suction tubes, and brass fittings.',
        slotsNeeded: 4,
        volunteers: [],
      },
    ],
  },
];

// Profile Management
export async function getMemberProfile(userId: string): Promise<MemberProfile | null> {
  const path = `users/${userId}`;
  try {
    const docSnap = await getDoc(doc(db, 'users', userId));
    if (docSnap.exists()) {
      return docSnap.data() as MemberProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

export async function saveMemberProfile(profile: MemberProfile): Promise<void> {
  const path = `users/${profile.id}`;
  try {
    await setDoc(doc(db, 'users', profile.id), profile, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

// Meeting Minutes Management
export async function fetchMeetingMinutes(): Promise<MeetingMinute[]> {
  const path = 'meeting_minutes';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      // Seed initial minutes
      await seedMeetingMinutes();
      const freshSnap = await getDocs(collection(db, path));
      return freshSnap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MeetingMinute, 'id'>) }));
    }
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<MeetingMinute, 'id'>) }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function seedMeetingMinutes(): Promise<void> {
  const path = 'meeting_minutes';
  for (let i = 0; i < INITIAL_MEETING_MINUTES.length; i++) {
    const m = INITIAL_MEETING_MINUTES[i];
    const id = `minute-${i + 1}`;
    try {
      await setDoc(doc(db, path, id), m);
    } catch (e) {
      console.warn('Seeding minute failed', e);
    }
  }
}

export async function addMeetingMinute(minute: Omit<MeetingMinute, 'id'>): Promise<string> {
  const path = 'meeting_minutes';
  try {
    const docRef = await addDoc(collection(db, path), minute);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

// Expense Claims Management
export async function submitExpenseClaim(claim: Omit<ExpenseClaim, 'id'>): Promise<string> {
  const path = 'expense_claims';
  try {
    const docRef = await addDoc(collection(db, path), claim);
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeToMemberExpenses(
  memberId: string,
  onUpdate: (claims: ExpenseClaim[]) => void
): () => void {
  const path = 'expense_claims';
  try {
    const q = query(collection(db, path), where('memberId', '==', memberId));
    return onSnapshot(
      q,
      (snapshot) => {
        const claims: ExpenseClaim[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<ExpenseClaim, 'id'>),
        }));
        // Sort descending by date
        claims.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        onUpdate(claims);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, path);
      }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
  }
}

// Portal Events & Volunteer Tasks
export async function fetchPortalEvents(): Promise<PortalEvent[]> {
  const path = 'portal_events';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      await seedPortalEvents();
      const fresh = await getDocs(collection(db, path));
      return fresh.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          title: data.title,
          eventDate: data.eventDate,
          time: data.time,
          location: data.location,
          description: data.description,
          category: data.category || 'General',
          tasks: typeof data.tasks === 'string' ? JSON.parse(data.tasks) : data.tasks || [],
          createdBy: data.createdBy,
          createdAt: data.createdAt,
        };
      });
    }
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title,
        eventDate: data.eventDate,
        time: data.time,
        location: data.location,
        description: data.description,
        category: data.category || 'General',
        tasks: typeof data.tasks === 'string' ? JSON.parse(data.tasks) : data.tasks || [],
        createdBy: data.createdBy,
        createdAt: data.createdAt,
      };
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
}

export async function seedPortalEvents(): Promise<void> {
  const path = 'portal_events';
  for (let i = 0; i < INITIAL_PORTAL_EVENTS.length; i++) {
    const ev = INITIAL_PORTAL_EVENTS[i];
    const id = `event-${i + 1}`;
    try {
      await setDoc(doc(db, path, id), {
        ...ev,
        tasks: JSON.stringify(ev.tasks),
      });
    } catch (e) {
      console.warn('Seeding event failed', e);
    }
  }
}

export async function addPortalEvent(event: Omit<PortalEvent, 'id'>): Promise<string> {
  const path = 'portal_events';
  try {
    const docRef = await addDoc(collection(db, path), {
      ...event,
      tasks: JSON.stringify(event.tasks),
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function toggleTaskVolunteer(
  eventId: string,
  taskId: string,
  member: { memberId: string; memberName: string; memberEmail?: string }
): Promise<void> {
  const path = `portal_events/${eventId}`;
  try {
    const eventRef = doc(db, 'portal_events', eventId);
    const snap = await getDoc(eventRef);
    if (!snap.exists()) return;

    const data = snap.data();
    const tasks: EventTask[] = typeof data.tasks === 'string' ? JSON.parse(data.tasks) : data.tasks || [];

    const targetTask = tasks.find((t) => t.taskId === taskId);
    if (!targetTask) return;

    const isAlreadySignedUp = targetTask.volunteers.some((v) => v.memberId === member.memberId);

    if (isAlreadySignedUp) {
      // Remove signup
      targetTask.volunteers = targetTask.volunteers.filter((v) => v.memberId !== member.memberId);
    } else {
      // Add signup if slots remain
      if (targetTask.volunteers.length < targetTask.slotsNeeded) {
        targetTask.volunteers.push({
          memberId: member.memberId,
          memberName: member.memberName,
          memberEmail: member.memberEmail,
          signedUpAt: new Date().toISOString(),
        });
      }
    }

    await updateDoc(eventRef, {
      tasks: JSON.stringify(tasks),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}
