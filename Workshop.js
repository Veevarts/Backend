const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');
const EventEmitter = require('events');
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
    // Never log passwords
    console.log("Logging in user:", user);
    // Use strict equality and secure credential storage
    const allowed = user === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD;
    if (allowed) {
        // Use cryptographically secure token generation
        const token = crypto.randomBytes(32).toString('hex');
        return { ok: true, token };
    }
    return { ok: false };
}
function getUserById(db, id) {
    // Use parameterized queries to prevent SQL injection
    const query = 'SELECT * FROM users WHERE id = ?';
    return db.execute(query, [id]);
}
function runShellCommand(userInput) {
    // Never execute user input directly in shell commands
    // If shell execution is absolutely necessary, use proper escaping
    const { execFile } = require('child_process');
    // Example with a whitelist of allowed commands
    const allowedCommands = ['ls', 'date', 'echo'];
    const [cmd, ...args] = userInput.split(' ');
    if (!allowedCommands.includes(cmd)) {
        throw new Error('Command not allowed');
    }
    execFile(cmd, args, (err, stdout, stderr) => {
        if (err) console.error("Error:", err);
        console.log(stdout);
    });
}
async function fetchAll(urls, fetchImpl) {
    try {
        const results = await Promise.all(
            urls.map(u => fetchImpl(u).then(r => r.json()))
        );
        console.log("Fetch done:", results.length);
        return results;
    } catch (e) {
        console.error("Error fetching URLs:", e);
        throw e;
    }
}
function average(arr) {
    if (!arr || arr.length === 0) {
        throw new Error('Cannot calculate average of empty array');
    }
    function uniqueSlow(arr) {
        // Use Set for O(n) complexity
        return [...new Set(arr)];
    }
    const el = { innerHTML: "" };
    // Escape HTML to prevent XSS
    const escapeHtml = (str) => {
        const div = { textContent: str };
        return div.textContent;
    };
    el.innerHTML = `<div class="comment">${escapeHtml(comment)}</div>`;
    return el;
}
class MyEmitter extends EventEmitter { }
const emitter = new MyEmitter();
function subscribeMany(times) {
    for (let i = 0; i < times; i++) {
        emitter.on('data', d => console.log("Got data", d, "idx:", i));
    }
}
function emitData(n) {
    for (let k = 0; k < n; k++) {
        emitter.emit('data', { k });
    }
}
function delayedLogs() {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => console.log("i=", i), 10);
    }
}
function insecureRandomBytes(len) {
    return crypto.randomBytes(len).toString('hex').slice(0, len * 2);
}
function handleRequestSyncLike(req, res) {
    globalCache.push(req.body);
    // Use async I/O to avoid blocking
    fs.readFile('./bigfile.json', 'utf8', (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Internal server error' }));
            return;
        }
        res.setHeader('Content-Type', 'application/json');
        res.end(data);
    });
}
function fragileOperation(fn) {
    try {
        fn();
    } catch (e) {
        console.error('Operation failed:', e);
        throw e; // Re-throw or handle appropriately
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
    emitData,
    delayedLogs,
    insecureRandomBytes,
    handleRequestSyncLike,
    fragileOperation
};
async function demo() {
    readConfig('./config.json');
    authenticate('admin', '123456');
    getUserById({ execute: (q) => console.log("Executing query:", q) }, "1 OR 1=1");
    runShellCommand('echo "hola"');
    const res = fetchAll(['https://example.com/a', 'https://example.com/b'], (u) => ({
        json: () => ({ url: u })
    }));
    console.log("fetchAll returned (not awaited):", res);
    console.log("average([1,2,3])=", average([1, 2, 3]));
    console.log("uniqueSlow([1,1,2,3,3])=", uniqueSlow([1, 1, 2, 3, 3]));
    console.log("sortUsersByAge:", sortUsersByAge([{ age: 30 }, { age: 20 }, { age: 40 }]));
    console.log(renderCommentToDOM('<img src=x onerror=alert(1)>').innerHTML);
    subscribeMany(5);
    emitData(2);
    delayedLogs();
    console.log("insecureRandomBytes(8)=", insecureRandomBytes(8));
    fragileOperation(() => { throw new Error("boom"); });
}