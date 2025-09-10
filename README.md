# 🌐 Logzone UI Project

The **Logzone UI Project** is a web application that allows users to manage projects, view documentation, and integrate seamlessly with the [Logzone SDK](https://www.npmjs.com/package/logzone-sdk).  
It provides a simple interface for creating users, projects, and generating API tokens that can be used with the SDK in your own projects.

---

## 🚀 Features

- **Homepage**: Overview of the platform.  
- **Login**: Authenticate existing users.  
- **Register**: Create a new user account.  
- **Documentation**: View SDK and API documentation.  
- **Project List**: Browse all created projects.  
- **Project Page**: View details of a project and obtain API tokens.  
- **API Token Generation**: Automatically generate tokens for use with `logzone-sdk`.  
- **SDK Integration**: Install and use the Logzone SDK directly from npm or clone it from GitHub.  

---

## 📥 Installation

### Clone the repository

```bash
git clone https://github.com/danielfabbri/logzone-sdk-ui.git
cd logzone-sdk-ui
```

### Install dependencies

```bash
npm install
```

### Run the project locally

```bash
npm start
```

> The application will run at `http://localhost:3000` by default.

---

## 🧩 Using the Application

1. **Register a new user**  
   Go to the Register page and fill in your details. Once registered, you can log in.  

2. **Login**  
   Use your credentials to log in to the application.  

3. **Create a Project**  
   On the Project List page, click "Create Project" and fill in the details. After creating the project, you will receive an **API token**.  

4. **Use the API Token with Logzone SDK**  
   Install the SDK via npm:

   ```bash
   npm install logzone-sdk
   ```

   Or clone it from GitHub:

   ```bash
   git clone https://github.com/danielfabbri/logzone-sdk
   cd logzone-sdk
   npm install
   ```

   Example usage:

   ```js
   const LogZoneSDK = require('logzone-sdk');
   const sdk = new LogZoneSDK();

   async function main() {
     try {
       await sdk.criarLog({
         apiKey: 'YOUR_API_TOKEN',
         project: 'YOUR_PROJECT_ID',
         level: 'info',
         message: 'This is a test log from the UI project',
         context: 'Generated from Logzone UI'
       });
       console.log('Log successfully sent!');
     } catch (err) {
       console.error('Error sending log:', err.message);
     }
   }

   main();
   ```

---

## 🛠 Requirements

- Node.js >= 14  
- NPM or Yarn  
- Browser (Chrome, Firefox, Edge recommended)  

---

## 📚 Pages Overview

| Page | Description |
|------|-------------|
| `Homepage` | Overview and navigation links |
| `Login` | Sign in with existing credentials |
| `Register` | Create a new account |
| `Documentation` | View SDK and API docs |
| `Project List` | Browse and manage your projects |
| `Project Page` | View project details and API tokens |

---

## ⚡ Features for Developers

- Generate API tokens directly from the UI  
- Easily integrate `logzone-sdk` with your projects  
- Example logs included for testing purposes  
- Full project management from a single interface  

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  

1. Fork the repository  
2. Create a new feature branch (`git checkout -b feat/your-feature`)  
3. Commit your changes  
4. Open a Pull Request  

---

## 📝 License

This project is licensed under the **MIT License**.  

---

## 👨‍💻 Authors

Developed by [Daniel Fabbri](https://github.com/danielfabbri) and [Wendell Lavor](https://github.com/wendelllavor).
