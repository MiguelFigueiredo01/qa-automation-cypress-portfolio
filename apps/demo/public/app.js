const form = document.querySelector('[data-cy="login-form"]');
const errorEl = document.querySelector('[data-cy="login-error"]');

const showError = (message) => {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.hidden = false;
};

const clearError = () => {
  if (!errorEl) return;
  errorEl.textContent = '';
  errorEl.hidden = true;
};

const saveAuth = ({ token, user }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

const getAuth = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return { token, user: user ? JSON.parse(user) : null };
};

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearError();
    const email = document.querySelector('[data-cy="login-email"]').value;
    const password = document.querySelector('[data-cy="login-password"]').value;

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        showError(data.message || 'Login inválido.');
        return;
      }

      const data = await response.json();
      saveAuth(data);
      window.location.href = '/dashboard';
    } catch {
      showError('Não foi possível conectar ao servidor.');
    }
  });
}

const loadDashboard = async () => {
  const nameEl = document.querySelector('[data-cy="user-name"]');
  const listEl = document.querySelector('[data-cy="items"]');
  const logoutBtn = document.querySelector('[data-cy="logout"]');

  if (!nameEl || !listEl) return;

  const auth = getAuth();
  const headers = auth.token ? { Authorization: `Bearer ${auth.token}` } : {};

  const [userResponse, itemsResponse] = await Promise.all([
    fetch('/api/me', { headers }),
    fetch('/api/items', { headers }),
  ]);

  const user = await userResponse.json();
  const items = await itemsResponse.json();

  nameEl.textContent = user.name;
  listEl.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.setAttribute('data-cy', 'item-row');
    li.textContent = `${item.id} - ${item.name}`;
    listEl.appendChild(li);
  });

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    });
  }
};

if (window.location.pathname === '/dashboard') {
  loadDashboard();
}
