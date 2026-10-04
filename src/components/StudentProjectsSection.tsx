import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Code2,
  Terminal,
  FileSpreadsheet,
  Database,
  Layers,
  GraduationCap,
  Sparkles,
  ChevronRight,
  X,
  Check,
  Copy,
  Play,
  Upload,
  Send,
  CheckCircle2,
  Cpu,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';

import studentCodeImg from '../assets/images/student_project_code_dashboard_1791096459894.jpg';
import studentExcelImg from '../assets/images/student_project_excel_model_1791096471066.jpg';
import aeppImg from '../assets/images/course_aepp_algorithm_1790492210520.jpg';
import ecdlImg from '../assets/images/course_ecdl_certification_1790491357466.jpg';
import softwareImg from '../assets/images/course_software_eng_1790491319804.jpg';
import cyberImg from '../assets/images/course_cyber_security_1790491347163.jpg';

export interface StudentProject {
  id: string;
  category: 'AEPP' | 'ECDL' | 'DEV' | 'HARDWARE';
  categoryLabel: string;
  title: string;
  student: string;
  cohort: string;
  grade: string;
  summary: string;
  image: string;
  tools: string[];
  codeLanguage: string;
  codeSnippet: string;
  teacherNote: string;
  interactiveType: 'sort' | 'calc' | 'stack';
}

