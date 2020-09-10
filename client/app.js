{
    const loginForm = document.getElementById('welcome-form');
    const messageSection = document.getElementById('messages-section');
    const messagesList = document.getElementById('messages-list');
    const addMessageFomr = document.getElementById('add-messages-form');
    const userNameInput = document.getElementById('username');
    const messageContentInput = document.getElementById('message-content');

    let userName;

    login = event => {
        event.preventDefault();
        if(userNameInput.value.length > 0) {
            userName = userNameInput.value;
            loginForm.classList.remove('show');
            messageSection.classList.add('show');
        } else {
            alert('Enter user name');
        }
    }

    sendMessage = event => {
        event.preventDefault();
        if(messageContentInput.value.length > 0) {
            addMessage(userName, messageContentInput.value);
            messageContentInput.value = null;
        } else {
            alert('Enter message');
        }
    }

    addMessage = (user, message) => {
        const domMessage = document.createElement('li');
        user !== userName ? domMessage.classList.add('message','message--received') : domMessage.classList.add('message','message--received','message--self');
        domMessage.innerHTML = `<h3 class="message__author">${user === userName ? 'You' : user}</h3><div class="message__content">${message}</div>`;
        messagesList.appendChild(domMessage);
    }

    loginForm.addEventListener('submit', event => {
        login(event);
    });

    addMessageFomr.addEventListener('submit', event => {
        sendMessage(event);
    });
}