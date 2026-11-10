export interface FleetRig {
  id: string;
  name: string;
  year: string;
  type: string;
  chassis: string;
  role: string;
  description: string;
  specs: {
    engine?: string;
    pump?: string;
    tank?: string;
    coachwork?: string;
  };
}

export interface BoardMember {
  id: string;
  title: string;
  name: string;
  roleBadge: string;
  description: string;
  tag1: string;
  tag2: string;
  email?: string;
}

export interface CommunityEvent {
  id: string;
  category: string;
  title: string;
  dateBadge?: string;
  dateText: string;
  location: string;
  description: string;
  details: string[];
}

export interface ArchiveDocument {
  id: string;
  title: string;
  category: 'event_signups' | 'sponsorship_grants' | 'public_records';
  categoryLabel: string;
  fileSize: string;
  format: string;
  updatedDate: string;
  description: string;
  author: string;
  documentNumber: string;
}

export interface SponsorItem {
  id: string;
  role: string;
  name: string;
  subtitle: string;
}

export const STATION_INFO = {
  name: 'Forest Firefighters Association 1888',
  hall: 'Station 2 — Forest Hall, Lambton Shores',
  address: '45 Main Street South, P.O. Box 219, Forest, Ontario N0N 1J0',
  email: 'contact@forestfirefighters1888.ca',
  treasuryEmail: 'treasury@forestfirefighters1888.ca',
  presidentEmail: 'president@forestfirefighters1888.ca',
  emergency: 'DIAL 9-1-1',
  established: 1888,
  yearsOfService: '135+',
  hoursVolunteered: '500+',
  fundsRaised: '$84,500+',
  localRetention: '100%',
  social: {
    facebook: 'https://facebook.com',
    instagram: 'https://instagram.com',
  },
};

export const FLEET_DATA: FleetRig[] = [
  {
    id: 'c60-1968',
    name: '1968 Chevrolet C60 / King Seagrave Pumper',
    year: '1968',
    type: '1968 PUMPER',
    chassis: 'Chassis #C60-68',
    role: 'Structural Attack',
    description:
      'A classic heavy-duty workhorse of the late 1960s, providing reliable water supply and structural protection as the town expanded.',
    specs: {
      engine: 'Chevrolet 366 V8 Heavy-Duty',
      pump: 'King Seagrave 625 GPM Single-Stage',
      tank: '500 Imperial Gallons',
      coachwork: 'King Seagrave Ltd. — Woodstock, ON',
    },
  },
  {
    id: 'f750-1977',
    name: '1977 Ford F-750 / King Seagrave Pumper',
    year: '1977',
    type: '1977 PUMPER',
    chassis: 'Chassis #F75-77',
    role: 'Master Stream',
    description:
      'Built on a rugged commercial chassis, this rig was the backbone of our structural fire response throughout the 1980s and 1990s.',
    specs: {
      engine: 'Ford 391ci FT Industrial V8',
      pump: 'King Seagrave 840 GPM Dual-Stage',
      tank: '600 Imperial Gallons',
      coachwork: 'King Seagrave Ltd.',
    },
  },
  {
    id: 'f700-1990',
    name: '1990 Ford F-700 / E-One Pumper',
    year: '1990',
    type: '1990 CUSTOM',
    chassis: 'Chassis #EO-90',
    role: 'Pressure Governor',
    description:
      'Marking a shift toward modern custom-built fire apparatus, this E-One brought enhanced pumping capabilities and safety features to the department during a decade of rapid regional growth.',
    specs: {
      engine: 'Detroit Diesel 8.2L Fuel-Pincher V8',
      pump: 'Hale 1050 GPM Top-Mount Pump',
      tank: '750 Imperial Gallons Poly-Tank',
      coachwork: 'Emergency One (E-One)',
    },
  },
  {
    id: 'freightliner-1995',
    name: '1995 Freightliner Walk-In Rescue',
    year: '1995',
    type: '1995 HEAVY RESCUE',
    chassis: 'Chassis #FL-95',
    role: 'Extrication Module',
    description:
      'A crucial leap forward for emergency medical response and extrication operations, this specialized unit carried the jaws of life, medical equipment, and technical gear, providing a sheltered command area for complex rescue calls.',
    specs: {
      engine: 'Cummins 8.3L Turbocharged Diesel',
      pump: 'Hydraulic Extrication Core + 15kW Generator',
      tank: 'Command / Air-Bank Support',
      coachwork: 'Marion Body Works Rescue Unit',
    },
  },
];

