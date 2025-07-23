import * as Vite from "vite";
import { Buffer } from 'buffer';

interface IPluginConfig {
  pattern?: RegExp;
}

export default function plugin(config: IPluginConfig): Vite.Plugin {
  const pattern = config.pattern ?? /\.conceal\.(js|ts)x?$/;

  return {
    name: 'vite-plugin-conceal',

    transform(code, id) {
      if (!pattern.test(id)) {
        return;
      }

      try {
        let base64data: any;
        eval(code);

        if (!base64data || !Array.isArray(base64data)) {
          return null;
        }

        const encoded = base64data.map((obj: any) => {
          const encodedObj: Record<string, string> = {};

          for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              const jsonString = JSON.stringify(obj[key]);
              encodedObj[key] = Buffer.from(jsonString).toString('base64');
            }
          }

          return encodedObj;
        });

        const transformedCode = `
          import { decode } from 'vite-plugin-conceal';
          export default decode(${JSON.stringify(encoded)});
        `;

        return {
          code: transformedCode,
          map: null
        };
      } catch (e) {
        this.error(`Error in vite-plugin-conceal: ${e}`);
      }

      return null;
    }
  };
}
