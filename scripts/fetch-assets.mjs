import https from "node:https";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/assets");
const source = JSON.parse(
  await fs.readFile("docs/research/official-champions-16.22.1.json", "utf8"),
);
await fs.mkdir(path.join(root, "champions"), { recursive: true });

function download(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (response) => {
      if (response.statusCode !== 200) {
        response.resume();
        reject(new Error(`HTTP ${response.statusCode}: ${url}`));
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
      response.on("error", reject);
    });
    request.setTimeout(25000, () =>
      request.destroy(new Error("Download timed out")),
    );
    request.on("error", reject);
  });
}

const files = source.champions.map((champion) => ({
  url: `https://ddragon.leagueoflegends.com/cdn/${source.version}/img/champion/${champion.id}.png`,
  file: path.join(root, "champions", `${champion.id}.png`),
}));
files.push({
  url: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
  file: path.join(root, "home-ahri.jpg"),
});
let cursor = 0;
async function worker() {
  while (cursor < files.length) {
    const { url, file } = files[cursor++];
    try {
      if ((await fs.stat(file)).size > 1000) continue;
    } catch {
      /* First download. */
    }
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const image = await download(url);
        if (image.length < 1000) throw new Error(`Invalid image: ${url}`);
        await fs.writeFile(file, image);
        break;
      } catch (error) {
        if (attempt === 2) throw error;
      }
    }
  }
}
await Promise.all(Array.from({ length: 6 }, worker));
console.log(`Downloaded ${files.length} official images for offline use.`);
