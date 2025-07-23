# vite-plugin-conceal

🔐 A Vite plugin to encode structured or sensitive source data into Base64 at build time — useful for hiding static content from source code while keeping it accessible at runtime.

[![npm version](https://img.shields.io/npm/v/vite-plugin-conceal.svg)](https://www.npmjs.com/package/vite-plugin-conceal)
[![License: ISC](https://img.shields.io/badge/license-ISC-blue.svg)](https://opensource.org/licenses/ISC)

---

## 💡 Why?

When building web apps, some static data (like quiz questions, configs, or embedded texts) can be easily extracted from bundled files. This plugin obfuscates such data by encoding it into Base64 at build time, while preserving its structure and usability at runtime.

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

## 🚀 Quick Start (Automatic Mode)

By default, the plugin transforms any file matching a pattern like `.conceal.ts` or `.conceal.js`, wraps the encoded data in a runtime `decode()` call, and exports it.

### 1. Configure the plugin

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import conceal from 'vite-plugin-conceal';

export default defineConfig({
  plugins: [conceal()],
});
```

### 2. Create a `.conceal.ts` or `.conceal.js` file

```ts
// data.conceal.ts
const question = {
  title: 'Capital of France?',
  answers: [{ text: 'Paris', isRight: true }],
};

const info = {
  meta: 'Trivia',
  note: 'Simple test data',
};

// Required export name:
const base64data = [question, info];
```

### 3. Import and use

```ts
import data from './data.conceal.ts';

console.log('Decoded data:', data);
```

Behind the scenes, the plugin transforms it to:

```ts
import { decode } from 'vite-plugin-conceal';
export default decode([...]);
```

---

## ⚙️ Plugin Options

You can customize which files are transformed:

```ts
conceal({
  pattern: /\.conceal\.(js|ts)x?$/,
});
```

### `pattern`

- **Type:** `RegExp`
- **Default:** `/\.conceal\.(js|ts)x?$/`
- **Purpose:** Specifies which files will be matched and encoded automatically.

#### Example:

```ts
conceal({
  pattern: /\.securedata\.ts$/, // Only transform files ending with `.securedata.ts`
});
```

---

## 🧩 Manual Usage

You can also use the plugin's internal utilities directly:

### Encode manually

```ts
import { encode } from 'vite-plugin-conceal';

const encoded = encode([{ title: 'Secret' }]);
```

### Decode manually

```ts
import { decode } from 'vite-plugin-conceal';

const decoded = decode(encoded);
```

---

## 🛡 Disclaimer

This plugin does **not provide real security** — it merely hides data from plain sight. Do **not** use it to protect passwords, tokens, or private keys.

---

## 📝 License

ISC © 2025 Dmitrii Zakharov
