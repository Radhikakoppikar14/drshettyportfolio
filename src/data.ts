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
  email: 'info@drshettyclinic.com', // demo email - replace with the clinic's real email
  directions: directionsUrl(primary),
};

// Two doctors, two photos: /public/images/doctor-sreekanth.jpg (cardiologist) and /public/images/doctor-chitra.jpg (dentist).
// If a photo is missing, the clinic photo is shown instead of a stock face.
const doctorHeartImg = '/images/doctor-sreekanth.jpg|/images/clinic-front.jpg';
const doctorDentalImg = '/images/doctor-chitra.jpg|/images/clinic-front.jpg';

// Booking / inquiry form delivery. Leave '' to let the visitor send the request by email (prefilled with
// department, treatment, name, phone, date and message). To receive requests directly, put the URL of a form
// service or your own API here: the form then POSTs the same fields as JSON.
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
    exp: 'About 25 years of experience',
    bio: 'Dr. Chitra S. Shetty is a dental surgeon practising at Svasti Heart and Dental Care in HSR Layout, with about 25 years of experience. Her approach to dentistry starts with listening: every visit is built around your comfort, with clear explanations of your options before any treatment begins.',
    points: [
      'BDS, A.B. Shetty Memorial Institute of Dental Sciences (2002)',
      'General dentistry, dental crowns and root canal treatment (RCT)',
      'Dental braces fixing and TMJ therapy',
      'Focus on comfort and long-term oral health',
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