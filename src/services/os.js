import { EOL, cpus, userInfo, homedir, arch } from 'os';
import LoggerService from './logger.js';

export default class OSService {
  static getEOL() {
    LoggerService.printOsChars('eol:', JSON.stringify(EOL));
  }

  static getCpus() {
    LoggerService.printOsChars('cpus info:', cpus());
  }

  static getUserName() {
    LoggerService.printOsChars('username:', userInfo().username);
  }

  static getHomedir() {
    LoggerService.printOsChars('homedir', homedir());
  }

  static getArchitecture() {
    LoggerService.printOsChars('arch:', arch());
  }
}
