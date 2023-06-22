<h1 align="center">Autentication</h1>

<div align="center">
  <h3>Build</h3>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
 <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" heigth="30px">
  <img src="https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white">
  
  <!--  Badges  source:  https://dev.to/envoy_/150-badges-for-github-pnk  -->
</div>

# Description

Demonstration of password recovery and two-factor authentication.

# Features

- Register user
- Login
- Forget password
- Two factor authentication

# API reference

### Register user:

```http
    POST /register
```

Request:

| Body             | Type     | Description                     |
| ---------------- | -------- | ------------------------------- |
| `email`          | `String` | **Required** user email         |
| `password`       | `String` | **Required** user password      |
| `repeatPassword` | `String` | **Required** reference password |

</br>

### Login:

```http
    POST /login
```

| Body       | Type     | Description                |
| ---------- | -------- | -------------------------- |
| `email`    | `String` | **Required** user email    |
| `password` | `String` | **Required** user password |

Response:

```json
{
    token: //JWT token
}
```

### Forget password:

```http
    POST /forgetPassword
```

| Body    | Type     | Description             |
| ------- | -------- | ----------------------- |
| `email` | `String` | **Required** user email |

Response:

```json
Email to user
```

### Reset password

```http
    POST /resetPassword/:{resetToken}
```

| Body             | Type     | Description                |
| ---------------- | -------- | -------------------------- |
| `email`          | `String` | **Required** user email    |
| `password`       | `String` | **Required** user password |
| `repeatPassword` | `String` | **Required** user password |

| Params       | Type     | Description              |
| ------------ | -------- | ------------------------ |
| `resetToken` | `String` | **Required** reset token |

`ResetToken = will be sent to user email with the link you can acess`

### Two factor authentication enable

```http
    POST /twoFactorAuth
```

| Headers          | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| `Authentication` | `Bearer` | **Required** bearer token |

Response:

Return a object from Liberie Speakeasy.

```json
{
    ascii:""
    base32:""
    hex:""
    otpauth_url:""
}
```

### Two factor authentication verify

```http
    POST /twoFactorAuth/verify
```

| Headers          | Type     | Description               |
| ---------------- | -------- | ------------------------- |
| `Authentication` | `Bearer` | **Required** bearer token |

| Body    | Type     | Description            |
| ------- | -------- | ---------------------- |
| `token` | `String` | **Required** Pin/token |

# Tests:

Use .env.test to dont have any problem on database.

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName-teste`

`PORT = number #recommended:4000`

To run tests:

```bash
    npm run test
```

# Run locally

Clone plroject:

```bash

  git clone https://github.com/luishsilva09/Autentica-o-login.git

```

Instal dependencies:

```bash

  npm install

```

Run on dev mode:

```bash
    npm run dev
```

# Variaveis

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:4000`

`POSTGRES_USER=`

`POSTGRES_PASSWORD=`

`POSTGRES_DB=`

`EMAIL= use for send email with token`

`PASSWORD_EMAIL= token or password to have acess on account`

# Author

​

- Luís Henrique da Silva

​

https://github.com/luishsilva09
