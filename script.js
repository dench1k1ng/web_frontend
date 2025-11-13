// HRMS Application JavaScript - Enhanced Version

// Configuration and Global Variables
const CONFIG = {
    weatherAPI: 'https://api.openweathermap.org/data/2.5/weather',
    weatherKey: 'demo-key', // Replace with actual API key
    newsAPI: 'https://newsapi.org/v2/everything',
    newsKey: 'demo-key', // Replace with actual API key
    quoteAPI: 'https://api.quotable.io/random'
};

let currentUser = null;
let favorites = [];
let currentPage = 1;
let currentNewsCategory = 'all';

// Local Storage Management
const Storage = {
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Storage save error:', e);
        }
    },

    load: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Storage load error:', e);
            return null;
        }
    },

    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Storage remove error:', e);
        }
    }
};

// Theme Management
const Theme = {
    init: function () {
        const savedTheme = Storage.load('theme') || 'light';
        this.setTheme(savedTheme);
        this.updateToggleButton();
    },

    setTheme: function (theme) {
        document.body.setAttribute('data-theme', theme);
        Storage.save('theme', theme);
    },

    toggle: function () {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        this.updateToggleButton();
    },

    updateToggleButton: function () {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            const currentTheme = document.body.getAttribute('data-theme');
            themeToggle.innerHTML = currentTheme === 'dark' ?
                '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        }
    },

    // Debug function to check theme status
    debug: function () {
        const currentTheme = document.body.getAttribute('data-theme');
        const savedTheme = Storage.load('theme');
        console.log('Current theme attribute:', currentTheme);
        console.log('Saved theme in storage:', savedTheme);
        console.log('Body classes:', document.body.className);
        console.log('CSS Variables:', {
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--background-color'),
            textColor: getComputedStyle(document.body).getPropertyValue('--text-color'),
            cardBackground: getComputedStyle(document.body).getPropertyValue('--card-background')
        });
        return { currentTheme, savedTheme };
    }
};

// User Authentication
const Auth = {
    login: function (email, password) {
        // Simulate authentication
        const users = Storage.load('users') || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            currentUser = { ...user };
            delete currentUser.password; // Don't store password
            Storage.save('currentUser', currentUser);
            this.updateUserInterface();
            return { success: true, message: 'Login successful!' };
        }

        return { success: false, message: 'Invalid email or password' };
    },

    register: function (name, email, password) {
        const users = Storage.load('users') || [];

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email already exists' };
        }

        const newUser = {
            id: Date.now(),
            name,
            email,
            password,
            registeredAt: new Date().toISOString()
        };

        users.push(newUser);
        Storage.save('users', users);

        return { success: true, message: 'Registration successful! Please login.' };
    },

    logout: function () {
        currentUser = null;
        Storage.remove('currentUser');
        this.updateUserInterface();
        showPage('home');
    },

    updateUserInterface: function () {
        const loginSection = document.getElementById('loginSection');
        const userSection = document.getElementById('userSection');
        const userDisplayName = document.getElementById('userDisplayName');
        const userDisplayEmail = document.getElementById('userDisplayEmail');

        if (currentUser) {
            if (loginSection) loginSection.style.display = 'none';
            if (userSection) userSection.style.display = 'block';
            if (userDisplayName) userDisplayName.textContent = currentUser.name;
            if (userDisplayEmail) userDisplayEmail.textContent = currentUser.email;
        } else {
            if (loginSection) loginSection.style.display = 'block';
            if (userSection) userSection.style.display = 'none';
            if (userDisplayName) userDisplayName.textContent = 'Guest User';
            if (userDisplayEmail) userDisplayEmail.textContent = 'Not logged in';
        }
    }
};

