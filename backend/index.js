const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Backend running autotest CI/CD on http://localhost:${PORT}`));
