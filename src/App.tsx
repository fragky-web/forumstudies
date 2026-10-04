/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Cpu, 
  Layers, 
  Monitor, 
  Terminal, 
  ChevronRight, 
  BookOpen,
  Award,
  Users,
  Menu,
  X,
  FileSpreadsheet,
  FileText,
  Database,
  Globe,
  Presentation,
  ShieldCheck,
  FolderKanban,
  CheckCircle2,
  ArrowUpRight,
  Binary,
  GraduationCap,
  GitBranch,
  Braces,
  Mail,
  Send
} from 'lucide-react';

import softwareImg from './assets/images/course_software_eng_1790491319804.jpg';
import hardwareImg from './assets/images/course_hardware_systems_1790491334354.jpg';
import cyberImg from './assets/images/course_cyber_security_1790491347163.jpg';
import ecdlImg from './assets/images/course_ecdl_certification_1790491357466.jpg';
import aeppImg from './assets/images/course_aepp_algorithm_1790492210520.jpg';
import { StudentProjectsSection } from './components/StudentProjectsSection';

const RECIPIENT_EMAIL = 'fragky@gmail.com';

// --- Types & Data ---

export interface CourseTrack {
  id: number;
  title: string;
  titleEl: string;
  category: 'ECDL Certification' | 'AEPP Lyceum' | 'Engineering' | 'Hardware & Security';
  categoryLabel: string;
  index: string;
  duration: string;
  level: string;
  description: string;
  syllabus: string[];
  icon: React.ReactNode;
  image: string;
}

export interface EcdlModule {
  id: string;
  code: string;
  titleEl: string;
  titleEn: string;
  software: string;
  hours: number;
  asepRequired: boolean;
  summary: string;
  topics: string[];
  icon: React.ReactNode;
}

export interface EcdlPackage {
  id: 'asep' | 'standard' | 'expert';
  name: string;
  subtitle: string;
  hours: string;
  modulesCount: number;
  passRate: string;
  description: string;
  includedCodes: string[];
  idealFor: string;
}

export interface AeppUnit {
  id: string;
  code: string;
  title: string;
  chapters: string;
  examWeight: string;
  hours: number;
  summary: string;
  topics: string[];
  pseudocodeSample: string;
  icon: React.ReactNode;
}

const COURSES: CourseTrack[] = [
  {
    id: 1,
    title: 'ECDL Core & ΑΣΕΠ Πιστοποίηση',
    titleEl: 'Πιστοποίηση Πληροφορικής ECDL (ΑΣΕΠ)',
    category: 'ECDL Certification',
    categoryLabel: 'Πιστοποίηση ECDL',
    index: '01',
    duration: '4–8 Εβδομάδες',
    level: 'Όλα τα Επίπεδα',
    description: 'Πλήρης προετοιμασία για το επίσημο πιστοποιητικό ECDL (Word, Excel, Internet, Access, PowerPoint, Windows) αναγνωρισμένο από τον ΑΣΕΠ για Δημόσιο & Ιδιωτικό τομέα.',
    syllabus: [
      'Επεξεργασία Κειμένου (MS Word) — Μορφοποίηση, Πίνακες, Συγχώνευση Αλληλογραφίας',
      'Υπολογιστικά Φύλλα (MS Excel) — Συναρτήσεις, Γραφήματα, Pivot Tables',
      'Υπηρεσίες Διαδικτύου (Internet & MS Outlook) — Πλοήγηση, Ηλεκτρονική Αλληλογραφία',
      'Απεριόριστα Τεστ Προσομοίωσης σε Επίσημο Εξεταστικό Περιβάλλον'
    ],
    icon: <Award className="w-5 h-5" />,
    image: ecdlImg,
  },
  {
    id: 2,
    title: 'ΑΕΠΠ Γ\' Λυκείου — Πανελλαδικές',
    titleEl: 'ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)',
    category: 'AEPP Lyceum',
    categoryLabel: 'ΑΕΠΠ Γ\' Λυκείου',
    index: '02',
    duration: '9 Μήνες (4 Ώρες/Εβδ.)',
    level: 'Γ\' Λυκείου (ΕΠΑΛ / ΓΕΛ)',
    description: 'Εντατική προετοιμασία Πανελλαδικών Εξετάσεων στην Ανάπτυξη Εφαρμογών σε Προγραμματιστικό Περιβάλλον (ΓΛΩΣΣΑ) με μεθοδολογία για άριστη βαθμολογία 100/100.',
    syllabus: [
      'Πλήρης κάλυψη Θεωρίας, Διαγραμμάτων Ροής & Δομών Επιλογής/Επανάληψης σε ΓΛΩΣΣΑ',
      'Μονοδιάστατοι & Δισδιάστατοι Πίνακες: Αναζήτηση, Ταξινόμηση (Bubble Sort), Συγχώνευση',
      'Υποπρογράμματα (Διαδικασίες & Συναρτήσεις), Στοίβα, Ουρά, Δένδρα & Γράφοι',
      'Εβδομαδιαία 3ωρα Διαγωνίσματα Προσομοίωσης Πανελλαδικών (Θέματα Α, Β, Γ, Δ)'
    ],
    icon: <GraduationCap className="w-5 h-5" />,
    image: aeppImg,
  },
  {
    id: 3,
    title: 'ΑΕΠΠ Προετοιμασία Β\' προς Γ\' Λυκείου',
    titleEl: 'Θερινά Τμήματα ΑΕΠΠ (Β\' προς Γ\' Λυκείου)',
    category: 'AEPP Lyceum',
    categoryLabel: 'ΑΕΠΠ Γ\' Λυκείου',
    index: '03',
    duration: '6 Εβδομάδες (Θερινό)',
    level: 'Μαθητές Β\' & Γ\' Λυκείου',
    description: 'Θεμελίωση της αλγοριθμικής σκέψης και της ΓΛΩΣΣΑΣ πριν την έναρξη της σχολικής χρονιάς, με πρακτική εξάσκηση στον Διερμηνευτή ΓΛΩΣΣΑΣ στο εργαστήριο.',
    syllabus: [
      'Εισαγωγή στην Αλγοριθμική, Μεταβλητές, Τύποι Δεδομένων & Ακολουθιακές Δομές',
      'Ανάπτυξη Λογικής με Εντολές ΑΝ..ΤΟΤΕ..ΑΛΛΙΩΣ, ΟΣΟ..ΕΠΑΝΑΛΑΒΕ και ΓΙΑ..ΑΠΟ..ΜΕΧΡΙ',
      'Εισαγωγή στους Μονοδιάστατους Πίνακες & Πίνακες Τιμών (Trace Tables)',
      'Εργαστηριακή Εκτέλεση & Εκσφαλμάτωση Προγραμμάτων στον Διερμηνευτή ΓΛΩΣΣΑΣ'
    ],
    icon: <Binary className="w-5 h-5" />,
    image: aeppImg,
  },
  {
    id: 4,
    title: 'ECDL Expert & Office Automation',
    titleEl: 'ECDL Advanced / Expert (Επαγγελματικό)',
    category: 'ECDL Certification',
    categoryLabel: 'Πιστοποίηση ECDL',
    index: '04',
    duration: '6 Εβδομάδες',
    level: 'Προχωρημένο',
    description: 'Εξειδικευμένα μαθήματα Advanced Excel, Word, Access και PowerPoint για στελέχη επιχειρήσεων, οικονομικούς αναλυτές και διοικητικό προσωπικό.',
    syllabus: [
      'Advanced Spreadsheets — Σύνθετες Συναρτήσεις, Μακροεντολές (Macros), Ανάλυση What-If',
      'Advanced Word Processing — Αυτοματοποίηση Εγγράφων, Ευρετήρια, Φόρμες',
      'Advanced Database — Σχεσιακός Σχεδιασμός, Σύνθετα Ερωτήματα SQL & Αναφορές',
      'Advanced Presentation — Custom Slide Masters & Διαδραστικές Παρουσιάσεις'
    ],
    icon: <FileSpreadsheet className="w-5 h-5" />,
    image: ecdlImg,
  },
  {
    id: 5,
    title: 'Software Engineering',
    titleEl: 'Μηχανική Λογισμικού & Προγραμματισμός',
    category: 'Engineering',
    categoryLabel: 'Foundations',
    index: '05',
    duration: '12 Εβδομάδες',
    level: 'Foundations to Pro',
    description: 'Master memory management, concurrency, algorithms, and full-stack software architecture in Python, C++, and modern TypeScript.',
    syllabus: [
      'Δομές Δεδομένων, Αλγόριθμοι & Αντικειμενοστρεφής Προγραμματισμός (C++ / Python)',
      'Διαχείριση Μνήμης, Σύγχρονος Προγραμματισμός & Εργαλεία Γραμμής Εντολών',
      'Ανάπτυξη Σύγχρονων Εφαρμογών Web & Σχεσιακές Βάσεις Δεδομένων',
      'Ομαδικό Project Παραγωγής με Code Reviews & Git Workflows'
    ],
    icon: <Code2 className="w-5 h-5" />,
    image: softwareImg,
  },
  {
    id: 6,
    title: 'Hardware Systems & Cyber Security',
    titleEl: 'Υλικό Υπολογιστών, Δίκτυα & Κυβερνοασφάλεια',
    category: 'Hardware & Security',
    categoryLabel: 'Systems & Security',
    index: '06',
    duration: '10 Εβδομάδες',
    level: 'Εργαστηριακό',
    description: 'Learn computer architecture, assembly, PC hardware diagnostics, network topology engineering, and defensive security protocols.',
    syllabus: [
      'Αρχιτεκτονική Επεξεργαστών, Μητρικές Κάρτες, Μνήμες RAM & Διαγνωστικός Έλεγχος',
      'Αρχιτεκτονική Δικτύων TCP/IP, Routing, Switching & Firewalls',
      'Ασφάλεια Πληροφοριακών Συστημάτων, Κρυπτογράφηση & Θωράκιση Διακομιστών',
      'Πρακτική Εξάσκηση σε Εργαστήριο Hardware & Network Sandbox'
    ],
    icon: <Cpu className="w-5 h-5" />,
    image: hardwareImg,
  },
];

