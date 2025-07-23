import * as Vite from 'vite';
interface IPluginConfig {
    pattern?: RegExp;
}
export declare const plugin: (config?: IPluginConfig) => Vite.Plugin;
export {};
