import * as fs from 'fs';
import * as path from 'path';
import useDecompiler from './useDecompiler';

// Check if the file path was provided
if (process.argv.length < 3) {
    console.error('Error: No file path provided.');
    process.exit(1);
}

const filePath = process.argv[2];

// Read the file as a Buffer
fs.readFile(filePath, (err: NodeJS.ErrnoException | null, data: Buffer) => {
    if (err) throw err;

    // Convert the Buffer to a hexadecimal string
    const hexString = data.toString('hex');

    // Pass the hexadecimal string to the decompile function
    const {decompile, mapToScript} = useDecompiler();
    const decompiled = decompile(hexString);
    const output = mapToScript(decompiled);
    
    // Define the output file path
    const outputFilePath = path.format({
        dir: path.dirname(filePath),
        name: path.basename(filePath, path.extname(filePath)),
        ext: 'qbscript'
    });

    // Write the decompiled data to the output file
    fs.writeFile(outputFilePath, output, (writeErr: NodeJS.ErrnoException | null) => {
        if (writeErr) throw writeErr;
        console.log(`Successfully wrote output to ${outputFilePath}`);
    });
});
