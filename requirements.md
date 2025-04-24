# Full-Stack TypeScript Application Requirements

## Application Architecture

### Backend Structure
1. **Controllers Layer**
   - Responsible for handling HTTP requests and responses
   - Contains controller modules for different domains (auth, hello)
   - Maps routes to business logic in services

2. **Services Layer**
   - Implements business logic
   - Abstracts data access operations
   - Handles validation and business rules

3. **Data Access Layer**
   - Manages data storage and retrieval
   - Abstracts the underlying data storage mechanism (YAML files)
   - Provides a clean interface for services to interact with data

4. **Type Definitions**
   - Provides TypeScript interfaces for data structures
   - Ensures type safety throughout the application
   - Facilitates documentation and code understanding

### Frontend Structure
1. **Components**
   - Reusable UI elements (Header, Dashboard Items, etc.)
   - Self-contained with their own styling
   - Follows component-based architecture principles

2. **Hooks**
   - Custom React hooks for shared functionality
   - Manages authentication state and other cross-cutting concerns

3. **Types**
   - TypeScript interfaces for data structures and props
   - Ensures type safety and improves developer experience

## User Story: Login Authentication

### Description
As a user, I want to authenticate with a username and password before accessing the application features.

### Detailed Requirements

#### Frontend
1. Login page with Odido branding
   - Form with username and password fields
   - Sign-in button
   - Register link (non-functional in this version)
   - Copyright details link (non-functional in this version)
2. Error handling
   - Display error message for invalid credentials
   - Show loading state during authentication
3. Authenticated state
   - Store authentication status in local storage
   - Redirect to main app after successful login
   - Display username in the main app
   - Provide logout functionality

#### Backend
1. Authentication API
   - POST `/api/login`: Validates user credentials
   - GET `/api/users/:username`: Returns user information
2. User data storage
   - Users stored in `data/users.yaml` file
   - Each user has username and password fields
   - Data access layer abstracts YAML file operations
3. Response Format
   - JSON object with `success` and `message` fields
   - User data included in successful responses

#### Non-Functional Requirements
1. Visual Design
   - Background color: #FFF0D7
   - Label color: #FF924E
   - Responsive design for different screen sizes

## User Story: Shared Header Component

### Description
As a developer, I want to have a reusable header component that can be shared across different pages of the application.

### Detailed Requirements

#### UI Components
1. Header Container
   - Background color: #FFF0D7
   - Fixed position at the top of all pages
   - Consistent visual style across the application
2. Header Content
   - Menu button on the left side (hamburger icon)
   - Page title (e.g., "My dashboard")
   - Logout button positioned on the right
   - User avatar on the far right
3. Interaction
   - Hover animations for interactive elements
   - Logout functionality accessible from any page
   - Consistent positioning and styling

#### Implementation Details
1. Reusable React Component
   - Accepts props for username and logout function
   - Self-contained styling
   - Designed for easy integration with different pages
2. Responsive Design
   - Adapts to different screen sizes
   - Maintains usability on mobile devices

## User Story: Dashboard Layout

### Description
As an authenticated user, I want to see a dashboard with various service options organized in a grid layout.

### Detailed Requirements

#### UI Components
1. Header (uses shared Header component)
   - Menu button
   - "My dashboard" title
   - Logout button
   - User avatar
2. Dashboard grid
   - Six card items in a 2x3 grid layout
   - Each card with icon, title, and description
   - Card background color: #EEF3FF
3. Cards include:
   - Promotions: Find best suitable promotions for your needs
   - Raise a query: Having a trouble? Raise a query to our service desk
   - Policies: Get detailed information about policies in Odido
   - Benefits: Get detailed information about policies in Odido
   - Two placeholder cards with "Title" and Lorem ipsum text
4. Chat button
   - Fixed position in bottom-right corner
   - Circular button with message icon
   - Background color: #FFAE7C

#### Data Structure
1. Dashboard items defined with:
   - ID for unique identification
   - Title for display
   - Description text
   - Icon identifier

#### Non-Functional Requirements
1. Responsive design
   - Single column layout on smaller screens
   - Two-column grid on larger screens
2. Visual consistency
   - Consistent spacing and alignment
   - Common color scheme across the application
3. Animation
   - Hover effects for interactive elements
   - Smooth transitions for better user experience

## User Story: Hello Button Functionality

### Description
As an authenticated user, I want to click a "Hello" button on the webpage and receive a greeting from the backend server.

### Detailed Requirements

#### Frontend
1. Single page web application using React and TypeScript
2. UI Components:
   - Main page with a centered "Hello" button
   - Area to display the response from the backend
3. Button Interaction:
   - On click, the button should trigger an API call to the backend
   - Display loading state while waiting for the response
   - Show the response text when received from the backend

#### Backend
1. Node.js server with TypeScript
2. API Endpoints:
   - GET `/api/hello`: Returns a JSON response with a greeting message
3. Response Format:
   - JSON object with a `message` field containing the greeting string

#### Data Flow
1. User logs in with valid credentials
2. After successful authentication, user sees the Hello button
3. User clicks the "Hello" button on the frontend
4. Frontend sends a GET request to the backend endpoint `/api/hello`
5. Backend processes the request and returns a greeting message
6. Frontend displays the received message to the user

#### Non-Functional Requirements
1. Type safety throughout the application using TypeScript
2. Proper error handling for API requests
3. Responsive design for different screen sizes 