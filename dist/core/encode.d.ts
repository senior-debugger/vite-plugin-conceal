import * as Vite from "vite";
interface IPluginConfig {
    pattern?: RegExp;
}
export default function plugin(config: IPluginConfig): Vite.Plugin;
export {};
