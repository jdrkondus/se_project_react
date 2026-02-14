# WTWR (What to Wear?): Front End

## Description

WTWR is a responsive web application that helps users decide what to wear based on current weather conditions. The app provides personalized clothing recommendations and allows users to manage their wardrobe, like/unlike items, and interact with a community of clothing suggestions.

This frontend application is built with React and communicates with a RESTful API backend to provide user authentication, clothing item management, and real-time weather data integration.

## Features

- **Weather-Based Recommendations**: Get clothing suggestions based on real-time weather data
- **User Authentication**: Secure sign up, login, and logout functionality with JWT tokens
- **Personal Wardrobe**: Add, view, and delete your own clothing items
- **Like System**: Like and unlike clothing items with persistent counts
- **User Profiles**: View and edit your profile information and avatar
- **Responsive Design**: Fully responsive interface that works on desktop and mobile devices
- **Temperature Toggle**: Switch between Fahrenheit and Celsius temperature units
- **Protected Routes**: Secure pages that require authentication to access
- **Delete Confirmation**: Safety modal to prevent accidental item deletion

## Technologies and Techniques

### Frontend Framework
- **React** (v18.3.1) - JavaScript library for building user interfaces with component-based architecture
- **React Router DOM** (v6.30.3) - Client-side routing for single-page application navigation

### Build Tools
- **Vite** (v7.3.0) - Next-generation frontend build tool with fast hot module replacement
- **ESLint** (v8.57.0) - JavaScript linter for code quality and consistency

### Development Tools
- **@vitejs/plugin-react** (v4.3.1) - Official React plugin for Vite with Fast Refresh support
- **ESLint Plugins** - React-specific linting rules for hooks and best practices

### State Management & Hooks
- **React Context API** - Global state management for user data and temperature units
- **Custom Hooks** - Reusable form validation and state management logic
- **useState & useEffect** - React hooks for component state and lifecycle management

### API Integration
- **Fetch API** - RESTful API calls to backend server
- **JWT Authentication** - Token-based authentication stored in localStorage
- **CORS** - Cross-Origin Resource Sharing for API communication

### Styling
- **CSS3** - Custom styling with modern CSS features
- **CSS Modules** - Component-scoped styling
- **Custom Fonts** - Cabinet Grotesk font family for typography
- **Responsive Design** - Mobile-first approach with flexible layouts

### Project Architecture
- **Component-Based Structure** - Modular, reusable React components
- **Protected Routes** - Authentication-required page protection
- **Context Providers** - Centralized state management
- **Modal System** - Reusable modal components for forms and confirmations
- **Custom Validation** - Client-side form validation

## Project Structure

```
src/
├── components/          # React components
│   ├── App/            # Main application component
│   ├── Header/         # Navigation header
│   ├── Main/           # Main content area
│   ├── Profile/        # User profile page
│   ├── ItemCard/       # Clothing item card with like button
│   ├── ItemModal/      # Item detail modal
│   ├── ModalWithForm/  # Reusable form modal
│   ├── AddItemModal/   # Add new item form
│   ├── LoginModal/     # Login form
│   ├── RegisterModal/  # Registration form
│   ├── EditProfileModal/ # Profile editing form
│   ├── DeleteConfirmationModal/ # Delete confirmation dialog
│   ├── ClothesSection/ # User's wardrobe display
│   ├── WeatherCard/    # Weather information display
│   ├── ToggleSwitch/   # Temperature unit toggle
│   └── ProtectedRoute/ # Authentication guard component
├── contexts/           # React Context providers
│   ├── CurrentUserContext.js
│   └── CurrentTemperatureUnitContext.js
├── hooks/              # Custom React hooks
│   └── useForm.js
├── utils/              # Utility functions
│   ├── api.js          # Backend API calls
│   ├── auth.js         # Authentication functions
│   ├── weatherApi.js   # Weather API integration
│   └── constants.js
├── assets/             # Images, icons, SVGs
└── vendor/             # Third-party styles and fonts
```

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/jdrkondus/se_project_react.git
cd se_project_react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open in your browser at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Lint Code

```bash
npm run lint
```

## API Configuration

The app connects to different API endpoints based on the environment:

- **Development**: `http://localhost:3001`
- **Production**: `https://api.wtwrwardrobe.ufodns.com`

The environment is automatically detected using `process.env.NODE_ENV`.

## Links

- **Backend Repository**: [WTWR Backend](https://github.com/jdrkondus/se_project_express.git)
- **Live Site**: [WTWR App](https://wtwrwardrobe.ufodns.com)

## Project Pitch Video

Check out [this video](https://www.loom.com/share/3ef3f6f814cf423dbe016d251f63ea01), where I describe my project and some challenges I faced while building it. 
