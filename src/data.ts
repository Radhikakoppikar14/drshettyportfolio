import { primary, directionsUrl } from './locations.ts';

// ONE place for all clinic content and images. Replace the image links with the clinic's own photos
// (save them in /public/images and use e.g. '/images/clinic.jpg').
// Stock photos are requested at HD size (w=1800, q=85); Img adds a responsive srcset on top.
const u = (id: string, w = 1800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
// Real clinic photos: save them in /public/images with these file names. Until a file exists,
// the stock photo after the "|" is shown automatically.
const L = (file: string, stock: string) => `/images/${file}|${stock}`;

export const clinic = {
  brand: 'Svasti',
  full: 'Svasti Heart and Dental Care',
  address: primary.address,
  hours: primary.hours,
  phone: primary.phone,
  tel: primary.tel,
  email: 'info@svasticlinic.com',
  directions: directionsUrl(primary),
};

// Two doctors, two photos: /public/images/doctor-sreekanth.jpg (cardiologist) and /public/images/doctor-chitra.jpg (dentist).
// If a photo is missing, the clinic photo is shown instead of a stock face.
const doctorHeartImg = '/images/doctor-sreekanth.jpg|/images/clinic-front.jpg';
const doctorDentalImg = '/images/doctor-chitra.jpg|/images/clinic-front.jpg';

// Booking form delivery. Paste the Web app URL of the Google Apps Script (see apps-script/Code.gs) between the quotes.
// Once set, the form sends the email (and adds the calendar event) directly, with no Gmail window opening.
// While it is '', the form falls back to opening Gmail with a prefilled message.
export const bookingEndpoint = '';

export const img = {
  clinic: L('clinic-front.jpg', u('photo-1629909613654-28e377c37b09')),
  building: L('clinic-building.jpg', u('photo-1629909613654-28e377c37b09')),
  reception: L('clinic-reception.jpg', u('photo-1629909613654-28e377c37b09')),
  dentalRoom: L('dental-chair.jpg', u('photo-1588776814546-1ffcf47267a5')),
  heartRoom: L('heart-echo.jpg', u('photo-1588776814546-1ffcf47267a5')),
  smile: L('dental-room.jpg', u('photo-1606811841689-23dfddce3e95')),
  consult: L('consultation.jpg', u('photo-1588776814546-1ffcf47267a5')),
  whitening: L('dental-1.jpg', u('photo-1598256989800-fe5f95da9787', 1200)),
  restorative: L('dental-2.jpg', u('photo-1609840114035-3c981b782dfe', 1200)),
  cosmetic: L('dental-3.jpg', u('photo-1576091160399-112ba8d25d1d', 1200)),
  heart: L('heart-room.jpg', u('photo-1579684385127-1ef15d508118')),
  heartB: L('heart-1.jpg', u('photo-1576091160399-112ba8d25d1d', 1200)),
  doctorHeart: doctorHeartImg,
  doctorDental: doctorDentalImg,
};

export type Doctor = {
  name: string;
  role: string;
  creds: string; // qualifications
  exp: string; // years of experience
  bio: string;
  more?: string[]; // extra bio paragraphs shown under bio on the department page
  points: string[];
  image: string;
  // Optional focus point of the photo inside its frame (CSS object-position), e.g. '50% 0%' = keep the top of the head.
  imgPos?: string;
};

export type Dept = {
  key: 'heart' | 'dental';
  label: string;
  eyebrow: string;
  headline: [string, string];
  sub: string;
  heroImg: string;
  heroCard: string;
  highlights: { t: string; i: string }[];
  aboutTitle: [string, string];
  aboutText: string;
  benefits: string[];
  aboutImg: string;
  servicesTitle: string;
  servicesSub: string;
  services: { t: string; d: string; i: string; img: string }[];
  doctor: Doctor;
  // Consulting doctors who also see patients in this department (shown under the main doctor).
  consultants?: Consultant[];
  expTitle: string;
  expText: string;
  exp: { t: string; d: string; i: string }[];
  expImg: string;
  ctaTitle: string;
  ctaText: string;
};

export const dental: Dept = {
  key: 'dental',
  label: 'Dental Care',
  eyebrow: 'DENTAL CARE',
  headline: ['A Healthier Smile.', 'A More Confident You.'],
  sub: 'Personalised dental care that brings together modern techniques, thoughtful attention, and comfort at every step of your smile journey.',
  heroImg: img.smile,
  heroCard: 'Care Designed Around You',
  highlights: [
    { t: 'Patient-Centred Care', i: 'Heart' },
    { t: 'Modern Dental Techniques', i: 'Sparkles' },
    { t: 'Comfortable Experience', i: 'Armchair' },
    { t: 'Personalised Treatment Plans', i: 'ClipboardList' },
  ],
  aboutTitle: ['Thoughtful Care.', 'Beautifully Healthy Smiles.'],
  aboutText: 'At Svasti Dental Care, we believe that great dental care begins with listening. Our approach focuses on understanding your needs, explaining your options clearly, and making every visit as comfortable as possible.',
  benefits: ['Care tailored to your needs.', 'Clear communication at every step.', 'A focus on comfort and long-term oral health.'],
  aboutImg: img.reception,
  servicesTitle: 'Complete Care for Every Smile',
  servicesSub: 'Explore the dental treatments we offer, designed to support your oral health and help you smile with confidence.',
  services: [
    { t: 'General Dentistry', d: 'Routine check-ups, preventive care, and support for everyday oral health.', i: 'Stethoscope', img: img.restorative },
    { t: 'Dental Crowns', d: 'Crowns to protect and restore damaged or weakened teeth.', i: 'ShieldCheck', img: img.cosmetic },
    { t: 'Root Canal Treatment', d: 'RCT to relieve tooth pain and save a badly infected tooth.', i: 'Activity', img: img.whitening },
    { t: 'Braces & TMJ Therapy', d: 'Dental braces fixing, and therapy for jaw joint (TMJ) problems.', i: 'Smile', img: img.consult },
  ],
  doctor: {
    name: 'Dr. Chitra S. Shetty',
    role: 'Dental Surgeon',
    creds: 'BDS',
    exp: '24 years of experience',
    bio: 'Dr. Chitra Shetty is a highly accomplished general dentist with 24 years of clinical excellence and a deep commitment to comprehensive oral healthcare. She trained at the prestigious A.B. Shetty College of Dental Sciences, Mangalore. As the founder and lead dentist of Svasti Heart and Dental Care, she skillfully manages every aspect of the practice, from diagnosis and treatment planning to patient experience and operational excellence, while maintaining the highest standards of care.',
    more: [
      'Before starting Svasti, Dr. Chitra Shetty gained expertise while working at Mallya Hospital and Sakra World Hospital.',
      'Her clinical expertise spans broad areas of preventive, restorative, and aesthetic dentistry. She has a strong foundation in evidence-based dentistry and seamlessly integrates advanced techniques and technology to deliver precise, long-lasting results.',
      'What sets her practice apart is her collaborative model. She has carefully assembled a network of highly skilled visiting specialists across all dental subspecialties, including orthodontics, endodontics, periodontics, oral and maxillofacial surgery, implantology, and pediatric dentistry. This allows her to offer truly comprehensive care under one roof while remaining the central coordinating clinician who ensures continuity and personalized attention for every patient.',
      'Known for her calm demeanor, clear communication, and genuine empathy, Dr. Chitra Shetty has earned the trust of her patients. She combines technical mastery with a warm, patient-centric approach, making even complex dental journeys comfortable and reassuring.',
    ],
    points: [
      'BDS, A.B. Shetty Memorial Institute of Dental Sciences, Mangalore (2002)',
      'Previously at Mallya Hospital and Sakra World Hospital',
      'Preventive, restorative and aesthetic dentistry',
      'Founder and lead dentist, working with a network of visiting specialists',
    ],
    image: img.doctorDental,
    imgPos: '50% 0%',
  },
  expTitle: 'Your Comfort Comes First.',
  expText: 'From your first consultation to your ongoing care, every detail should help you feel informed, comfortable, and confident.',
  exp: [
    { t: 'A welcoming environment', d: 'Calm, bright rooms designed to put you at ease.', i: 'Armchair' },
    { t: 'Clear treatment explanations', d: 'Plain language, so you understand every option.', i: 'MessageCircle' },
    { t: 'Care focused on individual needs', d: 'A plan shaped around you, not a template.', i: 'UserRound' },
  ],
  expImg: img.dentalRoom,
  ctaTitle: 'Ready to Give Your Smile the Care It Deserves?',
  ctaText: 'Take the first step towards a healthier smile. Get in touch to plan your dental visit.',
};

export const heart: Dept = {
  key: 'heart',
  label: 'Heart Care',
  eyebrow: 'HEART CARE',
  headline: ['A Healthier Heart.', 'A More Confident You.'],
  sub: 'Thoughtful cardiac care that brings together careful evaluation, clear explanations, and comfort at every step of your heart-health journey.',
  heroImg: img.heart,
  heroCard: 'Care Designed Around You',
  highlights: [
    { t: 'Patient-Centred Care', i: 'Heart' },
    { t: 'Careful Evaluation', i: 'Activity' },
    { t: 'Comfortable Experience', i: 'Armchair' },
    { t: 'Personalised Care Plans', i: 'ClipboardList' },
  ],
  aboutTitle: ['Attentive Care.', 'Confidently Healthy Hearts.'],
  aboutText: 'At Svasti Heart Care, we believe that great cardiac care begins with listening. Our approach focuses on understanding your concerns, explaining your reports and options clearly, and making every visit as comfortable as possible.',
  benefits: ['Care tailored to your needs.', 'Clear communication at every step.', 'A focus on prevention and long-term heart health.'],
  aboutImg: img.building,
  servicesTitle: 'Complete Care for Every Heart',
  servicesSub: 'Explore cardiac services designed to support your heart health and help you live with confidence.',
  services: [
    { t: 'Cardiac Consultation', d: 'Careful evaluation of symptoms, risk factors, and your medical history.', i: 'Stethoscope', img: img.consult },
    { t: 'Coronary Angioplasty', d: 'Interventional treatment for blocked heart arteries, including complex and emergency cases.', i: 'Activity', img: img.heartB },
    { t: 'Pacemaker & Device Implantation', d: 'Pacemaker, defibrillator and heart failure device implantation.', i: 'HeartPulse', img: img.heart },
    { t: 'Prevention & Lifestyle Care', d: 'Guidance on lifestyle changes to prevent heart disease and stroke.', i: 'ShieldCheck', img: img.heartRoom },
  ],
  doctor: {
    name: 'Dr. Sreekanth B. Shetty',
    role: 'Interventional Cardiologist',
    creds: 'MBBS, MD, DM (Cardiology)',
    exp: '28+ years of experience',
    bio: 'Dr. Sreekanth B. Shetty is an interventional cardiologist with 28+ years of experience. He trained in internal medicine and cardiology in Mumbai, and has worked at leading Bangalore hospitals including Sakra World Hospital and Fortis Hospital. He is a strong proponent of lifestyle changes for preventing heart disease and stroke, and of explaining every option clearly.',
    points: [
      'MD (Internal Medicine), KEM Hospital & Seth GS Medical College, Mumbai (Gold Medallist)',
      'DM (Cardiology), Grant Medical College & J.J. Hospital, Mumbai',
      'Complex coronary angioplasty, pacemaker and device implantation, and vascular interventions',
      'Life member, Cardiological Society of India',
    ],
    image: img.doctorHeart,
  },
  expTitle: 'Your Comfort Comes First.',
  expText: 'From your first consultation to your ongoing care, every detail should help you feel informed, calm, and confident.',
  exp: [
    { t: 'A welcoming environment', d: 'A calm clinic designed to put you at ease.', i: 'Armchair' },
    { t: 'Clear explanations', d: 'Reports and options explained in plain language.', i: 'MessageCircle' },
    { t: 'Care focused on individual needs', d: 'A plan shaped around you and your health.', i: 'UserRound' },
  ],
  expImg: img.heartRoom,
  ctaTitle: 'Ready to Give Your Heart the Care It Deserves?',
  ctaText: 'Take the first step towards better heart health. Get in touch to plan your visit.',
};

// Content for the common home page "Our approach" section (covers both departments).
export const homeExp: Dept = {
  ...dental,
  expTitle: 'One Clinic. Complete Care.',
  expText: 'Whether it is your heart or your smile, every visit should help you feel informed, comfortable, and confident.',
  exp: [
    { t: 'Two specialities, one clinic', d: 'Heart care and dental care under one roof, each with its own dedicated focus.', i: 'ShieldCheck' },
    { t: 'Clear explanations', d: 'Reports, treatments and options explained in plain language.', i: 'MessageCircle' },
    { t: 'Care focused on individual needs', d: 'A plan shaped around you, not a template.', i: 'UserRound' },
  ],
  expImg: img.consult,
};

// ---- Home page (common site for both departments) ----
export const clinicProfile = {
  tagline: 'Caring for your heart and your smile, with careful evaluation, clear explanations, and comfort at every step.',
  bio: 'Svasti Heart and Dental Care brings two specialities together under one roof in HSR Layout: heart care with Dr. Sreekanth B. Shetty and dental care with Dr. Chitra S. Shetty. Every consultation begins with listening, followed by clear explanations and a plan shaped around you.',
  points: [
    'Two specialities, heart and dental, in one clinic.',
    'Time to listen, and clear explanations in plain language.',
    'A focus on prevention, comfort, and long-term health.',
  ],
};

// The two doctors shown on the home page (their details live on each department above).
export const doctors: Dept[] = [heart, dental];

// Consulting doctors shown under the two main doctors on the home page.
// Photos live in /public/images. Dr. Shambhu's file is a placeholder: replace doctor-shambhu.jpg with his portrait.
export type Consultant = {
  name: string;
  role: string;
  creds: string;
  exp?: string;
  points: string[]; // short highlights shown on the card
  bio?: string[]; // full profile text, one string per paragraph (a string starting with '## ' becomes a sub-heading)
  details?: { title: string; items: string[] }[]; // lists such as Education, Memberships, Courses
  image: string;
  imgPos?: string; // focus point of the photo, e.g. '50% 0%'
};

export const consultants: Consultant[] = [
  {
    name: 'Dr. Preetha Peethambar',
    role: 'Pediatric Dentist',
    creds: 'MDS, Pediatric Dentistry',
    exp: 'Former Professor',
    points: [
      'MDS in Pediatric Dentistry, A.B. Shetty Memorial Institute of Dental Sciences, Mangalore (2007)',
      'Dental care for children, including children with special healthcare needs',
      'Served as Professor in Pediatric Dentistry, guiding undergraduate and postgraduate students',
    ],
    bio: [
      'Dr. Preetha Peethambar holds a specialization in Pediatric Dentistry from A.B. Shetty Memorial Institute of Dental Sciences, under Rajiv Gandhi University of Health Sciences, Bangalore. She is a compassionate and dedicated oral healthcare provider committed to promoting children\u2019s dental health, including care for children with special healthcare needs.',
      'With extensive academic experience, she has served as a Professor in Pediatric Dentistry and has successfully guided and mentored numerous undergraduate and postgraduate students in the field.',
      'Has published several scientific papers in the field of Pediatric Dentistry in reputed national and international dental journals.',
    ],
    details: [
      { title: 'Education', items: [
        '2004\u20132007: Master of Dental Surgery (MDS), AB Shetty Memorial Institute of Dental Sciences, Mangalore, India',
        '1997\u20132001: Bachelors of Dental Surgery (BDS), AB Shetty Memorial Institute of Dental Sciences, Mangalore, India',
      ] },
      { title: 'Professional memberships', items: ['Indian Dental Association', 'Indian Society of Pediatric and Preventive Dentistry'] },
      { title: 'Certificate courses', items: [
        'Sedation in Pediatric Dentistry (2024)',
        'Mastering Cosmetic Pediatric Crowns (2018)',
        'Mini residency in Interceptive / Myofunctional Orthodontics (2017)',
        'Pedopathshala: intensive training in Clinical Pediatric Dentistry (2012)',
      ] },
    ],
    image: '/images/doctor-preetha.jpg',
    imgPos: '50% 10%',
  },
  {
    name: 'Dr. Shambhu H. Shivanna',
    role: 'Maxillofacial Prosthodontist, Implantologist & Cosmetic Dentist',
    creds: 'BDS, MDS (Prosthodontics & Implantology)',
    exp: '10+ years placing implants',
    points: [
      'MDS in Prosthodontics & Implantology, JSS Dental College, Mysore (2007)',
      'Complex implant work, including sinus grafting, ridge expansion and nerve repositioning',
      'Digital smile design, crowns, bridges and dentures',
    ],
    bio: [
      'Dr. Shambhu H. Shivanna is a consultant Prosthodontist and Implantologist. He has worked at Narayana Hrudayalaya hospitals and Axiss Dental, and is currently associated with Curaden Dental clinic (formerly Swiss Smile) and more than 25 clinics in Bangalore.',
      'He has more than a decade of experience placing implants, including complex procedures such as sinus grafting, ridge expansion and nerve repositioning. He has rehabilitated patients who lost jaw bone or teeth to tumours, accidents or falls, and routinely does major maxillofacial and cosmetic prosthetic work for patients with facial defects.',
      'He has published several national and international scientific papers.',
    ],
    details: [
      { title: 'Education and training', items: [
        'BDS, Bapuji College of Dental Sciences, Davangere (2000)',
        'MDS in Prosthodontics & Implantology, JSS Dental College, Mysore (2007)',
        'Advanced training in digital smile design under Dr. Eduardo, Spain',
      ] },
      { title: 'Professional memberships', items: ['International Congress of Oral Implantologists (ICOI)', 'Indian Society of Oral Implantologists (ISOI)'] },
      { title: 'Areas of expertise', items: [
        'Prosthodontics and implantology, including crowns, bridges and dentures',
        'Advanced implantology, including immediate and delayed placements',
        'Digital smile design',
        'Basal implantology for immediate tooth replacement',
        'Maxillofacial and cosmetic prosthesis',
        'Geriatric dental care, including removable, complete and fixed prostheses',
        'Complex rehabilitation for patients with severe bone loss',
      ] },
    ],
    image: '/images/doctor-shambhu.jpg',
    imgPos: '50% 0%',
  },
  {
    name: 'Dr. Sri Gowri M',
    role: 'Consultant Oral & Maxillofacial Surgeon & Implantologist',
    creds: 'MDS, FIBOMS',
    exp: '10 years of experience',
    points: [
      'Dental implants, facial trauma and minor oral surgical procedures',
      'Oral pathology, cysts and soft tissue lesions, TMJ disorders, oral cancer screening',
      'Experienced in treating medically compromised and cardiac patients',
    ],
    bio: [
      'Dr. Sri Gowri M is an experienced Oral and Maxillofacial Surgeon with 10 years of clinical expertise in managing a wide range of oral, facial, and maxillofacial conditions. She specializes in facial trauma, oral pathology, dental implants, facial aesthetics, and minor oral surgical procedures, with a patient-centered approach focused on safety and precision.',
      'With extensive experience in hospital-based practice, she is proficient in the management of medically compromised patients, including those with cardiovascular diseases and heart conditions, ensuring comprehensive and coordinated surgical care. She works closely with multidisciplinary teams to provide safe treatment for high-risk patients.',
      'Dr. Sri Gowri is committed to delivering evidence-based, compassionate care while ensuring the highest standards of patient safety and clinical excellence.',
    ],
    details: [
      { title: 'Areas of expertise', items: [
        'Oral and Maxillofacial Surgery',
        'Dental Implantology',
        'Facial Trauma Management',
        'Minor Oral Surgical Procedures',
        'Management of Oral Cysts and Soft Tissue Lesions',
        'TMJ Disorders',
        'Facial Aesthetic Procedures',
        'Management of Medically Compromised & Cardiac Patients',
        'Oral Cancer Screening and Prevention and Treatment including Reconstruction',
      ] },
    ],
    image: '/images/doctor-srigowri.jpg',
    imgPos: '50% 0%',
  },
  {
    name: 'Dr. Prashantha GS',
    role: 'Orthodontist & Invisible Braces Specialist',
    creds: 'M.Ortho RCS (Edinburgh)',
    exp: '20+ years of experience',
    points: [
      'M.Ortho RCS, Royal College of Surgeons of Edinburgh, UK (2005)',
      'Professor and Head, Clinical Orthodontics, M S Ramaiah University of Applied Sciences, Bangalore',
      'Certified in invisible orthodontics (clear aligners)',
    ],
    bio: [
      'Dr Prashantha GS is the Clinical Director and Specialist Orthodontist at Ivory Dental in Bangalore. Dr Prashantha GS has consistently excelled in his academic career and is currently the Professor and Head in the Clinical Orthodontics department at the premiere M S Ramaiah University of Applied Sciences, Bangalore. He has completed M Ortho RCS from the Royal College of Surgeons Edinburgh, UK in 2005. He has also excelled during his under graduate and post graduate training from one of the premier institutes of the country Bapuji Dental College and Hospital.',
      'Dr Prashantha GS is an excellent clinician and is extremely popular among his patients. He has conducted several hands on courses on MBT treatment mechanics and surgical Orthodontics. He is specially trained and certified in Invisible orthodontics / clear aligners.',
      'Dr. Prashantha GS is extremely passionate about his patients and giving them the smile they deserve. His compassion and genuine affection for his patients doesn\u2019t go unnoticed. He has over 20 years of experience in orthodontics treating over hundreds of patients to their satisfaction.',
    ],
    image: '/images/doctor-prashantha.jpg',
    imgPos: '50% 10%',
  },
  {
    name: 'Dr. Rajesh A',
    role: 'Periodontist & Implantologist',
    creds: 'MDS (Periodontics), BDS',
    exp: '18+ years of experience',
    points: [
      'MDS in Periodontics, Saveetha Dental College, Chennai (2008)',
      'Laser periodontal therapy and conventional surgical gum therapy',
      'Consultant for over a decade at Narayana Health and Axis Dental',
    ],
    bio: [
      'MDS (Periodontics) | BDS | Laser Specialist',
      'Dr. Rajesh is a distinguished Periodontist and Implantologist with over 18 years of specialized experience in gum care and oral rehabilitation.',
      '## A Foundation of Excellence',
      'Dr. Rajesh began his dental journey at the renowned College of Dental Sciences, Davangere, graduating in 2004. He went on to pursue a Master\u2019s in Periodontics at the prestigious Saveetha Dental College, Chennai, completing the program in 2008. This rigorous academic background laid the groundwork for a career defined by clinical precision and patient-focused care.',
      '## Experience & Expertise',
      'Before establishing Shree Dental Square, Dr. Rajesh served as a consultant for over a decade at leading healthcare institutions, including Narayana Health and Axis Dental.',
      '## Philosophy: The Right Treatment at the Right Time',
      'Dr. Rajesh is one of the few specialists who advocates for a balanced approach to gum health. While highly skilled in modern Laser Periodontal Therapy for painless, minimally invasive treatment, he also possesses deep expertise in Conventional Surgical Therapy.',
      'Dr. Rajesh believes that technology should support, not replace, clinical judgment. He carefully evaluates every case to determine whether a patient needs the gentle touch of a laser or the structural correction of traditional surgery\u2014ensuring the most effective, long-lasting results for every smile.',
    ],
    image: '/images/doctor-rajesh.jpg',
    imgPos: '50% 5%',
  },
];

// All are dental specialists, so they also appear on the Dental Care page.
dental.consultants = consultants;