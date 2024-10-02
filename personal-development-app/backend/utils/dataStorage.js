const fs = require('fs').promises;
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'userdata.json');

async function loadData() {
  try {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, return empty data structure
      return { users: [], goals: [], tasks: [], notes: [], social: [], transactions: [] };
    }
    throw error;
  }
}

async function saveData(data) {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
}

module.exports = { loadData, saveData };