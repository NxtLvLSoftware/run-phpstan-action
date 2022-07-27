"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const core = require("@actions/core");
const exec = require("@actions/exec");
const fs = require("fs");
async function checkReadable(executable) {
    await fs.access(executable, fs.constants.R_OK, (err) => {
        if (err) {
            throw new Error(`${executable} is not readable`);
        }
    });
}
async function checkExecutable(executable) {
    await fs.access(executable, fs.constants.X_OK, (err) => {
        if (err) {
            throw new Error(`${executable} is not executable`);
        }
    });
}
/**
 * Setup PHPStan executable in the given path, taking care of caching.
 */
async function run() {
    const executable = core.getInput("executable");
    const phpBin = core.getInput("php");
    await checkReadable(executable);
    await checkExecutable(phpBin);
    const paths = core.getInput("analyse");
    const analyse = paths !== "undefined";
    const level = core.getInput("level");
    const config = core.getInput("config");
    const autoloadFile = core.getInput("autoload-file");
    const errorFormat = core.getInput("error-format");
    const noProgress = core.getInput("no-progress");
    const memoryLimit = core.getInput("memory-limit");
    const xDebug = core.getInput("xdebug");
    const debug = core.getInput("debug");
    const ansi = core.getInput("ansi");
    const quiet = core.getInput("quiet");
    const result = await exec.exec(`${phpBin} ${executable}` + (analyse ? "analyse " + paths : ""), [
        (level === "" ? "" : " --level=" + level),
        (config === "" ? "" : " -c " + config),
        (autoloadFile === "" ? "" : " --autoload-file=" + autoloadFile),
        (errorFormat === "" ? "" : " --error-format=" + errorFormat),
        (noProgress !== "true" ? "" : " --no-progress"),
        (memoryLimit === "" ? "" : " --memory-limit=" + memoryLimit),
        (xDebug !== "true" ? "" : " --xdebug"),
        (debug !== "true" ? "" : " --debug"),
        (ansi !== "true" ? "" : " --ansi"),
        (quiet !== "true" ? "" : " --quiet")
    ], {
        listeners: {
            stdout: (data) => {
                core.info(data.toString());
            }
        }
    });
    core.setOutput("exit-code", result.toString());
    if (result !== 0) {
        core.setOutput("passed", "false");
    }
    else {
        core.setOutput("passed", "true");
    }
}
exports.run = run;
;
(async () => {
    await run();
})().catch(core.setFailed);
