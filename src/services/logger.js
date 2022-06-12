export default class LoggerService {
  static printError() {
    console.log('Operation failed');
  }

  static printByArg(chunk) {
    console.log(chunk);
  }

  static printSuccessCreateOrCopy() {
    console.log('File/copy of file was created!');
  }

  static printSuccessDelete() {
    console.log('File was successfully deleted!');
  }

  static printFileNoExists() {
    console.log("File doesn't exist!");
  }

  static printOsChars(prop, value) {
    console.log(prop, value);
  }
}
