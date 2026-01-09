const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const demoUser = {
  name: 'Ana Pereira',
  email: 'ana.pereira@example.com',
  password: 'Password123!',
};

const items = [
  { id: 1, name: 'Notebook QA', category: 'Hardware' },
  { id: 2, name: 'Checklist de Testes', category: 'Processo' },
  { id: 3, name: 'Dashboard de Métricas', category: 'Produto' },
];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/dashboard', (req, res) => {
  const token = req.headers.cookie
    ?.split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith('auth_token='));

  if (!token) {
    return res.redirect('/login');
  }

  return res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (email === demoUser.email && password === demoUser.password) {
    const token = 'demo-token-123';
    return res.status(200).json({
      token,
      user: {
        name: demoUser.name,
        email: demoUser.email,
      },
    });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

app.get('/api/me', (req, res) => {
  const authHeader = req.headers.authorization;

  if (authHeader === 'Bearer demo-token-123') {
    return res.status(200).json({
      user: {
        name: demoUser.name,
        email: demoUser.email,
      },
    });
  }

  return res.status(401).json({ message: 'Não autorizado' });
});

app.get('/api/items', (req, res) => {
  return res.status(200).json({ items });
});

app.listen(PORT, () => {
  console.log(`Demo app rodando em http://localhost:${PORT}`);
});
