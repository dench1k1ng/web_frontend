# jQuery Assignment #7 - README

## Assignment Overview
This project demonstrates the implementation of jQuery selectors, effects, animations, and DOM manipulation as required for Assignment #7.

## Student Information
- **Student**: Denis Shin
- **Group**: SE-2434

## Project Structure
```
web_frontend/
├── index.html          # Main HTML file with all tasks
├── styles.css          # CSS styling for all tasks
├── script.js           # jQuery implementation for all tasks
├── tasks/              # Individual task files for reference
│   ├── task0-setup.html
│   ├── task1-selectors.html
│   ├── task2-visibility.html
│   ├── task3-fade.html
│   ├── task4-slide.html
│   ├── task5-dom.html
│   ├── task6-attributes.html
│   ├── task7-forms.html
│   ├── task8-basic-animation.html
│   ├── task9-sequential.html
│   ├── task10-combined.html
│   └── task11-gallery.html
└── README.md           # This file
```

## Tasks Completed

### Part 1: Getting Started with jQuery

#### Task 0: Setup ✅
- Included jQuery from CDN (https://code.jquery.com/jquery-3.6.0.min.js)
- Implemented $(document).ready() function
- Console message "jQuery is ready!" displays on page load

#### Task 1: Selectors & CSS ✅
- Element selection by ID: `#demo-id`
- Element selection by class: `.demo-class`
- Element selection by tag: `h3`
- Content manipulation with `.text()` and `.html()`
- Dynamic styling with `.css()`

### Part 2: jQuery Effects

#### Task 2: Visibility Methods ✅
- Implemented `.hide()`, `.show()`, and `.toggle()`
- Interactive buttons for each visibility method
- Smooth animation transitions (500ms duration)

#### Task 3: Fade Methods ✅
- Image with `.fadeIn()`, `.fadeOut()`, and `.fadeToggle()`
- 1000ms animation duration for smooth effects
- Interactive button controls

#### Task 4: Slide Methods ✅
- Collapsible panel with `.slideUp()`, `.slideDown()`, and `.slideToggle()`
- 600ms animation duration
- Multiple control buttons for demonstration

### Part 3: DOM Manipulation with jQuery

#### Task 5: Add & Remove Elements ✅
- Dynamic list manipulation with `.append()`, `.prepend()`, and `.remove()`
- "Add Item", "Remove Item", and "Prepend Item" functionality
- Animation effects on element addition/removal

#### Task 6: Modifying Attributes ✅
- Dynamic image source changes using `.attr()`
- Dynamic link href and text modifications
- Fade transitions between attribute changes

#### Task 7: Form Interaction ✅
- Live input display using `.val()` and `.text()`
- Real-time updates for Name and Email fields
- Interactive form styling with focus effects

### Part 4: Animations

#### Task 8: Basic Animation ✅
- Square div animation using `.animate()`
- Size and position changes
- Reset functionality for repeated demonstrations

#### Task 9: Sequential Animations ✅
- Multi-step animation sequence:
  1. Move right
  2. Move down
  3. Shrink size
  4. Return to original position
- Chained `.animate()` calls for sequential execution

#### Task 10: Combined Animation ✅
- Single `.animate()` call combining:
  - Opacity changes
  - Size modifications
  - Position movement
  - Border radius transformation
- Completion callback for return animation

### Part 5: Mini Project

#### Task 11: Interactive Image Gallery ✅
- Thumbnail grid with hover effects
- Large image display area
- Click functionality to change main image
- Fade transitions between images
- Active state highlighting for selected thumbnail
- Bounce animation effects

## Technical Features

### jQuery Methods Used
- **Selectors**: `#id`, `.class`, `tag`
- **Effects**: `.hide()`, `.show()`, `.toggle()`, `.fadeIn()`, `.fadeOut()`, `.fadeToggle()`, `.slideUp()`, `.slideDown()`, `.slideToggle()`
- **DOM Manipulation**: `.append()`, `.prepend()`, `.remove()`, `.text()`, `.html()`, `.attr()`, `.val()`
- **Animations**: `.animate()`, `.stop()`, `.fadeTo()`
- **Events**: `.click()`, `.hover()`, `.focus()`, `.blur()`, `.on()`
- **CSS**: `.css()`, `.addClass()`, `.removeClass()`

### Additional Features
- Responsive design with CSS Grid and Flexbox
- Smooth scrolling navigation
- Interactive hover effects
- Console logging for debugging
- Modern gradient backgrounds and styling
- Cross-browser compatibility

## How to Run
1. Open `index.html` in a web browser
2. All tasks are demonstrated on a single page
3. Use the navigation menu to jump to specific tasks
4. Interact with buttons and form elements to see jQuery effects

## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge

## jQuery Version
- jQuery 3.6.0 (loaded from CDN)

## Assignment Requirements Met
- ✅ Setup & Selectors (5%)
- ✅ Effects (10%)
- ✅ DOM Manipulation (10%)
- ✅ Animations (10%)
- ✅ Mini Project (10%)
- ✅ Code Quality and Organization

## Additional Resources Used
1. jQuery Official Documentation (https://api.jquery.com)
2. W3Schools jQuery Tutorial
3. CSS3 animations and transitions
4. Modern web design principles
