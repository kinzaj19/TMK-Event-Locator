const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ TMK Backend running on http://localhost:${PORT}`);
});
//Set up server starter logic in server.js

