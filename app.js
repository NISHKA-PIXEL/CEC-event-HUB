// CGC Event Hub - Event Management Platform
class EventHub {
    constructor() {
        this.currentPage = 'home';
        this.currentRole = 'student';
        this.currentUser = null;
        this.searchTerm = '';
        this.filters = {
            category: '',
            status: '',
            date: ''
        };
        
        // Sample data
        this.events = [
            {
                id: 1,
                title: "AI & Machine Learning Workshop",
                description: "Deep dive into modern AI techniques and hands-on machine learning projects with industry experts.",
                category: "AI & Machine Learning",
                date: "2025-10-15",
                time: "10:00",
                location: "Computer Lab 301",
                organizer: "Tech Society",
                maxCapacity: 50,
                registered: 32,
                status: "open",
                featured: true,
                price: 0,
                image: "ai-workshop.jpg"
            },
            {
                id: 2,
                title: "Robotics Innovation Challenge",
                description: "Build and program autonomous robots in teams. Compete for prizes and showcase your creativity.",
                category: "Robotics",
                date: "2025-11-22",
                time: "09:00",
                location: "Engineering Workshop",
                organizer: "Robotics Club",
                maxCapacity: 40,
                registered: 28,
                status: "open",
                featured: true,
                price: 500,
                image: "robotics-challenge.jpg"
            },
            {
                id: 3,
                title: "Cultural Fest 2025 - Harmony",
                description: "Celebrate diversity through music, dance, drama, and art. Open to all departments and students.",
                category: "Cultural",
                date: "2025-12-05",
                time: "18:00",
                location: "Main Auditorium",
                organizer: "Cultural Committee",
                maxCapacity: 500,
                registered: 387,
                status: "open",
                featured: true,
                price: 100,
                image: "cultural-fest.jpg"
            },
            {
                id: 4,
                title: "Startup Pitch Competition",
                description: "Present your innovative business ideas to venture capitalists and win funding for your startup.",
                category: "Business",
                date: "2026-01-10",
                time: "14:00",
                location: "Business Center Hall",
                organizer: "Entrepreneurship Cell",
                maxCapacity: 100,
                registered: 45,
                status: "open",
                featured: true,
                price: 0,
                image: "startup-pitch.jpg"
            },
            {
                id: 5,
                title: "Web Development Bootcamp",
                description: "Intensive 3-day bootcamp covering React, Node.js, and modern web development practices.",
                category: "Technology",
                date: "2025-10-28",
                time: "09:00",
                location: "Computer Lab 205",
                organizer: "Coding Club",
                maxCapacity: 30,
                registered: 30,
                status: "full",
                featured: false,
                price: 1000,
                image: "web-bootcamp.jpg"
            },
            {
                id: 6,
                title: "Data Science Workshop",
                description: "Learn data analysis, visualization, and machine learning using Python and R.",
                category: "Technology",
                date: "2025-11-15",
                time: "10:00",
                location: "Computer Lab 302",
                organizer: "Data Science Club",
                maxCapacity: 35,
                registered: 22,
                status: "open",
                featured: false,
                price: 300,
                image: "data-science.jpg"
            },
            {
                id: 7,
                title: "Annual Tech Symposium",
                description: "Industry leaders share insights on emerging technologies and career opportunities.",
                category: "Technology",
                date: "2025-12-20",
                time: "09:00",
                location: "Main Auditorium",
                organizer: "Tech Society",
                maxCapacity: 300,
                registered: 156,
                status: "open",
                featured: false,
                price: 0,
                image: "tech-symposium.jpg"
            }
        ];

        this.users = [
            {
                id: 1,
                name: "Rahul Sharma",
                email: "rahul@cgc.edu.in",
                role: "student",
                department: "Computer Science",
                year: "3rd Year",
                registeredEvents: [1, 3, 4],
                avatar: "RS"
            },
            {
                id: 2,
                name: "Dr. Priya Patel",
                email: "priya@cgc.edu.in",
                role: "organizer",
                department: "Engineering",
                eventsOrganized: [2, 5],
                avatar: "PP"
            },
            {
                id: 3,
                name: "Prof. Amit Kumar",
                email: "amit@cgc.edu.in",
                role: "admin",
                department: "Administration",
                avatar: "AK"
            }
        ];

        this.analytics = {
            totalEvents: 25,
            totalRegistrations: 1247,
            averageAttendance: 85,
            popularCategories: [
                { name: "Technology", count: 8 },
                { name: "Cultural", count: 6 },
                { name: "Business", count: 5 },
                { name: "Sports", count: 4 },
                { name: "Academic", count: 2 }
            ],
            monthlyRegistrations: [
                { month: "Jan", registrations: 156 },
                { month: "Feb", registrations: 189 },
                { month: "Mar", registrations: 223 },
                { month: "Apr", registrations: 198 },
                { month: "May", registrations: 167 },
                { month: "Jun", registrations: 142 }
            ]
        };

        this.init();
    }

