// AI Chatbot with Firebase Cloud Function Integration
// chatbot.js

// Firebase Cloud Function URL
const FIREBASE_FUNCTION_URL = 'https://chatwithai-itb4a2oayq-uc.a.run.app';

// Updated contact email
const CONTACT_EMAIL = 'afsar.tech005@gmail.com';

// System prompt to guide the AI's responses
const SYSTEM_PROMPT = `You are an AI assistant for Afsar Ali, a Flutter & AI Developer. Your role is to help visitors learn about his services and expertise.

SERVICES OFFERED:
1. Flutter Mobile App Development
   - Cross-platform apps for Android, iOS, Web, and Windows
   - Clean, modern UI/UX design
   - Firebase integration (Auth, Database, Storage, Notifications)
   - State management (GetX, Provider, Riverpod)
   - RESTful API integration
   - Pricing: Starting from $100-$2000 depending on complexity
   - Timeline: 2-8 weeks for most projects

2. Web Development
   - Responsive websites and web applications
   - Modern frameworks (React, Vue, vanilla JS)
   - WordPress development and customization
   - E-commerce solutions
   - Pricing: $90-$1500 depending on requirements
   - Timeline: 1-4 weeks

3. AI Chatbots & Automation
   - Custom AI chatbots using OpenAI, Claude, or other LLMs
   - Intelligent customer service automation
   - Workflow automation solutions
   - Integration with existing systems
   - Pricing: $150-$2000 based on complexity
   - Timeline: 1-3 weeks

4. API Integrations
   - Third-party API integration
   - Custom API development
   - Payment gateway integration (Stripe, PayPal)
   - Social media API integration
   - Pricing: $199-$800 per integration
   - Timeline: Few days to 1 week

ABOUT AFSAR:
- 3+ years of experience in Flutter development
- 20+ completed projects
- Freelance developer on Upwork
- Specializes in clean code and intuitive design
- Available for freelance projects
- Contact: ${CONTACT_EMAIL}
- Location: Lahore, Pakistan

RESPONSE GUIDELINES:
- Be friendly, professional, and helpful
- Provide specific pricing and timeline estimates
- Encourage visitors to contact Afsar for custom quotes at ${CONTACT_EMAIL}
- Ask clarifying questions when needed
- Keep responses concise but informative
- If asked about something outside your knowledge, politely redirect to contacting Afsar directly at ${CONTACT_EMAIL}`;

class Chatbot {
    constructor() {
        this.modal = document.getElementById('chatbot-modal');
        this.container = document.getElementById('chatbot-container');
        this.toggleBtn = document.getElementById('chatbot-toggle');
        this.closeBtn = document.getElementById('close-chatbot');
        this.form = document.getElementById('chat-form');
        this.input = document.getElementById('chat-input');
        this.messagesContainer = document.getElementById('chat-messages');
        this.sendBtn = document.getElementById('send-message');
        this.notification = document.getElementById('chat-notification');
        
        this.conversationHistory = [
            {
                role: 'system',
                content: SYSTEM_PROMPT
            }
        ];
        
        this.init();
    }

    init() {
        // Event listeners
        this.toggleBtn.addEventListener('click', () => this.open());
        this.closeBtn.addEventListener('click', () => this.close());
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Close on backdrop click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.close();
        });

        // Show notification after 5 seconds if not opened
        setTimeout(() => {
            if (!this.modal.classList.contains('active')) {
                this.notification.classList.remove('hidden');
            }
        }, 5000);
    }

    open() {
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        setTimeout(() => {
            this.modal.classList.add('active');
            this.container.classList.remove('scale-95', 'opacity-0');
            this.container.classList.add('scale-100', 'opacity-100');
        }, 10);
        this.notification.classList.add('hidden');
        this.input.focus();
    }

    close() {
        this.container.classList.remove('scale-100', 'opacity-100');
        this.container.classList.add('scale-95', 'opacity-0');
        this.modal.classList.remove('active');
        setTimeout(() => {
            this.modal.classList.remove('flex');
            this.modal.classList.add('hidden');
        }, 300);
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.input.value = '';
        
        // Show typing indicator
        this.showTypingIndicator();
        
        // Disable input
        this.input.disabled = true;
        this.sendBtn.disabled = true;

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Remove typing indicator
            this.removeTypingIndicator();
            
            // Add AI response
            this.addMessage(response, 'assistant');
        } catch (error) {
            console.error('Error:', error);
            this.removeTypingIndicator();
            this.addMessage('Sorry, I encountered an error. Please try again or contact Afsar directly at ' + CONTACT_EMAIL, 'assistant');
        } finally {
            // Re-enable input
            this.input.disabled = false;
            this.sendBtn.disabled = false;
            this.input.focus();
        }
    }

    async getAIResponse(userMessage) {
        // Add user message to conversation history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        try {
            // Call Firebase Cloud Function
            const response = await fetch(FIREBASE_FUNCTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: this.conversationHistory
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Response Error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            console.log('API Response:', data); // Debug log

            // Validate response structure
            if (data && data.choices && data.choices.length > 0) {
                const assistantMessage = data.choices[0].message.content;
                
                // Add assistant response to conversation history
                this.conversationHistory.push({
                    role: 'assistant',
                    content: assistantMessage
                });

                return assistantMessage;
            } else {
                console.error('Unexpected response structure:', data);
                throw new Error('Unexpected API response structure');
            }
        } catch (error) {
            console.error('Error in getAIResponse:', error);
            // Remove the user message from history if request failed
            this.conversationHistory.pop();
            throw error;
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex items-start space-x-3 chat-message';
        
        if (sender === 'user') {
            messageDiv.classList.add('flex-row-reverse', 'space-x-reverse');
            messageDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-user text-white text-sm"></i>
                </div>
                <div class="flex-1 max-w-sm">
                    <div class="bg-gradient-to-br from-accent-blue to-accent-purple text-white rounded-2xl rounded-tr-sm p-4">
                        <p class="text-sm">${this.escapeHtml(text)}</p>
                    </div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
                    <i class="fas fa-robot text-white text-sm"></i>
                </div>
                <div class="flex-1">
                    <div class="bg-gray-100 dark:bg-dark-secondary rounded-2xl rounded-tl-sm p-4">
                        <p class="text-sm">${this.formatMessage(text)}</p>
                    </div>
                </div>
            `;
        }
        
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'typing-indicator';
        indicator.className = 'flex items-start space-x-3';
        indicator.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center flex-shrink-0">
                <i class="fas fa-robot text-white text-sm"></i>
            </div>
            <div class="flex-1">
                <div class="bg-gray-100 dark:bg-dark-secondary rounded-2xl rounded-tl-sm p-4">
                    <div class="loading-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    formatMessage(text) {
        // Convert markdown-style formatting to HTML
        text = this.escapeHtml(text);
        
        // Bold
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Italic
        text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Line breaks
        text = text.replace(/\n/g, '<br>');
        
        // Bullet points
        text = text.replace(/^- (.*?)$/gm, '• $1');
        
        return text;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the chatbot
    new Chatbot();
    console.log('✅ Chatbot initialized with Firebase Cloud Function');
    console.log('📡 Using endpoint:', FIREBASE_FUNCTION_URL);
});

// Note: Your Firebase Cloud Function handles the OpenAI API calls securely
// The API key is stored as an environment variable in Firebase Functions
// No need to expose it in the frontend code