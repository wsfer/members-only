# Members Only

This is a simple blog backend app which I built as part of [The Odin Project](https://www.theodinproject.com/) Node.js curriculum to learn about user authentication. The project uses SSR (Server-Side-Rendering).

## Technologies

![EJS](https://img.shields.io/badge/ejs-%23B4CA65.svg?style=for-the-badge&logo=ejs&logoColor=black)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Features

### Accounts

Users can create an account with username, email, password and profile icon.

### Posts

Logged in users can create a post with title and message

### Comments

Logged in users can comment on any posts

### Membership

There's a membership status activated through specific page which allow logged in users to see post or comment creator and date.

## Todos

- Add frontend form validation;
- Improve create post form to allow paragraphs, emojis and external images or links;
- Allow user to update account data;
- Auto login user after account register;
- Add a better way to activate membership;
- Host project on cloud.

## Project Structure

### Routes

#### Posts

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <th>/</th>
      <th>Homepage</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/new-post</th>
      <th>Post form</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/new-post</th>
      <th>Create post</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/posts</th>
      <th>List of posts</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/posts/:id</th>
      <th>Full post with comments</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/delete-post/:id</th>
      <th>Delete a post</th>
    </tr>
  </tbody>
</table>

#### Users

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>GET</th>
      <th>/user</th>
      <th>User profile page</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/user/login</th>
      <th>Login form</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/user/login</th>
      <th>Authenticate user</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/user/register</th>
      <th>Register form</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/user/register</th>
      <th>Create new account</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/user/membership</th>
      <th>Membership form</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/user/membership</th>
      <th>Change account to member</th>
    </tr>
    <tr>
      <th>GET</th>
      <th>/user/activate-admin</th>
      <th>Admin form</th>
    </tr>
    <tr>
      <th>POST</th>
      <th>/user/activate-admin</th>
      <th>Change account to admin</th>
    </tr>
  </tbody>
</table>

#### Comments

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Route</th>
      <th>Feature</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>POST</th>
      <th>/comment</th>
      <th>Create a comment</th>
    </tr>
  </tbody>
</table>

## What I Learned

- How to use sessions;
- How user session works;
- How to use Passport.js;
- Improved my backend and database knowledgment;
- Improved my CSS skills.

## Things I could have done

- Add webpack to bundle frontend javascript code;
- Add SASS to better structure CSS code.