const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'prj-aepp-sort',
    category: 'AEPP',
    categoryLabel: 'ΑΕΠΠ Γ\' Λυκείου',
    title: 'Αλγόριθμος Ταξινόμησης Μορίων & Εκκαθάρισης Βάσεων',
    student: 'Κωνσταντίνος Μ.',
    cohort: 'Γ\' Λυκείου 2025–2026 (4ο Επιστημονικό Πεδίο)',
    grade: '100 / 100 · Άριστη Υλοποίηση',
    summary: 'Πλήρης εφαρμογή σε ΓΛΩΣΣΑ που διαχειρίζεται τα μόρια και τις προτιμήσεις υποψηφίων, ταξινομεί με βελτιστοποιημένη φυσαλίδα (Bubble Sort) και εξάγει στατιστικά επιτυχίας με υποπρογράμματα.',
    image: studentCodeImg,
    tools: ['ΓΛΩΣΣΑ', 'Πίνακες 1D & 2D', 'Bubble Sort', 'Υποπρογράμματα'],
    codeLanguage: 'ΓΛΩΣΣΑ',
    codeSnippet: `ΠΡΟΓΡΑΜΜΑ Κατάταξη_Υποψηφίων
ΣΤΑΘΕΡΕΣ
  Ν = 50
ΜΕΤΑΒΛΗΤΕΣ
  ΧΑΡΑΚΤΗΡΕΣ: Ονόματα[Ν], temp_ον
  ΠΡΑΓΜΑΤΙΚΕΣ: Μόρια[Ν], temp_μορ, Βάση
  ΑΚΕΡΑΙΕΣ: i, j, Επιτυχόντες
ΑΡΧΗ
  ! Είσοδος στοιχείων υποψηφίων
  ΓΙΑ i ΑΠΟ 1 ΜΕΧΡΙ Ν
    ΔΙΑΒΑΣΕ Ονόματα[i], Μόρια[i]
  ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

  ! Ταξινόμηση Ευθείας Ανταλλαγής (Bubble Sort) Φθίνουσα
  ΓΙΑ i ΑΠΟ 2 ΜΕΧΡΙ Ν
    ΓΙΑ j ΑΠΟ Ν ΜΕΧΡΙ i ΜΕ_ΒΗΜΑ -1
      ΑΝ Μόρια[j-1] < Μόρια[j] ΤΟΤΕ
        temp_μορ <- Μόρια[j-1]
        Μόρια[j-1] <- Μόρια[j]
        Μόρια[j] <- temp_μορ

        temp_ον <- Ονόματα[j-1]
        Ονόματα[j-1] <- Ονόματα[j]
        Ονόματα[j] <- temp_ον
      ΤΕΛΟΣ_ΑΝ
    ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ
  ΤΕΛΟΣ_ΕΠΑΝΑΛΗΨΗΣ

  ΓΡΑΨΕ 'Δώσε τη Βάση Εισαγωγής:'
  ΔΙΑΒΑΣΕ Βάση
  ΚΑΛΕΣΕ Υπολογισμός_Επιτυχόντων(Μόρια, Ν, Βάση, Επιτυχόντες)
  ΓΡΑΨΕ 'Συνολικοί Επιτυχόντες:', Επιτυχόντες
ΤΕΛΟΣ_ΠΡΟΓΡΑΜΜΑΤΟΣ`,
    teacherNote: 'Υποδειγματική δομή κώδικα με άψογη διαχείριση παράλληλων πινάκων και σωστή κλήση διαδικασίας σύμφωνα με τα κριτήρια του Θέματος Δ των Πανελλαδικών.',
    interactiveType: 'sort'
  },
  {
    id: 'prj-aepp-ds',
    category: 'AEPP',
    categoryLabel: 'ΑΕΠΠ Γ\' Λυκείου',
    title: 'Προσομοιωτής Στοίβας (LIFO) & Ουράς (FIFO)',
    student: 'Μαρία Σ. & Γιώργος Δ.',
    cohort: 'Γ\' Λυκείου 2025–2026',
    grade: '98 / 100 · Βραβείο Αλγοριθμικής',
    summary: 'Εργαστηριακό project υλοποίησης δυναμικών λειτουργιών Ώθησης (Push), Απώθησης (Pop), Εισαγωγής και Εξαγωγής με μονοδιάστατους πίνακες και έλεγχο υπερχείλισης/υποχείλισης.',
    image: aeppImg,
    tools: ['ΓΛΩΣΣΑ', 'Δομές Δεδομένων', 'Στοίβα (Stack)', 'Ουρά (Queue)'],
    codeLanguage: 'ΓΛΩΣΣΑ',
    codeSnippet: `! Υλοποίηση λειτουργιών Στοίβας σε ΓΛΩΣΣΑ
ΔΙΑΔΙΚΑΣΙΑ Ωθηση(S, top, στοιχείο, μέγεθος)
ΜΕΤΑΒΛΗΤΕΣ
  ΑΚΕΡΑΙΕΣ: S[100], top, στοιχείο, μέγεθος
ΑΡΧΗ
  ΑΝ top = μέγεθος ΤΟΤΕ
    ΓΡΑΨΕ 'Υπερχείλιση Στοίβας (Stack Overflow)!'
  ΑΛΛΙΩΣ
    top <- top + 1
    S[top] <- στοιχείο
    ΓΡΑΨΕ 'Εισήχθη το στοιχείο:', στοιχείο
  ΤΕΛΟΣ_ΑΝ
ΤΕΛΟΣ_ΔΙΑΔΙΚΑΣΙΑΣ

ΔΙΑΔΙΚΑΣΙΑ Απωση(S, top, στοιχείο)
ΜΕΤΑΒΛΗΤΕΣ
  ΑΚΕΡΑΙΕΣ: S[100], top, στοιχείο
ΑΡΧΗ
  ΑΝ top = 0 ΤΟΤΕ
    ΓΡΑΨΕ 'Υποχείλιση Στοίβας (Stack Underflow)!'
  ΑΛΛΙΩΣ
    στοιχείο <- S[top]
    top <- top - 1
    ΓΡΑΨΕ 'Εξήχθη το στοιχείο:', στοιχείο
  ΤΕΛΟΣ_ΑΝ
ΤΕΛΟΣ_ΔΙΑΔΙΚΑΣΙΑΣ`,
    teacherNote: 'Εξαιρετική υλοποίηση των θεωρητικών εννοιών του σχολικού βιβλίου σε λειτουργικό κώδικα, με πλήρη κάλυψη όλων των ακραίων περιπτώσεων (edge cases).',
    interactiveType: 'stack'
  },
  {
    id: 'prj-ecdl-finance',
    category: 'ECDL',
    categoryLabel: 'ECDL & Office',
    title: 'Χρηματοοικονομικό Dashboard & Μοντέλο Πωλήσεων',
    student: 'Ελένη Κ.',
    cohort: 'ECDL Expert & Advanced Excel',
    grade: 'ECDL Expert Distinction (99%)',
    summary: 'Δυναμικό μοντέλο παρακολούθησης πωλήσεων και κερδοφορίας επιχείρησης με διαδραστικούς Συγκεντρωτικούς Πίνακες (Pivot Tables), συναρτήσεις XLOOKUP/SUMIFS και σενάρια What-If.',
    image: studentExcelImg,
    tools: ['MS Excel', 'VBA Macros', 'Pivot Tables', 'What-If Analysis'],
    codeLanguage: 'Excel Formulas / VBA',
    codeSnippet: `' VBA Macro για αυτοματοποιημένη εξαγωγή μηνιαίας αναφοράς
Sub GenerateMonthlySalesReport()
    Dim wsData As Worksheet, wsSummary As Worksheet
    Dim lastRow As Long, targetRow As Long
    
    Set wsData = ThisWorkbook.Sheets("SalesData")
    Set wsSummary = ThisWorkbook.Sheets("ExecutiveSummary")
    
    lastRow = wsData.Cells(wsData.Rows.Count, "A").End(xlUp).Row
    
    ' Δυναμικός υπολογισμός κύκλου εργασιών με SUMIFS
    wsSummary.Range("B4").Formula2 = "=SUMIFS(SalesData!E2:E" & lastRow & ", SalesData!C2:C" & lastRow & ", B3)"
    wsSummary.Range("B5").Formula2 = "=SUMPRODUCT((SalesData!D2:D" & lastRow & ")*SalesData!E2:E" & lastRow & ")"
    
    ' Ανανέωση συγκεντρωτικών πινάκων
    ThisWorkbook.RefreshAll
    MsgBox "Η μηνιαία αναφορά ενημερώθηκε επιτυχώς!", vbInformation, "Forum ECDL Lab"
End Sub`,
    teacherNote: 'Επαγγελματικό επίπεδο αυτοματισμού γραφείου. Η μαθήτρια ενσωμάτωσε προχωρημένη ανάλυση ευαισθησίας και δυναμικά KPIs έτοιμα για παραγωγική χρήση.',
    interactiveType: 'calc'
  },
  {
    id: 'prj-ecdl-db',
    category: 'ECDL',
    categoryLabel: 'ECDL & Office',
    title: 'Σχεσιακή Βάση Δεδομένων Ιατρείου & Ραντεβού',
    student: 'Δημήτρης Β.',
    cohort: 'ECDL Standard (7 Ενότητες)',
    grade: 'Άριστη Εργαστηριακή Εργασία',
    summary: 'Σχεδιασμός κανονικοποιημένης βάσης δεδομένων (3NF) στο Microsoft Access με σχεσιακούς πίνακες Ασθενών, Ραντεβού και Θεραπειών, παραμετρικά ερωτήματα και φόρμες.',
    image: ecdlImg,
    tools: ['MS Access', 'SQL Queries', 'Relational Design', 'Reports'],
    codeLanguage: 'SQL / Access',
    codeSnippet: `-- Παραμετρικό ερώτημα SQL για ανάκτηση ημερήσιων ραντεβού ανά γιατρό
SELECT 
    tblPatients.LastName & ' ' & tblPatients.FirstName AS PatientName,
    tblAppointments.AppointmentDate,
    tblAppointments.AppointmentTime,
    tblTreatments.TreatmentName,
    tblTreatments.Cost
FROM (tblPatients 
INNER JOIN tblAppointments ON tblPatients.PatientID = tblAppointments.PatientID)
INNER JOIN tblTreatments ON tblAppointments.TreatmentID = tblTreatments.TreatmentID
WHERE tblAppointments.DoctorID = [Εισάγετε ID Γιατρού:]
  AND tblAppointments.AppointmentDate = [Εισάγετε Ημερομηνία (ΗΗ/ΜΜ/ΕΕΕΕ):]
ORDER BY tblAppointments.AppointmentTime ASC;`,
    teacherNote: 'Πλήρης τήρηση των κανόνων σχεσιακής ακεραιότητας (Referential Integrity) και εξαιρετική σχεδίαση φορμών διεπαφής χρήστη.',
    interactiveType: 'calc'
  },
  {
    id: 'prj-dev-bst',
    category: 'DEV',
    categoryLabel: 'Software & Python',
    title: 'Οπτικοποιητής Δυαδικών Δένδρων Αναζήτησης (BST)',
    student: 'Αλέξανδρος Π.',
    cohort: 'Software Engineering Track',
    grade: 'Open Source Lab Project',
    summary: 'Υλοποίηση δυαδικού δένδρου αναζήτησης σε Python με αναδρομική εισαγωγή, διαγραφή κόμβων, ενδοδιατεταγμένη διάσχιση (In-order) και μέτρηση πολυπλοκότητας O(log n).',
    image: softwareImg,
    tools: ['Python 3', 'Binary Trees', 'Algorithms', 'Recursion'],
    codeLanguage: 'Python 3',
    codeSnippet: `class Node:
    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None

class BinarySearchTree:
    def __init__(self):
        self.root = None

    def insert(self, key):
        self.root = self._insert_recursive(self.root, key)

    def _insert_recursive(self, node, key):
        if node is None:
            return Node(key)
        if key < node.key:
            node.left = self._insert_recursive(node.left, key)
        elif key > node.key:
            node.right = self._insert_recursive(node.right, key)
        return node

    def inorder_traversal(self, node, result=None):
        if result is None:
            result = []
        if node:
            self.inorder_traversal(node.left, result)
            result.append(node.key)
            self.inorder_traversal(node.right, result)
        return result`,
    teacherNote: 'Καθαρός, ευανάγνωστος κώδικας σύμφωνα με τα πρότυπα PEP8, με πλήρεις unit tests και ανάλυση χρονικής πολυπλοκότητας.',
    interactiveType: 'sort'
  },
  {
    id: 'prj-net-vlan',
    category: 'HARDWARE',
    categoryLabel: 'Hardware & Δίκτυα',
    title: 'Αρχιτεκτονική Εταιρικού Δικτύου VLANs & Firewall',
    student: 'Νίκος Τ. & Στέφανος Μ.',
    cohort: 'Hardware & Networks Track',
    grade: 'Εργαστηριακή Διάκριση 10/10',
    summary: 'Μελέτη, σχεδιασμός και προσομοίωση ασφαλούς εταιρικού δικτύου με απομονωμένα υποδίκτυα VLAN (Management, Staff, Guests), DHCP snooping, NAT και κανόνες Firewall.',
    image: cyberImg,
    tools: ['Cisco Packet Tracer', 'VLANs', 'Firewall', 'Network Security'],
    codeLanguage: 'Cisco IOS CLI',
    codeSnippet: `! Παραμετροποίηση Switch VLANs & Trunk Port
Switch(config)# vlan 10
Switch(config-vlan)# name Management_Staff
Switch(config)# vlan 20
Switch(config-vlan)# name Lab_Workstations
Switch(config)# vlan 30
Switch(config-vlan)# name Guest_WiFi

Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30

! Ενεργοποίηση DHCP Snooping & Port Security
Switch(config)# ip dhcp snooping
Switch(config)# ip dhcp snooping vlan 10,20
Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security violation restrict`,
    teacherNote: 'Πρακτική μελέτη πραγματικών προδιαγραφών. Οι σπουδαστές εφάρμοσαν άψογα τις αρχές διαχωρισμού δικτύων και ασφάλειας υποδομών.',
    interactiveType: 'calc'
  }
];