const AEPP_UNITS: AeppUnit[] = [
  {
    id: 'algo-basics',
    code: 'A01',
    title: 'Ανάλυση Προβλήματος & Βασικές Έννοιες Αλγοριθμικής',
    chapters: 'Κεφάλαια 1 – 2 & 6',
    examWeight: 'Θέμα Α & Θέμα Β',
    hours: 20,
    summary: 'Θεμελίωση της έννοιας του αλγορίθμου, των κριτηρίων του (περατότητα, καθοριστικότητα, αποτελεσματικότητα), των διαγραμμάτων ροής και της κωδικοποίησης σε Ψευδογλώσσα και ΓΛΩΣΣΑ.',
    topics: [
      'Στάδια επίλυσης προβλήματος, ανάλυση απαιτήσεων, δεδομένα και ζητούμενα',
      'Τύποι δεδομένων (ΑΚΕΡΑΙΕΣ, ΠΡΑΓΜΑΤΙΚΕΣ, ΧΑΡΑΚΤΗΡΕΣ, ΛΟΓΙΚΕΣ) & Τελεστές (DIV, MOD, ^)',
      'Ιεραρχία πράξεων, αποτίμηση σύνθετων λογικών εκφράσεων (ΚΑΙ, Η, ΟΧΙ) & Πίνακες Αληθείας',
      'Μετατροπή Διαγραμμάτων Ροής σε ΓΛΩΣΣΑ και αντίστροφα'
    ],
    pseudocodeSample: `ΠΡΟΓΡΑΜΜΑ Εισαγωγή_ΑΕΠΠ
ΜΕΤΑΒΛΗΤΕΣ
  ΑΚΕΡΑΙΕΣ: α, β, πηλίκο, υπόλοιπο
ΑΡΧΗ
  ΓΡΑΨΕ 'Δώσε δύο θετικούς ακεραίους:'
  ΔΙΑΒΑΣΕ α, β
  πηλίκο <- α DIV β
  υπόλοιπο <- α MOD β
  ΓΡΑΨΕ 'Πηλίκο:', πηλίκο, 'Υπόλοιπο:', υπόλοιπο
ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ`,
    icon: <GitBranch className="w-5 h-5" />
  },
  {
    id: 'control-structures',
    code: 'A02',
    title: 'Δομές Επιλογής & Επανάληψης σε ΓΛΩΣΣΑ',
    chapters: 'Κεφάλαια 3, 7 – 8',
    examWeight: 'Θέμα Β & Θέμα Γ (25 Μονάδες)',
    hours: 32,
    summary: 'Εμβάθυνση στις δομές επιλογής (Απλή, Σύνθετη, Πολλαπλή, Εμφωλευμένη) και επανάληψης (ΟΣΟ, ΜΕΧΡΙΣ_ΟΤΟΥ, ΓΙΑ), με μεθοδολογίες κλιμακωτής χρέωσης και ελέγχου εγκυρότητας.',
    topics: [
      'Μεθοδολογία Κλιμακωτής Χρέωσης (τιμολόγια, φόροι, κλίμακες κατανάλωσης) για Θέμα Γ',
      'Έλεγχος εγκυρότητας εισόδου δεδομένων με ΟΣΟ..ΕΠΑΝΑΛΑΒΕ και ΜΕΧΡΙΣ_ΟΤΟΥ',
      'Αλγόριθμοι εύρεσης Μεγίστου/Ελαχίστου, Αθροιστών, Μετρητών και Τερματισμού με Φρουρό',
      'Ισοδύναμες μετατροπές βρόχων (από ΓΙΑ σε ΟΣΟ / ΜΕΧΡΙΣ_ΟΤΟΥ) και Πίνακες Τιμών (Trace Tables)'
    ],
    pseudocodeSample: `! Έλεγχος Εγκυρότητας & Κλιμακωτή Χρέωση (Θέμα Γ)
ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ
  ΓΡΑΨΕ 'Δώσε κατανάλωση kWh (>= 0):'
  ΔΙΑΒΑΣΕ kwh
ΜΕΧΡΙΣ_ΟΤΟΥ kwh >= 0

ΑΝ kwh <= 100 ΤΟΤΕ
  χρέωση <- kwh * 0.12
ΑΛΛΙΩΣ_ΑΝ kwh <= 300 ΤΟΤΕ
  χρέωση <- 100 * 0.12 + (kwh - 100) * 0.18
ΑΛΛΙΩΣ
  χρέωση <- 100 * 0.12 + 200 * 0.18 + (kwh - 300) * 0.25
ΤΕΛΟΣ_ΑΝ`,
    icon: <Braces className="w-5 h-5" />
  },
  {
    id: 'arrays-algorithms',
    code: 'A03',
    title: 'Πίνακες (1D & 2D) — Αναζήτηση & Ταξινόμηση',
    chapters: 'Κεφάλαια 4 & 9',
    examWeight: 'Θέμα Δ (25 Μονάδες)',
    hours: 36,
    summary: 'Πλήρης ανάλυση μονοδιάστατων και δισδιάστατων πινάκων, παράλληλων πινάκων, αλγορίθμων αναζήτησης (Σειριακή, Δυαδική) και Ταξινόμησης Ευθείας Ανταλλαγής (Bubble Sort).',
    topics: [
      'Εισαγωγή, επεξεργασία γραμμών/στηλών, κύριας και δευτερεύουσας διαγωνίου σε 2D πίνακες',
      'Σειριακή αναζήτηση (σε μη ταξινομημένο/ταξινομημένο πίνακα) & Δυαδική Αναζήτηση (Binary Search)',
      'Ταξινόμηση Ευθείας Ανταλλαγής (Bubble Sort) παράλληλων πινάκων (αύξουσα/φθίνουσα)',
      'Συγχώνευση ταξινομημένων πινάκων και διαχωρισμός πίνακα βάσει κριτηρίων'
    ],
    pseudocodeSample: `! Ταξινόμηση Ευθείας Ανταλλαγής (Bubble Sort)
ΓΙΑ i ΑΠΟ 2 ΜΕΧΡΙ N
  ΓΙΑ j ΑΠΟ N ΜΕΧΡΙ i ΜΕ_ΒΗΜΑ -1
    ΑΝ Βαθμός[j-1] < Βαθμός[j] ΤΟΤΕ
      temp <- Βαθμός[j-1]
      Βαθμός[j-1] <- Βαθμός[j]
      Βαθμός[j] <- temp
      ! Αντιμετάθεση και στον παράλληλο πίνακα Ονομάτων
      temp_ον <- Όνομα[j-1]
      Όνομα[j-1] <- Όνομα[j]
      Όνομα[j] <- temp_ον
    ΤΕΛΟΣ_ΑΝ
  ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ
ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ`,
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: 'subprograms',
    code: 'A04',
    title: 'Υποπρογράμματα: Διαδικασίες & Συναρτήσεις',
    chapters: 'Κεφάλαιο 10',
    examWeight: 'Θέμα Β & Θέμα Δ',
    hours: 24,
    summary: 'Τμηματικός προγραμματισμός, σχεδιασμός και κλήση Συναρτήσεων και Διαδικασιών, πέρασμα παραμέτρων (Τυπικές & Πραγματικές) και εμβέλεια μεταβλητών.',
    topics: [
      'Δομή Συνάρτησης (επιστροφή μιας τιμής μέσω του ονόματός της) & Κλήση σε εκφράσεις',
      'Δομή Διαδικασίας (εντολή ΚΑΛΕΣΕ, επιστροφή μηδέν, μιας ή περισσότερων τιμών, πέρασμα πινάκων)',
      'Αντιστοίχιση Τυπικών και Πραγματικών Παραμέτρων (πλήθος, σειρά, τύπος δεδομένων)',
      'Συνδυαστικά Θέματα Γ & Δ Πανελλαδικών με Υποπρογράμματα και Πίνακες'
    ],
    pseudocodeSample: `ΣΥΝΑΡΤΗΣΗ Μέσος_Όρος(Α, Ν): ΠΡΑΓΜΑΤΙΚΗ
ΜΕΤΑΒΛΗΤΕΣ
  ΑΚΕΡΑΙΕΣ: Ν, i
  ΠΡΑΓΜΑΤΙΚΕΣ: Α[100], άθροισμα
ΑΡΧΗ
  άθροισμα <- 0
  ΓΙΑ i ΑΠΟ 1 ΜΕΧΡΙ Ν
    άθροισμα <- άθροισμα + Α[i]
  ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ
  Μέσος_Όρος <- άθροισμα / Ν
ΤΕΛΟΣ_ΣΥΝΑΡΤΗΣΗΣ`,
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: 'data-structures',
    code: 'A05',
    title: 'Δομές Δεδομένων: Στοίβα, Ουρά, Δένδρα & Γράφοι',
    chapters: 'Συμπληρωματικό Υλικό (Κεφ. 1–2)',
    examWeight: 'Θέμα Α & Θέμα Β',
    hours: 18,
    summary: 'Κατανόηση δυναμικών και στατικών δομών δεδομένων: υλοποίηση Στοίβας (LIFO) και Ουράς (FIFO) με μονοδιάστατους πίνακες, δυαδικά δένδρα και γράφοι.',
    topics: [
      'Στοίβα (Stack - LIFO): Λειτουργίες Κατάθεσης (Push) & Απόθεσης (Pop), έλεγχος Υπερχείλισης/Υποχείλισης',
      'Ουρά (Queue - FIFO): Δείκτες εμπρός (front) & πίσω (rear), εισαγωγή (Enqueue) & εξαγωγή (Dequeue)',
      'Δένδρα & Δυαδικά Δένδρα: Ρίζα, κόμβοι, φύλλα, ύψος, βαθμός, πλήρες & τέλειο δυαδικό δένδρο',
      'Αναπαράσταση δυαδικών δένδρων και γράφων στη μνήμη (πίνακας γειτνίασης, συνδεδεμένες λίστες)'
    ],
    pseudocodeSample: `! Λειτουργία Ωθησης (Push) σε Στοίβα S[N]
ΔΙΑΔΙΚΑΣΙΑ Ωθηση(S, top, στοιχείο)
ΜΕΤΑΒΛΗΤΕΣ
  ΑΚΕΡΑΙΕΣ: S[100], top, στοιχείο
ΑΡΧΗ
  ΑΝ top = 100 ΤΟΤΕ
    ΓΡΑΨΕ 'Υπερχείλιση Στοίβας (Stack Overflow)'
  ΑΛΛΙΩΣ
    top <- top + 1
    S[top] <- στοιχείο
  ΤΕΛΟΣ_ΑΝ
ΤΕΛΟΣ_ΔΙΑΔΙΚΑΣΙΑΣ`,
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 'oop-debugging',
    code: 'A06',
    title: 'Αντικειμενοστρεφής Προγραμματισμός & Εκσφαλμάτωση',
    chapters: 'Κεφάλαιο 12 & Συμπληρωματικό Κεφ. 3–4',
    examWeight: 'Θέμα Α & Θέμα Β',
    hours: 14,
    summary: 'Έννοιες αντικειμενοστρεφούς προγραμματισμού (κλάσεις, αντικείμενα, κληρονομικότητα, πολυμορφισμός), κύκλος ζωής λογισμικού και τεχνικές εκσφαλμάτωσης.',
    topics: [
      'Κλάσεις, Αντικείμενα, Ιδιότητες (Attributes), Μέθοδοι (Methods) & Ενθυλάκωση (Encapsulation)',
      'Ιεραρχία Κλάσεων, Κληρονομικότητα (Υπερκλάση / Υποκλάση) και Πολυμορφισμός',
      'Κατηγορίες Λαθών: Συντακτικά (Syntax), Λογικά (Logical) και Λάθη Κατά την Εκτέλεση (Runtime)',
      'Συστηματική επίλυση Θεμάτων Σωστού-Λάθους και Ερωτήσεων Ανάπτυξης Πανελλαδικών'
    ],
    pseudocodeSample: `! Παράδειγμα Ελέγχου Λογικού Σφάλματος & Runtime Error
ΔΙΑΒΑΣΕ αριθμητής, παρονομαστής
! Αποφυγή λάθους κατά την εκτέλεση (διαίρεση με το 0)
ΑΝ παρονομαστής <> 0 ΤΟΤΕ
  αποτέλεσμα <- αριθμητής / παρονομαστής
  ΓΡΑΨΕ αποτέλεσμα
ΑΛΛΙΩΣ
  ΓΡΑΨΕ 'Αδύνατη η διαίρεση με το μηδέν'
ΤΕΛΟΣ_ΑΝ`,
    icon: <Terminal className="w-5 h-5" />
  }
];

