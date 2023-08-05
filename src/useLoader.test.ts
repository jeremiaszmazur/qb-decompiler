import * as fs from 'fs';
import { NoParamCallback } from 'fs';
import * as path from 'path';
import useLoader from './useLoader';

jest.mock('fs');

describe('Sample File Utilities', () => {
  const mockFilePath = path.join(__dirname, 'mockFile.txt');
  const mockHexContent = '68656c6c6f20776f726c64'; // "hello world" in hex
  const mockTextContent = 'hello world';
  const { readFile, saveFile } = useLoader(mockFilePath);
  const mockedFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    mockedFs.readFile.mockImplementation((_, callback) => {
        callback(null, Buffer.from(mockTextContent));
    });

    mockedFs.writeFile.mockImplementation((_, __, ...args) => {
      const callback = args.find(arg => typeof arg === 'function') as NoParamCallback | undefined;
      if (callback) {
          callback(null);
      }
    });
  });

  it('should read file and return hex content', async () => {
    const content = await readFile();
    expect(content).toBe(mockHexContent);
  });

  it('should save file with given content', async () => {
    await saveFile(mockTextContent);
    expect(fs.writeFile).toHaveBeenCalledWith(expect.anything(), mockTextContent, 'utf-8', expect.anything());
  });
});
