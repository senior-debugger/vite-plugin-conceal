# vite-plugin-conceal

🔐 A Vite plugin to encode sensitive or structured source data into Base64 at build time — useful for hiding static content from source code while preserving runtime access.

[![npm version](https://img.shields.io/npm/v/vite-plugin-conceal.svg)](https://www.npmjs.com/package/vite-plugin-conceal)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 💡 Why?

When building web apps, some static data (like quiz questions, configs, or embedded texts) can be easily extracted from bundled files. This plugin encodes such data into Base64 strings during build time, slightly obfuscating the content while keeping it accessible at runtime.

---

## 📦 Installation

```bash
npm install vite-plugin-conceal --save-dev
```

or

```bash
yarn add vite-plugin-conceal --dev
```

---

## 🚀 Usage

### 1. Add the plugin to `vite.config.ts`

```ts
import { defineConfig } from 'vite';
import conceal from 'vite-plugin-conceal';

export default defineConfig({
  plugins: [conceal()],
});
```

---

### 2. Create a `.conceal.ts` (or `.js`) file

Create a file named `data.conceal.ts` (or any filename that ends with `.conceal.js`) containing your static data:

```js
const data1 = {
  header: 'What is the capital of France?',
  questions: [{ text: 'Paris', isRight: true }],
};

const data2 = {
  title: 'JS or JSON?',
  text: 'This is a test page',
};

// Required variable name:
const base64data = [data1, data2];
```

---

### 3. Import the encoded data

```ts
import decode from 'vite-plugin-conceal/decode';

import data from './data.conceal.js';

console.log('Decoded content:', decode(data));
```

---

## 📦 Build Output

The plugin replaces your `.conceal.ts` files with code like:

```ts
export default [
  {
    header: "V2hhdCBpcyB0aGUgY2FwaXRhbCBvZiBGcmFuY2U/==",
    questions: "W3sidGV4dCI6IlBhcmlzIiwiaXNSaWdodCI6dHJ1ZX1d"
  },
  ...
];
```

---

## 🔓 Decoding

You can use the built-in decoder at runtime:

```ts
import decode from 'vite-plugin-conceal/decode';

const decoded = decode(encodedData);
```

---

## 📁 Output Structure

```
src/
  data.loader.js       ← your source file
  ...
dist/
  data.loader.js       ← replaced with encoded export
```

---

## 🛡 Disclaimer

This plugin does **not provide real security** — it merely hides data from plain sight. Do **not** use it to protect passwords, tokens, or private keys.

---

## 🧪 Development

Clone and link locally to test:

```bash
npm link
# In your vite project:
npm link vite-plugin-conceal
```

Then `npm run build` in your target project.

---

## 📝 License

ISC © 2025 Dmitrii Zakharov
