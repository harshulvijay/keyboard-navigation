import glob from "glob";
import { exec } from "child_process";

glob(`../dist/*.tgz`, undefined, async (err, files) => {
  if (err) {
    throw err;
  }

  files.map(async (file) => {
    const process1 = exec(`pnpm remove mylib`);

    process1.stdout.pipe(process.stdout);
    process1.stderr.pipe(process.stderr);

    process1.on(`exit`, (code) => {
      console.log(`child process #1 exited with code ${code}`);
    });

    const process2 = exec(`pnpm i -D mylib@${file}`);

    process2.stdout.pipe(process.stdout);
    process2.stderr.pipe(process.stderr);

    process2.on(`exit`, (code) => {
      console.log(`child process #2 exited with code ${code}`);
    });
  });
});
