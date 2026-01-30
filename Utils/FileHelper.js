import fs from 'fs';
import { lookup } from 'mime-types';
import path from 'path';

export const getFileContent = (filePath) => {
    let readFilePath = path.resolve(filePath);
    let content = fs.readFileSync(readFilePath);
    return content.toString();
}

export const getFileContentType = (filePath) => {
    return lookup(filePath);
}

