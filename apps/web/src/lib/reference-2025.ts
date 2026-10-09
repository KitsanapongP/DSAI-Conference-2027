/** Historical DS&AI 2025 facts used to show the 2027 site's content structure. */
export const referenceSources = {
  home: "https://icdsai.pdn.ac.lk/index.html",
  call: "https://icdsai.pdn.ac.lk/CFP_2025DS%26AI_new.pdf",
  submission: "https://icdsai.pdn.ac.lk/submission.html",
  programme: "https://icdsai.pdn.ac.lk/programme.html",
  workshops: "https://icdsai.pdn.ac.lk/workshops.html",
  committee: "https://icdsai.pdn.ac.lk/committee.html",
  venue: "https://icdsai.pdn.ac.lk/venue.html",
  accommodation: "https://icdsai.pdn.ac.lk/accommodation.html",
  travel: "https://icdsai.pdn.ac.lk/visa.html",
  proceedings: "https://icdsai.pdn.ac.lk/proceeding.html",
  memories: "https://icdsai.pdn.ac.lk/memories.html",
} as const;

export const referenceDates = [
  { label: "Call for papers", date: "15 Jan 2025" },
  { label: "Paper submission deadline", date: "29 Jun 2025", note: "Extended from 14 Jun" },
  { label: "Acceptance notification", date: "26 Aug 2025" },
  { label: "Camera-ready deadline", date: "6 Sep 2025" },
  { label: "Early registration", date: "1–15 Sep 2025" },
  { label: "Regular registration deadline", date: "1 Nov 2025" },
  { label: "Conference", date: "19–21 Nov 2025" },
];

export const referenceTopics = [
  "Affective computing", "Applications of data science and AI", "Bayesian networks", "Constraint satisfaction",
  "Data mining and knowledge discovery", "Data science and AI in education", "Evolutionary computation",
  "Explainable, trustworthy and ethical AI", "Foundations of data science and AI", "Image analysis",
  "Information retrieval and extraction", "Intelligent agents", "Knowledge acquisition and ontologies",
  "Knowledge representation", "Machine learning", "Markov networks", "Natural language processing",
  "Neural networks and deep learning", "Planning and scheduling", "Probabilistic inference",
  "Reasoning and argumentation", "Semantic web", "Uncertainty", "Vision and perception",
];

export const referenceSpeakers = [
  { name: "Dr. Dilrukshi Gamage", affiliation: "University of Colombo School of Computing, Sri Lanka", talk: "Human-Centered Pathways for AI and Machine Learning" },
  { name: "Prof. Mahesan Niranjan", affiliation: "University of Southampton, UK", talk: "Machine Learning in Bio-Medical Problem" },
  { name: "Prof. Teeradaj Racharak", affiliation: "Tohoku University, Japan", talk: "Towards Verifiable and Trustable AI from Multiple Perspectives" },
  { name: "Dr. Romesh Ranawana", affiliation: "Dialog Axiata PLC, Sri Lanka", talk: "Beyond the hype: creating impact with AI" },
];

export const referenceFees = [
  { category: "Local students", currency: "LKR", early: "10,000", regular: "15,000" },
  { category: "Other local participants", currency: "LKR", early: "25,000", regular: "30,000" },
  { category: "Local conference dinner", currency: "LKR", early: "4,500", regular: "4,500" },
  { category: "Developing-country participants", currency: "USD", early: "200", regular: "250" },
  { category: "Other international participants", currency: "USD", early: "300", regular: "350" },
];

