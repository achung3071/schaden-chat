# schaden-chat

Run this application by using the command `expo start`.

## Things to note (3/19/20)

- server is currently set as localhost:5000 in reducers/index.js.
- user authentication is replaced with a pre-set jwt value in components/Navigator.js.
- there is a bug where if you change the name of the chat and go back to the chatting screen, the name in the header does not automatically update to the new chat name. In order to see the updated chat name, you have to pop to the top of the navigation stack, then click on the chat again.
