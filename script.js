const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');

let userMessage;
const API_KEY = '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';

const createChatLi = (message, className) => {
  // Cria um elemento de chat <li> com a menssagem passada e a classe.
  const chatLi = document.createElement('li');
  chatLi.classList.add('chat', className);
  let chatContent = className === 'outgoing' ? `<p>${message}</p>` : `<p>${message}</p><span class="material-symbols-outlined">smart_toy</span>`;
  chatLi.innerHTML = chatContent;
  return chatLi
}

const generateResponse = () => {
  const API_URL = 'https://api.openai.com/v1/chat/completions';

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'aplication/json',
      'Authorization': `Bearer${API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: userMessage}]
    })
  }
  // Manda uma requisição POST para API e obtem resposta. 
  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
    console.log(data);
  }).catch((error) => {
    console.log(error);
  })
}

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if(!userMessage) return;
  
  // Anexa a mensagem do usuário à caixa de bate-papo
  chatbox.appendChild(createChatLi(userMessage, 'outgoing'));

  setTimeout(() => {
    // Mostra a mensagem "Processando..." enquanto espera pela resposta do bot.
    chatbox.appendChild(createChatLi('Processando...', 'incoming'));
    generateResponse();
  }, 600);
}

sendChatBtn.addEventListener('click', handleChat);