/**
 * racing.js - Racing events functionality for Aubrey's RC website
 * Part of the simplified file structure approach for www.aubreysrc.com
 */

class RacingEvents {
    constructor() {
        // Current month and year being displayed
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        
        // DOM Elements
        this.elements = {
            currentMonthDisplay: document.getElementById('current-month'),
            prevMonthBtn: document.getElementById('prev-month'),
            nextMonthBtn: document.getElementById('next-month'),
            calendarViewBtn: document.getElementById('calendar-view-btn'),
            listViewBtn: document.getElementById('list-view-btn'),
            calendarView: document.getElementById('calendar-view'),
            listView: document.getElementById('list-view'),
            eventDetails: document.getElementById('event-details'),
            eventTitle: document.getElementById('event-title'),
            eventDate: document.getElementById('event-date'),
            eventTime: document.getElementById('event-time'),
            eventLocation: document.getElementById('event-location'),
            eventDescription: document.getElementById('event-description'),
            eventWebsite: document.getElementById('event-website'),
            eventDirections: document.getElementById('event-directions'),
            closeDetails: document.getElementById('close-details')
        };
        
        // Events data - this will be loaded from JSON
        this.events = [];
        
        // Initialize racing events features
        this.initialize();
    }
    
    // Initialize the racing events functionality
    initialize() {
        // Load events data
        this.loadEvents();
        
        // Set current month display
        this.updateMonthDisplay();
        
        // Add event listeners
        this.attachEventListeners();
    }
    
    // Load events data from JSON file or localStorage
    loadEvents() {
        // Simulate loading with some sample data
        // In production, this would load from a JSON file or API
        this.events = [
            {
                id: 'event1',
                title: 'Iowa RC Speedway Weekend',
                date: new Date(2025, 2, 15), // March 15, 2025
                startTime: '10:00 AM',
                endTime: '4:00 PM',
                location: 'Iowa RC Speedway, Des Moines, IA',
                description: 'Join us for a weekend of exciting RC racing at the Iowa RC Speedway. All classes welcome, from beginners to pros. Aubrey\'s RC will be there with technical support and racing in the 1/10 truck class.',
                website: 'https://www.iowareraceway.com',
                coordinates: '41.5868, -93.6250' // For Google Maps directions
            },
            {
                id: 'event2',
                title: 'Midwest RC Crawlers Championship',
                date: new Date(2025, 3, 10), // April 10, 2025
                startTime: '9:00 AM',
                endTime: '5:00 PM',
                location: 'Rock Canyon Park, Cedar Rapids, IA',
                description: 'The annual Midwest RC Crawlers Championship brings together the best technical drivers in the region. Challenging courses, great prizes, and an amazing community atmosphere.',
                website: 'https://www.midwestcrawlers.com',
                coordinates: '41.9779, -91.6656'
            },
            {
                id: 'event3',
                title: 'Wellsburg RC Club Meet',
                date: new Date(2025, 2, 25), // March 25, 2025
                startTime: '1:00 PM',
                endTime: '6:00 PM',
                location: 'Wellsburg Community Center, Wellsburg, IA',
                description: 'Monthly meet of the Wellsburg RC Club. Informal racing and skill demonstrations. Aubrey from Aubrey\'s RC will be giving a tech talk on motor tuning for better performance.',
                website: 'https://www.wellsburgrc.org',
                coordinates: '42.4566, -92.9253'
            },
            {
                id: 'event4',
                title: 'Dragstrip Showdown',
                date: new Date(2025, 3, 20), // April 20, 2025
                startTime: '6:00 PM',
                endTime: '10:00 PM',
                location: 'RC Raceway, Waterloo, IA',
                description: 'Night racing on the fastest RC drag strip in Iowa. Classes include stock and modified. Registration opens at 5:00 PM, racing starts at 6:30 PM sharp.',
                website: 'https://www.rcraceway.com',
                coordinates: '42.4927, -92.3495'
            },
            {
                id: 'event5',
                title: 'Spring RC Festival',
                date: new Date(2025, 4, 5), // May 5, 2025
                startTime: '10:00 AM',
                endTime: '7:00 PM',
                location: 'Fairgrounds, Ames, IA',
                description: 'The biggest RC event of the season! Vendors, demonstrations, racing, and more. Aubrey\'s RC will have a booth with special discounts and custom builds on display.',
                website: 'https://www.springrcfest.com',
                coordinates: '42.0307, -93.6319'
            }
        ];
        
        // Render initial view (calendar by default)
        this.renderCalendarView();
    }
    
