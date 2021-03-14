# Mail

This is a front-end for an email client that makes API calls to send and receive emails.

## Features 
-   There are 2 types of **Mailbox**;
    - **Inbox page** where email appears with white background if it is unread and with gray background otherwise.
    - **Archive page** where users can view their archived emails and unarchive them. 
-   **Clicking on email**  takes users to a view where they see the content of that email: *email’s sender, recipients, subject, timestamp, and body.*
-  Users can **send an email** with recipients, a subject and a content. 

-   Users can **reply to an email** by clicking on the reply button on that email's page. The  `recipient`  field pre-filled with whoever sent the original email.  `Subject`  line is pre-filled with the *Re:* added to the original subject.  `Body`  of the email is pre - filled with  `"On Jan 1 2020, 12:00 AM foo@example.com wrote:"`  followed by the original text of the email. 

## Screenshots and Demo
  
![Screenshot from 2021-03-14 01-06-15](https://user-images.githubusercontent.com/56313500/111051101-ab907f80-8461-11eb-9013-16fa3da2aefa.png)
---
![Screenshot from 2021-03-14 01-06-37](https://user-images.githubusercontent.com/56313500/111051105-af240680-8461-11eb-8583-e77d8ec17b2f.png)

[Youtube Demo Link](https://youtu.be/C3Q_GtDrO14)

## Run Search locally

### Step 1: Clone project
```
 git clone https://github.com/damlayildiz/Mail.git
 cd Mail 
 ```
### Step 2: Run the project
```
 python manage.py runserver
 ```
