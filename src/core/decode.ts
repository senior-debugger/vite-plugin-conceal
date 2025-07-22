import { Buffer } from 'buffer';

import { parseObject } from '@/utils/object';

/**
 * Decode Base64-encoded source back into JavaScript objects.
 */
export default function decode(source: any[]): any[] {
  if (!Array.isArray(source)) return source;

  const decoded = source.map((item) => {
    const obj: Record<string, any> = {};

    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        try {
          const value = Buffer.from(item[key], 'base64').toString('utf-8');
          obj[key] = parseObject(value);
        } catch {
          obj[key] = item[key];
        }
      }
    }

    return obj;
  });

  return decoded;
}
