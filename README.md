# Vite Plugin Conceal

**vite-plugin-conceal** is a Vite plugin that helps obscure default-exported JavaScript object arrays in your source code. At build time, it transforms your data into Base64-encoded strings, reducing the visibility of raw values in the final bundle. At runtime, it seamlessly decodes the data back into usable JavaScript objects.

---

## What It Does

Imagine this source file:

```ts
// users.conceal.ts
export default [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
```

Instead of including the raw names "Alice" and "Bob" directly in your production bundle, the plugin will transform it during build into:

```ts
import { decode } from 'vite-plugin-conceal';

export default decode([
  { name: "\"QWxpY2U=\"", age: "MzA=" },
  { name: "\"Qm9i\"", age: "MjU=" }
]);
```

Then, at runtime, the `decode()` function will automatically decode the Base64 strings and parse them back to their original values:

```js
[
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]
```

This makes it harder for tools or users inspecting your production JavaScript to directly read your raw data.

---

## Features

- Transform any pattern of files (e.g.: `.conceal.js`, `.conceal.ts`, `.conceal.jsx`, `.conceal.tsx`)
- Encodes JavaScript object arrays using Base64-encoded JSON
- Automatically decodes data at runtime
- Lightweight and easy to configure

---

## Installation

```bash
npm install vite-plugin-conceal
# or
yarn add vite-plugin-conceal
```

---

## Usage

### 1. Add to `vite.config.js`

```ts
import concealPlugin from 'vite-plugin-conceal';

export default {
  plugins: [concealPlugin()],
};
```

### 2. Create a `.conceal.ts` or `.conceal.js` file

```ts
// users.conceal.ts
export default [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
];
```

### 3. Import created before file(s) somewhere in the application.

```ts
import usersData from './users.conceal';

console.log(usersData);
```

---

## Configuration

You can pass an optional configuration object:

```ts
concealPlugin({
  pattern: /\.secret\.ts$/
});
```

### Options

| Option  | Type   | Value                     | Description |
| ------- | ------ |---------------------------| ----------- |
| pattern | RegExp | /.conceal.(js \| ts)x?\$/ | File pattern to match for encoding |

---

## How It Works

1. The plugin identifies files matching the configured pattern.
2. It evaluates the file content to extract the default export (must be an array of objects).
3. Each object is encoded by:
   - Serializing each value to JSON
   - Encoding each JSON string using Base64
4. A transformed module is generated that decodes the data at runtime.

---

## API

### `encode(data: any[]): Record<string, string>[]`

Encodes an array of objects into Base64-encoded strings.

### `decode(source: any[]): any[]`

Decodes an array of Base64-encoded object properties back to JavaScript values.

---

## Caveats

- Only default exports of arrays are supported.
- The plugin uses `eval()` during the build step; ensure your input files are safe.
- Intended for basic obfuscation, not for secure encryption.

---

## License

MIT License

---

## Author

ISC © 2025 Dmitrii Zakharov

