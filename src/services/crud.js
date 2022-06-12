import { join } from 'path';
import LoggerService from './logger.js';
import readline from 'readline';
import { createReadStream, createWriteStream } from 'fs';
import { copyFile, rename, rm } from 'fs/promises';

export default class CRUDService {
  static async read(currentDirname, filePath) {
    const readableStream = createReadStream(join(currentDirname, filePath));

    const rl = readline.createInterface({
      input: readableStream,
    });

    for await (const line of rl) {
      LoggerService.printByArg(line);
    }
  }

  static async addFile(filePath) {
    const writableStream = createWriteStream(filePath);

    writableStream.write('', 'utf-8');

    writableStream.on('finish', LoggerService.printSuccessCreateOrCopy);

    writableStream.end();
  }

  static async deleteFile(filePath) {
    await rm(filePath)
      .then(LoggerService.printSuccessDelete)
      .catch(LoggerService.printError);
  }

  static async moveFile(pathToFile, newDirpath, currentDirPath) {
    await this.copyFile(pathToFile, newDirpath, currentDirPath).then(() => {
      this.deleteFile(join(currentDirPath, pathToFile));
    });
  }

  static async copyFile(pathToFile, newDirpath, currentDirPath) {
    const newFilePath = join(currentDirPath, newDirpath);

    const prevFilePath = join(currentDirPath, pathToFile);

    await copyFile(prevFilePath, newFilePath).catch(LoggerService.printError);
  }

  static async renameFile(pathToFile, newFilePath) {
    await rename(pathToFile, newFilePath).catch(LoggerService.printError);
  }
}