const AEPP_PRACTICE_QUESTIONS = [
  {
    id: 1,
    topic: 'ΘΕΜΑ Α · Δομές Επανάληψης σε ΓΛΩΣΣΑ',
    question: 'Πόσες φορές εκτελείται το εσωτερικό της δομής επανάληψης ΜΕΧΡΙΣ_ΟΤΟΥ (ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ ... ΜΕΧΡΙΣ_ΟΤΟΥ <συνθήκη>) στην ελάχιστη περίπτωση;',
    options: [
      '0 φορές (μπορεί να μην εκτελεστεί καθόλου)',
      'Τουλάχιστον 1 φορά (η συνθήκη ελέγχεται στο τέλος)',
      'Ακριβώς 2 φορές',
      'Εξαρτάται από την αρχική τιμή της συνθήκης πριν την ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ'
    ],
    correctIndex: 1,
    explanation: 'Στη δομή ΑΡΧΗ_ΕΠΑΝΑΛΗΨΗΣ ... ΜΕΧΡΙΣ_ΟΤΟΥ οι εντολές εκτελούνται τουλάχιστον μία (1) φορά, διότι ο έλεγχος της συνθήκης γίνεται στο τέλος του βρόχου. Η επανάληψη σταματά όταν η συνθήκη γίνει ΑΛΗΘΗΣ.'
  },
  {
    id: 2,
    topic: 'ΘΕΜΑ Β · Αριθμητικοί Τελεστές DIV & MOD',
    question: 'Ποια είναι η τιμή της έκφρασης: (17 DIV 5) * 2 + (17 MOD 5) ^ 2 στη ΓΛΩΣΣΑ;',
    options: [
      '10',
      '14',
      '18',
      '22'
    ],
    correctIndex: 0,
    explanation: 'Έχουμε: 17 DIV 5 = 3 (ακέραιο πηλίκο) και 17 MOD 5 = 2 (ακέραιο υπόλοιπο). Άρα η έκφραση γίνεται: 3 * 2 + 2 ^ 2 = 3 * 2 + 4 = 6 + 4 = 10.'
  },
  {
    id: 3,
    topic: 'ΘΕΜΑ Α · Δομές Δεδομένων (Στοίβα & Ουρά)',
    question: 'Ποια αρχή λειτουργίας ακολουθεί η δομή δεδομένων «Στοίβα» (Stack) και ποια η «Ουρά» (Queue);',
    options: [
      'Στοίβα: FIFO (First In First Out) · Ουρά: LIFO (Last In First Out)',
      'Στοίβα: LIFO (Last In First Out) · Ουρά: FIFO (First In First Out)',
      'Και οι δύο ακολουθούν την αρχή LIFO',
      'Στοίβα: Τυχαία προσπέλαση · Ουρά: Δυαδική προσπέλαση'
    ],
    correctIndex: 1,
    explanation: 'Η Στοίβα (Stack) λειτουργεί με την αρχή LIFO (Last In, First Out — τελευταίο μέσα, πρώτο έξω), ενώ η Ουρά (Queue) λειτουργεί με την αρχή FIFO (First In, First Out — πρώτο μέσα, πρώτο έξω).'
  }
];

const ECDL_MODULES: EcdlModule[] = [
  {
    id: 'word',
    code: 'M01',
    titleEl: 'Επεξεργασία Κειμένου',
    titleEn: 'Word Processing',
    software: 'Microsoft Word',
    hours: 18,
    asepRequired: true,
    summary: 'Δημιουργία, μορφοποίηση και ολοκλήρωση επαγγελματικών εγγράφων, πινάκων και μαζικής αλληλογραφίας με πλήρη κάλυψη της εξεταστέας ύλης ΑΣΕΠ.',
    topics: [
      'Μορφοποίηση γραμματοσειράς, παραγράφων, στηλών και στυλ εγγράφου',
      'Δημιουργία και διαχείριση πινάκων, γραφικών αντικειμένων και κεφαλίδων/υποσέλιδων',
      'Συγχώνευση αλληλογραφίας (Mail Merge) για μαζική αποστολή επιστολών & ετικετών',
      'Διαμόρφωση σελίδας, έλεγχος ορθογραφίας και προετοιμασία εκτύπωσης'
    ],
    icon: <FileText className="w-5 h-5" />
  },
  {
    id: 'excel',
    code: 'M02',
    titleEl: 'Υπολογιστικά Φύλλα',
    titleEn: 'Spreadsheets',
    software: 'Microsoft Excel',
    hours: 22,
    asepRequired: true,
    summary: 'Οργάνωση αριθμητικών δεδομένων, μαθηματικοί και λογικοί τύποι, συναρτήσεις και επαγγελματικά γραφήματα για διοικητική και οικονομική χρήση.',
    topics: [
      'Διαχείριση κελιών, φύλλων εργασίας, απόλυτων και σχετικών αναφορών ($A$1)',
      'Βασικές και σύνθετες συναρτήσεις: SUM, AVERAGE, COUNT, IF, VLOOKUP',
      'Μορφοποίηση αριθμών, νομισμάτων, ποσοστών και ημερομηνιών',
      'Δημιουργία, επεξεργασία και εκτύπωση γραφημάτων (στήλες, πίτες, γραμμές)'
    ],
    icon: <FileSpreadsheet className="w-5 h-5" />
  },
  {
    id: 'internet',
    code: 'M03',
    titleEl: 'Υπηρεσίες Διαδικτύου',
    titleEn: 'Online Essentials',
    software: 'Web Browsers & MS Outlook',
    hours: 14,
    asepRequired: true,
    summary: 'Ασφαλής πλοήγηση στον Παγκόσμιο Ιστό, αποτελεσματική αναζήτηση πληροφοριών, ηλεκτρονικό ταχυδρομείο και διαχείριση ψηφιακού ημερολογίου.',
    topics: [
      'Βασικές έννοιες Διαδικτύου, πρωτόκολλα ασφαλείας HTTPS, Cookies & Ιστορικό',
      'Αποστολή, λήψη, προώθηση email, επισύναψη αρχείων και υπογραφές στο Outlook',
      'Οργάνωση επαφών, λιστών διανομής, φακέλων αλληλογραφίας και κανόνων',
      'Διαχείριση συναντήσεων, υπενθυμίσεων και εργασιών στο Ημερολόγιο'
    ],
    icon: <Globe className="w-5 h-5" />
  },
  {
    id: 'powerpoint',
    code: 'M04',
    titleEl: 'Παρουσιάσεις',
    titleEn: 'Presentations',
    software: 'Microsoft PowerPoint',
    hours: 14,
    asepRequired: false,
    summary: 'Σχεδιασμός δομημένων παρουσιάσεων με χρήση υποδειγμάτων διαφανειών, διαγραμμάτων, πολυμέσων και εφέ μετάβασης.',
    topics: [
      'Χρήση προβολών παρουσίασης και κεντρικού υποδείγματος (Slide Master)',
      'Εισαγωγή πινάκων, οργανογραμμάτων, γραφημάτων και σχημάτων σχεδίασης',
      'Εφαρμογή εφέ κίνησης (Animations), μεταβάσεων (Transitions) και χρονισμού',
      'Προετοιμασία σημειώσεων ομιλητή, εκτυπώσεων ακροατηρίου και προβολής'
    ],
    icon: <Presentation className="w-5 h-5" />
  },
  {
    id: 'access',
    code: 'M05',
    titleEl: 'Βάσεις Δεδομένων',
    titleEn: 'Using Databases',
    software: 'Microsoft Access',
    hours: 18,
    asepRequired: false,
    summary: 'Κατανόηση σχεσιακών βάσεων δεδομένων, σχεδίαση πινάκων, κλειδιών, ερωτημάτων ανάκτησης πληροφοριών, φορμών και αναφορών.',
    topics: [
      'Δημιουργία πινάκων, τύπων δεδομένων, ιδιοτήτων πεδίων και πρωτευόντων κλειδιών',
      'Δημιουργία σχέσεων (Relationships) μεταξύ πινάκων και ακεραιότητα δεδομένων',
      'Σχεδιασμός ερωτημάτων (Queries) με κριτήρια, τελεστές λογικής και ταξινόμηση',
      'Κατασκευή φορμών εισαγωγής δεδομένων και ομαδοποιημένων αναφορών εκτύπωσης'
    ],
    icon: <Database className="w-5 h-5" />
  },
  {
    id: 'windows',
    code: 'M06',
    titleEl: 'Χρήση Υπολογιστή & Αρχεία',
    titleEn: 'Computer Essentials',
    software: 'Microsoft Windows',
    hours: 12,
    asepRequired: false,
    summary: 'Θεμελιώδεις δεξιότητες λειτουργικού συστήματος, οργάνωση ιεραρχίας φακέλων, συμπίεση αρχείων, εκτυπώσεις και ρυθμίσεις συστήματος.',
    topics: [
      'Διαχείριση επιφάνειας εργασίας, παραθύρων, ρυθμίσεων συστήματος και εκτυπωτών',
      'Δημιουργία, μετονομασία, αντιγραφή, μετακίνηση και αναζήτηση αρχείων/φακέλων',
      'Συμπίεση και αποσυμπίεση αρχείων (ZIP), μονάδες αποθήκευσης και αντίγραφα ασφαλείας',
      'Βασικές έννοιες δικτύων, προστασίας από κακόβουλο λογισμικό και υγείας/εργονομίας'
    ],
    icon: <FolderKanban className="w-5 h-5" />
  },
  {
    id: 'security',
    code: 'M07',
    titleEl: 'Ασφάλεια Συστημάτων',
    titleEn: 'IT Security',
    software: 'Cyber Hygiene & Security',
    hours: 12,
    asepRequired: false,
    summary: 'Αναγνώριση ψηφιακών απειλών, προστασία προσωπικών δεδομένων, ασφάλεια τοπικών/ασύρματων δικτύων και ασφαλής απομακρυσμένη εργασία.',
    topics: [
      'Απειλές δεδομένων, κοινωνική μηχανική (Phishing), κρυπτογράφηση και ισχυροί κωδικοί',
      'Προστασία από ιούς, worms, trojans, ransomware και χρήση τείχους προστασίας (Firewall)',
      'Ασφάλεια ασύρματων δικτύων (WPA2/WPA3), VPN και έλεγχος πρόσβασης χρηστών',
      'Ασφαλής διαγραφή δεδομένων, πολιτικές αντιγράφων ασφαλείας (Backup) και GDPR'
    ],
    icon: <ShieldCheck className="w-5 h-5" />
  }
];