// API Integration
const API = {
    async fetchWeather(city = 'Astana') {
        try {
            // Using a free weather API that doesn't require key for demo
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=demo&units=metric`);

            if (!response.ok) {
                // Fallback to mock data for demo
                return {
                    name: 'Astana',
                    main: { temp: -5, feels_like: -8 },
                    weather: [{ main: 'Snow', description: 'light snow' }],
                    wind: { speed: 3.2 }
                };
            }

            return await response.json();
        } catch (error) {
            console.error('Weather API error:', error);
            // Return mock data for demo
            return {
                name: 'Astana',
                main: { temp: -5, feels_like: -8 },
                weather: [{ main: 'Snow', description: 'light snow' }],
                wind: { speed: 3.2 }
            };
        }
    },

    async fetchNews(category = 'business', page = 1) {
        try {
            // Mock news data for demo - organized by category
            const mockNewsData = {
                business: [
                    {
                        title: "HR Technology Trends for 2025",
                        description: "Exploring the latest innovations in human resource technology and their impact on workplace efficiency.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=HR+Tech",
                        publishedAt: "2025-01-15T10:00:00Z",
                        source: { name: "HR Today" },
                        category: "business"
                    },
                    {
                        title: "Remote Work Best Practices",
                        description: "How companies are adapting their HR policies for the new era of remote and hybrid work.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=Remote+Work",
                        publishedAt: "2025-01-14T14:30:00Z",
                        source: { name: "Business Weekly" },
                        category: "business"
                    }
                ],
                technology: [
                    {
                        title: "AI in Recruitment: Game Changer",
                        description: "How artificial intelligence is revolutionizing the recruitment and hiring process.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=AI+Recruitment",
                        publishedAt: "2025-01-16T11:20:00Z",
                        source: { name: "Tech Today" },
                        category: "technology"
                    },
                    {
                        title: "Blockchain for HR Records",
                        description: "Secure employee data management using blockchain technology.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=Blockchain",
                        publishedAt: "2025-01-15T16:45:00Z",
                        source: { name: "TechNews" },
                        category: "technology"
                    }
                ],
                health: [
                    {
                        title: "Employee Wellness Programs Show ROI",
                        description: "Study reveals significant returns on investment from comprehensive employee wellness initiatives.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=Wellness",
                        publishedAt: "2025-01-13T09:15:00Z",
                        source: { name: "Healthcare News" },
                        category: "health"
                    },
                    {
                        title: "Mental Health in the Workplace",
                        description: "Best practices for supporting employee mental health and creating supportive work environments.",
                        url: "#",
                        urlToImage: "https://via.placeholder.com/300x200?text=Mental+Health",
                        publishedAt: "2025-01-12T13:30:00Z",
                        source: { name: "Health Today" },
                        category: "health"
                    }
                ]
            };

            // Get articles based on category
            let articles;
            if (category === 'all') {
                // Combine all articles from all categories
                articles = [...mockNewsData.business, ...mockNewsData.technology, ...mockNewsData.health];
            } else {
                articles = mockNewsData[category] || [];
            }

            // Sort by published date (newest first)
            articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

            return { articles: articles, totalResults: articles.length };
        } catch (error) {
            console.error('News API error:', error);
            return { articles: [], totalResults: 0 };
        }
    },

    async fetchQuote() {
        try {
            // Try different quotable.io endpoints for variety
            const endpoints = [
                'https://api.quotable.io/random?tags=motivational|success|inspirational|business',
                'https://api.quotable.io/random?tags=success|wisdom|motivational',
                'https://api.quotable.io/random?minLength=50&maxLength=200',
                'https://api.quotable.io/random?tags=inspirational|famous-quotes'
            ];

            // Randomly select an endpoint for variety
            const randomEndpoint = endpoints[Math.floor(Math.random() * endpoints.length)];

            const response = await fetch(randomEndpoint);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Validate the response
            if (!data.content || !data.author) {
                throw new Error('Invalid quote format received');
            }

            return data;
        } catch (error) {
            console.error('Quote API error:', error);

            // Enhanced fallback quotes array
            const fallbackQuotes = [
                {
                    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
                    author: "Winston Churchill"
                },
                {
                    content: "The only way to do great work is to love what you do.",
                    author: "Steve Jobs"
                },
                {
                    content: "Innovation distinguishes between a leader and a follower.",
                    author: "Steve Jobs"
                },
                {
                    content: "The future belongs to those who believe in the beauty of their dreams.",
                    author: "Eleanor Roosevelt"
                },
                {
                    content: "It is during our darkest moments that we must focus to see the light.",
                    author: "Aristotle"
                },
                {
                    content: "Success is walking from failure to failure with no loss of enthusiasm.",
                    author: "Winston Churchill"
                }
            ];

            // Return random fallback quote
            const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
            return randomQuote;
        }
    }
};

// Favorites Management
const Favorites = {
    init: function () {
        favorites = Storage.load('favorites') || [];
        this.updateDisplay();
    },

    add: function (jobTitle) {
        if (!favorites.includes(jobTitle)) {
            favorites.push(jobTitle);
            Storage.save('favorites', favorites);
            this.updateDisplay();
            this.showNotification('Added to favorites!', 'success');
        }
    },

    remove: function (jobTitle) {
        favorites = favorites.filter(job => job !== jobTitle);
        Storage.save('favorites', favorites);
        this.updateDisplay();
        this.showNotification('Removed from favorites!', 'info');
    },

    toggle: function (jobTitle) {
        if (favorites.includes(jobTitle)) {
            this.remove(jobTitle);
        } else {
            this.add(jobTitle);
        }
    },

    updateDisplay: function () {
        const container = document.getElementById('favoriteJobs');
        if (!container) return;

        if (favorites.length === 0) {
            container.innerHTML = '<p class="text-muted">No favorite jobs yet. Browse our careers page to save jobs!</p>';
            return;
        }

        container.innerHTML = favorites.map(job => `
            <div class="favorite-item d-flex justify-content-between align-items-center p-2 border-bottom">
                <span>${job}</span>
                <button class="btn btn-sm btn-outline-danger" onclick="Favorites.remove('${job}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
    },

    showNotification: function (message, type) {
        // Create and show a toast notification
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} position-fixed`;
        toast.style.top = '20px';
        toast.style.right = '20px';
        toast.style.zIndex = '9999';
        toast.innerHTML = message;

        document.body.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
};

// Page Navigation (Enhanced)
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page-container');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    // Find and activate the correct nav link
    const activeLink = document.querySelector(`[onclick="showPage('${pageName}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Close mobile menu if open
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
            bsCollapse.hide();
        }
    }

    // Initialize page-specific functionality
    initializePage(pageName);
}

