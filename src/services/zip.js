import { join } from 'path';
import { createReadStream, createWriteStream, rm } from 'fs';
import { createBrotliCompress, createBrotliDecompress } from 'zlib';
import LoggerService from './logger.js';

export default class ZipService {
  static async compress(filePath, newFilePath, currentDirPath) {
    const filePathToCompress = join(currentDirPath, filePath);
    const filePathToArchive = join(currentDirPath, newFilePath);

    const stream = createReadStream(filePathToCompress).on(
      'error',
      LoggerService.printError,
    );
    stream
      .pipe(createBrotliCompress())
      .pipe(createWriteStream(filePathToArchive))
      .on('error', () => LoggerService.printError())
      .on('finish', () => {
        rm(filePathToCompress, console.log);
        console.log('Compression finished!');
      });
  }

  static decompress(filePath, newFilePath, currentDirPath) {
    const filePathToArchive = join(currentDirPath, filePath);
    const filePathToDecompress = join(currentDirPath, newFilePath);

    const stream = createReadStream(filePathToArchive).on(
      'error',
      LoggerService.printError,
    );
    stream
      .pipe(createBrotliDecompress())
      .pipe(createWriteStream(filePathToDecompress))
      .on('finish', () => {
        rm(filePathToArchive, console.log);
        console.log('Decompression finished!');
      });
  }
}
