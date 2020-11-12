const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const messageElement = document.querySelector(".allmessages")
const API_URL = "http://localhost:5000/messages"

loading.style.display = '';

listAllMessages();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get('name');
    const content = data.get('content');

    const message = {name, content};

    loading.style.display = '';
    form.style.display = 'none';

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: 
        {
            'content-type': 'application/json'
        }
    }).then(response => response.json())
    .then(createdMessage => {
      form.reset();
      loading.style.display = 'none';
      form.style.display = '';
      listAllMessages();
    });
    
});

function listAllMessages()
{
    messageElement.innerHTML = '';
    fetch(API_URL)
    .then(response => response.json())
    .then(messages => {
        messages.reverse();
        messages.forEach(message => {
            const div = document.createElement("div");

            const header = document.createElement("h2")
            header.textContent = message.name;

            const contents = document.createElement("h5");
            contents.textContent = message.content;


            div.appendChild(header);
            div.appendChild(contents);
            messageElement.appendChild(div);        
        });
    }) 
    loading.style.display = 'none';

}