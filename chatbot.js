// Chatbot functionality
class Chatbot {
    constructor() {
        this.messages = [];
        this.initializeChatbot();
        this.setupEventListeners();
        this.addWelcomeMessage();
    }

    initializeChatbot() {
        this.toggle = document.getElementById('chatbot-toggle');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
    }

    setupEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChatbot());
        this.closeBtn.addEventListener('click', () => this.closeChatbot());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    toggleChatbot() {
        this.window.classList.toggle('hidden');
        if (!this.window.classList.contains('hidden')) {
            this.input.focus();
        }
    }

    closeChatbot() {
        this.window.classList.add('hidden');
    }

    addWelcomeMessage() {
        setTimeout(() => {
            this.addBotMessage("Hello! I'm here to help answer questions about BinCare.ca");
        }, 300);
        
        setTimeout(() => {
            this.addBotMessage("You can ask me about:\n\n• Our bin cleaning service\n• Pricing and service plans\n• How the process works\n• When we're launching\n• Contact information\n\nWhat would you like to know?");
        }, 800);
    }

    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot';
        // Convert line breaks to <br> tags for better formatting
        messageDiv.innerHTML = text.replace(/\n/g, '<br>');
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message user';
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    sendMessage() {
        const userMessage = this.input.value.trim();
        if (!userMessage) return;

        this.addUserMessage(userMessage);
        this.input.value = '';

        // Simulate thinking delay
        setTimeout(() => {
            const response = this.getResponse(userMessage);
            this.addBotMessage(response);
        }, 500);
    }

    getResponse(userMessage) {
        const message = userMessage.toLowerCase();

        // Service questions
        if (message.includes('service') || message.includes('what do you do') || message.includes('what is')) {
            return "We provide professional bin cleaning services!\n\nWe sanitize and deodorize your garbage bins using high-temperature pressure washing (200°F water at 3000 PSI) that kills 99% of germs and bacteria.\n\nOur service helps eliminate odors and keeps your bins clean and fresh!";
        }

        // Pricing questions
        if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('pricing')) {
            return "We offer affordable service plans (all prices in CAD):\n\n<strong>Monthly:</strong> $39/month for up to 2 bins\n<strong>Quarterly:</strong> $49 per cleaning\n<strong>Bi-Annual:</strong> $59 per cleaning\n<strong>One Time:</strong> $69 for a deep clean\n<strong>Commercial:</strong> $149 per dumpster\n\nAdditional bins are $10-20 each. No contract required!";
        }

        // Process questions
        if (message.includes('process') || message.includes('how does it work') || message.includes('how do you')) {
            return "Our process is simple:\n\n<strong>Step 1:</strong> The day after your garbage day, leave bins at the end of your driveway\n\n<strong>Step 2:</strong> We arrive between 7am-6pm to sanitize and deodorize\n\n<strong>Step 3:</strong> We collect all grey water for proper disposal\n\n<strong>Step 4:</strong> Bins are sanitized with 200°F water at 3000 PSI\n\n<strong>Step 5:</strong> Final inspection and eco-friendly odor treatment\n\nThen we return your bins to the curb!";
        }

        // Launch/start date
        if (message.includes('when') || message.includes('launch') || message.includes('start') || message.includes('available')) {
            return "We're launching in <strong>March 2026</strong>!\n\nJoin our waitlist now to be among the first customers when we start service. Just fill out the form on this page with your name, email, and phone number.";
        }

        // Contact information
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
            return "You can reach us at:\n\n<strong>Phone/Text:</strong> 519-497-6122\n<strong>Email:</strong> info@bincare.ca\n\nWe serve the Tri-City, Ontario area.";
        }

        // Location/area
        if (message.includes('where') || message.includes('location') || message.includes('area') || message.includes('serve')) {
            return "We serve the <strong>Tri-City, Ontario</strong> area.\n\nIf you're in this area, we'd love to help keep your bins clean!";
        }

        // Benefits/why
        if (message.includes('why') || message.includes('benefit') || message.includes('important')) {
            return "Cleaning your bins provides these benefits:\n\n• Removes stains and eliminates odors\n• Kills 99.9% of germs & viruses\n• Prevents unwanted bears, pests & rodents\n• Keeps your property clean and hygienic\n• Eco-friendly cleaning process\n\nIt's simple, cost-effective, and we offer flexible service plans!";
        }

        // Booking/signup
        if (message.includes('book') || message.includes('sign up') || message.includes('join') || message.includes('register')) {
            return "To join our waitlist, simply fill out the form on this page with your full name, email, and phone number.\n\nWe'll contact you when we launch in March 2026!\n\nYou can also call us at <strong>519-497-6122</strong> or email <strong>info@bincare.ca</strong>.";
        }

        // Contract questions
        if (message.includes('contract') || message.includes('commitment') || message.includes('cancel')) {
            return "<strong>No contract is required!</strong> You can cancel anytime.\n\nHowever, Quarterly and Monthly service plans require a 3-visit minimum, or you'll be billed for a One Time Cleaning fee.";
        }

        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! Thanks for your interest in BinCare.ca.\n\nHow can I help you today?";
        }

        // Thank you
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else you'd like to know about our bin cleaning service?";
        }

        // Default response
        return "I'm here to help! You can ask me about:\n\n• Our bin cleaning service\n• Pricing\n• The cleaning process\n• When we're launching\n• Contact information\n\nWhat would you like to know?";
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});

