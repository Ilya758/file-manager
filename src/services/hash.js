import { join } from 'path';
import crypto from 'crypto';
import LoggerService from './logger.js';

export default class HashService {
  static getHash(filePath, currentDirPath) {
    const fullFilePath = join(currentDirPath, filePath);

    const hex = crypto.createHash('sha256').update(fullFilePath).digest('hex');

    LoggerService.printByArg(hex);
  }
}