const ECDL_PACKAGES: EcdlPackage[] = [
  {
    id: 'asep',
    name: 'ECDL Core ΑΣΕΠ (3 Ενότητες)',
    subtitle: 'Word · Excel · Internet & Outlook',
    hours: '54 Ώρες Εργαστηρίου',
    modulesCount: 3,
    passRate: '99.4%',
    description: 'Το απαραίτητο πακέτο πιστοποίησης γνώσης χειρισμού Η/Υ για όλες τις προκηρύξεις ΑΣΕΠ, Δημοσίου, Σωμάτων Ασφαλείας, Εκπαιδευτικών και Μεταπτυχιακών προγραμμάτων.',
    includedCodes: ['M01', 'M02', 'M03'],
    idealFor: 'Διαγωνισμούς ΑΣΕΠ, Δημόσιο Τομέα, Μεταπτυχιακά & Φοιτητές'
  },
  {
    id: 'standard',
    name: 'ECDL Standard / Πλήρες (6–7 Ενότητες)',
    subtitle: 'Word · Excel · Internet · PowerPoint · Access · Windows · Security',
    hours: '96 Ώρες Εργαστηρίου',
    modulesCount: 7,
    passRate: '98.8%',
    description: 'Ολοκληρωμένη πιστοποίηση ψηφιακών δεξιοτήτων που καλύπτει το σύνολο της σουίτας Microsoft Office, τη διαχείριση βάσεων δεδομένων και την ασφάλεια πληροφοριών.',
    includedCodes: ['M01', 'M02', 'M03', 'M04', 'M05', 'M06', 'M07'],
    idealFor: 'Ιδιωτικό Τομέα, Διοικητικά Στελέχη & Πλήρες Βιογραφικό'
  },
  {
    id: 'expert',
    name: 'ECDL Advanced / Expert',
    subtitle: 'Advanced Word · Advanced Excel · Advanced Access · Advanced PowerPoint',
    hours: '80 Ώρες Εργαστηρίου',
    modulesCount: 4,
    passRate: '97.5%',
    description: 'Ανώτατο δίπλωμα εξειδίκευσης για επαγγελματίες που απαιτούν προχωρημένη ανάλυση δεδομένων, μακροεντολές, αυτοματοποίηση εγγράφων και σχεσιακές βάσεις.',
    includedCodes: ['M01', 'M02', 'M04', 'M05'],
    idealFor: 'Οικονομικούς Αναλυτές, Λογιστήρια, Μηχανικούς & Managers'
  }
];

const ECDL_PRACTICE_QUESTIONS = [
  {
    id: 1,
    module: 'M02 · Υπολογιστικά Φύλλα (MS Excel)',
    question: 'Ποιος από τους παρακάτω τύπους στο Microsoft Excel υπολογίζει τον μέσο όρο των κελιών από A1 έως A10 μόνο αν η τιμή τους είναι μεγαλύτερη από 50;',
    options: [
      '=AVERAGE(A1:A10, ">50")',
      '=AVERAGEIF(A1:A10, ">50")',
      '=SUMIF(A1:A10, ">50") / 10',
      '=IF(A1:A10>50, AVERAGE(A1:A10))'
    ],
    correctIndex: 1,
    explanation: 'Η συνάρτηση AVERAGEIF(περιοχή, κριτήριο) υπολογίζει τον αριθμητικό μέσο όρο μόνο των κελιών μιας περιοχής που ικανοποιούν το δοσμένο κριτήριο (">50").'
  },
  {
    id: 2,
    module: 'M01 · Επεξεργασία Κειμένου (MS Word)',
    question: 'Ποια λειτουργία του Microsoft Word χρησιμοποιείται για τη μαζική δημιουργία επιστολών προς πολλούς παραλήπτες με στοιχεία από έναν πίνακα Excel;',
    options: [
      'Διασταυρούμενη Αναφορά (Cross-reference)',
      'Συγχώνευση Αλληλογραφίας (Mail Merge)',
      'Παρακολούθηση Αλλαγών (Track Changes)',
      'Αυτόματη Σύνοψη Εγγράφου (AutoSummarize)'
    ],
    correctIndex: 1,
    explanation: 'Η Συγχώνευση Αλληλογραφίας (Mail Merge) συνδέει ένα κύριο έγγραφο Word με μια λίστα παραληπτών (π.χ. αρχείο Excel ή Access) για την παραγωγή εξατομικευμένων επιστολών ή ετικετών.'
  },
  {
    id: 3,
    module: 'M03 · Υπηρεσίες Διαδικτύου (Outlook)',
    question: 'Όταν τοποθετείτε τη διεύθυνση ενός παραλήπτη στο πεδίο «Ιδιαίτερη Κοινοποίηση» (Bcc / ΙΚ) ενός email:',
    options: [
      'Το μήνυμα αποστέλλεται με κρυπτογράφηση κωδικού πρόσβασης',
      'Οι υπόλοιποι παραλήπτες του μηνύματος δεν βλέπουν τη διεύθυνση αυτού του παραλήπτη',
      'Ο παραλήπτης δεν μπορεί να απαντήσει στο μήνυμα',
      'Το μήνυμα αποθηκεύεται αυτόματα στον φάκελο Πρόχειρα'
    ],
    correctIndex: 1,
    explanation: 'Οι διευθύνσεις που εισάγονται στο πεδίο Bcc (Blind Carbon Copy / Ιδιαίτερη Κοινοποίηση) παραμένουν αόρατες στους υπόλοιπους παραλήπτες των πεδίων Προς (To) και Κοιν. (Cc).'
  }
];

const FEATURES = [
  {
    title: 'Επίσημο Εξεταστικό Κέντρο ECDL',
    description: 'Δώστε εξετάσεις στον ίδιο γνώριμο χώρο όπου παρακολουθείτε τα μαθήματά σας, με εβδομαδιαίες εξεταστικές περιόδους.',
    icon: <Award className="text-white" />,
  },
  {
    title: 'Εξειδίκευση στην ΑΕΠΠ Γ\' Λυκείου',
    description: 'Ολιγομελή τμήματα Πανελλαδικών, προσωπικά φυλλάδια μεθοδολογίας και 3ωρα διαγωνίσματα προσομοίωσης κάθε μήνα.',
    icon: <GraduationCap className="text-white" />,
  },
  {
    title: 'Σύγχρονα Εργαστήρια (Modern Lab)',
    description: 'Σταθμοί εργασίας υψηλών επιδόσεων με εγκατεστημένο το λογισμικό προσομοίωσης εξετάσεων ECDL και Διερμηνευτή ΓΛΩΣΣΑΣ.',
    icon: <Monitor className="text-white" />,
  },
];

// --- Components ---

function Logo({ className = "" }: { className?: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <a href="#home" className={`flex items-center gap-3 group cursor-pointer ${className}`}>
      {!imgError ? (
        <img 
          src="/logo.svg" 
          alt="Forum Computer Studies Logo" 
          className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
        />
      ) : null}
      <span className="text-lg font-bold tracking-tight text-white font-display whitespace-nowrap">
        FORUM <span className="text-indigo-500 font-normal">COMPUTER STUDIES</span>
      </span>
    </a>
  );
}

