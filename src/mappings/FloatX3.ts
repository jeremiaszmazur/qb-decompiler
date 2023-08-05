import { MapItem } from "../types";

export default {
    "000D0000": data => {
        const value1 = data[0];
        const value2 = data[1];
        const value3 = data[2];

        return {
            type: "FloatX3",
            value: [value1, value2],
            render: () => `:i %vec3(${value1},${value2},${value3})`
        };
    },
} as MapItem