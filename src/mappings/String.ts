import { MapItem } from "../types";

export default {
    "00070000": data => {
        const value = data.map(byte => String.fromCharCode(byte)).join("");
        
        return {
            type: "String",
            value: [value],
            render: () => `:i $printf$%S(${value.length},"${value}")`
        }
    },
} as MapItem