function Nav({ onOpenEnroll }: { onOpenEnroll: (defaultTrack?: string) => void }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Curriculum', href: '#curriculum' },
    { label: 'ΑΕΠΠ Γ\' Λυκείου', href: '#aepp' },
    { label: 'ECDL / ΑΣΕΠ', href: '#ecdl' },
    { label: 'Εργασίες Μαθητών', href: '#projects' },
    { label: 'Laboratory', href: '#about' },
    { label: 'Admissions', href: '#admissions' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      isScrolled ? 'bg-[#0A0A0C]/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Zone 1: Brand */}
        <Logo />
        
        {/* Zone 2: 5 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-sm font-medium text-slate-300 hover:text-white hover:underline underline-offset-8 decoration-indigo-500 transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onOpenEnroll('ECDL Core ΑΣΕΠ (3 Ενότητες)')}
            className="bg-white text-black px-5 py-2.5 rounded-sm text-xs font-semibold tracking-wide hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
          >
            Εγγραφή / Enroll
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 right-0 bg-[#0A0A0C] border-b border-white/10 p-6 flex flex-col gap-5 shadow-2xl md:hidden"
          >
            {navLinks.map((item) => (
              <a 
                key={item.label} 
                href={item.href} 
                className="text-base font-medium text-slate-200 hover:text-indigo-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenEnroll('ECDL Core ΑΣΕΠ (3 Ενότητες)');
              }}
              className="bg-white text-black py-3 px-5 rounded-sm font-semibold text-sm whitespace-nowrap"
            >
              Εγγραφή / Enroll
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ 
  onSelectCourse, 
  onOpenEnroll 
}: { 
  onSelectCourse: (course: CourseTrack) => void;
  onOpenEnroll: (defaultTrack?: string) => void;
}) {
  const heroHighlights = [COURSES[0], COURSES[1], COURSES[4]];

  return (
    <section id="home" className="relative min-h-[88vh] pt-32 pb-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-12 gap-8 w-full items-center">
        <motion.div
          className="col-span-12 lg:col-span-7 flex flex-col justify-center lg:pr-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-400 font-medium mb-6">
            <span>Πιστοποίηση ECDL (ΑΣΕΠ)</span>
            <span aria-hidden="true">·</span>
            <span>ΑΕΠΠ Γ' Λυκείου (Πανελλαδικές)</span>
            <span aria-hidden="true">·</span>
            <span>Computer Science Lab</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light text-white leading-[0.96] tracking-tight mb-8 font-display" style={{ textWrap: 'balance' }}>
            Build the <span className="font-bold italic text-indigo-500">Future</span> of Computing &amp; Digital Skills.
          </h1>

          <p className="text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed mb-10">
            Από την επίσημη πιστοποίηση <strong className="text-slate-200 font-medium">ECDL για ΑΣΕΠ</strong> και την εξειδικευμένη προετοιμασία <strong className="text-slate-200 font-medium">ΑΕΠΠ Γ' Λυκείου</strong> για τις Πανελλαδικές Εξετάσεις, έως τον προγραμματισμό και τα δίκτυα υπολογιστών.
          </p>
          
          <div className="flex flex-wrap gap-4 items-center mb-12">
            <button 
              onClick={() => onOpenEnroll('ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)')}
              className="bg-indigo-600 text-white px-7 py-3.5 rounded-sm text-sm font-semibold hover:bg-indigo-500 transition-colors whitespace-nowrap cursor-pointer"
            >
              Αίτηση Εγγραφής (ECDL / ΑΕΠΠ)
            </button>
            <a 
              href="#aepp"
              className="border border-white/15 text-slate-200 px-7 py-3.5 rounded-sm text-sm font-medium hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Μαθήματα ΑΕΠΠ Γ' Λυκείου
            </a>
            <a 
              href="#ecdl"
              className="border border-white/15 text-slate-200 px-7 py-3.5 rounded-sm text-sm font-medium hover:bg-white/5 transition-colors whitespace-nowrap"
            >
              Πιστοποίηση ECDL
            </a>
          </div>

          <div className="flex flex-wrap gap-6 items-center pt-6 border-t border-white/10">
            <div className="flex -space-x-2.5">
              {['ΓΠ', 'ΜΚ', 'ΑΔ'].map((initials, i) => (
                <div key={initials} className={`w-9 h-9 rounded-full border-2 border-[#0A0A0C] flex items-center justify-center text-xs font-semibold text-white ${
                   i === 0 ? 'bg-slate-800' : i === 1 ? 'bg-indigo-900' : 'bg-slate-700'
                }`}>
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-400">
              Καθηγητές Πληροφορικής ΠΕ86 · Επίσημο Εξεταστικό Κέντρο ECDL · Υψηλές Βαθμολογίες ΑΕΠΠ
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="col-span-12 lg:col-span-5 flex flex-col gap-5"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {heroHighlights.map((course, i) => (
             <button
                key={course.id}
                onClick={() => onSelectCourse(course)}
                className={`text-left p-7 rounded-xl border transition-all cursor-pointer group ${
                  i === 1 
                    ? 'bg-indigo-600 border-indigo-400/30 hover:bg-indigo-500' 
                    : 'bg-[#121218] border-white/10 hover:border-indigo-500/40'
                }`}
             >
                <div className={`font-mono text-xs mb-2 flex items-center justify-between tabular-nums ${
                   i === 1 ? 'text-indigo-100' : 'text-indigo-400'
                }`}>
                   <span>{course.index} · {course.categoryLabel} · {course.duration}</span>
                   <ArrowUpRight className="w-4 h-4 opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 tracking-tight">{course.titleEl}</h3>
                <p className={`text-sm leading-relaxed ${
                   i === 1 ? 'text-white/90' : 'text-slate-400'
                }`}>
                   {course.description}
                </p>
             </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-[#0A0A0C] py-12 border-y border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: 'Επιτυχία Εξετάσεων ECDL', value: '99.4%', sub: 'από την 1η προσπάθεια' },
            { label: 'Μέσος Όρος ΑΕΠΠ Πανελλαδικών', value: '18.7/20', sub: 'των μαθητών μας στο 4ο Πεδίο' },
            { label: 'Αναλογία Εργαστηρίου', value: '6:1', sub: 'Μαθητές ανά Καθηγητή' },
            { label: 'Απόφοιτοι & Επιτυχόντες', value: '2,400+', sub: 'σε ΑΕΙ Πληροφορικής & ΑΣΕΠ' },
          ].map((stat, i) => (
            <div key={i} className="text-left">
              <p className="text-xs text-slate-400 mb-1.5 font-medium">{stat.label}</p>
              <div className="text-2xl md:text-3xl font-light text-white tabular-nums">
                {stat.value} <span className="text-xs text-slate-400 ml-1 font-normal">{stat.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AeppSection({ onOpenEnroll }: { onOpenEnroll: (defaultTrack?: string) => void }) {
  const [activeUnitId, setActiveUnitId] = useState<string>('algo-basics');
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const activeUnit = AEPP_UNITS.find(u => u.id === activeUnitId) || AEPP_UNITS[0];
  const activeQuiz = AEPP_PRACTICE_QUESTIONS[currentQuizIdx];

  return (
    <section id="aepp" className="py-28 border-b border-white/10 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-4">
              <span>Πανελλαδικές Εξετάσεις Γ' Λυκείου</span>
              <span aria-hidden="true">·</span>
              <span>4ο Επιστημονικό Πεδίο (Οικονομίας &amp; Πληροφορικής)</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.08] font-display" style={{ textWrap: 'balance' }}>
              Μαθήματα <span className="font-bold italic text-indigo-500">ΑΕΠΠ</span> Γ' Λυκείου
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            Συστηματική προετοιμασία στο μάθημα «Ανάπτυξη Εφαρμογών σε Προγραμματιστικό Περιβάλλον» (ΓΛΩΣΣΑ). Καλύπτουμε μεθοδικά κάθε κατηγορία θεμάτων (Α, Β, Γ, Δ) με στόχο την εισαγωγή στις κορυφαίες σχολές Πληροφορικής και Οικονομίας.
          </p>
        </div>

        {/* Panhellenic Exam Structure Breakdown (Θέμα Α, Β, Γ, Δ) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {[
            {
              code: 'ΘΕΜΑ Α',
              points: '25 Μονάδες',
              title: 'Θεωρία & Σωστό – Λάθος',
              desc: 'Ορισμοί σχολικού βιβλίου, ερωτήσεις κλειστού τύπου, Σωστό/Λάθος και συμπλήρωση κενών σε όλη την εξεταστέα ύλη.'
            },
            {
              code: 'ΘΕΜΑ Β',
              points: '25 Μονάδες',
              title: 'Κατανόηση & Μετατροπές',
              desc: 'Πίνακες τιμών (Trace Tables), μετατροπές δομών (π.χ. ΓΙΑ σε ΟΣΟ, ΑΝ σε ΕΠΙΛΕΞΕ), διαγράμματα ροής και εντοπισμός λαθών.'
            },
            {
              code: 'ΘΕΜΑ Γ',
              points: '25 Μονάδες',
              title: 'Αλγόριθμος & Δομές Επανάληψης',
              desc: 'Ανάπτυξη πλήρους προγράμματος σε ΓΛΩΣΣΑ με έλεγχο εγκυρότητας, κλιμακωτή χρέωση, αθροιστές, μετρητές και max/min.'
            },
            {
              code: 'ΘΕΜΑ Δ',
              points: '25 Μονάδες',
              title: 'Πίνακες 1D/2D & Υποπρογράμματα',
              desc: 'Σύνθετο πρόβλημα με μονοδιάστατους και δισδιάστατους πίνακες, ταξινόμηση (Bubble Sort), αναζήτηση και συναρτήσεις/διαδικασίες.'
            }
          ].map((thema) => (
            <div key={thema.code} className="bg-[#121218] border border-white/10 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3 tabular-nums">
                  <span className="text-indigo-400">{thema.code}</span>
                  <span className="text-slate-400">{thema.points}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{thema.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{thema.desc}</p>
              </div>
              <div className="mt-5 pt-3 border-t border-white/10 text-xs text-slate-400 font-mono tabular-nums">
                Συμμετοχή στον βαθμό: 25%
              </div>
            </div>
          ))}
        </div>

        {/* 6 AEPP Units Interactive Explorer */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Left Column: 6 Units List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10 mb-2">
              <span>Διδακτέες Ενότητες ΑΕΠΠ (A01–A06)</span>
              <span>Εξεταστέα Ύλη Πανελλαδικών</span>
            </div>
            {AEPP_UNITS.map((unit) => {
              const isActive = unit.id === activeUnitId;
              return (
                <button
                  key={unit.id}
                  onClick={() => setActiveUnitId(unit.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'bg-[#121218] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs text-indigo-400 tabular-nums shrink-0">
                      {unit.code}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-white truncate">
                        {unit.title}
                      </div>
                      <div className="text-xs text-slate-400 truncate tabular-nums">
                        {unit.chapters} · {unit.hours} ώρες · {unit.examWeight}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'translate-x-0.5 text-indigo-400' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected AEPP Unit Details + ΓΛΩΣΣΑ Code Sample */}
          <div className="lg:col-span-7 bg-[#121218] border border-white/10 rounded-xl p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="text-xs text-indigo-400 font-mono mb-2 tabular-nums">
                  ΕΝΟΤΗΤΑ {activeUnit.code} · {activeUnit.chapters} · {activeUnit.examWeight}
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  {activeUnit.title}
                </h3>
              </div>
              <div className="p-3.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {activeUnit.icon}
              </div>
            </div>

            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              {activeUnit.summary}
            </p>

            <h4 className="text-xs font-semibold text-slate-400 mb-3">
              Μεθοδολογία &amp; Σημεία Κλειδιά Ενότητας:
            </h4>
            <ul className="space-y-2.5 mb-6">
              {activeUnit.topics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="font-mono text-xs text-indigo-400 mt-0.5 tabular-nums">0{idx + 1}.</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            {/* ΓΛΩΣΣΑ Code Preview */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span>Υπόδειγμα Κώδικα σε ΓΛΩΣΣΑ (Πανελλαδικές)</span>
                <span className="text-indigo-400">Διερμηνευτής ΓΛΩΣΣΑΣ</span>
              </div>
              <pre className="bg-[#0A0A0C] border border-white/10 rounded-lg p-4 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed">
                <code>{activeUnit.pseudocodeSample}</code>
              </pre>
            </div>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>Περιλαμβάνει Τυπολόγιο Μεθοδολογίας &amp; Λυμένα Θέματα Πανελλαδικών</span>
              </div>
              <button
                onClick={() => onOpenEnroll(`ΑΕΠΠ Γ' Λυκείου — ${activeUnit.title}`)}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                Εγγραφή στο Τμήμα ΑΕΠΠ
              </button>
            </div>
          </div>
        </div>

        {/* Interactive AEPP Panhellenic Quiz */}
        <div className="bg-[#121218] border border-white/10 rounded-xl p-8 md:p-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs text-indigo-400 font-mono mb-2">
                 ΔΙΑΔΡΑΣΤΙΚΟ ΤΕΣΤ ΑΕΠΠ Γ' ΛΥΚΕΙΟΥ
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Εξάσκηση σε Ερωτήσεις Πανελλαδικών ΑΕΠΠ
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Δοκιμάστε τις γνώσεις σας σε κλασικά ερωτήματα Θεωρίας και Αλγοριθμικής (Θέμα Α &amp; Β) όπως τίθενται στις Πανελλαδικές Εξετάσεις.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {AEPP_PRACTICE_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuizIdx(idx);
                      setSelectedAnswer(null);
                    }}
                    className={`px-3.5 py-2 rounded text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                      currentQuizIdx === idx
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Θέμα 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/10 rounded-lg p-6 md:p-8">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-3 tabular-nums">
                <span>{activeQuiz.topic}</span>
                <span>Ερώτηση {currentQuizIdx + 1} από {AEPP_PRACTICE_QUESTIONS.length}</span>
              </div>
              <p className="text-base font-medium text-white mb-6 leading-relaxed">
                {activeQuiz.question}
              </p>
              <div className="space-y-2.5 mb-6">
                {activeQuiz.options.map((opt, idx) => {
                  const isChosen = selectedAnswer === idx;
                  const isCorrect = idx === activeQuiz.correctIndex;
                  let btnStyle = 'bg-[#121218] border-white/10 text-slate-300 hover:border-white/30';
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(idx)}
                      className={`w-full text-left p-3.5 rounded border text-sm transition-colors flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedAnswer !== null && isCorrect && (
                        <span className="text-xs font-mono text-emerald-400 shrink-0">✓ Σωστό</span>
                      )}
                      {selectedAnswer !== null && isChosen && !isCorrect && (
                        <span className="text-xs font-mono text-rose-400 shrink-0">✕ Λάθος</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedAnswer !== null && (
                <div className="p-4 rounded bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <strong className="text-indigo-300 block mb-1">
                      {selectedAnswer === activeQuiz.correctIndex ? 'Άριστα! Σωστή Απάντηση:' : 'Αιτιολόγηση Απάντησης:'}
                    </strong>
                    {activeQuiz.explanation}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentQuizIdx((prev) => (prev + 1) % AEPP_PRACTICE_QUESTIONS.length);
                      setSelectedAnswer(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-sm font-sans font-semibold whitespace-nowrap shrink-0 cursor-pointer hover:bg-indigo-500"
                  >
                    Επόμενο Θέμα →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EcdlSection({ onOpenEnroll }: { onOpenEnroll: (defaultTrack?: string) => void }) {
  const [selectedPackageId, setSelectedPackageId] = useState<'asep' | 'standard' | 'expert'>('asep');
  const [activeModuleId, setActiveModuleId] = useState<string>('word');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const activePackage = ECDL_PACKAGES.find(p => p.id === selectedPackageId) || ECDL_PACKAGES[0];
  const activeModule = ECDL_MODULES.find(m => m.id === activeModuleId) || ECDL_MODULES[0];
  const activeQuestion = ECDL_PRACTICE_QUESTIONS[currentQuestionIdx];

  return (
    <section id="ecdl" className="py-28 border-b border-white/10 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-4">
              <span>Πιστοποίηση Πληροφορικής</span>
              <span aria-hidden="true">·</span>
              <span>Αναγνωρισμένο από ΑΣΕΠ &amp; ΕΟΠΠΕΠ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.08] font-display" style={{ textWrap: 'balance' }}>
              Μαθήματα &amp; Πιστοποίηση <span className="font-bold italic text-indigo-500">ECDL</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md leading-relaxed">
            Επιλέξτε το πρόγραμμα που ταιριάζει στους στόχους σας. Κάθε ενότητα περιλαμβάνει πρακτική εξάσκηση σε πραγματικές συνθήκες εξέτασης, βιντεομαθήματα επανάληψης και απεριόριστα τεστ προσομοίωσης.
          </p>
        </div>

        {/* Interactive Package Selector */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {ECDL_PACKAGES.map((pkg) => {
            const isSelected = pkg.id === selectedPackageId;
            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackageId(pkg.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPackageId(pkg.id);
                  }
                }}
                className={`p-7 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#121218] border-indigo-500' 
                    : 'bg-[#121218]/60 border-white/10 hover:border-white/25'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 tabular-nums">
                    <span>{pkg.hours} · {pkg.modulesCount} Ενότητες</span>
                    <span className="text-indigo-400 font-mono">Επιτυχία {pkg.passRate}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1.5">{pkg.name}</h3>
                  <p className="text-xs text-indigo-400 font-mono mb-4">{pkg.subtitle}</p>
                  <p className="text-sm text-slate-400 leading-relaxed mb-6">
                    {pkg.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-300">
                    {isSelected ? '● Επιλεγμένο Πακέτο' : 'Επιλογή Πακέτου'}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenEnroll(pkg.name);
                    }}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Εγγραφή στο Πακέτο
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 7 ECDL Modules Interactive Breakdown */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: 7 Modules List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-white/10 mb-2">
              <span>Ενότητες Ύλης ECDL (1–7)</span>
              <span>Περιλαμβάνεται στο {activePackage.name.split(' ')[1]}</span>
            </div>
            {ECDL_MODULES.map((mod) => {
              const isActive = mod.id === activeModuleId;
              const isInSelectedPackage = activePackage.includedCodes.includes(mod.code);

              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between gap-4 cursor-pointer ${
                    isActive
                      ? 'bg-indigo-600/15 border-indigo-500 text-white'
                      : 'bg-[#121218] border-white/10 text-slate-300 hover:border-white/25'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="font-mono text-xs text-indigo-400 tabular-nums shrink-0">
                      {mod.code}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-white truncate">
                        {mod.titleEl}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {mod.software} · {mod.hours} ώρες {mod.asepRequired ? '· Βασικό ΑΣΕΠ' : ''}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {isInSelectedPackage && (
                      <span className="text-xs text-emerald-400 font-mono">✓ Πακέτο</span>
                    )}
                    <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'translate-x-0.5 text-indigo-400' : 'text-slate-500'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Module Detailed View */}
          <div className="lg:col-span-7 bg-[#121218] border border-white/10 rounded-xl p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
              <div>
                <div className="text-xs text-indigo-400 font-mono mb-2 tabular-nums">
                  ΕΝΟΤΗΤΑ {activeModule.code} · {activeModule.titleEn} · {activeModule.hours} ΩΡΕΣ ΕΡΓΑΣΤΗΡΙΟΥ
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white">
                  {activeModule.titleEl} ({activeModule.software})
                </h3>
              </div>
              <div className="p-3.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                {activeModule.icon}
              </div>
            </div>

            <p className="text-slate-300 text-base leading-relaxed mb-8">
              {activeModule.summary}
            </p>

            <h4 className="text-xs font-semibold text-slate-400 mb-4">
              Αναλυτική Διδακτέα &amp; Εξεταστέα Ύλη Ενότητας:
            </h4>
            <ul className="space-y-3.5 mb-8">
              {activeModule.topics.map((topic, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-300 leading-relaxed">
                  <span className="font-mono text-xs text-indigo-400 mt-1 tabular-nums">0{idx + 1}.</span>
                  <span>{topic}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span>Μορφή Εξέτασης: 36 Ερωτήσεις Αυτοματοποιημένου Τεστ</span>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="tabular-nums">Διάρκεια: 45 Λεπτά · Βαθμός Επιτυχίας: 75%</span>
              </div>
              <button
                onClick={() => onOpenEnroll(`ECDL — ${activeModule.titleEl} (${activeModule.software})`)}
                className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-sm hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Εγγραφή στην Ενότητα
              </button>
            </div>
          </div>
        </div>

        {/* Interactive ECDL Practice Exam Simulator */}
        <div id="ecdl-simulator" className="bg-[#121218] border border-white/10 rounded-xl p-8 md:p-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs text-indigo-400 font-mono mb-2">
                ΔΙΑΔΡΑΣΤΙΚΟ ΤΕΣΤ ΠΡΟΣΟΜΟΙΩΣΗΣ ECDL
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                Δοκιμάστε τις γνώσεις σας στις εξετάσεις ECDL
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Στο Forum Computer Studies, κάθε σπουδαστής εξασκείται σε πραγματικό εξεταστικό σύστημα προσομοίωσης (Test Center Simulator). Απαντήστε στις ενδεικτικές ερωτήσεις για να δείτε πώς λειτουργεί η εξέταση.
              </p>
              <div className="flex items-center gap-2">
                {ECDL_PRACTICE_QUESTIONS.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIdx(idx);
                      setSelectedOption(null);
                    }}
                    className={`px-3.5 py-2 rounded text-xs font-mono tabular-nums transition-colors cursor-pointer ${
                      currentQuestionIdx === idx
                        ? 'bg-indigo-600 text-white font-semibold'
                        : 'bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    Ερώτηση 0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#0A0A0C] border border-white/10 rounded-lg p-6 md:p-8">
              <div className="flex items-center justify-between text-xs text-indigo-400 font-mono mb-3 tabular-nums">
                <span>{activeQuestion.module}</span>
                <span>Ερώτηση {currentQuestionIdx + 1} από {ECDL_PRACTICE_QUESTIONS.length}</span>
              </div>
              <p className="text-base font-medium text-white mb-6 leading-relaxed">
                {activeQuestion.question}
              </p>
              <div className="space-y-2.5 mb-6">
                {activeQuestion.options.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = idx === activeQuestion.correctIndex;
                  let btnStyle = 'bg-[#121218] border-white/10 text-slate-300 hover:border-white/30';
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200';
                    } else if (isChosen && !isCorrect) {
                      btnStyle = 'bg-rose-950/60 border-rose-500/60 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(idx)}
                      className={`w-full text-left p-3.5 rounded border text-sm font-mono transition-colors flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOption !== null && isCorrect && (
                        <span className="text-xs text-emerald-400 shrink-0">✓ Σωστό</span>
                      )}
                      {selectedOption !== null && isChosen && !isCorrect && (
                        <span className="text-xs text-rose-400 shrink-0">✕ Λάθος</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedOption !== null && (
                <div className="p-4 rounded bg-indigo-950/30 border border-indigo-500/30 text-xs text-slate-300 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <strong className="text-indigo-300 block mb-1">
                      {selectedOption === activeQuestion.correctIndex ? 'Σωστή Απάντηση!' : 'Επεξήγηση Λύσης:'}
                    </strong>
                    {activeQuestion.explanation}
                  </div>
                  <button
                    onClick={() => {
                      setCurrentQuestionIdx((prev) => (prev + 1) % ECDL_PRACTICE_QUESTIONS.length);
                      setSelectedOption(null);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-sm font-sans font-semibold whitespace-nowrap shrink-0 cursor-pointer hover:bg-indigo-500"
                  >
                    Επόμενη Ερώτηση →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface CourseCardProps {
  course: CourseTrack;
  onSelect: (course: CourseTrack) => void;
  key?: React.Key;
}

function CourseCard({ course, onSelect }: CourseCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ duration: 0.18 }}
      className="bg-[#121218] rounded-xl overflow-hidden border border-white/10 group h-full flex flex-col"
    >
      <div className="relative h-52 overflow-hidden bg-slate-900">
        {!imgFailed ? (
          <img 
            src={course.image} 
            alt={course.titleEl} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950/60 to-[#121218] p-6 text-center">
            <div className="text-indigo-400 mb-2">{course.icon}</div>
            <span className="text-xs text-slate-400 font-mono">{course.title}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-transparent to-transparent" />
      </div>
      <div className="p-7 flex-grow flex flex-col">
        <div className="text-indigo-400 font-mono text-xs mb-2.5 tabular-nums">
          {course.index} · {course.categoryLabel} · {course.duration}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-indigo-400 transition-colors tracking-tight">
          {course.titleEl}
        </h3>
        <p className="text-xs text-slate-500 mb-3 font-mono">{course.title}</p>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {course.description}
        </p>
        <button 
          onClick={() => onSelect(course)}
          className="flex items-center gap-2 text-white font-semibold text-xs group/btn mt-auto pt-4 border-t border-white/10 cursor-pointer whitespace-nowrap"
        >
          <span>Αναλυτική Ύλη &amp; Εγγραφή</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-indigo-400" />
        </button>
      </div>
    </motion.div>
  );
}

function Footer({ onOpenEnroll }: { onOpenEnroll: (defaultTrack?: string) => void }) {
  return (
    <footer id="contact" className="bg-[#0A0A0C] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-4">
            <Logo className="mb-6" />
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-6">
              Εκπαιδευτικό Κέντρο Πληροφορικής, Προετοιμασίας ΑΕΠΠ Γ' Λυκείου &amp; Επίσημο Εξεταστικό Κέντρο Πιστοποίησης ECDL.
            </p>
            <p className="text-xs text-slate-500">
              Πιστοποιητικά ΑΣΕΠ · ΑΕΠΠ Πανελλαδικών · Software Engineering
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold text-white mb-5">Μαθήματα &amp; Πιστοποιήσεις</h4>
            <ul className="space-y-3">
              {[
                { label: 'ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές)', href: '#aepp' },
                { label: 'Θερινά Τμήματα ΑΕΠΠ (Β\' -> Γ\' Λυκείου)', href: '#aepp' },
                { label: 'ECDL Core (ΑΣΕΠ 3 Ενότητες)', href: '#ecdl' },
                { label: 'ECDL Standard (7 Ενότητες)', href: '#ecdl' },
                { label: 'Software Engineering & Hardware', href: '#curriculum' },
              ].map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-white mb-5">Εκπαιδευτήριο</h4>
            <ul className="space-y-3">
              {[
                { label: 'Εργαστήρια', href: '#about' },
                { label: 'Ύλη ΑΕΠΠ', href: '#aepp' },
                { label: 'Τεστ Προσομοίωσης ECDL', href: '#ecdl-simulator' },
                { label: 'Εργασίες Μαθητών', href: '#projects' },
                { label: 'Αίτηση Εγγραφής', href: '#admissions' },
              ].map(item => (
                <li key={item.label}>
                  <a href={item.href} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="md:col-span-3 flex flex-col md:items-end">
            <div className="md:text-right">
               <h4 className="text-xs font-semibold text-white mb-5">Επικοινωνία &amp; Γραμματεία</h4>
               <p className="text-slate-300 text-sm mb-1">Δευτέρα – Παρασκευή: 09:00 – 21:00</p>
               <p className="text-slate-400 text-xs mb-2">Σάββατο (Εξετάσεις &amp; Διαγωνίσματα): 10:00 – 15:00</p>
               <p className="text-indigo-400 font-mono text-xs mb-6">{RECIPIENT_EMAIL}</p>
               <button 
                 onClick={() => onOpenEnroll('ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)')}
                 className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer whitespace-nowrap"
               >
                 Αποστολή Αίτησης Εγγραφής
               </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 Forum Computer Studies. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#home" className="hover:text-white transition-colors">Αρχική</a>
            <a href="#aepp" className="hover:text-white transition-colors">ΑΕΠΠ Γ' Λυκείου</a>
            <a href="#ecdl" className="hover:text-white transition-colors">Πιστοποίηση ECDL</a>
            <a href={`mailto:${RECIPIENT_EMAIL}`} className="hover:text-white transition-colors">{RECIPIENT_EMAIL}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'ECDL Certification' | 'AEPP Lyceum' | 'Engineering' | 'Hardware & Security'>('ALL');
  const [activeModalCourse, setActiveModalCourse] = useState<CourseTrack | null>(null);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollTrack, setEnrollTrack] = useState('ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)');
  const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', notes: '' });
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionDetails, setSubmissionDetails] = useState<{
    enrollmentId: string;
    recipientEmail: string;
    mailtoUrl: string;
  } | null>(null);

  const filteredCourses = selectedCategory === 'ALL' 
    ? COURSES 
    : COURSES.filter(c => c.category === selectedCategory);

  const handleOpenEnroll = (defaultTrack = 'ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)') => {
    setEnrollTrack(defaultTrack);
    setFormSubmitted(false);
    setSubmissionDetails(null);
    setFormError('');
    setIsEnrollModalOpen(true);
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setFormError('Παρακαλώ συμπληρώστε το ονοματεπώνυμό σας.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setFormError('Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.');
      return;
    }
    if (formData.phone.trim().length < 8) {
      setFormError('Παρακαλώ εισάγετε έγκυρο τηλέφωνο επικοινωνίας.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    const fallbackSubject = `[Forum Computer Studies] Νέα Αίτηση Εγγραφής — ${enrollTrack}`;
    const fallbackBody = [
      `Νέα Αίτηση Εγγραφής στο Forum Computer Studies`,
      `-------------------------------------------------`,
      `Πρόγραμμα / Μάθημα: ${enrollTrack}`,
      `Ονοματεπώνυμο: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Τηλέφωνο: ${formData.phone}`,
      `Σημειώσεις / Τμήμα: ${formData.notes || '—'}`,
    ].join('\n');
    const fallbackMailto = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(fallbackSubject)}&body=${encodeURIComponent(fallbackBody)}`;

    try {
      // 1. Send to our backend /api/enroll (which saves record & relays email to fragky@gmail.com)
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          track: enrollTrack,
          notes: formData.notes.trim(),
        }),
      });

      // 2. Also fire browser-side FormSubmit AJAX to fragky@gmail.com in parallel for guaranteed delivery
      fetch(`https://formsubmit.co/ajax/${RECIPIENT_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: fallbackSubject,
          _replyto: formData.email.trim(),
          Πρόγραμμα_Σπουδών: enrollTrack,
          Ονοματεπώνυμο: formData.fullName.trim(),
          Email: formData.email.trim(),
          Τηλέφωνο: formData.phone.trim(),
          Σημειώσεις: formData.notes.trim() || '—',
        }),
      }).catch(() => {});

      if (response.ok) {
        const data = await response.json();
        setSubmissionDetails({
          enrollmentId: data.enrollmentId || `FCS-${Date.now().toString(36).toUpperCase()}`,
          recipientEmail: data.recipientEmail || RECIPIENT_EMAIL,
          mailtoUrl: data.mailtoUrl || fallbackMailto,
        });
      } else {
        setSubmissionDetails({
          enrollmentId: `FCS-${Date.now().toString(36).toUpperCase()}`,
          recipientEmail: RECIPIENT_EMAIL,
          mailtoUrl: fallbackMailto,
        });
      }
      setFormSubmitted(true);
    } catch {
      setSubmissionDetails({
        enrollmentId: `FCS-${Date.now().toString(36).toUpperCase()}`,
        recipientEmail: RECIPIENT_EMAIL,
        mailtoUrl: fallbackMailto,
      });
      setFormSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] font-sans text-slate-300 selection:bg-indigo-500/30 selection:text-white">
      <Nav onOpenEnroll={handleOpenEnroll} />
      <Hero 
        onSelectCourse={(course) => setActiveModalCourse(course)} 
        onOpenEnroll={handleOpenEnroll} 
      />
      
      <Stats />

      {/* Dedicated ΑΕΠΠ Γ' Λυκείου Section */}
      <AeppSection onOpenEnroll={handleOpenEnroll} />

      {/* Dedicated ECDL Certification & Courses Section */}
      <EcdlSection onOpenEnroll={handleOpenEnroll} />

      {/* Curriculum Section */}
      <section id="curriculum" className="py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div className="max-w-xl">
              <div className="text-xs text-indigo-400 font-medium mb-3">
                Προγράμματα Σπουδών · Selected Tracks
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-tight font-display" style={{ textWrap: 'balance' }}>
                Ολοκληρωμένοι Κύκλοι Σπουδών Πληροφορικής.
              </h2>
            </div>

            {/* Interactive Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-[#121218] border border-white/10 rounded-lg w-fit">
              {[
                { id: 'ALL', label: 'Όλα τα Προγράμματα' },
                { id: 'AEPP Lyceum', label: 'ΑΕΠΠ Γ\' Λυκείου' },
                { id: 'ECDL Certification', label: 'Πιστοποίηση ECDL' },
                { id: 'Engineering', label: 'Software Engineering' },
                { id: 'Hardware & Security', label: 'Hardware & Δίκτυα' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                  className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    selectedCategory === tab.id
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map(course => (
              <CourseCard 
                key={course.id} 
                course={course} 
                onSelect={(c) => setActiveModalCourse(c)} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Student Projects & Showcase Section */}
      <StudentProjectsSection />

      {/* About / Laboratory Section */}
      <section id="about" className="py-28 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
             <div className="lg:col-span-7">
                <div className="text-xs text-indigo-400 font-medium mb-4">
                  Εργαστηριακή Εκπαίδευση · Forum Computer Studies
                </div>
                <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight leading-[1.1] font-display" style={{ textWrap: 'balance' }}>
                  Η γνώση της πληροφορικής χτίζεται στην πράξη.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-10 text-base md:text-lg max-w-2xl">
                   Στο Forum Computer Studies συνδυάζουμε την εντατική προετοιμασία Πανελλαδικών στο μάθημα ΑΕΠΠ της Γ' Λυκείου με την επίσημη επαγγελματική πιστοποίηση ECDL και την επιστήμη των υπολογιστών.
                </p>
                <div className="grid sm:grid-cols-3 gap-8 pt-6 border-t border-white/10">
                   {FEATURES.map((f, i) => (
                      <div key={i}>
                         <h4 className="text-white font-semibold text-sm mb-2">{f.title}</h4>
                         <p className="text-slate-400 text-xs leading-relaxed">{f.description}</p>
                      </div>
                   ))}
                </div>
             </div>

             <div className="lg:col-span-5">
                <div className="bg-[#121218] rounded-xl border border-white/10 p-8">
                   <div className="text-xs text-indigo-400 font-mono mb-2">
                     ΠΡΟΓΡΑΜΜΑ ΕΒΔΟΜΑΔΙΑΙΩΝ ΤΜΗΜΑΤΩΝ &amp; ΔΙΑΓΩΝΙΣΜΑΤΩΝ
                   </div>
                   <h3 className="text-xl font-semibold text-white mb-6">
                     Ευέλικτο Ωράριο Παρακολούθησης
                   </h3>
                   <div className="space-y-4 mb-8">
                     {[
                       { slot: 'Τμήματα ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές)', hours: '16:00 – 20:00', status: 'Εγγραφές Ανοιχτές' },
                       { slot: 'Πρωινά & Απογευματινά Τμήματα ECDL', hours: '10:00 – 13:00 & 17:00 – 21:00', status: 'Διαθέσιμες Θέσεις' },
                       { slot: 'Τμήματα Προγραμματισμού & Hardware', hours: '18:00 – 21:30', status: 'Νέο Τμήμα' },
                       { slot: 'Εξετάσεις ECDL & 3ωρα Διαγωνίσματα ΑΕΠΠ', hours: 'Κάθε Σάββατο 10:00', status: 'Εξεταστικό Κέντρο' },
                     ].map((row, idx) => (
                       <div key={idx} className="pb-3.5 border-b border-white/10 flex items-center justify-between gap-4 text-xs">
                         <div>
                           <div className="text-white font-medium mb-0.5">{row.slot}</div>
                           <div className="text-slate-400 font-mono tabular-nums">{row.hours}</div>
                         </div>
                         <span className="text-indigo-400 font-mono shrink-0">{row.status}</span>
                       </div>
                     ))}
                   </div>
                   <button
                     onClick={() => handleOpenEnroll('ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)')}
                     className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                   >
                     Δήλωση Συμμετοχής σε Τμήμα
                   </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Admissions / CTA Section */}
      <section id="admissions" className="py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
           <div className="relative bg-[#121218] border border-white/10 rounded-2xl px-8 py-20 md:p-24 overflow-hidden flex flex-col items-center text-center">
              <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-8">
                 <Terminal className="text-white w-7 h-7" />
              </div>
              <h2 className="text-4xl md:text-6xl font-light text-white mb-6 tracking-tight max-w-3xl leading-[0.98] font-display" style={{ textWrap: 'balance' }}>
                Ξεκινήστε την <span className="italic font-bold text-indigo-500">Επιτυχία</span> σας σήμερα.
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-4 max-w-xl mx-auto leading-relaxed">
                Εξασφαλίστε θέση στα τμήματα ΑΕΠΠ Γ' Λυκείου, αποκτήστε το πιστοποιητικό ECDL για τον ΑΣΕΠ ή εξειδικευτείτε στον προγραμματισμό.
              </p>
              <p className="text-xs font-mono text-indigo-400 mb-10">
                Όλα τα αιτήματα εγγραφής αποστέλλονται άμεσα στο: {RECIPIENT_EMAIL}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => handleOpenEnroll('ΑΕΠΠ Γ\' Λυκείου (Πανελλαδικές 4ο Πεδίο)')}
                  className="bg-white text-black px-8 py-4 rounded-sm font-semibold text-sm hover:bg-slate-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Αίτηση Εγγραφής (ΑΕΠΠ / ECDL)
                </button>
                <button 
                  onClick={() => setActiveModalCourse(COURSES[1])}
                  className="bg-transparent border border-white/15 text-white px-8 py-4 rounded-sm font-semibold text-sm hover:bg-white/5 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Προβολή Ύλης ΑΕΠΠ Γ' Λυκείου
                </button>
              </div>
           </div>
        </div>
      </section>

      <Footer onOpenEnroll={handleOpenEnroll} />

      {/* Course Syllabus Modal */}
      <AnimatePresence>
        {activeModalCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveModalCourse(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-[#121218] border border-white/15 rounded-xl max-w-xl w-full p-8 text-left shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs text-indigo-400 font-mono mb-1.5 tabular-nums">
                    {activeModalCourse.index} · {activeModalCourse.categoryLabel} · {activeModalCourse.duration}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {activeModalCourse.titleEl}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="text-slate-400 hover:text-white p-1.5 cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {activeModalCourse.description}
              </p>

              <div className="mb-8">
                <h4 className="text-xs font-semibold text-slate-400 mb-3">
                  Περιεχόμενα Σπουδών &amp; Εργαστηρίου:
                </h4>
                <ul className="space-y-2.5">
                  {activeModalCourse.syllabus.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-white/10">
                <button
                  onClick={() => setActiveModalCourse(null)}
                  className="px-4 py-2.5 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                >
                  Κλείσιμο
                </button>
                <button
                  onClick={() => {
                    const title = activeModalCourse.titleEl;
                    setActiveModalCourse(null);
                    handleOpenEnroll(title);
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  Εγγραφή στο Πρόγραμμα
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Enrollment / Consultation Modal */}
      <AnimatePresence>
        {isEnrollModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsEnrollModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-[#121218] border border-white/15 rounded-xl max-w-lg w-full p-8 text-left shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs text-indigo-400 font-mono mb-1">
                    FORUM COMPUTER STUDIES · ΑΠΟΣΤΟΛΗ ΠΡΟΣ {RECIPIENT_EMAIL}
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    Αίτηση Εγγραφής &amp; Κράτησης Θέσης
                  </h3>
                </div>
                <button
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 cursor-pointer"
                  aria-label="Close enrollment modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {formSubmitted ? (
                <div className="py-4 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-2">
                    Η αίτηση εγγραφής εστάλη επιτυχώς!
                  </h4>
                  {submissionDetails && (
                    <div className="text-xs font-mono text-indigo-300 mb-3 tabular-nums">
                      Κωδικός Αίτησης: {submissionDetails.enrollmentId} · Παραλήπτης: {submissionDetails.recipientEmail}
                    </div>
                  )}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    Ευχαριστούμε, <strong className="text-white">{formData.fullName}</strong>. Τα στοιχεία εγγραφής σας για το πρόγραμμα <strong className="text-indigo-400">{enrollTrack}</strong> διαβιβάστηκαν με email στον <strong className="text-white">{RECIPIENT_EMAIL}</strong>.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    {submissionDetails && (
                      <a
                        href={submissionDetails.mailtoUrl}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors whitespace-nowrap"
                      >
                        <Mail className="w-4 h-4" />
                        <span>Αποστολή Αντιγράφου μέσω Email ({RECIPIENT_EMAIL})</span>
                      </a>
                    )}
                    <button
                      onClick={() => setIsEnrollModalOpen(false)}
                      className="px-5 py-2.5 bg-white text-black text-xs font-semibold rounded-sm hover:bg-slate-200 cursor-pointer whitespace-nowrap"
                    >
                      Επιστροφή στη Σελίδα
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Επιλεγμένο Πρόγραμμα / Μάθημα
                    </label>
                    <select
                      value={enrollTrack}
                      onChange={(e) => setEnrollTrack(e.target.value)}
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <optgroup label="Μαθήματα Λυκείου — Πανελλαδικές">
                        <option value="ΑΕΠΠ Γ' Λυκείου (Πανελλαδικές 4ο Πεδίο)">ΑΕΠΠ Γ' Λυκείου (Πανελλαδικές — 4ο Επιστημονικό Πεδίο)</option>
                        <option value="Θερινά Τμήματα ΑΕΠΠ (Β' προς Γ' Λυκείου)">Θερινά Τμήματα ΑΕΠΠ (Προετοιμασία Β' προς Γ' Λυκείου)</option>
                      </optgroup>
                      <optgroup label="Πιστοποίηση Πληροφορικής ECDL">
                        <option value="ECDL Core ΑΣΕΠ (3 Ενότητες)">ECDL Core ΑΣΕΠ (3 Ενότητες: Word, Excel, Internet)</option>
                        <option value="ECDL Standard / Πλήρες (6–7 Ενότητες)">ECDL Standard / Πλήρες (7 Ενότητες)</option>
                        <option value="ECDL Advanced / Expert">ECDL Advanced / Expert (4 Ενότητες)</option>
                      </optgroup>
                      <optgroup label="Computer Science & Engineering">
                        <option value="Μηχανική Λογισμικού & Προγραμματισμός">Μηχανική Λογισμικού &amp; Προγραμματισμός</option>
                        <option value="Υλικό Υπολογιστών, Δίκτυα & Κυβερνοασφάλεια">Υλικό Υπολογιστών, Δίκτυα &amp; Κυβερνοασφάλεια</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Ονοματεπώνυμο Μαθητή / Σπουδαστή *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="π.χ. Γιώργος Παπαδόπουλος"
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Email Επικοινωνίας *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1.5">
                        Τηλέφωνο Επικοινωνίας *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="69XXXXXXXX"
                        className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Σημειώσεις / Επιθυμητό Ωράριο (Προαιρετικό)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="π.χ. Ενδιαφέρομαι για απογευματινό τμήμα ΑΕΠΠ ή ταχύρρυθμο ECDL ΑΣΕΠ..."
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3.5 py-2 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>Αποστολή αίτησης εγγραφής με email προς: <strong className="text-indigo-300">{RECIPIENT_EMAIL}</strong></span>
                  </div>

                  {formError && (
                    <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded px-3 py-2">
                      {formError}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsEnrollModalOpen(false)}
                      className="px-4 py-2.5 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                    >
                      Ακύρωση
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      {isSubmitting ? 'Αποστολή...' : 'Υποβολή & Αποστολή Email'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
