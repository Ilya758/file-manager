import { readdir } from 'fs/promises';
import { join } from 'path';
import LoggerService from './logger.js';

export default class NavigationService {
  static upDirectory(rootDirname, currentDirname) {
    return rootDirname === currentDirname
      ? rootDirname
      : join(currentDirname, '..');
  }

  static goToFolderByPath(currentDirname, newFolderPath) {
    return join(currentDirname, newFolderPath);
  }

  static async printListOfContent(currentDirname) {
    await readdir(currentDirname)
      .then(LoggerService.printByArg)
      .catch(LoggerService.printError);
  }
}
