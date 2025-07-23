import { Buffer } from 'buffer';

/**
 * Encodes an array of objects with Base64-encoded JSON values.
 */
export const encode = (data: any[]): Record<string, string>[] => {
  return data.map((obj: any) => {
    const encodedObj: Record<string, string> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const jsonString = JSON.stringify(obj[key]);
        encodedObj[key] = Buffer.from(jsonString).toString('base64');
      }
    }

    return encodedObj;
  });
}
