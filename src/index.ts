import useDecompiler from './useDecompiler';
import useLoader from './useLoader';

// Check if the file path was provided
if (process.argv.length < 3) {
    console.error('Error: No file path provided.');
    process.exit(1);
}

const run = async () => {
    const {decompile, mapToScript} = useDecompiler();
    
    const filePath = process.argv[2];
    const {readFile, saveFile} = useLoader(filePath);
    
    const content = await readFile();
    const decompiledContent = decompile(content);
    const qbScript = mapToScript(decompiledContent);
    await saveFile(qbScript);
};

run().catch(error => {
    console.error("Error:", error);
});