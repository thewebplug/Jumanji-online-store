# JUMANJI ONLINE STORE

This repository contains the code for my ecommerce website, built with VanillaJs, NodeJs and ExpressJs.

<br>

## Run locally

---

### 1. Clone repository

```
git clone https://github.com/thewebplug/Jumanji-online-store

cd Jumanji-online-store
```

### 2. Setup MongoDB

- Download and Install from [mongodb.com](https://www.mongodb.com/try/download/community)

### 3.Create .env filr

- Create.env file in project folder
- Enter these lines to that:

```
MONGODB_URL=mongodb://localhost/jumanji
JWT_SECRET="something secret"
PAYSTACK_PUBLIC_KEY="your paystack public key"
PAYSTACK_SECRET_KEY="your paystack secret key"
```

### 4. Create dist file in root folder


### 5. Run Backend

```
$ npm install
$ npm run build
$ npm run start
```

### 6. Run Frontend

```
#open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 7. Create Admin User

- Run this in your browser: http://localhost:5000/api/users/createadmin
- Note the admin email and password

<br>

# CREDIT

### This ecommerece website is based off [JS Amazona Template](https://github.com/basir/node-javascript-ecommerce/blob/master/README.md), developed by [Bassir Jafarzadeh](https://github.com/basir)

# LICENSE
## [MIT](LICENSE)
