// Dashboard JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize dashboard
    initializeDashboard();
    
    // Menu toggle functionality
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function(e) {
        handleSearch(e.target.value);
    });
    
    // Navigation item clicks
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            setActiveNavItem(this);
        });
    });
    
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(tab => {
        tab.addEventListener('click', function() {
            setActiveTab(this);
        });
    });
    
    // Initialize charts
    initializeLeadsChart();
    
    // Initialize stat cards with animation
    animateStatCards();
    
    // Handle widget actions
    setupWidgetActions();
    
    // Auto-refresh data every 30 seconds
    setInterval(refreshDashboardData, 30000);
});

// Initialize dashboard with sample data
function initializeDashboard() {
    console.log('Dashboard initialized');
    
    // Sample data for demonstration
    const dashboardData = {
        invoices: {
            awaiting: 0,
            total: 0
        },
        leads: {
            converted: 0,
            total: 0
        },
        projects: {
            inProgress: 1,
            total: 1
        },
        tasks: {
            notFinished: 1,
            total: 1
        }
    };
    
    updateStatCards(dashboardData);
}

// Update stat cards with data
function updateStatCards(data) {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        const progressBar = card.querySelector('.progress-fill');
        const countElement = card.querySelector('.stat-count');
        
        let percentage = 0;
        let count = '';
        
        switch(index) {
            case 0: // Invoices
                percentage = data.invoices.total > 0 ? (data.invoices.awaiting / data.invoices.total) * 100 : 0;
                count = `${data.invoices.awaiting} / ${data.invoices.total}`;
                break;
            case 1: // Leads
                percentage = data.leads.total > 0 ? (data.leads.converted / data.leads.total) * 100 : 0;
                count = `${data.leads.converted} / ${data.leads.total}`;
                break;
            case 2: // Projects
                percentage = data.projects.total > 0 ? (data.projects.inProgress / data.projects.total) * 100 : 0;
                count = `${data.projects.inProgress} / ${data.projects.total}`;
                break;
            case 3: // Tasks
                percentage = data.tasks.total > 0 ? (data.tasks.notFinished / data.tasks.total) * 100 : 0;
                count = `${data.tasks.notFinished} / ${data.tasks.total}`;
                break;
        }
        
        countElement.textContent = count;
        progressBar.style.width = percentage + '%';
    });
}

// Animate stat cards on load
function animateStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}

// Handle search functionality
function handleSearch(query) {
    console.log('Searching for:', query);
    
    // In a real application, this would filter dashboard content
    // For demo purposes, we'll just log the search
    if (query.length > 2) {
        // Simulate search results
        showSearchResults(query);
    }
}

// Show search results (demo function)
function showSearchResults(query) {
    // This would typically show a dropdown with search results
    console.log(`Found results for: ${query}`);
}

// Set active navigation item
function setActiveNavItem(clickedItem) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked item
    clickedItem.classList.add('active');
    
    // Update main content based on selection
    const itemText = clickedItem.querySelector('span').textContent;
    updateMainContent(itemText);
}

// Update main content based on navigation
function updateMainContent(section) {
    console.log('Navigating to:', section);
    
    // In a real application, this would load different content
    // For demo purposes, we'll just update the title
    const mainContent = document.querySelector('.main-content');
    
    // You could add different content sections here
    switch(section) {
        case 'Dashboard':
            // Already showing dashboard
            break;
        case 'Customers':
            // Load customers content
            break;
        case 'Sales':
            // Load sales content
            break;
        // Add more cases as needed
    }
}

// Set active tab
function setActiveTab(clickedTab) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-btn').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    clickedTab.classList.add('active');
    
    // Update tab content
    const tabText = clickedTab.textContent.trim();
    updateTabContent(tabText);
}

// Update tab content
function updateTabContent(tabName) {
    console.log('Loading tab:', tabName);
    
    // In a real application, this would load different tab content
    // For demo purposes, we'll just log the tab change
}

// Initialize leads chart
function initializeLeadsChart() {
    const canvas = document.getElementById('leadsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 30;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw pie chart (demo data: 70% customers, 30% lost leads)
    const customerAngle = (70 / 100) * 2 * Math.PI;
    const lostLeadsAngle = (30 / 100) * 2 * Math.PI;
    
    // Draw customer segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, customerAngle);
    ctx.closePath();
    ctx.fillStyle = '#4caf50';
    ctx.fill();
    
    // Draw lost leads segment
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, customerAngle, customerAngle + lostLeadsAngle);
    ctx.closePath();
    ctx.fillStyle = '#f44336';
    ctx.fill();
    
    // Add border
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Setup widget actions
function setupWidgetActions() {
    // View All button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            console.log('View all todos clicked');
            // In a real app, this would open a full todos page
        });
    }
    
    // New To Do button
    const newTodoBtn = document.querySelector('.new-todo-btn');
    if (newTodoBtn) {
        newTodoBtn.addEventListener('click', function() {
            console.log('New todo clicked');
            // In a real app, this would open a new todo modal
            showNewTodoModal();
        });
    }
    
    // Settings button
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function() {
            console.log('Settings clicked');
        });
    }
    
    // Dashboard options button
    const optionsBtn = document.querySelector('.options-btn');
    if (optionsBtn) {
        optionsBtn.addEventListener('click', function() {
            console.log('Dashboard options clicked');
            showDashboardOptions();
        });
    }
}

// Show new todo modal (demo function)
function showNewTodoModal() {
    // In a real application, this would show a modal
    const todoText = prompt('Enter new todo item:');
    if (todoText) {
        addTodoItem(todoText);
    }
}

// Add todo item (demo function)
function addTodoItem(text) {
    console.log('Adding todo:', text);
    // In a real app, this would add the todo to the database and update the UI
}

// Show dashboard options (demo function)
function showDashboardOptions() {
    // In a real application, this would show configuration options
    console.log('Showing dashboard options');
}

// Refresh dashboard data
function refreshDashboardData() {
    console.log('Refreshing dashboard data...');
    
    // In a real application, this would fetch fresh data from the server
    // For demo purposes, we'll simulate some data changes
    const updatedData = {
        invoices: {
            awaiting: Math.floor(Math.random() * 5),
            total: 10
        },
        leads: {
            converted: Math.floor(Math.random() * 3),
            total: 8
        },
        projects: {
            inProgress: Math.floor(Math.random() * 4) + 1,
            total: 5
        },
        tasks: {
            notFinished: Math.floor(Math.random() * 3) + 1,
            total: 6
        }
    };
    
    updateStatCards(updatedData);
    updateLastRefreshTime();
}

// Update last refresh time
function updateLastRefreshTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    console.log(`Last refreshed: ${timeString}`);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Utility function to format percentage
function formatPercentage(value) {
    return `${Math.round(value)}%`;
}

// Handle window resize
window.addEventListener('resize', function() {
    // Redraw charts on resize
    setTimeout(() => {
        initializeLeadsChart();
    }, 100);
});

// Handle page visibility change
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // Page became visible, refresh data
        refreshDashboardData();
    }
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeDashboard,
        updateStatCards,
        handleSearch,
        setActiveNavItem,
        setActiveTab,
        refreshDashboardData
    };
}