export const BOARD_MEMBERS: BoardMember[] = [
  {
    id: 'dave-solway',
    title: 'PRESIDENT',
    name: 'Dave Solway',
    roleBadge: 'President',
    description:
      'Oversees all association operations, chairs regular meetings, and serves as the primary liaison between the Association, active fire service command, and community partners like the Kiwanis Club.',
    tag1: 'Executive Officer',
    tag2: 'Active Liaison',
    email: 'president@forestfirefighters1888.ca',
  },
  {
    id: 'vice-president',
    title: 'VICE PRESIDENT',
    name: 'Vice President',
    roleBadge: 'Executive Vice President',
    description:
      'Assists in executive duties, steps in to lead when necessary, and plays a key role in coordinating major association fundraisers like the Annual Two-Pitch and Hockey Tournaments.',
    tag1: 'Elected Position',
    tag2: 'Tournament Lead',
    email: 'vp@forestfirefighters1888.ca',
  },
  {
    id: 'cody-wilcox',
    title: 'TREASURER',
    name: 'Cody Wilcox',
    roleBadge: 'Treasurer',
    description:
      'Meticulously manages the Association’s finances, including overseeing the community reinvestment fund, processing donations, managing event budgets, and ensuring transparent financial reporting for all charitable sponsorships.',
    tag1: 'Executive Officer',
    tag2: 'Fiscal Controller',
    email: 'treasury@forestfirefighters1888.ca',
  },
  {
    id: 'secretary',
    title: 'SECRETARY',
    name: 'Secretary',
    roleBadge: 'Secretary & Records',
    description:
      'Maintains official association records, records meeting minutes, manages internal communications with active and retired members, and helps coordinate public outreach.',
    tag1: 'Elected Position',
    tag2: 'Records Custodian',
    email: 'secretary@forestfirefighters1888.ca',
  },
];

export const EVENTS_DATA: CommunityEvent[] = [
  {
    id: 'canada-day',
    category: '30+ YEAR TRADITION',
    title: 'Annual Kiwanis Canada Day Fireworks',
    dateBadge: 'Every July 1st',
    dateText: 'July 1st, 2026 • Dusk (~9:45 PM)',
    location: 'Esplanade Beachfront & Coultis Park, Forest',
    description:
      'Generously funded primarily by the Kiwanis organization, with our certified association pyrotechnicians handling the safe setup and launch.',
    details: [
      'Primary funding and organization driven by our partners at the Kiwanis Club',
      'Managed directly by Association certified pyrotechnicians',
      'Association provides supplementary financial donations to support the show',
      'Over 4,500 residents and visitors gathering across Lambton Shores',
    ],
  },
  {
    id: 'two-pitch',
    category: 'SUMMER CLASSIC',
    title: 'Annual Two-Pitch Tournament',
    dateBadge: 'August Weekend',
    dateText: 'August 14–16, 2026',
    location: 'Coultis Park Diamonds, Forest, ON',
    description:
      'Community members form teams and compete for prizes in an all-day tournament hosted by the association.',
    details: [
      'Full day of community softball competition and prize giveaways',
      'Morning breakfast sandwiches, plus hamburgers and hotdogs all day',
      'Festivities go late into the evening with music and a licensed bar',
      'All proceeds directly support Lambton youth athletics and team gear',
    ],
  },
  {
    id: 'hockey-tourney',
    category: 'WINTER INVITATIONAL',
    title: 'Annual Firefighters Hockey & Ringette Challenge',
    dateBadge: 'March Classic',
    dateText: 'March 6–8, 2026',
    location: 'The Shores Recreation Centre Arena, Forest',
    description:
      'Association members face off against a competitive local female team in a unique mixed hockey and ringette exhibition game.',
    details: [
      'Action-packed format featuring periods of both hockey and ringette',
      '100% of proceeds go to a rotating pre-designated cause (e.g., Make-A-Wish)',
      'Fast-paced action with full spectator support',
      'Community fellowship and sportsmanship on the ice',
    ],
  },
  {
    id: 'halloween',
    category: '19+ COMMUNITY EVENT',
    title: 'Community Halloween Party',
    dateBadge: 'October 31st',
    dateText: 'October 31st, 2026 • 8:00 PM – 1:00 AM',
    location: 'Royal Canadian Legion, Branch 174',
    description:
      'A lively 19+ community celebration hosted at the Legion featuring music, drinks, and costume competitions.',
    details: [
      'Strictly a 19+ event (Ontario legal drinking age)',
      'Live DJ and competitive prizes for best costumes',
      'Late-night snacks including pizza and chips',
      'Fully licensed bar and evening entertainment',
    ],
  },
];

