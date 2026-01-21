// AI Chatbot with OpenAI Integration
// chatbot.js

// ⚠️ IMPORTANT: Replace with your actual OpenAI API key
// For production, use environment variables or backend proxy
const aikey = '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';

// System prompt to guide the AI's responses
const SYSTEM_PROMPT = `You are an AI assistant for Afsar Ali, a Flutter & AI Developer. Your role is to help visitors learn about his services and expertise.

SERVICES OFFERED:
1. Flutter Mobile App Development
   - Cross-platform apps for Android, iOS, Web, and Windows
   - Clean, modern UI/UX design
   - Firebase integration (Auth, Database, Storage, Notifications)
   - State management (GetX, Provider, Riverpod)
   - RESTful API integration
   - Pricing: Starting from $500-$2000 depending on complexity
   - Timeline: 2-8 weeks for most projects

2. Web Development
   - Responsive websites and web applications
   - Modern frameworks (React, Vue, vanilla JS)
   - WordPress development and customization
   - E-commerce solutions
   - Pricing: $300-$1500 depending on requirements
   - Timeline: 1-4 weeks

3. AI Chatbots & Automation
   - Custom AI chatbots using OpenAI, Claude, or other LLMs
   - Intelligent customer service automation
   - Workflow automation solutions
   - Integration with existing systems
   - Pricing: $400-$2000 based on complexity
   - Timeline: 1-3 weeks

4. API Integrations
   - Third-party API integration
   - Custom API development
   - Payment gateway integration (Stripe, PayPal)
   - Social media API integration
   - Pricing: $200-$800 per integration
   - Timeline: Few days to 1 week

ABOUT AFSAR:
- 3+ years of experience in Flutter development
- 20+ completed projects
- Freelance developer on Upwork
- Specializes in clean code and intuitive design
- Available for freelance projects
- Contact: afsarprogrammer123@gmail.com
- Location: Pakistan

RESPONSE GUIDELINES:
- Be friendly, professional, and helpful
- Provide specific pricing and timeline estimates
- Encourage visitors to contact Afsar for custom quotes
- Ask clarifying questions when needed
- Keep responses concise but informative
- If asked about something outside your knowledge, politely redirect to contacting Afsar directly`;

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
            this.addMessage('Sorry, I encountered an error. Please try again or contact Afsar directly at afsarprogrammer123@gmail.com', 'assistant');
        } finally {
            // Re-enable input
            this.input.disabled = false;
            this.sendBtn.disabled = false;
            this.input.focus();
        }
    }

    async getAIResponse(userMessage) {
        // Add user message to history
        this.conversationHistory.push({
            role: 'user',
            content: userMessage
        });

        // Call OpenAI API
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${aikey}`
            },
            body: JSON.stringify({
                model: 'gpt-4', // or 'gpt-3.5-turbo' for faster/cheaper responses
                messages: this.conversationHistory,
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        // Add assistant response to history
        this.conversationHistory.push({
            role: 'assistant',
            content: assistantMessage
        });

        return assistantMessage;
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
    // Check if API key is set
    if (aikey === 'YOUR_OPENAI_API_KEY_HERE') {
        console.warn('⚠️ OpenAI API key not set! Chatbot will not work properly.');
        console.log('Please add your API key in chatbot.js');
        
        // Show a message in the chatbot
        setTimeout(() => {
            const chatbot = new Chatbot();
            chatbot.addMessage(
                'The chatbot is currently in demo mode. To enable AI responses, please configure the OpenAI API key in the chatbot.js file. For now, you can contact Afsar directly at afsar.tech005@gmail.com',
                'assistant'
            );
        }, 100);
    } else {
        new Chatbot();
    }
});

// Alternative: Backend Proxy Approach (Recommended for Production)
// Instead of using API key directly in frontend, create a backend endpoint

/*
// Example backend endpoint (Node.js/Express)
app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: history,
                max_tokens: 500
            })
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get response' });
    }
});

// Then update the frontend to call your backend:
async getAIResponse(userMessage) {
    this.conversationHistory.push({
        role: 'user',
        content: userMessage
    });

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userMessage,
            history: this.conversationHistory
        })
    });

    const data = await response.json();
    const assistantMessage = data.choices[0].message.content;

    this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
    });

    return assistantMessage;
}
*/
