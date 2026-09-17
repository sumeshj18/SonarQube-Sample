const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');
const http = require('http');

test('GET / returns metadata', (t, done) => {
  const server = http.createServer(app);
  server.listen(0, () => {
    const port = server.address().port;
    http.get(`http://localhost:${port}/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert.equal(res.statusCode, 200);
        const json = JSON.parse(data);
        assert.equal(json.name, 'SonarQube Sample Test Application');
        server.close(done);
      });
    });
  });
});

test('GET /api/health returns ok status', (t, done) => {
  const server = http.createServer(app);
  server.listen(0, () => {
    const port = server.address().port;
    http.get(`http://localhost:${port}/api/health`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        assert.equal(res.statusCode, 200);
        const json = JSON.parse(data);
        assert.equal(json.status, 'ok');
        server.close(done);
      });
    });
  });
});
