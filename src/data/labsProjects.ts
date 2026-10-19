export interface LabsProject {
  id: string;
  code: string;
  name: string;
  category: 'AI' | 'Creative Computing' | 'Language' | 'Voice' | 'HCI' | 'Generative Art' | 'Education' | 'XR';
  status: 'Research' | 'Prototype' | 'Building' | 'Coming Soon';
  tagline: string;
  description: string;
  keyInnovations: string[];
  metrics: string;
  leads: string;
}

/**
 * Exploratory concepts only.
 *
 * None of these experiments are built, funded, staffed or measured. Earlier
 * versions of this file listed invented research results, named team leads and
 * "prototype" statuses; those have been removed so the Labs page cannot be read
 * as a claim of working technology.
 */
export const LABS_EXPERIMENTS: LabsProject[] = [
  {
    id: 'lab-01',
    code: 'CONCEPT_DHVANI_21',
    name: 'Concept: Dhvani-21 — Indic voice synthesis',
    category: 'Voice',
    status: 'Coming Soon',
    tagline: 'An open question: can regional TTS handle retroflex and aspirated consonants with native accuracy?',
    description:
      'Concept only. No model, dataset or voice has been built. The question is whether a future engine could improve on generic text-to-speech for Indian retroflex consonants (ṭ, ḍ, ṇ) and aspirated plosives.',
    keyInnovations: ['Retroflex articulation research', 'Prosody preservation', 'On-device inference'],
    metrics: 'Not started — no results',
    leads: 'Unassigned'
  },
  {
    id: 'lab-02',
    code: 'CONCEPT_KOLAM_TOPOLOGY',
    name: 'Concept: Kolam — generative geometry study',
    category: 'Generative Art',
    status: 'Coming Soon',
    tagline: 'Exploring whether pulli kolam dot-and-loop grammar can inform generative pattern tools.',
    description:
      'Concept only. A design study, not a product. No software has been released and no architectural or printing claims are made.',
    keyInnovations: ['Geometric pattern grammar', 'SVG export exploration'],
    metrics: 'Not started — no results',
    leads: 'Unassigned'
  },
  {
    id: 'lab-03',
    code: 'CONCEPT_BHASHA_IDIOM',
    name: 'Concept: Anuvaad-Idiom — idiom notes',
    category: 'Language',
    status: 'Coming Soon',
    tagline: 'A possible editorial glossary of regional idioms, written and reviewed by people rather than machines.',
    description:
      'Concept only. No idiom database exists yet. Any future glossary would be human-written, cite its sources and be clearly marked as editorial rather than machine-generated.',
    keyInnovations: ['Human-written idiom notes', 'Source citations', 'Community review'],
    metrics: 'Not started — no results',
    leads: 'Unassigned'
  },
  {
    id: 'lab-04',
    code: 'CONCEPT_HERITAGE_SCAN',
    name: 'Concept: Shilpa — heritage documentation',
    category: 'XR',
    status: 'Coming Soon',
    tagline: 'A possible documentation format for craft workshops and stone carvings, using ordinary phone cameras.',
    description:
      'Concept only. No monuments have been scanned and no fidelity claims are made. This is a note about a documentation approach we would like to explore with heritage partners.',
    keyInnovations: ['Phone-based capture', 'Low-bandwidth viewing'],
    metrics: 'Not started — no results',
    leads: 'Unassigned'
  }
];
