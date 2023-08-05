import * as fs from 'fs';
import * as path from 'path';

export default (filePath: string) => {
    let writeStream: fs.WriteStream;

    const readFile = async (): Promise<string> => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    const hexData = data.toString('hex');
                    resolve(hexData);
                }
            });
        });
    };
    
    const saveFile = async (content: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            const outputFilePath = path.format({
                dir: path.dirname(filePath),
                name: path.basename(filePath, path.extname(filePath)) + ".qbscript",
                ext: path.extname(filePath)
            });
    
            fs.writeFile(outputFilePath, content, 'utf-8', (err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };

    const openStreamedFile = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
            const outputFilePath = path.format({
                dir: path.dirname(filePath),
                name: path.basename(filePath, path.extname(filePath)) + ".streamed.qbscript",
                ext: path.extname(filePath)
            });

            writeStream = fs.createWriteStream(outputFilePath, 'utf-8');
            writeStream.on('finish', resolve);
            writeStream.on('error', reject);
        });
    };

    const writeStreamedFile = async (data: string): Promise<void> =>{
        return new Promise(resolve => {
          if (!writeStream.write(data)) {
            writeStream.once('drain', resolve);
          } else {
            process.nextTick(resolve);
          }
        });
      }

    const endStreamedFileAsync = async(): Promise<void> => {
        return new Promise((resolve, reject) => {
            if (writeStream) {
                writeStream.on('finish', resolve);
                writeStream.on('error', reject);
                writeStream.end();
            } else {
                resolve();
            }
        });
    }
    
    return {
        readFile,
        saveFile,
        openStreamedFile,
        writeStreamedFile,
        endStreamedFileAsync
    };   
}