    // Update the month display with current month and year
    updateMonthDisplay() {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        
        this.elements.currentMonthDisplay.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
    }
    
    // Attach event listeners to interactive elements
    attachEventListeners() {
        // Month navigation
        this.elements.prevMonthBtn.addEventListener('click', () => {
            this.navigateMonth(-1);
        });
        
        this.elements.nextMonthBtn.addEventListener('click', () => {
            this.navigateMonth(1);
        });
        
        // View toggle
        this.elements.calendarViewBtn.addEventListener('click', () => {
            this.toggleView('calendar');
        });
        
        this.elements.listViewBtn.addEventListener('click', () => {
            this.toggleView('list');
        });
        
        // Close event details
        if (this.elements.closeDetails) {
            this.elements.closeDetails.addEventListener('click', () => {
                this.closeEventDetails();
            });
        }
    }
    
    // Navigate to previous or next month
    navigateMonth(direction) {
        this.currentMonth += direction;
        
        // Handle year change
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        } else if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        
        // Update display
        this.updateMonthDisplay();
        
        // Re-render the active view
        if (this.elements.calendarView.style.display !== 'none') {
            this.renderCalendarView();
        } else {
            this.renderListView();
        }
    }
    
    // Toggle between calendar and list views
    toggleView(viewType) {
        if (viewType === 'calendar') {
            this.elements.calendarView.style.display = 'block';
            this.elements.listView.style.display = 'none';
            this.elements.calendarViewBtn.classList.add('active');
            this.elements.listViewBtn.classList.remove('active');
            this.renderCalendarView();
        } else {
            this.elements.calendarView.style.display = 'none';
            this.elements.listView.style.display = 'block';
            this.elements.calendarViewBtn.classList.remove('active');
            this.elements.listViewBtn.classList.add('active');
            this.renderListView();
        }
    }
    
    // Render the calendar view for the current month
    renderCalendarView() {
        // Clear the existing calendar
        this.elements.calendarView.innerHTML = '';
        
        // Get the first day of the month
        const firstDay = new Date(this.currentYear, this.currentMonth, 1);
        
        // Get the last day of the month
        const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
        
        // Calculate the number of days in the month
        const daysInMonth = lastDay.getDate();
        
        // Calculate the day of the week the first day falls on (0 = Sunday, 6 = Saturday)
        const firstDayIndex = firstDay.getDay();
        
        // Create the day names header
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const dayNamesHeader = document.createElement('div');
        dayNamesHeader.className = 'calendar-day-names';
        
        dayNames.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day-name';
            dayElement.textContent = day;
            dayNamesHeader.appendChild(dayElement);
        });
        
        this.elements.calendarView.appendChild(dayNamesHeader);
        
        // Create the calendar grid
        const calendarGrid = document.createElement('div');
        calendarGrid.className = 'calendar-grid';
        
        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayIndex; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day inactive';
            calendarGrid.appendChild(emptyDay);
        }
        
        // Add cells for each day of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            // Add day number
            const dayNumber = document.createElement('div');
            dayNumber.className = 'calendar-day-number';
            dayNumber.textContent = day;
            dayCell.appendChild(dayNumber);
            
            // Check for events on this day
            const currentDate = new Date(this.currentYear, this.currentMonth, day);
            const dayEvents = this.events.filter(event => 
                event.date.getDate() === day && 
                event.date.getMonth() === this.currentMonth && 
                event.date.getFullYear() === this.currentYear
            );
            
            // Add events to the day cell
            dayEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'day-event';
                eventElement.textContent = event.title;
                eventElement.dataset.eventId = event.id;
                
                // Add click event to show details
                eventElement.addEventListener('click', () => {
                    this.showEventDetails(event);
                });
                
                dayCell.appendChild(eventElement);
            });
            
            calendarGrid.appendChild(dayCell);
        }
        
        this.elements.calendarView.appendChild(calendarGrid);
    }
    
    // Render the list view for the current month
    renderListView() {
        // Clear the existing list
        this.elements.listView.innerHTML = '';
        
        // Get events for the current month
        const monthEvents = this.events.filter(event => 
            event.date.getMonth() === this.currentMonth && 
            event.date.getFullYear() === this.currentYear
        );
        
        // Sort events by date
        monthEvents.sort((a, b) => a.date - b.date);
        
        // Create the event list
        const eventList = document.createElement('div');
        eventList.className = 'event-list';
        
        if (monthEvents.length === 0) {
            const noEvents = document.createElement('div');
            noEvents.className = 'no-events';
            noEvents.textContent = 'No events scheduled for this month.';
            eventList.appendChild(noEvents);
        } else {
            // Add each event to the list
            monthEvents.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = 'list-event';
                eventElement.dataset.eventId = event.id;
                
                // Create date box
                const dateBox = document.createElement('div');
                dateBox.className = 'event-date-box';
                
                const monthElement = document.createElement('div');
                monthElement.className = 'event-date-month';
                monthElement.textContent = this.getMonthAbbreviation(event.date.getMonth());
                
                const dayElement = document.createElement('div');
                dayElement.className = 'event-date-day';
                dayElement.textContent = event.date.getDate();
                
                dateBox.appendChild(monthElement);
                dateBox.appendChild(dayElement);
                
                // Create event info
                const eventInfo = document.createElement('div');
                eventInfo.className = 'event-info';
                
                const titleElement = document.createElement('h4');
                titleElement.textContent = event.title;
                
                const metaElement = document.createElement('div');
                metaElement.className = 'event-info-meta';
                
                const timeElement = document.createElement('span');
                timeElement.textContent = `${event.startTime} - ${event.endTime}`;
                
                const locationElement = document.createElement('span');
                locationElement.textContent = event.location.split(',')[0]; // Show only the venue name
                
                metaElement.appendChild(timeElement);
                metaElement.appendChild(locationElement);
                
                eventInfo.appendChild(titleElement);
                eventInfo.appendChild(metaElement);
                
                // Assemble the event element
                eventElement.appendChild(dateBox);
                eventElement.appendChild(eventInfo);
                
                // Add click event to show details
                eventElement.addEventListener('click', () => {
                    this.showEventDetails(event);
                });
                
                eventList.appendChild(eventElement);
            });
        }
        
        this.elements.listView.appendChild(eventList);
    }
    
    // Show event details
    showEventDetails(event) {
        // Populate event details
        this.elements.eventTitle.textContent = event.title;
        
        // Format date
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        this.elements.eventDate.textContent = event.date.toLocaleDateString('en-US', options);
        
        // Set time
        this.elements.eventTime.textContent = `${event.startTime} - ${event.endTime}`;
        
        // Set location
        this.elements.eventLocation.textContent = event.location;
        
        // Set description
        this.elements.eventDescription.textContent = event.description;
        
        // Set links
        this.elements.eventWebsite.href = event.website;
        
        // Set Google Maps directions link
        if (event.coordinates) {
            this.elements.eventDirections.href = `https://www.google.com/maps/dir/?api=1&destination=${event.coordinates}`;
        } else {
            this.elements.eventDirections.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;
        }
        
        // Show the details container
        this.elements.eventDetails.style.display = 'block';
        
        // Scroll to details
        this.elements.eventDetails.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close event details panel
    closeEventDetails() {
        this.elements.eventDetails.style.display = 'none';
    }
    
    // Helper function to get month abbreviation
    getMonthAbbreviation(monthIndex) {
        const monthAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthAbbreviations[monthIndex];
    }
    
    // Add a new event (can be called from external admin interfaces)
    addEvent(eventData) {
        // Ensure date is a Date object
        if (!(eventData.date instanceof Date)) {
            eventData.date = new Date(eventData.date);
        }
        
        // Generate a unique ID if not provided
        if (!eventData.id) {
            eventData.id = 'event_' + Date.now();
        }
        
        // Add the event to the array
        this.events.push(eventData);
        
        // Save events to localStorage for persistence
        this.saveEvents();
        
        // Re-render the current view
        if (this.elements.calendarView.style.display !== 'none') {
            this.renderCalendarView();
        } else {
            this.renderListView();
        }
        
        return eventData.id; // Return the ID of the new event
    }
    
    // Update an existing event
    updateEvent(eventId, updatedData) {
        // Find the event index
        const eventIndex = this.events.findIndex(event => event.id === eventId);
        
        if (eventIndex !== -1) {
            // Ensure date is a Date object if provided
            if (updatedData.date && !(updatedData.date instanceof Date)) {
                updatedData.date = new Date(updatedData.date);
            }
            
            // Update the event with new data
            this.events[eventIndex] = { ...this.events[eventIndex], ...updatedData };
            
            // Save events to localStorage
            this.saveEvents();
            
            // Re-render the current view
            if (this.elements.calendarView.style.display !== 'none') {
                this.renderCalendarView();
            } else {
                this.renderListView();
            }
            
            return true;
        }
        
        return false; // Event not found
    }
    
    // Delete an event
    deleteEvent(eventId) {
        // Filter out the event with the specified ID
        const initialLength = this.events.length;
        this.events = this.events.filter(event => event.id !== eventId);
        
        // Check if an event was removed
        if (this.events.length < initialLength) {
            // Save events to localStorage
            this.saveEvents();
            
            // Re-render the current view
            if (this.elements.calendarView.style.display !== 'none') {
                this.renderCalendarView();
            } else {
                this.renderListView();
            }
            
            return true;
        }
        
        return false; // Event not found
    }
    
    // Save events to localStorage for persistence
    saveEvents() {
        // Convert dates to strings for storage
        const eventsToSave = this.events.map(event => ({
            ...event,
            date: event.date.toISOString() // Convert Date to string
        }));
        
        localStorage.setItem('aubreysrc_events', JSON.stringify(eventsToSave));
    }
    
    // Load events from localStorage
    loadEventsFromStorage() {
        const storedEvents = localStorage.getItem('aubreysrc_events');
        
        if (storedEvents) {
            try {
                // Parse the stored events and convert date strings back to Date objects
                const parsedEvents = JSON.parse(storedEvents);
                this.events = parsedEvents.map(event => ({
                    ...event,
                    date: new Date(event.date) // Convert string back to Date
                }));
                
                // Re-render the current view
                if (this.elements.calendarView && this.elements.listView) {
                    if (this.elements.calendarView.style.display !== 'none') {
                        this.renderCalendarView();
                    } else {
                        this.renderListView();
                    }
                }
                
                return true;
            } catch (error) {
                console.error('Error loading events from storage:', error);
                return false;
            }
        }
        
        return false;
    }
    
    // Import events from a JSON file
    importEventsFromJSON(jsonData) {
        try {
            // Parse the JSON if it's a string
            const eventsData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
            
            // Validate the format
            if (!Array.isArray(eventsData)) {
                throw new Error('Events data must be an array');
            }
            
            // Process each event
            const processedEvents = eventsData.map(event => ({
                ...event,
                date: new Date(event.date), // Convert date string to Date object
                id: event.id || 'event_' + Date.now() + '_' + Math.floor(Math.random() * 1000) // Generate ID if not present
            }));
            
            // Replace or merge with existing events (replace in this example)
            this.events = processedEvents;
            
            // Save to localStorage
            this.saveEvents();
            
            // Re-render the current view
            if (this.elements.calendarView.style.display !== 'none') {
                this.renderCalendarView();
            } else {
                this.renderListView();
            }
            
            return true;
        } catch (error) {
            console.error('Error importing events from JSON:', error);
            return false;
        }
    }
    
    // Export events to JSON
    exportEventsToJSON() {
        // Convert dates to strings for export
        const eventsToExport = this.events.map(event => ({
            ...event,
            date: event.date.toISOString() // Convert Date to string
        }));
        
        return JSON.stringify(eventsToExport, null, 2); // Pretty-print with 2-space indentation
    }
}

// Initialize racing events when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.racingEvents = new RacingEvents();
});