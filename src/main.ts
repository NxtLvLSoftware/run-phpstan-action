import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as fs from "fs";
import * as path from "path"

async function checkReadable(executable: string): Promise<void> {
	await fs.access(executable, fs.constants.R_OK, (err) => {
		if(err) {
			throw new Error(`${executable} is not readable`);
		}
	});
}

async function checkExecutable(executable: string): Promise<void> {
	await fs.access(executable, fs.constants.X_OK, (err) => {
		if(err) {
			throw new Error(`${executable} is not executable`);
		}
	});
}

/**
 * Setup PHPStan executable in the given path, taking care of caching.
 */
export async function run(): Promise<void> {
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
	const memoryLimit = core.getInput("memory-limit");
	const xDebug = core.getInput("xdebug");
	const debug = core.getInput("debug");
	const ansi = core.getInput("ansi");
	const quiet = core.getInput("quiet");

	const result = await exec.exec(`${phpBin} ${executable} ` + (analyse ? "analyse " + paths : "") +
		(level === "" ? "" : " --level=" + level) +
		(config === "" ? "" : " -c=" + config) +
		(autoloadFile === "" ? "" : " --autoload-file=" + autoloadFile) +
		(errorFormat === "" ? "" : " --error-format=" + errorFormat) +
		(memoryLimit === "" ? "" : " --memory-limit=" + memoryLimit) +
		(xDebug === "" ? "" : " --xdebug") +
		(debug === "" ? "" : " --debug") +
		(ansi === "true" ? " --ansi" : " --no-ansi") +
		(quiet === "true" ? " --quiet" : ""));

	core.setOutput("exit-code", result.toString());
	if(result !== 0) {
		core.setOutput("passed", "false");
	} else {
		core.setOutput("passed", "true");
	}
}

;(async () => {
	await run();
})().catch(core.setFailed);
