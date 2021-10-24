import esbuild from "esbuild";
import glob from "glob";
import kleur from "kleur";
import packageJson from "../package.json";

import {
  createWriteStream,
  lstatSync,
  mkdirSync,
  rmSync,
  unlinkSync,
} from "fs";
import { dirname, relative } from "path";
import { fileURLToPath } from "url";

/**
 * @typedef {typeof packageJson} PackageJson
 */
type PackageJson = typeof packageJson;

const outDir = `../dist`;

// @ts-ignore
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Runs esbuild for each configuration in `c`
 *
 * @param {{
 *    commonOptions:esbuild.BuildOptions,
 *    configs: esbuild.BuildOptions[],
 *    inOrder: boolean
 * }} o build options
 * @param {esbuild.BuildOptions[]} c configs
 * @param {esbuild.BuildOptions} co common config (default: {})
 * @returns {Promise<esbuild.BuildResult[]>}
 */
const build = async (o: {
  commonOptions: esbuild.BuildOptions;
  configs: esbuild.BuildOptions[];
  inOrder: boolean;
}): Promise<esbuild.BuildResult[]> => {
  o.commonOptions ?? (o.commonOptions = {});

  /**
   * @param {esbuild.BuildOptions} options
   * @param {number} i
   * @returns {Promise<esbuild.BuildResult>}
   */
  const runBuildCommand = async (
    options: esbuild.BuildOptions,
    i: number
  ): Promise<esbuild.BuildResult> => {
    let buildResult: esbuild.BuildResult = {
      errors: [],
      warnings: [],
    };

    try {
      await esbuild.build(options);
    } catch (e) {
      process.stderr.write(`${kleur.red(e.message)}\n`);
      process.exit(1);
    } finally {
      process.stdout.write(kleur.blue(`Build #${i + 1} finished.\n`));
    }

    return buildResult;
  };

  let res = [];

  if (o.inOrder) {
    let i = 0;
    for (let options of o.configs) {
      const opts = { ...o.commonOptions, ...options };
      res.push(await runBuildCommand(opts, i));
      i++;
    }
  } else {
    o.configs.map(async (options, i) => {
      const opts = { ...o.commonOptions, ...options };
      res.push(await runBuildCommand(opts, i));
    });
  }

  return res;
};

const cleanOutDir = () => {
  const outDirAbs = `${__dirname}/${outDir}`;
  console.log(
    `${kleur.blue(`[i]`)} ${kleur.red(
      `CLEANING`
    )} output directory ${kleur.yellow(`"${outDirAbs}"`)}...`
  );
  rmSync(outDirAbs, { recursive: true });
  mkdirSync(outDirAbs);
};

/**
 * Copies `package.json` from root to `p`, while running `cb`
 *
 * @param {string} p path to copy to
 * @param {(x: PackageJson) => Promise<PackageJson>} cb
 */
const copyPackageJson = async (
  p: string,
  cb: (x: PackageJson) => Promise<PackageJson>
) => {
  const newPackageJson: PackageJson = await cb(packageJson);
  const stream = createWriteStream(`${__dirname}/${p}/package.json`);
  const data = JSON.stringify(newPackageJson);

  stream.once("open", () => {
    stream.write(data);
    stream.end();
  });
};

const deleteEmptyFiles = () => {
  glob(`${__dirname}/${outDir}/**/*.js`, {}, async (err, matches) => {
    if (err) {
      throw err;
    }

    matches.map((file) => {
      const stats = lstatSync(file);

      if (!stats.isDirectory() && stats.size === 0) {
        const mapFile = `${file}.map`;

        console.log(
          `${kleur.blue(`[i]`)} ${kleur.red(
            `DELETING`
          )} empty file ${kleur.yellow(
            `"${relative(__dirname, file)}"`
          )} and its corresponding map file...`
        );
        unlinkSync(file);
        unlinkSync(mapFile);
      }
    });
  });
};

const main = () => {
  glob(`${__dirname}/../lib/**/*`, {}, async (err, matches) => {
    if (err) {
      throw err;
    }

    // exclude directories
    matches = matches.filter((match) => {
      const result = lstatSync(match);
      return !result.isDirectory();
    });

    /**
     * Options common for all build variants
     *
     * @type {esbuild.BuildOptions}
     */
    const commonOptions: esbuild.BuildOptions = {
      absWorkingDir: __dirname,
      bundle: true,
      // entryPoints: matches,
      entryPoints: ["../lib/index.ts"],
      platform: "browser",
      sourcemap: "external",
      sourcesContent: true,
      tsconfig: "../tsconfig.json",
    };

    /**
     * @type {esbuild.BuildOptions[]}
     */
    const configs: esbuild.BuildOptions[] = [
      {
        format: "cjs",
        minify: true,
        outdir: `${outDir}/cjs/min`,
      },
      {
        format: "cjs",
        outdir: `${outDir}/cjs`,
      },
      {
        format: "esm",
        minify: true,
        outdir: `${outDir}/min`,
      },
      {
        format: "esm",
        outdir: `${outDir}`,
      },
      {
        format: "iife",
        minify: true,
        outdir: `${outDir}/iife/min`,
      },
      {
        format: "iife",
        outdir: `${outDir}/iife`,
      },
    ];

    cleanOutDir();
    await build({ configs, commonOptions, inOrder: true });
    console.log(
      `${kleur.blue(`[i]`)} Copying ${kleur.yellow(
        `"package.json"`
      )} to ${kleur.yellow(`"${outDir}"`)}...`
    );
    copyPackageJson(outDir, async (_pkgJson) => {
      /**
       * @type {PackageJson}
       */
      const pkgJson: PackageJson = _pkgJson;
      pkgJson["types"] = `typings`;
      return pkgJson;
    });
    deleteEmptyFiles();
  });
};

main();
