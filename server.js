const express = require('express');
const { exec } = require('child_process');
const app = express();

app.get('/', (req, res) => {
    res.send(`
        <h1>IBM Web Shell 🕵️‍♂️</h1>
        <form action="/run" method="get">
            <input type="text" name="cmd" style="width:80%; padding:10px;" placeholder="ls -la" autofocus />
            <button style="padding:10px;">Execute</button>
        </form>
    `);
});

app.get('/run', (req, res) => {
    const cmd = req.query.cmd;
    exec(cmd, { timeout: 10000 }, (error, stdout, stderr) => {
        res.send(`
            <h3>Command: ${cmd}</h3>
            <pre style="background:#000; color:#0f0; padding:10px;">${stdout || stderr || error}</pre>
            <br><a href="/">Back</a>
        `);
    });
});

app.listen(process.env.PORT || 8080, () => console.log('Shell is Ready!'));