// Page-specific initialization
function initializePage(pageName) {
    switch (pageName) {
        case 'home':
            loadWeather();
            break;
        case 'news':
            loadNews();
            break;
        case 'dashboard':
            Auth.updateUserInterface();
            Favorites.updateDisplay();
            loadDailyQuote();
            break;
        case 'careers':
            updateJobFavorites();
            break;
    }
}

// Weather functionality
async function loadWeather() {
    const weatherDisplay = document.getElementById('weatherDisplay');
    if (!weatherDisplay) return;

    try {
        const weather = await API.fetchWeather();
        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <h5>${weather.name}</h5>
                <div class="temperature">${Math.round(weather.main.temp)}°C</div>
                <p>${weather.weather[0].description}</p>
                <small>Feels like ${Math.round(weather.main.feels_like)}°C</small>
            </div>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `
            <p class="text-danger">Unable to load weather data</p>
        `;
    }
}

// News functionality
async function loadNews() {
    const container = document.getElementById('newsContainer');
    if (!container) return;

    try {
        const news = await API.fetchNews(currentNewsCategory, currentPage);

        const newsHTML = news.articles.map(article => `
            <article class="news-item card-custom mb-3">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-8">
                            <h5>${article.title}</h5>
                            <p class="text-muted">${article.description}</p>
                            <small class="text-secondary">
                                ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString()}
                            </small>
                        </div>
                        <div class="col-md-4">
                            <img src="${article.urlToImage}" alt="News image" class="img-fluid rounded">
                        </div>
                    </div>
                </div>
            </article>
        `).join('');

        if (currentPage === 1) {
            container.innerHTML = newsHTML;
        } else {
            container.innerHTML += newsHTML;
        }

        // Show load more button if there are more articles
        const loadMoreBtn = document.getElementById('loadMoreNews');
        if (loadMoreBtn && news.articles.length > 0) {
            loadMoreBtn.style.display = 'block';
        }

    } catch (error) {
        container.innerHTML = '<p class="text-danger">Unable to load news</p>';
    }
}

