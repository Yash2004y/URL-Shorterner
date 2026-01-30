import { existsSync } from 'fs';
import fs from 'fs/promises';
import path from 'path';

const currentDirectory = import.meta.dirname;
const DB_FILE_NAME = path.join(currentDirectory, "URL_HELPER_DB.json");

export const saveData = async (object) => {
    return await fs.writeFile(DB_FILE_NAME, JSON.stringify(object, null, 2));
}

export const getData = async () => {
    const fileExists = existsSync(DB_FILE_NAME);
    if (fileExists) {
        const data = await fs.readFile(DB_FILE_NAME)
        if (isValidJson(data)) {
            return JSON.parse(data);
        }
    }
    return [];
}

export const addOrUpdate = async ({ url, key }) => {
    const data = await getData();
    if (key) {
        const findIndex = data.findIndex((item) => item.key === key);
        if (findIndex > -1) {
            data.splice(findIndex, 1, { url, key });
        } else {
            data.push({ url, key });
        }
        // console.log(url,key);
        await saveData(data);
    }

}

export const getByKey = async (key) => {
    const data = await getData();
    if (key) {
        return data.find((item) => item.key === key);
    }
    return null;
}

export const isValidJson = (data) => {
    try {
        JSON.parse(data);
        return true;
    } catch {
        return false;
    }
}