export const referenceProgramme = [
  { day: "Wednesday · 19 Nov 2025", rows: [
    ["08:00–09:00", "Registration and arrival"], ["09:00–09:30", "Inauguration"],
    ["09:30–10:15", "Keynote · Dr. Romesh Ranawana"], ["10:15–10:45", "Tea break"],
    ["10:45–12:15", "Papers · Time series and predictive modelling (3 presentations)"],
    ["12:15–13:15", "Lunch"], ["13:30–15:00", "Papers · Computer vision and deep learning (3 presentations)"],
    ["15:00–15:30", "Tea break"], ["15:30–17:00", "Papers · Optimisation, efficiency and edge computing (3 presentations)"],
  ] },
  { day: "Thursday · 20 Nov 2025", rows: [
    ["09:00–09:45", "Keynote · Prof. Teeradaj Racharak"], ["09:45–10:15", "Tea break"],
    ["10:45–12:15", "Papers · Large language models and advanced NLP (4 presentations)"],
    ["12:15–13:15", "Lunch"], ["13:30–14:30", "Keynote · Prof. Mahesan Niranjan"],
    ["14:30–15:30", "Papers · Explainable AI and bias detection (2 presentations)"],
    ["15:30–16:00", "Tea break"], ["From 16:00", "Excursion and conference dinner"],
  ] },
  { day: "Friday · 21 Nov 2025", rows: [
    ["09:00–09:45", "Keynote · Dr. Dilrukshi Gamage"], ["09:45–10:15", "Tea break"],
    ["10:45–12:15", "Papers · Healthcare, medicine and survival analysis (4 presentations)"],
    ["12:15–13:15", "Lunch"], ["13:30–15:00", "Papers · Domain applications and case studies (3 presentations)"],
    ["15:00–15:30", "Tea break"], ["15:30–17:00", "Collaborative learning workshop and steering meeting"],
    ["17:00–17:30", "Best paper award and closing remarks"],
  ] },
  { day: "Saturday · 22 Nov 2025", rows: [["09:00–16:00", "Workshop · Computational biology and protein structure/function"]] },
] as const;

export const referenceWorkshops = [
  { title: "Future of Data Scientists and Statisticians with the Development of AI", kind: "Pre-conference · ISI collaboration", when: "18 Nov 2025 · 18:00–20:00", where: "Online", people: "Prof. Nalini Ravishanker, Prof. Elisabetta Carfagna, Prof. David Banks", fee: "Free with workshop registration", summary: "Capacity building, trusted smart statistics, alternative data and the changing role of statisticians." },
  { title: "The Future of Business: Operations, FinTech Innovation & Executive Leadership", kind: "Pre-conference", when: "18 Nov 2025 · 09:00–12:00", where: "University of Peradeniya", people: "Mr. Gihan Mendis, Mr. Shankar Dharmaratne, Mr. K. V. Kuganathan", fee: "Free with workshop registration", summary: "Practical business uses of AI, fintech innovation and executive leadership." },
  { title: "Collaborative Learning in Computer Science Higher Education", kind: "Workshop 1", when: "21 Nov 2025 · 15:00–16:30", where: "JRDC", people: "Prof. Alexandra Blank", fee: "LKR 3,000; LKR 1,500 for conference participants and students", summary: "Approaches and tools for fair, effective group assignments in computer science education." },
  { title: "Computational Biology: Predicting Structure and Function of Proteins", kind: "Workshop 2", when: "22 Nov 2025 · 09:00–16:00", where: "PGIS", people: "Prof. Mahesan Niranjan and Dr. Rupika Wijesinghe", fee: "LKR 5,000; LKR 2,500 for conference participants and students", summary: "Machine learning for molecular sequences, protein structures and hands-on prediction work." },
];

export const referenceVenues = [
  { name: "Joint Research and Demonstration Centre (JRDC)", role: "Conference venue in 2025", address: "E.O.E Pereira Mawatha, Meewathura, Peradeniya, Sri Lanka", phone: "+94 81 205 8116", website: "https://jrdc.lk" },
  { name: "Postgraduate Institute of Science (PGIS)", role: "Workshop venue in 2025", address: "Old Galaha Road, Peradeniya, Sri Lanka", phone: "+94 81 238 5660", website: "https://www.pgis.lk" },
];

export const referenceHotels = [
  { name: "Joint Research and Demonstration Centre", area: "Peradeniya", phone: "+94 81 205 8116", note: "2025 rate: LKR 3,200 single / LKR 5,000 double; limited rooms" },
  { name: "The Grand Kandyan Hotel", area: "Kandy", phone: "+94 81 203 0400" },
  { name: "Earl's Regent Kandy", area: "Kandy", phone: "+94 81 222 1144" },
  { name: "Hotel Topaz Kandy", area: "Kandy", phone: "+94 81 738 9000" },
  { name: "Sun Dove Suite", area: "Kandy", phone: "+94 81 223 4334" },
  { name: "Peradeniya Rest House", area: "Peradeniya", phone: "+94 81 238 8299" },
  { name: "Oak-Ray Regency", area: "Getambe", phone: "+94 81 238 9141" },
  { name: "Hanthana Mountain View", area: "Peradeniya", phone: "+94 70 147 9439" },
  { name: "The Golden Crown", area: "Kandy", phone: "+94 81 224 4000" },
];

