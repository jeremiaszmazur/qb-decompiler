export interface DecodedItem {
    type: string,
    value: Array<string | number>,
    render: () => string
}

export type EncodedData = number[];

export type MapItem = { [key: string]: (data: EncodedData) => DecodedItem };

export type Mappings = Array<{ [key: string]: (data: number[]) => DecodedItem }>;