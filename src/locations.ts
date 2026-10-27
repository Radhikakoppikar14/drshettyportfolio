// All clinic locations in one file. To add another branch, add another object to the list.
export type Location = {
  id: string;
  name: string;
  address: string;
  hours: string;
  phone: string;
  tel: string;
  mapQuery: string; // used for the embedded map and the directions link
};

export const locations: Location[] = [
  {
    id: 'hsr-layout',
    name: 'Svasti Heart and Dental Care – HSR Layout',
    address: 'Sector 1, HSR Layout, Bengaluru',
    hours: 'Mon–Sat: 9:00 AM – 8:30 PM',
    phone: '+91 80 2572 8999',
    tel: 'tel:+918025728999',
    mapQuery: 'Svasti Heart And Dental Care, 2062, 23rd Main Rd, Vanganahalli, 1st Sector, HSR Layout, Bengaluru, Karnataka 560102',
  },
];

export const primary = locations[0];
export const embedUrl = (l: Location) => `https://www.google.com/maps?q=${encodeURIComponent(l.mapQuery)}&output=embed`;
export const directionsUrl = (l: Location) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.mapQuery)}`;