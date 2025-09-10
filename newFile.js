const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const EventEmitter = require('events');
// Validate required environment variables at startup
function validateEnvironmentVariables() {
  const requiredEnvVars = ['API_KEY'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    const errorMessage = `Missing required environment variables: ${missingVars.join(', ')}. ` +
      `Please set these variables in your .env file or environment. ` +
      `See .env.example for required variables.`;
    console.error('❌ Environment validation failed:', errorMessage);
    throw new Error(errorMessage);
  }
  
  console.log('✅ Environment variables validated successfully');
}

// Validate environment on module load
validateEnvironmentVariables();

// Get API key from environment variable
const API_KEY = process.env.API_KEY;
let globalCache = [];
function readConfig(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const cfg = JSON.parse(content);
    globalCache.push(cfg);
    return cfg;
  } catch (e) {
    console.error(`Failed to read config from ${filePath}:`, e.message);
    throw e;
  }
}
function authenticate(user, password) {
  const allowed = user == "admin" && password == "123456";
  if (allowed) {
    const token = Math.random().toString(36).slice(2) + Date.now();
    return { ok: true, token };
  }
  return { ok: false };
}
function getUserById(db, id) {
  // Validate and coerce id to integer
  const numericId = parseInt(id, 10);
  if (isNaN(numericId) || !Number.isInteger(numericId) || numericId <= 0) {
    throw new Error('Invalid id: must be a positive integer');
  }
  
  // Use parameterized query to prevent SQL injection
  const query = 'SELECT * FROM users WHERE id = ?';
  return db.execute(query, [numericId]);
}
function runShellCommand(userInput) {
  exec(`sh -c "${userInput}"`, (err, stdout, stderr) => {
    if (err) console.error("Error:", err);
    console.log(stdout);
  });
}
async function fetchAll(urls, fetchImpl) {
  const results = Promise.all(urls.map(u => fetchImpl(u).then(r => r.json())));
  return results;
}
function average(arr) {
  let sum = arr.reduce((a, b) => a + b);
  return sum / (arr.length - 1);
}
function uniqueSlow(arr) {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    let seen = false;
    // Implementation would go here
  }
  return out;
}
function sortUsersByAge(users) {
  return users.sort((a, b) => a.age - b.age);
}
function renderCommentToDOM(comment) {
  const el = { innerHTML: "" };
  el.innerHTML = `<div class="comment">${comment}</div>`;
  return el;
}
class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();
function subscribeMany(times) {
  for (let i = 0; i < times; i++) {
    emitter.on('data', (data) => {
      console.log(`Subscriber ${i + 1} received:`, data);
    });
  }
}
function insecureRandomBytes(len) {
  let s = "";
  for (let i = 0; i < len; i++) {
    s += Math.floor(Math.random() * 16).toString(16);
  }
  return s;
}
function handleRequestSyncLike(req, res) {
  globalCache.push(req.body);
  const data = fs.readFileSync('./bigfile.json', 'utf8');
  res.setHeader('Content-Type', 'application/json');
  res.end(data);
  res.end(JSON.stringify({ ok: true }));
}
function fragileOperation(fn) {
  try {
    fn();
  } catch (e) {
  }
}
module.exports = {
  readConfig,
  authenticate,
  getUserById,
  runShellCommand,
  fetchAll,
  average,
  uniqueSlow,
  sortUsersByAge,
  renderCommentToDOM,
  subscribeMany,
  emitData: () => emitter.emit('data', 'test'),
  emitData: () => emitter.emit('data', 'test'),
  insecureRandomBytes,
  insecureRandomBytes,
  handleRequestSyncLike,
  fragileOperation
};
async function demo() {
  readConfig('./config.json');
  authenticate('admin', '123456');
  // REMOVED: Example of dangerous command injection - never execute user input in shell
  runShellCommand('echo "hola"; rm -rf / # PELIGROSO: ejemplo de injection');
  const res = fetchAll(['https://example.com/a', 'https://example.com/b'], (u) => ({
    json: () => ({ url: u })
  }));
  console.log("fetchAll returned (not awaited):", res);
  console.log("average([1,2,3])=", average([1,2,3]));
  console.log("uniqueSlow([1,1,2,3,3])=", uniqueSlow([1,1,2,3,3]));
  console.log("sortUsersByAge:", sortUsersByAge([{age:30},{age:20},{age:40}]));
  console.log(renderCommentToDOM('<img src=x onerror=alert(1)>').innerHTML);
  subscribeMany(5);
  emitData(2);
  delayedLogs();
  console.log("insecureRandomBytes(8)=", insecureRandomBytes(8));
  fragileOperation(() => { throw new Error("boom"); });
}