export const POPULAR_CITIES = [
  "Lucknow",
  "Ayodhya",
  "Agra",
  "Bareilly",
  "Varanasi",
  "Prayagraj",
  "Vrindavan",
  "Chitrakoot",
  "Kanpur",
  "Sitapur",
];

export const CITY_PRIORITY = [
  "Lucknow",
  "Agra",
  "Bareilly",
  "Prayagraj",
];

export const PROPERTY_CATEGORY_COLORS = {
  1: '#1FCC75',
  2: '#5b0f57',
  3: '#E91E63',
  4: '#FF9800',
  5: '#FF9800'
}

// export const BOOKING_STATUS = {
//   1: "Confirm Booking",
//   2: "Checked In",
//   3: "Checked Out",
//   4: "Cancelled",
//   5: "No-Show",
//   7: "Rejected",
//   8: "Pending",
// };

export const BOOKING_STATUS = {
  1: { label: "Confirm Booking", color: "#27ae60", bg: "#eafaf1" },
  2: { label: "Checked In", color: "#0c64e7ff", bg: "#e3f0ffff" },
  3: { label: "Checked Out", color: "#424242", bg: "#eeeeeeff" },
  4: { label: "Cancelled", color: "#D32F2F", bg: "#ffe5e5ff" },
  5: { label: "No-Show", color: "#F57C00", bg: "#fff4e8ff" },
  7: { label: "Rejected", color: "#C62828", bg: "#ffe5e5ff" },
  8: { label: "Pending", color: "#ED6C02", bg: "#ffefe3ff" },
};


export const FOOD_PLAN = {
  0: 'EP',
  1: 'CP',
  2: 'AP',
  3: 'MAP',
};

export const FOOD_ORDER_STATUS = {
  0: { label: 'Order Pending', color: '#F59E0B' },
  1: { label: 'Accepted by Kitchen', color: '#3B82F6' },
  2: { label: 'Food is Ready', color: '#10B981' },
  3: { label: 'Delivered', color: '#22C55E' },
  4: { label: 'Cancelled', color: '#EF4444' }
};

export const PAYMENT_STATUS = {
  0: 'Pay at Hotel',
  1: 'Partial Payment',
  3: 'Fully Paid'
}

export const PAYMENT_STATUS_COLOR = {
  0: '#0518e8',
  1: '#fcb00a',
  3: '#02ba33'
}

export const TRAVEL_OPTIONS = [
  {
    title: "Business Travel",
    subtitle: "",
    id: 2,
    img: 'https://rrooms.in/static/media/img-business-travel.6ffe8a65244be43ceedf.png',
  },
  {
    title: "Couple Friendly",
    subtitle: "",
    id: 7,
    img: 'https://rrooms.in/static/media/img-couple-friendly.c940fa7995ee210119be.png',
  },
  {
    title: "Family Vacation",
    subtitle: "",
    id: 3,
    img: 'https://rrooms.in/static/media/img-family-vacation.9587ab26f28862025eaf.png',
  },
  {
    title: "Group Travel",
    subtitle: "",
    id: 5,
    img: 'https://rrooms.in/static/media/img-group-travel.e0c9c2134adfd8d700a7.png',
  },
  {
    title: "Solo Traveler",
    subtitle: "",
    id: 6,
    img: 'https://rrooms.in/static/media/img-solo-travel.1db8332c264f13bf9452.png',
  },
  {
    title: "Hourly-Stays",
    subtitle: "",
    id: 8,
    img: 'https://rrooms.in/static/media/img-hourly-stay.f6e68a2fa6f02779027d.jpeg',
  },
]

export const propertyPolicy = [
  "Unmarried Couples above 18 years allowed.",
  "Unmarried Couples above 18 years not allowed.",
  "Local ID accepted.",
  "Local ID not accepted.",
  "No cancellation charges before 24hrs of hotel check-in And within 15 min of same day.",
  "Only Indian residents & NRIs with Indian ID can check in.",
];

export const restrictionPolicy = [
  "Guests can check in using any one of the following original ID proofs - Passport, Adhaar Card, Driving Licence, Voter ID",
  "Softcopy of ID proofs not accepted.",
];

export const cancellationPolicy = [
  "Refund will be provided only if cancellation is done 24 hours prior to selected check-in time.",
  "In case booking has been done within 24 hours of check-in time, the refund will be provided only if the booking is cancelled within 15 minutes from the time of booking.",
  "There will be no refund, If you do not show up at the hotel.",
  "There will be no refund if you decide to cancel the booking in the middle of your stay.",
  "If eligible, refund will be initiated, which will reflect in your account within 5-7 business days."
];