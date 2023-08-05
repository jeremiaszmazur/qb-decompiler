import { MapItem } from "../types";

export default {
    "00030000": data => {
        const value1 = data[0];
        const value2 = data[1];

        return {
            type: "Integer",
            value: [value1, value2],
            render: () => `:i %i(${value1})`
        };
    },
} as MapItem