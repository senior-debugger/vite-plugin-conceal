import * as Vite from 'vite';

import { encode } from '@/utils/encode';

interface IPluginConfig {
  pattern?: RegExp;
}

function evaluate(code: string) {
  const transformed = code.replace(/^export\s+default/, 'return');
  const wrapped = `(function() { ${transformed} })()`;

  return eval(wrapped);
}

export const plugin = (config: IPluginConfig = {}): Vite.Plugin => {
  const pattern = config.pattern ?? /\.conceal\.(js|ts)x?$/;

  return {
    name: 'vite-plugin-conceal',

    async transform(code, id) {
      if (!pattern.test(id)) {
        return;
      }

      try {
        const data = evaluate(code);

        if (!data || !Array.isArray(data)) {
          this.warn(`vite-plugin-conceal: No valid default export found in ${id}`);
          return null;
        }

        const encoded = encode(data);
        const transformedCode = `
          import { decode } from 'vite-plugin-conceal';
          export default decode(${JSON.stringify(encoded)});
        `;

        return {
          code: transformedCode,
          map: null
        };
      } catch (error) {
        this.error(`vite-plugin-conceal: Failed to load ${id} — ${error}`);
      }

      return null;
    }
  };
}