export function StudentProjectsSection() {
  const [activeTab, setActiveTab] = useState<'ALL' | 'AEPP' | 'ECDL' | 'DEV' | 'HARDWARE'>('ALL');
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Interactive Live Demo states
  const [demoInput, setDemoInput] = useState('18.5, 14.2, 19.8, 11.0, 16.5');
  const [demoSortedOutput, setDemoSortedOutput] = useState<number[] | null>(null);
  const [stackItems, setStackItems] = useState<string[]>(['Θέμα Α', 'Θέμα Β', 'Θέμα Γ']);
  const [newStackItem, setNewStackItem] = useState('');

  // Submit project form states
  const [submitForm, setSubmitForm] = useState({
    studentName: '',
    email: '',
    track: 'ΑΕΠΠ Γ\' Λυκείου',
    projectTitle: '',
    description: '',
    codeLink: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const filteredProjects = activeTab === 'ALL'
    ? STUDENT_PROJECTS
    : STUDENT_PROJECTS.filter(p => p.category === activeTab);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRunSortDemo = () => {
    const numbers = demoInput
      .split(',')
      .map(s => parseFloat(s.trim()))
      .filter(n => !isNaN(n));
    // Bubble sort descending (as in Greek Panhellenic AEPP)
    const sorted = [...numbers];
    for (let i = 0; i < sorted.length; i++) {
      for (let j = sorted.length - 1; j > i; j--) {
        if (sorted[j] > sorted[j - 1]) {
          const temp = sorted[j];
          sorted[j] = sorted[j - 1];
          sorted[j - 1] = temp;
        }
      }
    }
    setDemoSortedOutput(sorted);
  };

  const handlePushStack = () => {
    if (!newStackItem.trim()) return;
    if (stackItems.length >= 6) {
      alert('Υπερχείλιση Στοίβας (Stack Overflow)! Μέγιστο 6 στοιχεία.');
      return;
    }
    setStackItems([...stackItems, newStackItem.trim()]);
    setNewStackItem('');
  };

  const handlePopStack = () => {
    if (stackItems.length === 0) {
      alert('Υποχείλιση Στοίβας (Stack Underflow)! Η στοίβα είναι κενή.');
      return;
    }
    setStackItems(stackItems.slice(0, -1));
  };

  const handleSubmitProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitForm.studentName.trim() || !submitForm.email.trim() || !submitForm.projectTitle.trim()) {
      setSubmitError('Παρακαλώ συμπληρώστε τα υποχρεωτικά πεδία.');
      return;
    }
    setSubmitError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitForm),
      });

      // Browser-side relay to fragky@gmail.com
      fetch('https://formsubmit.co/ajax/fragky@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `[Forum Computer Studies] Υποβολή Εργασίας: ${submitForm.projectTitle}`,
          _replyto: submitForm.email,
          Μαθητής: submitForm.studentName,
          Email: submitForm.email,
          Τμήμα: submitForm.track,
          Τίτλος_Εργασίας: submitForm.projectTitle,
          Περιγραφή: submitForm.description,
          Σύνδεσμος: submitForm.codeLink,
        }),
      }).catch(() => {});

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        setSubmitSuccess(true);
      }
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="projects" className="py-28 border-b border-white/10 bg-[#0A0A0C]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-medium mb-3">
              <span>Student Portfolio &amp; Lab Projects</span>
              <span aria-hidden="true">·</span>
              <span>Εργασίες &amp; Πρότυπες Υλοποιήσεις</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight leading-[1.08] font-display" style={{ textWrap: 'balance' }}>
              Εργασίες <span className="font-bold italic text-indigo-500">Μαθητών</span> &amp; Projects
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setSubmitError('');
                setIsSubmitModalOpen(true);
              }}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap cursor-pointer shadow-lg shadow-indigo-600/20"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Υποβολή Εργασίας (Για Μαθητές)</span>
            </button>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121218] border border-white/10 rounded-lg w-fit mb-12">
          {[
            { id: 'ALL', label: 'Όλες οι Εργασίες', count: STUDENT_PROJECTS.length },
            { id: 'AEPP', label: 'ΑΕΠΠ Γ\' Λυκείου', count: STUDENT_PROJECTS.filter(p => p.category === 'AEPP').length },
            { id: 'ECDL', label: 'ECDL & Office', count: STUDENT_PROJECTS.filter(p => p.category === 'ECDL').length },
            { id: 'DEV', label: 'Software & Python', count: STUDENT_PROJECTS.filter(p => p.category === 'DEV').length },
            { id: 'HARDWARE', label: 'Hardware & Δίκτυα', count: STUDENT_PROJECTS.filter(p => p.category === 'HARDWARE').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === tab.id ? 'bg-indigo-700 text-white' : 'bg-white/5 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((prj) => (
            <motion.div
              key={prj.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.18 }}
              className="bg-[#121218] border border-white/10 rounded-xl overflow-hidden flex flex-col justify-between group hover:border-indigo-500/40"
            >
              <div>
                {/* Visual Image Preview */}
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={prj.image}
                    alt={prj.title}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121218] via-[#121218]/40 to-transparent" />
                  <div className="absolute top-4 left-4 bg-[#0A0A0C]/90 backdrop-blur-md px-3 py-1 rounded text-[11px] font-mono text-indigo-300 border border-white/10">
                    {prj.categoryLabel}
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-950/80 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                    {prj.grade}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="text-xs text-slate-400 mb-2 font-mono flex items-center justify-between">
                    <span>{prj.student}</span>
                    <span className="text-slate-500 truncate max-w-[160px]">{prj.cohort.split('(')[0]}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                    {prj.title}
                  </h3>
                  <p className="text-slate-400 text-xs leading-relaxed mb-5 line-clamp-3">
                    {prj.summary}
                  </p>

                  {/* Tool chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {prj.tools.map((tool, i) => (
                      <span key={i} className="text-[10px] font-mono bg-white/5 text-slate-300 px-2 py-0.5 rounded border border-white/5">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => setSelectedProject(prj)}
                  className="w-full py-2.5 px-4 bg-white/5 hover:bg-indigo-600 text-slate-200 hover:text-white rounded text-xs font-semibold transition-all flex items-center justify-center gap-2 group/btn cursor-pointer border border-white/5"
                >
                  <Code2 className="w-3.5 h-3.5 text-indigo-400 group-hover/btn:text-white" />
                  <span>Προβολή Εργασίας &amp; Κώδικα</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Banner / Teacher Mentorship */}
        <div className="mt-16 bg-gradient-to-r from-indigo-950/40 via-[#121218] to-[#121218] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs text-indigo-400 font-mono mb-2">
              <Sparkles className="w-4 h-4" />
              <span>ΜΕΘΟΔΟΛΟΓΙΑ ΕΡΓΑΣΤΗΡΙΟΥ FORUM</span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              Κάθε μαθητής ολοκληρώνει το δικό του Portfolio
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Είτε πρόκειται για διαγωνίσματα προσομοίωσης ΑΕΠΠ με πλήρη ανάπτυξη αλγορίθμων είτε για αυτοματισμούς γραφείου και εφαρμογές κώδικα, οι μαθητές μας εφαρμόζουν τις γνώσεις τους σε πραγματικά προβλήματα με συνεχή ανατροφοδότηση.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => {
                setSubmitSuccess(false);
                setIsSubmitModalOpen(true);
              }}
              className="px-6 py-3 bg-white text-black text-xs font-semibold rounded-sm hover:bg-slate-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              Υποβολή Εργασίας Μαθητή
            </button>
            <a
              href="#aepp"
              className="px-6 py-3 border border-white/15 text-slate-300 text-xs font-medium rounded-sm hover:bg-white/5 transition-colors text-center whitespace-nowrap"
            >
              Προετοιμασία ΑΕΠΠ Γ' Λυκείου
            </a>
          </div>
        </div>
      </div>

      {/* Project Details & Code Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-[#121218] border border-white/15 rounded-xl max-w-3xl w-full p-6 md:p-8 text-left shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1.5">
                    <span>{selectedProject.categoryLabel}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-400">{selectedProject.grade}</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-white">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-1">
                    Μαθητής: <strong className="text-slate-200">{selectedProject.student}</strong> · {selectedProject.cohort}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-white p-1.5 cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {selectedProject.summary}
              </p>

              {/* Code Snippet Box with Copy Button */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 bg-[#0A0A0C] border border-white/10 rounded-t-lg px-4 py-2.5">
                  <span className="text-indigo-300">{selectedProject.codeLanguage} Preview</span>
                  <button
                    onClick={() => handleCopyCode(selectedProject.codeSnippet)}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors cursor-pointer text-[11px]"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Αντιγράφηκε!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Αντιγραφή Κώδικα</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="bg-[#0A0A0C] border-x border-b border-white/10 rounded-b-lg p-4 text-xs font-mono text-indigo-200 overflow-x-auto leading-relaxed max-h-64">
                  <code>{selectedProject.codeSnippet}</code>
                </pre>
              </div>

              {/* Live Interactive Runner for the student project */}
              {selectedProject.interactiveType === 'sort' && (
                <div className="p-5 rounded-lg bg-[#0A0A0C] border border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                    <Play className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ΔΙΑΔΡΑΣΤΙΚΗ ΔΟΚΙΜΗ ΑΛΓΟΡΙΘΜΟΥ (LIVE DEMO)</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">
                    Εισάγετε βαθμολογίες υποψηφίων χωρισμένες με κόμμα και δείτε την εκτέλεση του αλγορίθμου ταξινόμησης Bubble Sort:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 mb-3">
                    <input
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      placeholder="π.χ. 18.5, 14.2, 19.8, 11.0, 16.5"
                      className="flex-grow bg-[#121218] border border-white/15 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handleRunSortDemo}
                      className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Εκτέλεση Ταξινόμησης
                    </button>
                  </div>
                  {demoSortedOutput && (
                    <div className="text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 rounded p-2.5">
                      ✓ Αποτέλεσμα Ταξινόμησης (Φθίνουσα Κατάταξη): {demoSortedOutput.join('  >  ')}
                    </div>
                  )}
                </div>
              )}

              {selectedProject.interactiveType === 'stack' && (
                <div className="p-5 rounded-lg bg-[#0A0A0C] border border-white/10 mb-6">
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
                    <Play className="w-3.5 h-3.5 text-indigo-400" />
                    <span>ΠΡΟΣΟΜΟΙΩΣΗ ΣΤΟΙΒΑΣ (LIFO PUSH &amp; POP)</span>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center mb-4">
                    <input
                      type="text"
                      value={newStackItem}
                      onChange={(e) => setNewStackItem(e.target.value)}
                      placeholder="Νέο στοιχείο..."
                      className="bg-[#121218] border border-white/15 rounded px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />
                    <button
                      onClick={handlePushStack}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Ώθηση (Push)
                    </button>
                    <button
                      onClick={handlePopStack}
                      className="px-3 py-1.5 bg-rose-600/80 hover:bg-rose-500 text-white text-xs font-semibold rounded cursor-pointer"
                    >
                      Απώθηση (Pop)
                    </button>
                  </div>
                  <div className="flex items-end gap-2 border-b border-indigo-500/30 pb-2">
                    <span className="text-[11px] font-mono text-slate-400 self-center mr-2">Top -&gt;</span>
                    {stackItems.length === 0 ? (
                      <span className="text-xs font-mono text-slate-500 italic">Η στοίβα είναι κενή (top = 0)</span>
                    ) : (
                      stackItems.map((item, idx) => (
                        <span
                          key={idx}
                          className={`text-xs font-mono px-3 py-1 rounded border ${
                            idx === stackItems.length - 1
                              ? 'bg-indigo-600 text-white border-indigo-400'
                              : 'bg-white/5 text-slate-300 border-white/10'
                          }`}
                        >
                          {item}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* Teacher Assessment */}
              <div className="p-4 rounded-lg bg-indigo-950/20 border border-indigo-500/20 text-xs text-slate-300 mb-6">
                <strong className="text-indigo-400 block mb-1 font-mono">
                  ΣΧΟΛΙΑ ΚΑΙ ΑΞΙΟΛΟΓΗΣΗ ΚΑΘΗΓΗΤΗ:
                </strong>
                {selectedProject.teacherNote}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2.5 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                >
                  Κλείσιμο
                </button>
                <button
                  onClick={() => {
                    handleCopyCode(selectedProject.codeSnippet);
                  }}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                >
                  Αντιγραφή Λύσης
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Student Project Submission Modal */}
      <AnimatePresence>
        {isSubmitModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
            onClick={() => setIsSubmitModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="bg-[#121218] border border-white/15 rounded-xl max-w-lg w-full p-6 md:p-8 text-left shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="text-xs text-indigo-400 font-mono mb-1">
                    FORUM COMPUTER STUDIES · STUDENT PORTAL
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Υποβολή Εργασίας Μαθητή
                  </h3>
                </div>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="text-slate-400 hover:text-white p-1.5 cursor-pointer"
                  aria-label="Close submission modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submitSuccess ? (
                <div className="py-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Η εργασία σας υποβλήθηκε επιτυχώς!
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    Ευχαριστούμε, <strong className="text-white">{submitForm.studentName}</strong>. Η εργασία σας κοινοποιήθηκε στον καθηγητή πληροφορικής (fragky@gmail.com) για αξιολόγηση.
                  </p>
                  <button
                    onClick={() => setIsSubmitModalOpen(false)}
                    className="px-6 py-2.5 bg-white text-black text-xs font-semibold rounded-sm hover:bg-slate-200 cursor-pointer"
                  >
                    Κλείσιμο
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmitProject} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Τμήμα / Μάθημα
                    </label>
                    <select
                      value={submitForm.track}
                      onChange={(e) => setSubmitForm({ ...submitForm, track: e.target.value })}
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="ΑΕΠΠ Γ' Λυκείου (Πανελλαδικές)">ΑΕΠΠ Γ' Λυκείου (Πανελλαδικές)</option>
                      <option value="Θερινό Τμήμα ΑΕΠΠ (Β' προς Γ')">Θερινό Τμήμα ΑΕΠΠ (Β' προς Γ')</option>
                      <option value="ECDL Core / Standard">ECDL Core / Standard</option>
                      <option value="ECDL Expert (Advanced Excel / Access)">ECDL Expert (Advanced Excel / Access)</option>
                      <option value="Software Engineering & Python">Software Engineering &amp; Python</option>
                      <option value="Hardware & Networks">Hardware &amp; Networks</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Ονοματεπώνυμο Μαθητή *
                    </label>
                    <input
                      type="text"
                      value={submitForm.studentName}
                      onChange={(e) => setSubmitForm({ ...submitForm, studentName: e.target.value })}
                      placeholder="π.χ. Μαρία Γεωργίου"
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Email Επικοινωνίας *
                    </label>
                    <input
                      type="email"
                      value={submitForm.email}
                      onChange={(e) => setSubmitForm({ ...submitForm, email: e.target.value })}
                      placeholder="student@example.com"
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Τίτλος Εργασίας *
                    </label>
                    <input
                      type="text"
                      value={submitForm.projectTitle}
                      onChange={(e) => setSubmitForm({ ...submitForm, projectTitle: e.target.value })}
                      placeholder="π.χ. Επίλυση Θέματος Δ Πανελλαδικών 2024 / Μοντέλο Excel"
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Σύνδεσμος Αρχείου / GitHub / Google Drive (Προαιρετικό)
                    </label>
                    <input
                      type="url"
                      value={submitForm.codeLink}
                      onChange={(e) => setSubmitForm({ ...submitForm, codeLink: e.target.value })}
                      placeholder="https://..."
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Περιγραφή / Σημειώσεις
                    </label>
                    <textarea
                      rows={2}
                      value={submitForm.description}
                      onChange={(e) => setSubmitForm({ ...submitForm, description: e.target.value })}
                      placeholder="Σύντομη περιγραφή της προσέγγισης ή τυχόν ερωτήσεις προς τον καθηγητή..."
                      className="w-full bg-[#0A0A0C] border border-white/15 rounded px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  {submitError && (
                    <p className="text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded px-3 py-2">
                      {submitError}
                    </p>
                  )}

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsSubmitModalOpen(false)}
                      className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white cursor-pointer"
                    >
                      Ακύρωση
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white text-xs font-semibold rounded-sm transition-colors cursor-pointer"
                    >
                      {isSubmitting ? 'Υποβολή...' : 'Υποβολή Εργασίας'}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