export const referenceMainCommittee = [
  ["Prof. Chutiporn Anutariya", "Programme co-chair"], ["Prof. Marcello M. Bonsangue", "Programme co-chair"],
  ["Prof. Amalka Pinidiyaarachchi", "Programme co-chair"], ["Dr. Hakim Usoof", "Programme co-chair"],
  ["Prof. T.G.I. Fernando", "Programme co-chair"], ["Dr. Chitsutha Soomlek", "Publicity chair"],
  ["Dr. Hemalika Abeysundara", "Conference co-secretary"], ["Dr. Lakshika Nawarathna", "Conference co-secretary"],
] as const;

export const referenceContacts = [
  { name: "Prof. Chutiporn Anutariya", affiliation: "Asian Institute of Technology, Thailand", email: "chutiporn@ait.ac.th" },
  { name: "Prof. Marcello M. Bonsangue", affiliation: "Leiden University, Netherlands", email: "m.m.bonsangue@liacs.leidenuniv.nl" },
  { name: "Prof. Amalka Pinidiyaarachchi", affiliation: "University of Peradeniya, Sri Lanka", email: "ajp@sci.pdn.ac.lk" },
  { name: "Dr. Hakim Usoof", affiliation: "University of Peradeniya, Sri Lanka", email: "hau@sci.pdn.ac.lk" },
  { name: "Prof. T.G.I. Fernando", affiliation: "University of Sri Jayawardenapura, Sri Lanka", email: "tgi@sjp.ac.lk" },
  { name: "Dr. Hemalika Abeysundara / Dr. Lakshika Nawarathna", affiliation: "2025 conference co-secretaries", email: "icdsai@pdn.ac.lk" },
];

export const referenceTechnicalCommittee = [
  "Hemalika Abeysundara", "Kasun Amarasinghe", "Mohammad Andri Budiman", "Chutiporn Anutariya",
  "Marcello Bonsangue", "Erna Budhiarti-Nababan", "Jeff Chak-Fu Wong", "Xueqin Chen",
  "Vatcharaporn Esichaikul", "Taufik F. Abidin", "Tiago Gomes", "Saluka Kodituwakku",
  "Maarten Lamers", "Rajitha M. Silva", "José Machado", "Ruwan Nawarathna",
  "Mohd Naz’ri Mahrin", "Paulo Novais", "Opim Salim Sitompul", "Pusadee Seresangtakul",
  "Chaklam Silpasuwanchai", "Prarinya Siritanawan", "Chitsutha Soomlek", "Khamron Sunat",
  "Thepchai Supnithi", "Carolina Wahlby", "Chitraka Wickramarachchi", "Roshan Yapa",
  "Rui Li", "Purna Gamage", "Jim Polprasert", "Watanee Jearanaiwongkul",
  "Amalka Pinidiyaarachchi", "Hakim Usoof",
];

export const referenceSubcommittees = [
  { name: "Ceremonial", convener: "Dr. Erunika Dayaratne", members: "Isuru Madugalla, Pavithra Basnayake, Rohini Malkanthi" },
  { name: "Fundraising & advertising", convener: "Prof. Roshan Yapa", members: "Hakim Usoof, Prabhath Gunathilake, SMTK Subasinghe, S.G. Amararathna, N. Alagarathanam, Supun Tennakoon, S. Tharsan, Geshani Neelawathura" },
  { name: "Registration", convener: "Dr. Mahasen Dehideniya", members: "Saluka Kodituwakku, Malima Atapattu, Asanka N. Amarasinghe" },
  { name: "Technical programme", convener: "Prof. Saluka Kodituwakku", members: "Rajitha M. Silva, J. Neethini, A.M.T.K. Srimal, D.D.A. Arthanayake" },
  { name: "Logistics", convener: "Dr. Jagath Senarathna", members: "Hakim Usoof, Amalka Pinidiyaarachchi, Jayampathi Herath" },
  { name: "Food", convener: "Dr. Ruwanthini Siyambalapitiya", members: "Sachith Abeysundara" },
];

export const referenceProceedings = [
  { year: "2025", href: "https://link.springer.com/book/10.1007/978-981-95-4409-7" },
  { year: "2024", href: "https://link.springer.com/book/10.1007/978-981-97-9793-6" },
  { year: "2023", href: "https://link.springer.com/book/10.1007/978-981-99-7969-1" },
];