// Quote functionality
async function loadDailyQuote() {
    const container = document.getElementById('quoteContainer');
    if (!container) return;

    // Show loading spinner
    container.innerHTML = `
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading inspiring quote...</p>
        </div>
    `;

    try {
        const quote = await API.fetchQuote();
        container.innerHTML = `
            <blockquote class="blockquote">
                <p class="mb-0">"${quote.content}"</p>
                <footer class="blockquote-footer mt-2">
                    <cite title="Source Title">${quote.author}</cite>
                </footer>
            </blockquote>
        `;
    } catch (error) {
        console.error('Quote loading error:', error);
        container.innerHTML = `
            <div class="text-danger">
                <i class="fas fa-exclamation-triangle me-2"></i>
                Unable to load quote. Please try again.
            </div>
        `;
    }
}

function loadNewQuote() {
    // Add visual feedback to the button
    const refreshBtn = document.querySelector('[onclick="loadNewQuote()"]');
    if (refreshBtn) {
        const originalHTML = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
        refreshBtn.disabled = true;

        // Load new quote
        loadDailyQuote().then(() => {
            // Restore button after loading
            setTimeout(() => {
                refreshBtn.innerHTML = originalHTML;
                refreshBtn.disabled = false;
            }, 500);
        });
    } else {
        loadDailyQuote();
    }
}

// Enhanced form handling
function handleLogin() {
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        showFormError('loginError', 'Please fill in all fields');
        return;
    }

    const result = Auth.login(email, password);

    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();
        showNotification(result.message, 'success');
        showPage('dashboard');
    } else {
        showFormError('loginError', result.message);
    }
}

function handleRegister() {
    // Clear previous errors
    document.getElementById('registerError').style.display = 'none';

    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Validation
    if (!name || name.length < 2) {
        showFormError('registerError', 'Name must be at least 2 characters long');
        return;
    }

    if (!email) {
        showFormError('registerError', 'Email is required');
        return;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormError('registerError', 'Please enter a valid email address');
        return;
    }

    if (!password) {
        showFormError('registerError', 'Password is required');
        return;
    }

    if (password.length < 6) {
        showFormError('registerError', 'Password must be at least 6 characters long');
        return;
    }

    // Password strength validation
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        showFormError('registerError', 'Password must contain uppercase, lowercase, and numbers');
        return;
    }

    if (!confirmPassword) {
        showFormError('registerError', 'Please confirm your password');
        return;
    }

    if (password !== confirmPassword) {
        showFormError('registerError', 'Passwords do not match');
        return;
    }

    const result = Auth.register(name, email, password);

    if (result.success) {
        bootstrap.Modal.getInstance(document.getElementById('registerModal')).hide();
        showNotification(result.message, 'success');

        // Clear form
        document.getElementById('registerName').value = '';
        document.getElementById('registerEmail').value = '';
        document.getElementById('registerPassword').value = '';
        document.getElementById('confirmPassword').value = '';
        document.getElementById('registerError').style.display = 'none';
    } else {
        showFormError('registerError', result.message);
    }
}

