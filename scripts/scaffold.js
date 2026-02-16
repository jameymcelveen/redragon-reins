/**
 * scripts/scaffold.js
 * Idempotently builds the Redragon Reins directory structure with .gitkeep files.
 */
const fs = require('fs');
const path = require('path');

const folders = [
    'src/drivers',
    'src/ui',
    'src/shared',
    'research/wine-dumps',
    'research/captures'
];

console.log("🏗  Scaffolding Redragon Reins project structure...");

folders.forEach(folder => {
    const fullPath = path.join(__dirname, '..', folder);

    // 1. Create the directory if it doesn't exist
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`   Created Folder:  ${folder}`);
    }

    // 2. Add .gitkeep to ensure Git tracks the folder
    const gitkeepPath = path.join(fullPath, '.gitkeep');
    if (!fs.existsSync(gitkeepPath)) {
        fs.writeFileSync(gitkeepPath, '');
        console.log(`   Added .gitkeep:  ${folder}/.gitkeep`);
    } else {
        console.log(`   Verified:        ${folder} (skipping)`);
    }
});

console.log("\n🚀 Project structure is locked in and ready for Git.");