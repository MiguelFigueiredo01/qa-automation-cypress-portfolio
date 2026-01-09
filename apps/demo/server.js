const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const user = {
  id: 1,
  name: 'Ada Lovelace',
  email: 'ada@example.com',
};

const items = [
  { id: 101, name: 'Relatório diário' },
  { id: 102, name: 'Checklist de regressão' },
  { id: 103, name: 'Pipeline de CI' },
];

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'ada@example.com' && password === 'cypress123') {
    return res.json({
      token: 'fake-token-123',
      user,
    });
  }

  return res.status(401).json({ message: 'Credenciais inválidas.' });
});

app.get('/api/me', (req, res) => {
  return res.json(user);
});

app.get('/api/items', (req, res) => {
  return res.json(items);
});

app.listen(port, () => {
  console.log(`Demo app running on http://localhost:${port}`);
});
