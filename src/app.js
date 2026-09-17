const express = require('express');
const sampleRoutes = require('./routes/sample.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'SonarQube Sample Test Application',
    description: 'Node.js application configured for SonarQube / SonarCloud scanning via GitHub Actions',
    endpoints: [
      { path: '/api/health', description: 'Clean health check endpoint' },
      { path: '/api/greet?name=test', description: 'Reflected input test pattern' },
      { path: '/api/eval?code=1+1', description: 'Eval test pattern' },
      { path: '/api/read-file?file=test.txt', description: 'File path test pattern' },
      { path: '/api/users?username=admin', description: 'Query concatenation pattern' }
    ]
  });
});

// API Routes
app.use('/api', sampleRoutes);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Veracode Sample App listening at http://localhost:${PORT}`);
  });
}

module.exports = app;
