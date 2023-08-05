import { MapItem } from "../types";

export default {
    "001B0000": data => {
        const value1 = data[0];
        const value2 = data[1];

        return {
            type: "QbKey",
            value: [value1, value2],
            render: () => `:i $${value1}$$${value2}$`
        };
    },
} as MapItem