document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);
  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  document.querySelector('#compose-form').onsubmit = () => {
    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
          recipients: document.querySelector('#compose-recipients').value,
          subject: document.querySelector('#compose-subject').value,
          body: document.querySelector('#compose-body').value
      })
    })
    .then(response => response.json())
    .then(result => {
      if (result['error']) {
        
      } else {
        load_mailbox('sent');
      }
    });
  };


}

function load_email(email) {
  document.querySelector('#email-view').style.display = 'block';
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';

  fetch(`/emails/${email["id"]}`, {
    method: 'PUT',
    body: JSON.stringify({
      read: true
    })
  });

  document.querySelector('#email-view').innerHTML = `
    From: ${email["sender"]}<br>
    To: ${email["recipients"]}<br>
    Subject: ${email["subject"]}<br>
    Timestamp: ${email["timestamp"]}<hr>
    ${email["body"]}<br><hr>

    <button id="reply">Reply</button>
    <button id="archive_email">Archive/Unarchive</button>
  `;

  if (email['sender'] === document.querySelector('#user_email').value) {
    document.querySelector('#archive_email').style.visibility = "hidden";
  }

  document.querySelector('#archive_email').addEventListener('click', () => {
    if (email['sender'] !== document.querySelector('#user_email').value) {
      fetch(`/emails/${email["id"]}`, {
        method: 'PUT',
        body: JSON.stringify({
        archived: !email["archived"]
      })
    });
    load_mailbox('inbox');
    }
  }); 

  document.querySelector('#reply').addEventListener('click', () => {
    compose_email();

    document.querySelector('#compose-recipients').value = email['sender'];
    if (email["subject"].includes('Re:')) {
      document.querySelector('#compose-subject').value = `${email['subject']}`;
    } else {
      document.querySelector('#compose-subject').value = `Re: ${email['subject']}`;
    }
    document.querySelector('#compose-body').value = `On ${email["timestamp"]} ${email["sender"]} wrote \n ${email['body']}`;
  }); 
}

function load_mailbox(mailbox) {
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
      for (let email of emails) {
        const email_div = document.createElement('div');
        const block_div = document.createElement('div');

        email_div.setAttribute("class", `email-holder row d-flex read-${email["read"]}`);
        block_div.setAttribute("class", `email-holder row d-flex read-${email["read"]}`);
        email_div.style.border = '0.5em solid black';

        if (email['read'] === true) {
          email_div.style.backgroundColor = '#a6a6a6';
        }

        email_div.innerHTML = `
          <div class="p-2">${email["sender"]}</div>
          <div class="p-2">${email["subject"]}</div>
          <div class="ml-auto p-2">${email["timestamp"]}</div>
        `;

        block_div.innerHTML = `
          <div class="p-2"></div>
        `;

        email_div.addEventListener('click', () => load_email(email));
        document.querySelector('#emails-view').append(email_div);
        document.querySelector('#emails-view').append(block_div);
      };
  });

  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;
}
