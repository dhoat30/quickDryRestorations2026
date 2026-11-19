import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const serviceFolders = {
  "carpet-upholstery-cleaning-auckland": [
    { directory: "carpet-cleaning", label: "Carpet cleaning" },
    { directory: "01upholstery-cleaning", label: "Upholstery cleaning" },
  ],
  "fire-restoration-auckland": [
    { directory: "fire-restoration", label: "Fire restoration" },
  ],
  "flood-restoration-auckland": [
    { directory: "flood-restoration", label: "Flood restoration" },
  ],
  "vinyl-floor-cleaning-and-polishing-auckland": [
    { directory: "02vinyl-floor-cleaning", label: "Vinyl floor cleaning" },
  ],
  "meth-cleaning-auckland": [
    { directory: "meth-decontamination", label: "Meth decontamination" },
  ],
};

async function readFolder({ directory, label }) {
  const folder = path.join(process.cwd(), "public", directory);
  const files = await readdir(folder, { withFileTypes: true }).catch(error => {
    if (error.code === "ENOENT") return [];
    throw error;
  });
  const imageFiles = files
    .filter(file => file.isFile() && /\.(?:jpe?g|png|webp|avif|gif)$/i.test(file.name))
    .map(file => file.name)
    .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
  const images = await Promise.all(imageFiles.map(async file => {
    const metadata = await sharp(path.join(folder, file)).metadata();
    const stem = path.parse(file).name;
    const match = stem.match(/^(before|after)(?:[-_ ](.+))?$/i);
    return {
      stage: match?.[1].toLowerCase(),
      pair: match?.[2]?.toLowerCase() || "",
      image: {
        id: directory + "/" + file,
        url: "/" + directory + "/" + encodeURIComponent(file),
        width: metadata.autoOrient?.width || metadata.width,
        height: metadata.autoOrient?.height || metadata.height,
        alt: label + (match ? " " + match[1].toLowerCase() : "") + " by QuickDry Restorations",
      },
    };
  }));

  const used = new Set();
  const gallery = [];
  for (const before of images.filter(image => image.stage === "before")) {
    const after = images.find(image => image.stage === "after" && image.pair === before.pair);
    if (after) {
      gallery.push({ before: before.image, after: after.image });
      used.add(before);
      used.add(after);
    }
  }
  for (const item of images) {
    if (!used.has(item)) gallery.push({ after: item.image });
  }
  return gallery;
}

export async function getServiceMedia(slug) {
  const folders = serviceFolders[slug] || [];
  return (await Promise.all(folders.map(readFolder))).flat();
}

export async function getAllServiceMedia() {
  return (await Promise.all(Object.keys(serviceFolders).map(getServiceMedia))).flat();
}
