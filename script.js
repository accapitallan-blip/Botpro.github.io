document.getElementById('sendBtn').addEventListener('click', () => {
  const input = document.getElementById('userInput');
  const message = input.value.trim();
  if (!message) return;
  const chatMessages = document.getElementById('chatMessages');
  const userMsg = document.createElement('div');
  userMsg.className = 'message user';
  userMsg.textContent = message;
  chatMessages.appendChild(userMsg);
  input.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Aquí iría la llamada a la API de OpenAI
  const botMsg = document.createElement('div');
  botMsg.className = 'message bot';
  botMsg.textContent = 'Procesando tu solicitud...';
  chatMessages.appendChild(botMsg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});
