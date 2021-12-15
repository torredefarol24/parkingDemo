const currentTS = new Date().toISOString().split("T");
const currentTime = `[${currentTS[0]} ${currentTS[1].split(".")[0]}]`;

function log(message: any) {
  console.log(`${currentTime} -- ${message}`);
}

function error(message: any) {
  console.log("\x1b[31m", `${currentTime} -- ERROR -- ${message}`);
}

export const logger = {
  log,
  error,
};
