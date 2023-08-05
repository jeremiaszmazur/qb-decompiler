import useDecompiler from './useDecompiler';

describe('decompile', () => {
  it('should decompile given bytecode', () => {
    const bytecode = "0116C34AF174"; // Example bytecode for test
    const {decompile, mapToScript} = useDecompiler();
    const decompiled = decompile(bytecode);
    const result = mapToScript(decompiled);
    const expected = ":i $PlayStream$:s{ :i $Gate_open$ :i :s}"; // This is just a mock expected value, update as required

    expect(result).toBe(expected);
  });

  // Add more test cases as needed
});
