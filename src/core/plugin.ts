import * as Vite from 'vite';

import { encode } from '@/utils/encode';

interface IPluginConfig {
  pattern?: RegExp;
}

interface Syntax {
  cjs: boolean;
  esm: boolean;
}

const evaluate = (code: string, syntax: Syntax) => {
  const pattern = syntax.cjs
    ? /\bmodule\.exports\s*=\s*/
    : /^export\s+default/;

  const transformed = code.replace(pattern, 'return');
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

      const syntax: Syntax = {
        cjs: /\bmodule\.exports\b/.test(code),
        esm: /\bexport\s+default\b/.test(code),
      };

      const data = evaluate(code, syntax);

      if (!data || !Array.isArray(data)) {
        return {
          code,
          map: null
        };
      }

      const encoded = encode(data);
      const transformedCode = syntax.cjs
        ? `
          const { decode } = require('vite-plugin-conceal');
          module.exports = decode(${JSON.stringify(encoded)});
        ` : `
          import { decode } from 'vite-plugin-conceal';
          export default decode(${JSON.stringify(encoded)});
        `;

      return {
        code: transformedCode,
        map: null
      };
    }
  };
}
