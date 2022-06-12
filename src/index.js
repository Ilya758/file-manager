import { dirname } from 'path';
import { argv, stdout, stdin } from 'process';
import { fileURLToPath } from 'url';
import readline from 'readline';
import NavigationService from './services/navigation.js';
import {
  CRUDServiceEnum,
  NavigationServiceEnum,
  OSEnum,
  HashEnum,
  ZipEnum,
  ExitEnum,
} from './constants.js';
import LoggerService from './services/logger.js';
import CRUDService from './services/crud.js';
import OSService from './services/os.js';
import HashService from './services/hash.js';
import ZipService from './services/zip.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const main = () => {
  const username = argv[2].split('=').slice(1);

  let currentDirPath = __dirname;

  stdout.write(`Welcome to the File Manager, ${username}!\n`);

  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: `You are currently in ${currentDirPath}\n`,
  });

  rl.prompt();

  rl.on('line', async input => {
    const [command, primaryArg, secondaryArg] = input
      .split(/\s/)
      .map(chunk => chunk.trim())
      .filter(chunk => chunk.length);

    switch (command) {
      case NavigationServiceEnum.up: {
        if (primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        currentDirPath = NavigationService.upDirectory(
          __dirname,
          currentDirPath,
        );

        rl.setPrompt(`You are currently in ${currentDirPath}\n`);

        break;
      }

      case NavigationServiceEnum.cd: {
        if (!primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        currentDirPath = NavigationService.goToFolderByPath(
          currentDirPath,
          primaryArg,
        );

        rl.setPrompt(`You are currently in ${currentDirPath}\n`);

        break;
      }

      case NavigationServiceEnum.ls: {
        if (primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        NavigationService.printListOfContent(currentDirPath);

        break;
      }

      case CRUDServiceEnum.add: {
        if (!primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.addFile(primaryArg).catch(() => {
          LoggerService.printError();
        });

        break;
      }

      case CRUDServiceEnum.cat: {
        if (!primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.read(currentDirPath, primaryArg).catch(() =>
          LoggerService.printError(),
        );

        break;
      }

      case CRUDServiceEnum.cp: {
        if (!primaryArg || !secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.copyFile(primaryArg, secondaryArg, currentDirPath);

        break;
      }

      case CRUDServiceEnum.mv: {
        if (!primaryArg || !secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.moveFile(primaryArg, secondaryArg, currentDirPath);

        break;
      }

      case CRUDServiceEnum.rm: {
        if (!primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.deleteFile(primaryArg);

        break;
      }

      case CRUDServiceEnum.rn: {
        if (!primaryArg || !secondaryArg) {
          LoggerService.printError();
          break;
        }

        CRUDService.renameFile(primaryArg, secondaryArg);

        break;
      }

      case OSEnum.os: {
        if (!primaryArg || secondaryArg || !primaryArg.startsWith('--')) {
          LoggerService.printError();
          break;
        }

        switch (primaryArg.replace('--', '')) {
          case OSEnum.EOL: {
            OSService.getEOL();

            break;
          }

          case OSEnum.cpus: {
            OSService.getCpus();

            break;
          }

          case OSEnum.username: {
            OSService.getUserName();

            break;
          }

          case OSEnum.homedir: {
            OSService.getHomedir();

            break;
          }

          case OSEnum.architecture: {
            OSService.getArchitecture();

            break;
          }

          default:
            break;
        }

        break;
      }

      case HashEnum.hash: {
        if (!primaryArg || secondaryArg) {
          LoggerService.printError();
          break;
        }

        HashService.getHash(primaryArg, currentDirPath);

        break;
      }

      case ZipEnum.compress: {
        if (!primaryArg || !secondaryArg) {
          LoggerService.printError();
          break;
        }

        ZipService.compress(primaryArg, secondaryArg, currentDirPath);

        break;
      }

      case ZipEnum.decompress: {
        if (!primaryArg || !secondaryArg) {
          LoggerService.printError();
          break;
        }

        ZipService.decompress(primaryArg, secondaryArg, currentDirPath);

        break;
      }

      case ExitEnum.exit: {
        LoggerService.printByArg(
          `Thank you for using File Manager, ${username}!`,
        );

        process.exit();
      }

      default: {
        LoggerService.printByArg('Invalid input');
      }
    }

    rl.prompt();
  })
    .on('SIGINT', () => rl.close())
    .on('close', () =>
      LoggerService.printByArg(
        `Thank you for using File Manager, ${username}!`,
      ),
    );
};

main();
