# TMK Event Locator - Tech Me Kid

A modern, responsive web application for finding Tech Me Kid events near you. This platform connects senior citizens with student-led digital education programs, workshops, and seminars.

## 🌟 Features

- **Event Discovery**: Browse workshops, drop-in help sessions, and seminars
- **Advanced Filtering**: Search by zip code, event type, language, and date range
- **Interactive Map View**: Visual representation of event locations (Google Maps integration)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Multi-language Support**: Events available in English, Spanish, Mandarin, French, and Korean
- **Real-time Availability**: Live updates on registration spots and waitlists

## 🎯 Mission

Tech Me Kid is a student-led nonprofit dedicated to empowering senior citizens to become confident digital citizens. We bridge the generational gap by connecting passionate student volunteers with seniors, providing life-changing tech education that fosters independence and connection in the digital age.

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd tmk-event-locator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Built With

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Google Maps API** - Interactive map functionality


## 🎨 Design Features

- **Modern UI/UX**: Clean, accessible design with smooth animations
- **Gradient Themes**: Blue-to-green gradient branding throughout
- **Responsive Layout**: Mobile-first design approach
- **Interactive Elements**: Hover states, transitions, and micro-interactions
- **Accessibility**: Proper contrast ratios and semantic HTML

## 📊 Event Types

- **Workshops**: Hands-on learning sessions (Email basics, Video calling, etc.)
- **Drop-in Help**: Personalized tech support sessions
- **Seminars**: Educational presentations on digital safety and skills

## 🌍 Supported Languages

- English 🇺🇸
- Spanish 🇪🇸
- Mandarin 🇨🇳
- French 🇫🇷
- Korean 🇰🇷

## 🗺️ Map Integration

The application includes Google Maps integration for visualizing event locations. To enable map functionality:

1. Obtain a Google Maps API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Replace `YOUR_API_KEY_HERE` in `src/components/MapView.jsx` with your actual API key

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Components

### EventDashboard
Main page component that orchestrates the entire application, handling state management for filters and event data.

### EventCard
Displays individual event information with course-specific images, registration status, and detailed information.

### MapView
Interactive Google Maps component showing event locations with custom markers and popup details.

### AnimatedHeader
Hero section with background image, navigation, and call-to-action buttons.




**Made with ❤️ by AI Interns at Tech Me Kid**
