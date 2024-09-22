# Waptcha

## Intro to Waptcha 💯

🪐 Welcome to Waptcha, a modern alternative to traditional CAPTCHAs based on [World ID](https://docs.worldcoin.org/world-id).

## Project Description 🌟

### 🗂️ Problem Statement
As bots become increasingly sophisticated, traditional CAPTCHA systems are failing to provide effective security. Many bots can now mimic human behavior, allowing them to bypass these verification methods. This poses significant risks for websites and applications that handle sensitive data, leading to issues such as fraud, spam, and compromised user experiences.

### ⚙️ Solution 

- Utilizes Worldcoin's biometric technology to ensure that each user is uniquely identified through privacy-preserving biometric data, effectively preventing bot manipulation.

- Offers a streamlined integration process with a lightweight JavaScript SDK, allowing developers to implement Waptcha just a few lines of code
  
- Provides robust protection against advanced bots, making it ideal for applications that handle sensitive information.

### 💻 Deployed App
https://waptcha.vercel.app/

### Waptcha SDK
To use Waptcha in your own apps, you can use the [Waptcha SDK](https://github.com/omnimarket-eth/waptcha-sdk/). Check out the README for installation and usage.

### Development

You'll need to create a Worldcoin app, Supabase project, and a Dynamic app setup. Then, create a `.env` file following the format from `.env.example` and fill in the values.

```
git clone https://github.com/omnimarket-eth/waptcha.git
cd waptcha
pnpm i
pnpm dev
```