export const SPONSORS_DATA: SponsorItem[] = [
  {
    id: 'kiwanis',
    role: 'CIVIC PARTNER',
    name: 'Kiwanis Club of Forest',
    subtitle: 'Canada Day Fireworks Co-Sponsor',
  },
  {
    id: 'legion',
    role: 'COMMUNITY PARTNER',
    name: 'Royal Canadian Legion 174',
    subtitle: 'Memorial Hall & Civic Project Ally',
  },
  {
    id: 'agricoop',
    role: 'AGRI PARTNER',
    name: 'Lambton Shores Agri-Coop',
    subtitle: 'Primary Historic Fleet Supporter',
  },
  {
    id: 'southwestern',
    role: 'SAFETY PARTNER',
    name: 'Southwestern Mutual',
    subtitle: 'Smoke Alarm & Safety Patron',
  },
];

export const DOCUMENTS_DATA: ArchiveDocument[] = [
  {
    id: 'doc-2',
    title: 'Annual Two-Pitch Tournament Team Registration & Roster Form',
    category: 'event_signups',
    categoryLabel: 'Athletics & Fellowship',
    fileSize: 'PDF • 850 KB',
    format: 'PDF',
    updatedDate: 'Updated June 2025',
    description:
      'Team submission packet, roster rules regulations, player eligibility guidelines, and entry deposit details for our mid-summer weekend tournament.',
    author: 'Association Tournament Committee',
    documentNumber: 'DOC-2025-TP02',
  },
  {
    id: 'doc-4',
    title: 'Annual Firefighters Hockey Tournament Registration Form',
    category: 'event_signups',
    categoryLabel: 'Sports & Tournaments',
    fileSize: 'PDF • 620 KB',
    format: 'PDF',
    updatedDate: 'Updated Winter',
    description:
      'Entry ledger and roster sheets for participating Southwestern Ontario volunteer fire brigades playing at the Forest Shores Recreation Arena.',
    author: 'Association Sports Committee',
    documentNumber: 'DOC-2025-HT04',
  },
  {
    id: 'doc-6',
    title: 'Association By-laws, Historical Charter & Annual Stewardship Report',
    category: 'public_records',
    categoryLabel: 'Public Record',
    fileSize: 'PDF • 3.2 MB',
    format: 'PDF',
    updatedDate: 'Annual Review',
    description:
      'Full governance charter, non-profit constitution, historical archive registry index, and audited financial allocations certified by Cody Wilcox, Treasurer.',
    author: 'Executive Board of Forest Firefighters Association 1888',
    documentNumber: 'DOC-2025-BY06',
  },
];
