// Mock event data
const mockEvents = [
  {
    id: '1',
    event_name: 'Intro to Email Basics',
    location_zip: '94306',
    location: 'Palo Alto Community Center',
    date: '2025-02-15',
    time: '10:00',
    language: 'English',
    instructor: 'Jane Lee',
    type: 'Workshop',
    description: 'Learn the fundamentals of email: sending, receiving, organizing, and staying safe online.',
    spotsRemaining: 8,
    maxCapacity: 15
  },
  {
    id: '2',
    event_name: 'Smartphone Navigation Help',
    location_zip: '94301',
    location: 'Stanford Senior Center',
    date: '2025-02-18',
    time: '14:00',
    language: 'English',
    instructor: 'Michael Chen',
    type: 'Drop-in Help',
    description: 'Get personalized help with your smartphone. Bring your device and questions!',
    spotsRemaining: 3,
    maxCapacity: 10
  },
  {
    id: '3',
    event_name: 'Social Media Safety Seminar',
    location_zip: '94305',
    location: 'Mitchell Park Library',
    date: '2025-02-20',
    time: '15:30',
    language: 'Spanish',
    instructor: 'Maria Rodriguez',
    type: 'Seminar',
    description: 'Aprenda a usar las redes sociales de forma segura y cómo proteger su información personal.',
    spotsRemaining: 12,
    maxCapacity: 20
  },
  {
    id: '4',
    event_name: 'Video Chat with Family',
    location_zip: '94306',
    location: 'Palo Alto Community Center',
    date: '2025-02-22',
    time: '11:00',
    language: 'English',
    instructor: 'Sarah Johnson',
    type: 'Workshop',
    description: 'Master video calling apps like Zoom, FaceTime, and WhatsApp to stay connected with loved ones.',
    spotsRemaining: 6,
    maxCapacity: 12
  },
  {
    id: '5',
    event_name: 'Online Banking Basics',
    location_zip: '94301',
    location: 'Stanford Senior Center',
    date: '2025-02-25',
    time: '10:30',
    language: 'English',
    instructor: 'David Kim',
    type: 'Seminar',
    description: 'Learn how to safely manage your finances online, check balances, and pay bills securely.',
    spotsRemaining: 0,
    maxCapacity: 18
  },
  {
    id: '6',
    event_name: 'Digital Photo Organization',
    location_zip: '94302',
    location: 'Menlo Park Library',
    date: '2025-02-28',
    time: '13:00',
    language: 'Mandarin',
    instructor: 'Lisa Wang',
    type: 'Workshop',
    description: '学习如何整理和管理您的数字照片，创建相册并与家人分享。',
    spotsRemaining: 9,
    maxCapacity: 15
  },
  {
    id: '7',
    event_name: 'Internet Shopping Safety',
    location_zip: '94304',
    location: 'East Palo Alto Senior Center',
    date: '2025-03-02',
    time: '14:30',
    language: 'English',
    instructor: 'Robert Martinez',
    type: 'Seminar',
    description: 'Learn to shop online safely, avoid scams, and protect your financial information.',
    spotsRemaining: 15,
    maxCapacity: 25
  },
  {
    id: '8',
    event_name: 'Tech Troubleshooting Drop-in',
    location_zip: '94306',
    location: 'Palo Alto Community Center',
    date: '2025-03-05',
    time: '16:00',
    language: 'English',
    instructor: 'Emma Thompson',
    type: 'Drop-in Help',
    description: 'Bring any tech device or question! Our student volunteers will help you troubleshoot.',
    spotsRemaining: 7,
    maxCapacity: 10
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const eventApi = {
  async getAllEvents() {
    await delay(500);
    return mockEvents;
  },

  async filterEvents(filters) {
    await delay(300);

    let filtered = [...mockEvents];

    if (filters.zipCode) {
      filtered = filtered.filter(event =>
        event.location_zip.includes(filters.zipCode)
      );
    }

    if (filters.eventType) {
      filtered = filtered.filter(event =>
        event.type === filters.eventType
      );
    }

    if (filters.language) {
      filtered = filtered.filter(event =>
        event.language === filters.language
      );
    }

    if (filters.dateRange.start) {
      filtered = filtered.filter(event =>
        new Date(event.date) >= new Date(filters.dateRange.start)
      );
    }

    if (filters.dateRange.end) {
      filtered = filtered.filter(event =>
        new Date(event.date) <= new Date(filters.dateRange.end)
      );
    }

    return filtered;
  }
};

