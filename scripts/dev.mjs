import { createServer } from "vite";
import { spawn } from "node:child_process";
import electron from "electron";

const server = await createServer();
await server.listen();
const environment = { ...process.env, RIFT_DEV_URL: "http://127.0.0.1:5173" };
delete environment.ELECTRON_RUN_AS_NODE;
const child = spawn(electron, ["."], { stdio: "inherit", env: environment });
child.on("close", async (code) => {
  await server.close();
  process.exit(code || 0);
});
process.on("SIGINT", () => child.kill());
