interface DecodedItem {
    type: string,
    value1?: number,
    value2?: number,
    value3?: number,
    value?: number,
    length?: number
}

export default () => {
    const mappings: { [key: string]: (data: number[]) => DecodedItem } = {
        "001B0000": (data) => {
            return {
                type: "QbKey",
                value1: data[0],
                value2: data[1]
            };
        },
        "000D0000": (data) => {
            return {
                type: "FloatX3",
                value1: data[0],
                value2: data[1],
                value3: data[2]
            };
        },
        "00030000": (data) => {
            return {
                type: "Integer",
                value: data[0]
            };
        },
        "00070000": (data) => {
            return {
                type: "String",
                value: data.map(byte => String.fromCharCode(byte)).join("")
            };
        }
    };

    function mapToScript(decompiled: DecodedItem[]): string {
        let script = "";

        for(let item of decompiled) {
            if (item.type === "QbKey") {
                script += `:i $${item.value1}$$${item.value2}$\n`;
            } else if (item.type === "FloatX3") {
                script += `:i %vec3(${item.value1},${item.value2},${item.value3})\n`;
            } else if (item.type === "Integer") {
                script += `:i %i(${item.value})\n`;
            } else if (item.type === "String") {
                script += `:i $printf$%S(${item.value.length},"${item.value}")\n`;
            }
        }

        return `:i $PlayStream$:s{\n${script}\n:i endfunction`;
    }

    function decompile(script: string): DecodedItem[] {
        let scriptItems = script.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16));
        let decompiled: DecodedItem[] = [];
        
        while(scriptItems.length) {
            let structHeader = scriptItems.splice(0, 4).join("");
            let byteCount = parseInt(structHeader.substring(0, 4), 16);

            let type = scriptItems.splice(0, 4).join("");
            let handler = mappings[type];
            
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
