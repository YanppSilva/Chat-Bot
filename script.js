const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatBotToggler = document.querySelector('.chatbot-toggler');

let userMessage;
const API_KEY = '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';

const createChatLi = (message, className) => {
  // Cria um elemento de chat <li> com a menssagem passada e a classe.
  const chatLi = document.createElement('li');
  chatLi.classList.add('chat', className);
  let chatContent = className === 'outgoing' ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector('p').textContent = message;
  return chatLi;
}

const generateResponse = (incomingChatLi) => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';
  const messageElement = incomingChatLi.querySelector('p');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: userMessage}]
    })
  }
  // Manda uma requisição POST para API e obtem resposta. 
  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    messageElement.textContent = data.choices[0].message.content;
  }).catch((error) => {
    messageElement.textContent = 'Oops! Algo deu errado. Tente novamente';
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  chatInput.value = '';
  
  // Anexa a mensagem do usuário à caixa de bate-papo
  chatbox.appendChild(createChatLi(userMessage, 'outgoing'));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    // Mostra a mensagem "Processando..." enquanto espera pela resposta do bot.
    const incomingChatLi = createChatLi('Processando...', 'incoming')
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    generateResponse(incomingChatLi);
  }, 600);
}
sendChatBtn.addEventListener('click', handleChat);
chatBotToggler.addEventListener('click', () => document.body.classList.toggle('show-chatbot'));