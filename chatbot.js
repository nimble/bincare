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
        const welcomeMessages = [
            "Hello! I'm here to help answer questions about BinCare.ca",
            "You can ask me about:",
            "• Our bin cleaning service",
            "• Pricing and service plans",
            "• How the process works",
            "• When we're launching (March 2025)",
            "• Contact information",
            "",
            "What would you like to know?"
        ];
        
        welcomeMessages.forEach((msg, index) => {
            setTimeout(() => {
                this.addBotMessage(msg);
            }, index * 300);
        });
    }

    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message bot';
        messageDiv.textContent = text;
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
            return "We provide professional bin cleaning services! We sanitize and deodorize your garbage bins using high-temperature pressure washing (200°F water at 3000 PSI) that kills 99% of germs and bacteria. Our service helps eliminate odors and keeps your bins clean and fresh.";
        }

        // Pricing questions
        if (message.includes('price') || message.includes('cost') || message.includes('how much') || message.includes('pricing')) {
            return "We offer several service plans:\n\n• Quarterly: $599 for up to 4 bins (+GST)\n• Monthly: $799 for up to 4 bins (+GST)\n• One Time: $299 for first 4 bins (+GST)\n• Bi-Annually: $349 for up to 4 bins (+GST)\n\nAdditional bins are $8-20 each depending on the plan. No contract required!";
        }

        // Process questions
        if (message.includes('process') || message.includes('how does it work') || message.includes('how do you')) {
            return "Our process is simple:\n\n1. The day after your garbage day, leave bins at the end of your driveway\n2. We arrive between 7am-6pm to sanitize and deodorize\n3. We collect all grey water for proper disposal\n4. Bins are sanitized with 200°F water at 3000 PSI\n5. Final inspection and eco-friendly odor treatment\n\nThen we return your bins to the curb!";
        }

        // Launch/start date
        if (message.includes('when') || message.includes('launch') || message.includes('start') || message.includes('available')) {
            return "We're launching in March 2026! Join our waitlist now to be among the first customers when we start service. Just fill out the form on this page with your name, email, and phone number.";
        }

        // Contact information
        if (message.includes('contact') || message.includes('phone') || message.includes('email') || message.includes('reach')) {
            return "You can reach us at:\n\n📞 Phone/Text: 519-497-6122\n📧 Email: info@bincare.ca\n\nWe serve the Tri-City, Ontario.";
        }

        // Location/area
        if (message.includes('where') || message.includes('location') || message.includes('area') || message.includes('serve')) {
            return "We serve the Tri-City, Ontario. If you're in this area, we'd love to help keep your bins clean!";
        }

        // Benefits/why
        if (message.includes('why') || message.includes('benefit') || message.includes('important')) {
            return "Cleaning your bins:\n\n✅ Removes stains and eliminates odors\n✅ Kills 99.9% of germs & viruses\n✅ Prevents unwanted bears, pests & rodents\n✅ Keeps your property clean and hygienic\n✅ Eco-friendly cleaning process\n\nIt's simple, cost-effective, and we offer flexible service plans!";
        }

        // Booking/signup
        if (message.includes('book') || message.includes('sign up') || message.includes('join') || message.includes('register')) {
            return "To join our waitlist, simply fill out the form on this page with your full name, email, and phone number. We'll contact you when we launch in March 2026! You can also call us at 519-497-6122 or email info@bincare.ca.";
        }

        // Contract questions
        if (message.includes('contract') || message.includes('commitment') || message.includes('cancel')) {
            return "No contract is required! You can cancel anytime. However, Quarterly and Monthly service plans require a 3-visit minimum, or you'll be billed for a One Time Cleaning fee.";
        }

        // Greetings
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return "Hello! Thanks for your interest in BinCare.ca. How can I help you today?";
        }

        // Thank you
        if (message.includes('thank') || message.includes('thanks')) {
            return "You're welcome! Is there anything else you'd like to know about our bin cleaning service?";
        }

        // Default response
        return "I'm here to help! You can ask me about our bin cleaning service, pricing, the cleaning process, when we're launching (March 2025), or contact information. What would you like to know?";
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});

