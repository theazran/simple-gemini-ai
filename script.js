async function fetchAIChatData(input) {
    try {
        const encodedInput = encodeURIComponent(input);
        const apiUrl = `https://chat.ai.cneko.org/?t=${encodedInput}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const responseData = data.response;
        return responseData;
    } catch (error) {
        throw new Error('Error fetching data:', error);
    }
}
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const sendButton = document.querySelector('button');
    sendButton.disabled = true;

    const loader = document.querySelector('.spinner-border');
    loader.classList.remove('d-none');

    const chatLog = document.getElementById('chat-log');
    const userMessage = document.createElement('div');
    userMessage.textContent = userInput;
    userMessage.classList.add('message', 'user-message');
    chatLog.appendChild(userMessage);
    

    try {
        const aiMessageContainer = document.createElement('div');
        aiMessageContainer.classList.add('message', 'ai-message');
        chatLog.appendChild(aiMessageContainer);

        const typingAnimation = document.createElement('span');
        typingAnimation.classList.add('typing-animation');
        aiMessageContainer.appendChild(typingAnimation);

        const aiResponse = await fetchAIChatData(userInput);

        typingAnimation.remove();
        const aiMessage = document.createElement('div');
        aiMessage.textContent = aiResponse;
        aiMessageContainer.appendChild(aiMessage);
    } catch (error) {
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Error. Please try again.';
        errorMessage.classList.add('message', 'ai-message');
        errorMessage.style.color = 'red';
        chatLog.appendChild(errorMessage);
    }

    document.getElementById('user-input').value = '';

    sendButton.disabled = false;
    loader.classList.add('d-none');
}