    init() {
        this.currentUser = this.users[0]; // Default to student
        this.setupEventListeners();
        this.updateUserInterface();
        this.renderFeaturedEvents();
        this.startRealTimeUpdates();
        
        // Set dark theme
        document.documentElement.setAttribute('data-color-scheme', 'dark');
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-link, [data-page]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                if (page) this.navigateToPage(page);
            });
        });

        // Role switching
        document.getElementById('roleSelector').addEventListener('change', (e) => {
            this.switchRole(e.target.value);
        });

        // Search
        document.getElementById('globalSearch').addEventListener('input', (e) => {
            this.searchTerm = e.target.value;
            this.debounceSearch();
        });

        // Filters
        document.getElementById('categoryFilter').addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.renderEventsList();
        });

        document.getElementById('statusFilter').addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.renderEventsList();
        });

        document.getElementById('dateFilter').addEventListener('change', (e) => {
            this.filters.date = e.target.value;
            this.renderEventsList();
        });

        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal('eventModal');
        });

        document.getElementById('closeCreateModal').addEventListener('click', () => {
            this.closeModal('createEventModal');
        });

        // Create event
        document.getElementById('createEventBtn').addEventListener('click', () => {
            this.openCreateEventModal();
        });

        document.getElementById('createEventForm').addEventListener('submit', (e) => {
            this.handleCreateEvent(e);
        });

        document.getElementById('cancelCreateEvent').addEventListener('click', () => {
            this.closeModal('createEventModal');
        });

        // Close modal on outside click
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
    }

    navigateToPage(page) {
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            }
        });

        // Hide all pages
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Show target page
        const targetPage = document.getElementById(page + 'Page');
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = page;
            
            // Load page-specific content
            this.loadPageContent(page);
        }
    }

    loadPageContent(page) {
        switch (page) {
            case 'events':
                this.renderEventsList();
                break;
            case 'dashboard':
                this.renderDashboard();
                break;
            case 'analytics':
                this.renderAnalytics();
                break;
            case 'calendar':
                this.renderCalendar();
                break;
            case 'profile':
                this.renderProfile();
                break;
        }
    }

    switchRole(role) {
        this.currentRole = role;
        this.currentUser = this.users.find(u => u.role === role) || this.users[0];
        this.updateUserInterface();
        
        // Refresh current page content
        this.loadPageContent(this.currentPage);
    }

    updateUserInterface() {
        // Update user display
        document.getElementById('currentUserName').textContent = this.currentUser.name;
        document.getElementById('currentUserAvatar').textContent = this.currentUser.avatar;
        
        // Update role selector
        document.getElementById('roleSelector').value = this.currentRole;
        
        // Show/hide role-specific elements
        const createEventBtn = document.getElementById('createEventBtn');
        if (this.currentRole === 'organizer' || this.currentRole === 'admin') {
            createEventBtn.style.display = 'block';
        } else {
            createEventBtn.style.display = 'none';
        }
    }

    renderFeaturedEvents() {
        const container = document.getElementById('featuredEventsGrid');
        const featuredEvents = this.events.filter(event => event.featured);
        
        container.innerHTML = featuredEvents.map(event => this.createEventCard(event)).join('');
        
        // Add click listeners
        container.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                const eventId = parseInt(card.getAttribute('data-event-id'));
                this.showEventModal(eventId);
            });
        });
    }

    renderEventsList() {
        const container = document.getElementById('allEventsList');
        let filteredEvents = this.filterEvents();
        
        container.innerHTML = filteredEvents.map(event => this.createEventCard(event, true)).join('');
        
        // Add click listeners
        container.querySelectorAll('.event-card').forEach(card => {
            card.addEventListener('click', () => {
                const eventId = parseInt(card.getAttribute('data-event-id'));
                this.showEventModal(eventId);
            });
        });
    }

    filterEvents() {
        return this.events.filter(event => {
            const matchesSearch = !this.searchTerm || 
                event.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                event.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                event.category.toLowerCase().includes(this.searchTerm.toLowerCase());
                
            const matchesCategory = !this.filters.category || event.category === this.filters.category;
            const matchesStatus = !this.filters.status || event.status === this.filters.status;
            const matchesDate = !this.filters.date || event.date === this.filters.date;
            
            return matchesSearch && matchesCategory && matchesStatus && matchesDate;
        });
    }

    createEventCard(event, showActions = false) {
        const capacityPercentage = (event.registered / event.maxCapacity) * 100;
        const categoryClass = this.getCategoryClass(event.category);
        const isRegistered = this.currentUser.registeredEvents?.includes(event.id);
        
        return `
            <div class="event-card" data-event-id="${event.id}">
                <div class="event-card-header">
                    <h3 class="event-title">${event.title}</h3>
                    <span class="event-category ${categoryClass}">${event.category}</span>
                </div>
                <div class="event-card-body">
                    <p class="event-description">${event.description}</p>
                    <div class="event-meta">
                        <span>📅 ${this.formatDate(event.date)} at ${event.time}</span>
                        <span>📍 ${event.location}</span>
                    </div>
                    <div class="event-capacity">
                        <span>${event.registered}/${event.maxCapacity} registered</span>
                        <div class="capacity-bar">
                            <div class="capacity-fill" style="width: ${capacityPercentage}%"></div>
                        </div>
                    </div>
                    <div class="event-actions">
                        <span class="event-status status-${event.status}">${event.status.toUpperCase()}</span>
                        ${event.price > 0 ? `<span class="event-price">₹${event.price}</span>` : '<span class="event-price">FREE</span>'}
                        ${isRegistered ? '<span class="status-success">Registered</span>' : ''}
                    </div>
                </div>
            </div>
        `;
    }

    getCategoryClass(category) {
        const classMap = {
            'AI & Machine Learning': 'category-ai',
            'Robotics': 'category-robotics',
            'Cultural': 'category-cultural',
            'Business': 'category-business',
            'Technology': 'category-technology'
        };
        return classMap[category] || 'category-technology';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric' 
        });
    }

    showEventModal(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event) return;
        
        const modal = document.getElementById('eventModal');
        const title = document.getElementById('modalEventTitle');
        const content = document.getElementById('modalEventContent');
        
        title.textContent = event.title;
        
        const isRegistered = this.currentUser.registeredEvents?.includes(event.id);
        const canRegister = event.status === 'open' && !isRegistered && this.currentRole === 'student';
        const canManage = (this.currentRole === 'organizer' || this.currentRole === 'admin');
        
        content.innerHTML = `
            <div class="event-details">
                <div class="event-detail-section">
                    <h4>Description</h4>
                    <p>${event.description}</p>
                </div>
                
                <div class="event-detail-section">
                    <h4>Event Details</h4>
                    <div class="event-detail-grid">
                        <div><strong>Date:</strong> ${this.formatDate(event.date)}</div>
                        <div><strong>Time:</strong> ${event.time}</div>
                        <div><strong>Location:</strong> ${event.location}</div>
                        <div><strong>Organizer:</strong> ${event.organizer}</div>
                        <div><strong>Category:</strong> ${event.category}</div>
                        <div><strong>Price:</strong> ${event.price > 0 ? '₹' + event.price : 'FREE'}</div>
                    </div>
                </div>
                
                <div class="event-detail-section">
                    <h4>Registration Status</h4>
                    <div class="registration-info">
                        <div class="capacity-info">
                            <span>${event.registered} / ${event.maxCapacity} registered</span>
                            <div class="capacity-bar">
                                <div class="capacity-fill" style="width: ${(event.registered / event.maxCapacity) * 100}%"></div>
                            </div>
                        </div>
                        <span class="event-status status-${event.status}">${event.status.toUpperCase()}</span>
                    </div>
                </div>
                
                <div class="event-actions">
                    ${canRegister ? `<button class="btn btn--primary" onclick="eventHub.registerForEvent(${event.id})">Register Now</button>` : ''}
                    ${isRegistered ? '<span class="status-success">✓ You are registered</span>' : ''}
                    ${canManage ? `<button class="btn btn--outline" onclick="eventHub.manageEvent(${event.id})">Manage Event</button>` : ''}
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    registerForEvent(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (!event || event.status !== 'open' || event.registered >= event.maxCapacity) {
            alert('Cannot register for this event.');
            return;
        }
        
        // Add to user's registered events
        if (!this.currentUser.registeredEvents) {
            this.currentUser.registeredEvents = [];
        }
        this.currentUser.registeredEvents.push(eventId);
        
        // Update event registration count
        event.registered++;
        
        // Update status if full
        if (event.registered >= event.maxCapacity) {
            event.status = 'full';
        }
        
        this.closeModal('eventModal');
        this.refreshCurrentView();
        
        // Show success message
        this.showNotification('Successfully registered for ' + event.title, 'success');
    }

    manageEvent(eventId) {
        this.closeModal('eventModal');
        // In a real app, this would open an event management interface
        this.showNotification('Event management interface would open here.', 'info');
    }

    openCreateEventModal() {
        document.getElementById('createEventModal').classList.remove('hidden');
    }

    handleCreateEvent(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newEvent = {
            id: this.events.length + 1,
            title: document.getElementById('eventTitle').value,
            description: document.getElementById('eventDescription').value,
            category: document.getElementById('eventCategory').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            organizer: this.currentUser.name,
            maxCapacity: parseInt(document.getElementById('eventCapacity').value),
            registered: 0,
            status: 'open',
            featured: false,
            price: parseInt(document.getElementById('eventPrice').value) || 0,
            image: 'default.jpg'
        };
        
        this.events.push(newEvent);
        this.closeModal('createEventModal');
        
        // Clear form
        document.getElementById('createEventForm').reset();
        
        // Refresh view
        this.refreshCurrentView();
        this.showNotification('Event created successfully!', 'success');
    }

    renderDashboard() {
        const container = document.getElementById('dashboardContent');
        const title = document.getElementById('dashboardTitle');
        
        title.textContent = `${this.currentRole.charAt(0).toUpperCase() + this.currentRole.slice(1)} Dashboard`;
        
        switch (this.currentRole) {
            case 'student':
                this.renderStudentDashboard(container);
                break;
            case 'organizer':
                this.renderOrganizerDashboard(container);
                break;
            case 'admin':
                this.renderAdminDashboard(container);
                break;
        }
    }

    renderStudentDashboard(container) {
        const registeredEvents = this.events.filter(e => 
            this.currentUser.registeredEvents?.includes(e.id)
        );
        
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>My Registered Events</h3>
                    <div class="registered-events-list">
                        ${registeredEvents.length > 0 ? registeredEvents.map(event => `
                            <div class="registered-event-item">
                                <div>
                                    <strong>${event.title}</strong>
                                    <br><small>${this.formatDate(event.date)} at ${event.time}</small>
                                </div>
                                <span class="event-status status-${event.status}">${event.status}</span>
                            </div>
                        `).join('') : '<p>No registered events yet.</p>'}
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Upcoming Events</h3>
                    <div class="upcoming-events">
                        ${this.getUpcomingEvents().slice(0, 3).map(event => `
                            <div class="upcoming-event" onclick="eventHub.showEventModal(${event.id})">
                                <strong>${event.title}</strong>
                                <br><small>${this.formatDate(event.date)}</small>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Quick Stats</h3>
                    <div class="stats-list">
                        <div class="stat-item">
                            <span class="stat-value">${registeredEvents.length}</span>
                            <span class="stat-label">Events Registered</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.events.filter(e => e.status === 'open').length}</span>
                            <span class="stat-label">Events Available</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderOrganizerDashboard(container) {
        const organizedEvents = this.events.filter(e => e.organizer === this.currentUser.name);
        
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>My Events</h3>
                    <div class="organized-events-list">
                        ${organizedEvents.map(event => `
                            <div class="organized-event-item">
                                <div>
                                    <strong>${event.title}</strong>
                                    <br><small>${event.registered}/${event.maxCapacity} registered</small>
                                </div>
                                <span class="event-status status-${event.status}">${event.status}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="btn btn--primary mt-8" onclick="eventHub.openCreateEventModal()">Create New Event</button>
                </div>
                
                <div class="dashboard-card">
                    <h3>Registration Summary</h3>
                    <div class="registration-stats">
                        ${organizedEvents.map(event => `
                            <div class="reg-stat-item">
                                <span>${event.title}</span>
                                <div class="capacity-bar">
                                    <div class="capacity-fill" style="width: ${(event.registered / event.maxCapacity) * 100}%"></div>
                                </div>
                                <span>${event.registered}/${event.maxCapacity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Quick Actions</h3>
                    <div class="quick-actions">
                        <button class="btn btn--outline btn--full-width" onclick="eventHub.navigateToPage('events')">View All Events</button>
                        <button class="btn btn--outline btn--full-width" onclick="eventHub.navigateToPage('analytics')">View Analytics</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAdminDashboard(container) {
        container.innerHTML = `
            <div class="dashboard-grid">
                <div class="dashboard-card">
                    <h3>Platform Overview</h3>
                    <div class="platform-stats">
                        <div class="stat-item">
                            <span class="stat-value">${this.events.length}</span>
                            <span class="stat-label">Total Events</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.users.length}</span>
                            <span class="stat-label">Total Users</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${this.analytics.totalRegistrations}</span>
                            <span class="stat-label">Total Registrations</span>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3>Recent Events</h3>
                    <div class="recent-events">
                        ${this.events.slice(-5).map(event => `
                            <div class="recent-event-item">
                                <div>
                                    <strong>${event.title}</strong>
                                    <br><small>by ${event.organizer}</small>
                                </div>
                                <span class="event-status status-${event.status}">${event.status}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="dashboard-card">
                    <h3>System Management</h3>
                    <div class="management-actions">
                        <button class="btn btn--outline btn--full-width" onclick="eventHub.navigateToPage('analytics')">View Full Analytics</button>
                        <button class="btn btn--outline btn--full-width" onclick="eventHub.openCreateEventModal()">Create Event</button>
                        <button class="btn btn--outline btn--full-width">Manage Users</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderAnalytics() {
        setTimeout(() => {
            this.renderRegistrationChart();
            this.renderCategoryChart();
            this.renderStatusChart();
        }, 100);
    }

    renderRegistrationChart() {
        const ctx = document.getElementById('registrationChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: this.analytics.monthlyRegistrations.map(item => item.month),
                datasets: [{
                    label: 'Monthly Registrations',
                    data: this.analytics.monthlyRegistrations.map(item => item.registrations),
                    borderColor: '#ff6b35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    renderCategoryChart() {
        const ctx = document.getElementById('categoryChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: this.analytics.popularCategories.map(cat => cat.name),
                datasets: [{
                    data: this.analytics.popularCategories.map(cat => cat.count),
                    backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5'
                        }
                    }
                }
            }
        });
    }

    renderStatusChart() {
        const statusCounts = this.events.reduce((acc, event) => {
            acc[event.status] = (acc[event.status] || 0) + 1;
            return acc;
        }, {});

        const ctx = document.getElementById('statusChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Object.keys(statusCounts),
                datasets: [{
                    label: 'Events by Status',
                    data: Object.values(statusCounts),
                    backgroundColor: ['#4ade80', '#f87171', '#9ca3af']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#f5f5f5'
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    },
                    x: {
                        ticks: {
                            color: '#f5f5f5'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        }
                    }
                }
            }
        });
    }

    renderCalendar() {
        const container = document.getElementById('eventCalendar');
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        let calendarHTML = `
            <div class="calendar-header">
                <div class="calendar-month">${monthNames[month]} ${year}</div>
                <div class="calendar-nav">
                    <button class="btn btn--outline btn--sm">‹ Prev</button>
                    <button class="btn btn--outline btn--sm">Next ›</button>
                </div>
            </div>
            <div class="calendar-grid">
                ${dayNames.map(day => `<div class="calendar-day-header">${day}</div>`).join('')}
        `;
        
        for (let i = 0; i < 42; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            
            const isCurrentMonth = date.getMonth() === month;
            const dateString = date.toISOString().split('T')[0];
            const dayEvents = this.events.filter(event => event.date === dateString);
            
            calendarHTML += `
                <div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''}">
                    <div class="calendar-day-number">${date.getDate()}</div>
                    ${dayEvents.map(event => `
                        <div class="calendar-event" onclick="eventHub.showEventModal(${event.id})" title="${event.title}">
                            ${event.title.length > 15 ? event.title.substring(0, 15) + '...' : event.title}
                        </div>
                    `).join('')}
                </div>
            `;
        }
        
        calendarHTML += '</div>';
        container.innerHTML = calendarHTML;
    }

    renderProfile() {
        // Update profile information
        document.getElementById('profileName').textContent = this.currentUser.name;
        document.getElementById('profileEmail').textContent = this.currentUser.email;
        document.getElementById('profileRole').textContent = this.currentUser.role;
        document.getElementById('profileAvatar').textContent = this.currentUser.avatar;
        
        // Update form fields
        document.getElementById('profileNameInput').value = this.currentUser.name;
        document.getElementById('profileEmailInput').value = this.currentUser.email;
        document.getElementById('profileDepartmentInput').value = this.currentUser.department || '';
        
        // Update registered events
        const registeredEventsList = document.getElementById('registeredEventsList');
        if (this.currentUser.registeredEvents && this.currentUser.registeredEvents.length > 0) {
            const registeredEvents = this.events.filter(e => 
                this.currentUser.registeredEvents.includes(e.id)
            );
            
            registeredEventsList.innerHTML = registeredEvents.map(event => `
                <div class="registered-event-item">
                    <div>
                        <strong>${event.title}</strong>
                        <br><small>${this.formatDate(event.date)} at ${event.time}</small>
                    </div>
                    <span class="event-status status-${event.status}">${event.status}</span>
                </div>
            `).join('');
        } else {
            registeredEventsList.innerHTML = '<p>No registered events yet.</p>';
        }
    }

    getUpcomingEvents() {
        const today = new Date().toISOString().split('T')[0];
        return this.events
            .filter(event => event.date >= today && event.status === 'open')
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    clearFilters() {
        this.filters = { category: '', status: '', date: '' };
        document.getElementById('categoryFilter').value = '';
        document.getElementById('statusFilter').value = '';
        document.getElementById('dateFilter').value = '';
        this.renderEventsList();
    }

    debounceSearch() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            if (this.currentPage === 'events') {
                this.renderEventsList();
            }
        }, 300);
    }

    refreshCurrentView() {
        this.loadPageContent(this.currentPage);
        if (this.currentPage === 'home') {
            this.renderFeaturedEvents();
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4ade80' : type === 'error' ? '#f87171' : '#60a5fa'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    startRealTimeUpdates() {
        // Simulate real-time updates every 30 seconds
        setInterval(() => {
            // Randomly update event registrations
            const randomEvent = this.events[Math.floor(Math.random() * this.events.length)];
            if (randomEvent.status === 'open' && randomEvent.registered < randomEvent.maxCapacity) {
                const increment = Math.floor(Math.random() * 3) + 1;
                randomEvent.registered = Math.min(randomEvent.registered + increment, randomEvent.maxCapacity);
                
                if (randomEvent.registered >= randomEvent.maxCapacity) {
                    randomEvent.status = 'full';
                }
                
                // Refresh current view if needed
                if (this.currentPage === 'home' || this.currentPage === 'events' || this.currentPage === 'dashboard') {
                    this.refreshCurrentView();
                }
            }
        }, 30000);
    }
}

// Initialize the application
const eventHub = new EventHub();

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);