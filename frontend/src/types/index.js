// Event interface definition (for reference)
// export interface Event {
//   id: string;
//   event_name: string;
//   location_zip: string;
//   location: string;
//   date: string;
//   time: string;
//   language: string;
//   instructor?: string;
//   type: 'Workshop' | 'Drop-in Help' | 'Seminar';
//   description?: string;
//   spotsRemaining: number;
//   maxCapacity: number;
// }

// FilterState interface definition (for reference)
// export interface FilterState {
//   zipCode: string;
//   eventType: string;
//   language: string;
//   dateRange: {
//     start: string;
//     end: string;
//   };
// }

// These are now just JavaScript objects - no type checking needed
export const EventTypes = {
  WORKSHOP: 'Workshop',
  DROP_IN_HELP: 'Drop-in Help',
  SEMINAR: 'Seminar'
};

export const Languages = {
  ENGLISH: 'English',
  SPANISH: 'Spanish',
  MANDARIN: 'Mandarin',
  FRENCH: 'French',
  KOREAN: 'Korean'
};