function logout() {
    Auth.logout();
    showNotification('Logged out successfully', 'info');
}

function showFormError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

function showNotification(message, type) {
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} position-fixed`;
    toast.style.top = '20px';
    toast.style.right = '20px';
    toast.style.zIndex = '9999';
    toast.innerHTML = message;

    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Job favorites functionality
function updateJobFavorites() {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        const title = card.querySelector('h4').textContent;
        const isFavorite = favorites.includes(title);

        // Add or update favorite button
        let favBtn = card.querySelector('.favorite-btn');
        if (!favBtn) {
            favBtn = document.createElement('button');
            favBtn.className = 'btn btn-outline-warning favorite-btn me-2';
            favBtn.onclick = () => Favorites.toggle(title);
            card.querySelector('.mb-3').appendChild(favBtn);
        }

        favBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
        favBtn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
    });
}

// News filter functionality
function filterNews(category) {
    currentNewsCategory = category;
    currentPage = 1;

    // Update filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');

    loadNews();
}

function loadMoreNews() {
    currentPage++;
    loadNews();
}

// Original functions (enhanced)
function calculateSalary() {
    // Reset errors
    document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');

    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const allowances = parseFloat(document.getElementById('allowances').value) || 0;
    const bonuses = parseFloat(document.getElementById('bonuses').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value);

    let hasError = false;

    if (!basicSalary || basicSalary <= 0) {
        document.getElementById('basicSalaryError').style.display = 'block';
        hasError = true;
    }
    if (isNaN(allowances) || allowances < 0) {
        document.getElementById('allowancesError').style.display = 'block';
        hasError = true;
    }
    if (!taxRate || taxRate < 0 || taxRate > 100) {
        document.getElementById('taxRateError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    const grossSalary = basicSalary + allowances + bonuses;
    const taxAmount = (grossSalary * taxRate) / 100;
    const netSalary = grossSalary - taxAmount;

    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.innerHTML = `
        <div>Gross Salary: ${grossSalary.toFixed(2)}</div>
        <div>Tax Amount: ${taxAmount.toFixed(2)}</div>
        <div style="font-size: 1.5rem; margin-top: 10px;">Net Salary: ${netSalary.toFixed(2)}</div>
    `;

    // Save calculation to history
    const calculation = {
        basicSalary,
        allowances,
        bonuses,
        taxRate,
        grossSalary,
        taxAmount,
        netSalary,
        date: new Date().toISOString()
    };

    const history = Storage.load('salaryHistory') || [];
    history.unshift(calculation);
    Storage.save('salaryHistory', history.slice(0, 10)); // Keep last 10 calculations

    // jQuery fade in effect
    $(resultDiv).fadeIn(500);
}

function showEmployeeDetails(name, position, email, experience) {
    document.getElementById('modalEmployeeName').textContent = name;
    document.getElementById('modalEmployeePosition').textContent = position;
    document.getElementById('modalEmployeeEmail').textContent = email;
    document.getElementById('modalEmployeeExperience').textContent = experience;

    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
}

function showApplicationForm(jobTitle) {
    document.getElementById('jobTitle').textContent = jobTitle;
    document.getElementById('applicationSuccess').style.display = 'none';

    // Reset form
    document.getElementById('applicantName').value = '';
    document.getElementById('applicantEmail').value = '';
    document.getElementById('applicantPhone').value = '';
    document.getElementById('applicantExperience').value = '';
    document.getElementById('applicantCoverLetter').value = '';

    document.querySelectorAll('#applicationModal .error-text').forEach(el => el.style.display = 'none');

    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    modal.show();
}

function submitApplication() {
    // Reset errors
    document.querySelectorAll('#applicationModal .error-text').forEach(el => el.style.display = 'none');

    const name = document.getElementById('applicantName').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const phone = document.getElementById('applicantPhone').value.trim();
    const experience = document.getElementById('applicantExperience').value.trim();
    const coverLetter = document.getElementById('applicantCoverLetter').value.trim();

    let hasError = false;

    if (!name) {
        document.getElementById('applicantNameError').style.display = 'block';
        hasError = true;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('applicantEmailError').style.display = 'block';
        hasError = true;
    }
    if (!phone) {
        document.getElementById('applicantPhoneError').style.display = 'block';
        hasError = true;
    }
    if (!experience || experience <= 0) {
        document.getElementById('applicantExperienceError').style.display = 'block';
        hasError = true;
    }
    if (!coverLetter) {
        document.getElementById('applicantCoverLetterError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    // Show success message with jQuery effect
    $('#applicationSuccess').slideDown(500);

    // Reset form after 3 seconds
    setTimeout(() => {
        document.getElementById('applicantName').value = '';
        document.getElementById('applicantEmail').value = '';
        document.getElementById('applicantPhone').value = '';
        document.getElementById('applicantExperience').value = '';
        document.getElementById('applicantCoverLetter').value = '';
        $('#applicationSuccess').slideUp(500);
    }, 3000);
}

function submitContact() {
    // Reset errors
    document.querySelectorAll('#contact .error-text').forEach(el => el.style.display = 'none');

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let hasError = false;

    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }
    if (!subject) {
        document.getElementById('subjectError').style.display = 'block';
        hasError = true;
    }
    if (!message) {
        document.getElementById('messageError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    // Show success message with jQuery effect
    $('#contactSuccess').fadeIn(500);

    // Reset form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
        $('#contactSuccess').fadeOut(500);
    }, 5000);
}

// Initialize application when DOM is ready
$(document).ready(function () {
    // Initialize theme
    Theme.init();

    // Load current user
    currentUser = Storage.load('currentUser');

    // Initialize favorites
    Favorites.init();

    // Add smooth scroll effect for cards
    $('.card-custom, .employee-card, .job-card').hide().fadeIn(1000);

    // Animate feature numbers on home page
    $('.feature-number').each(function () {
        $(this).css('opacity', 0).animate({ opacity: 1 }, 1500);
    });

    // Initialize first page
    initializePage('home');

    // Event listeners for news filters
    $(document).on('click', '.filter-btn', function () {
        const category = $(this).data('category');
        filterNews(category);
    });

    // Event listener for load more news
    $(document).on('click', '#loadMoreNews', function () {
        loadMoreNews();
    });
});// Salary Calculator
function calculateSalary() {
    // Reset errors
    document.querySelectorAll('.error-text').forEach(el => el.style.display = 'none');

    const basicSalary = parseFloat(document.getElementById('basicSalary').value);
    const allowances = parseFloat(document.getElementById('allowances').value) || 0;
    const bonuses = parseFloat(document.getElementById('bonuses').value) || 0;
    const taxRate = parseFloat(document.getElementById('taxRate').value);

    let hasError = false;

    if (!basicSalary || basicSalary <= 0) {
        document.getElementById('basicSalaryError').style.display = 'block';
        hasError = true;
    }
    if (isNaN(allowances) || allowances < 0) {
        document.getElementById('allowancesError').style.display = 'block';
        hasError = true;
    }
    if (!taxRate || taxRate < 0 || taxRate > 100) {
        document.getElementById('taxRateError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    const grossSalary = basicSalary + allowances + bonuses;
    const taxAmount = (grossSalary * taxRate) / 100;
    const netSalary = grossSalary - taxAmount;

    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.innerHTML = `
        <div>Gross Salary: ${grossSalary.toFixed(2)}</div>
        <div>Tax Amount: ${taxAmount.toFixed(2)}</div>
        <div style="font-size: 1.5rem; margin-top: 10px;">Net Salary: ${netSalary.toFixed(2)}</div>
    `;

    // jQuery fade in effect
    $(resultDiv).fadeIn(500);
}

// Show Employee Details
function showEmployeeDetails(name, position, email, experience) {
    document.getElementById('modalEmployeeName').textContent = name;
    document.getElementById('modalEmployeePosition').textContent = position;
    document.getElementById('modalEmployeeEmail').textContent = email;
    document.getElementById('modalEmployeeExperience').textContent = experience;

    const modal = new bootstrap.Modal(document.getElementById('employeeModal'));
    modal.show();
}

// Show Job Application Form
function showApplicationForm(jobTitle) {
    document.getElementById('jobTitle').textContent = jobTitle;
    document.getElementById('applicationSuccess').style.display = 'none';

    // Reset form
    document.getElementById('applicantName').value = '';
    document.getElementById('applicantEmail').value = '';
    document.getElementById('applicantPhone').value = '';
    document.getElementById('applicantExperience').value = '';
    document.getElementById('applicantCoverLetter').value = '';

    document.querySelectorAll('#applicationModal .error-text').forEach(el => el.style.display = 'none');

    const modal = new bootstrap.Modal(document.getElementById('applicationModal'));
    modal.show();
}

// Submit Job Application
function submitApplication() {
    // Reset errors
    document.querySelectorAll('#applicationModal .error-text').forEach(el => el.style.display = 'none');

    const name = document.getElementById('applicantName').value.trim();
    const email = document.getElementById('applicantEmail').value.trim();
    const phone = document.getElementById('applicantPhone').value.trim();
    const experience = document.getElementById('applicantExperience').value.trim();
    const coverLetter = document.getElementById('applicantCoverLetter').value.trim();

    let hasError = false;

    if (!name) {
        document.getElementById('applicantNameError').style.display = 'block';
        hasError = true;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('applicantEmailError').style.display = 'block';
        hasError = true;
    }
    if (!phone) {
        document.getElementById('applicantPhoneError').style.display = 'block';
        hasError = true;
    }
    if (!experience || experience <= 0) {
        document.getElementById('applicantExperienceError').style.display = 'block';
        hasError = true;
    }
    if (!coverLetter) {
        document.getElementById('applicantCoverLetterError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    // Show success message with jQuery effect
    $('#applicationSuccess').slideDown(500);

    // Reset form after 3 seconds
    setTimeout(() => {
        document.getElementById('applicantName').value = '';
        document.getElementById('applicantEmail').value = '';
        document.getElementById('applicantPhone').value = '';
        document.getElementById('applicantExperience').value = '';
        document.getElementById('applicantCoverLetter').value = '';
        $('#applicationSuccess').slideUp(500);
    }, 3000);
}

// Submit Contact Form
function submitContact() {
    // Reset errors
    document.querySelectorAll('#contact .error-text').forEach(el => el.style.display = 'none');

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    let hasError = false;

    if (!name) {
        document.getElementById('nameError').style.display = 'block';
        hasError = true;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('emailError').style.display = 'block';
        hasError = true;
    }
    if (!subject) {
        document.getElementById('subjectError').style.display = 'block';
        hasError = true;
    }
    if (!message) {
        document.getElementById('messageError').style.display = 'block';
        hasError = true;
    }

    if (hasError) return;

    // Show success message with jQuery effect
    $('#contactSuccess').fadeIn(500);

    // Reset form
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactSubject').value = '';
    document.getElementById('contactMessage').value = '';

    // Hide success message after 5 seconds
    setTimeout(() => {
        $('#contactSuccess').fadeOut(500);
    }, 5000);
}

// Initialize application when DOM is ready
$(document).ready(function () {
    // Add smooth scroll effect for cards
    $('.card-custom, .employee-card, .job-card').hide().fadeIn(1000);

    // Animate feature numbers on home page
    $('.feature-number').each(function () {
        $(this).css('opacity', 0).animate({ opacity: 1 }, 1500);
    });
});
