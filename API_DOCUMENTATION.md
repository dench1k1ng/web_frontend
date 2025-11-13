# API Documentation for HRMS Web Application

## Overview
This HRMS web application uses several APIs to provide dynamic content and functionality. Here's a detailed breakdown of all APIs used in the project:

## 1. Weather API
**Purpose**: Display current weather information on the dashboard
**Implementation**: Mock data with fallback to real weather API
**Status**: Currently using mock data for demonstration

```javascript
// Mock weather data structure:
{
    location: "Your City",
    temperature: "22°C",
    description: "Partly Cloudy",
    humidity: "65%",
    windSpeed: "12 km/h"
}
```

**Real API Integration**: The code is prepared to integrate with OpenWeatherMap API or similar services.

## 2. News API
**Purpose**: Display HR-related news and articles with category filtering
**Implementation**: Mock data organized by categories (Business, Technology, Health)
**Status**: Currently using comprehensive mock data

```javascript
// Categories supported:
- all: Shows all articles from all categories
- business: HR and business-related news
- technology: HR technology and AI recruitment news  
- health: Employee wellness and workplace health news
```

**Features**:
- Category-based filtering (All, Business, Technology, Health)
- Date-based sorting (newest first)
- Responsive news cards with images

## 3. Quotes API
**Purpose**: Display inspirational quotes on the dashboard
**Implementation**: Real API integration with quotable.io
**Status**: ✅ Fully functional with live data

```javascript
// API Endpoint: https://api.quotable.io/quotes/random
// Response structure:
{
    content: "Quote text",
    author: "Author name"
}
```

**Features**:
- Random inspirational quotes
- Error handling with fallback quotes
- Automatic refresh capability

## 4. Local Storage API
**Purpose**: Store user preferences, authentication tokens, and favorites
**Implementation**: Browser's built-in localStorage
**Status**: ✅ Fully functional

**Data Stored**:
- User authentication status and tokens
- Theme preferences (dark/light mode)
- Favorite job listings
- User profile information

```javascript
// Storage keys used:
- hrms_auth_token: User authentication token
- hrms_user: User profile data
- hrms_theme: Theme preference
- hrms_favorites: Array of favorite job titles
```

## 5. Authentication API
**Purpose**: Handle user registration, login, and session management
**Implementation**: Custom client-side authentication system
**Status**: ✅ Mock implementation for demonstration

**Features**:
- User registration with validation
- Login/logout functionality
- Password strength requirements
- Email format validation
- Session persistence

## API Integration Strategy

### Development vs Production
- **Development**: Using mock data for stable demonstration
- **Production Ready**: All API endpoints are structured to easily switch to real services

### Error Handling
All APIs include comprehensive error handling:
- Network failure fallbacks
- Loading states with spinners
- User-friendly error messages
- Graceful degradation

### Performance Optimization
- Async/await for non-blocking requests
- Caching for frequently requested data
- Pagination for large datasets
- Lazy loading for images

## Future API Integrations

### Planned Real API Integrations:
1. **Weather API**: OpenWeatherMap or AccuWeather
2. **News API**: NewsAPI.org or similar HR news aggregator
3. **Job Board API**: Indeed, LinkedIn, or custom HR system
4. **Authentication API**: Firebase Auth, Auth0, or custom backend
5. **Analytics API**: Google Analytics or custom tracking

### Configuration for Real APIs:
```javascript
// Environment configuration (to be added)
const API_CONFIG = {
    weather: {
        apiKey: 'YOUR_WEATHER_API_KEY',
        baseUrl: 'https://api.openweathermap.org/data/2.5'
    },
    news: {
        apiKey: 'YOUR_NEWS_API_KEY',
        baseUrl: 'https://newsapi.org/v2'
    }
};
```

## Security Considerations
- API keys should be stored securely (environment variables)
- Authentication tokens are handled securely
- Input validation on all user data
- HTTPS required for all API calls in production

## Testing
- All API functions include error handling
- Mock data ensures consistent testing
- Fallback mechanisms for API failures
- Loading states for better UX

---

**Note**: This application is currently set up with mock data for demonstration purposes, but is architected to easily integrate with real APIs when needed for production deployment.
