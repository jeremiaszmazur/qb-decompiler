import * as mappings from './mappings';
import { DecodedItem, MapItem } from './types';

const MAP_LIST: MapItem = Object.values(mappings).reduce((acc, obj) => {
    const [key] = Object.keys(obj);
    acc[key] = obj[key];
    return acc;
}, {});

export default () => {
    function mapToScript(decompiled: DecodedItem[]): string {
        const script = decompiled.map(item => item.render()).join('\n');

        return `:i $PlayStream$:s{\n${script}\n:i endfunction`;
    }

    function decompile(scriptProp: string): DecodedItem[] {
        let scriptItems = scriptProp.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16));
        let decompiled: DecodedItem[] = [];
        while(scriptItems.length) {
            let structHeader = scriptItems.splice(0, 4).join("");
            let byteCount = parseInt(structHeader.substring(0, 4), 16);

            let type = scriptItems.splice(0, 4).join("");
            let handler = MAP_LIST[type]
            
            if (!handler) {
                throw new Error(`Unknown type: ${type}`);
            }

            let data = scriptItems.splice(0, byteCount);
            decompiled.push(handler(data));
        }

        return decompiled;
    }

    return { decompile, mapToScript };
}
