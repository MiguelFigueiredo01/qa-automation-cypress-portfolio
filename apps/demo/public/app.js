const loginForm = document.querySelector('#login-form');
const errorElement = document.querySelector('[data-cy="error"]');
const welcomeElement = document.querySelector('[data-cy="welcome"]');
const itemsContainer = document.querySelector('#items');
const logoutButton = document.querySelector('[data-cy="logout"]');

const setToken = (token) => {
  window.localStorage.setItem('auth_token', token);
  document.cookie = `auth_token=${token}; path=/`;
};

const clearToken = () => {
  window.localStorage.removeItem('auth_token');
  document.cookie = 'auth_token=; Max-Age=0; path=/';
};

const getToken = () => window.localStorage.getItem('auth_token');

const renderItems = (items) => {
  if (!itemsContainer) return;
  itemsContainer.innerHTML = '';
  items.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.setAttribute('data-cy', 'item');
    card.innerHTML = `
      <strong>${item.name}</strong>
      <p>${item.category}</p>
    `;
    itemsContainer.appendChild(card);
  });
};

const loadDashboard = async () => {
  const token = getToken();
  if (!token) {
    window.location.replace('/login');
    return;
  }

  const meResponse = await fetch('/api/me', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!meResponse.ok) {
    clearToken();
    window.location.replace('/login');
    return;
  }

  const meData = await meResponse.json();
  if (welcomeElement) {
    welcomeElement.textContent = `Bem-vindo(a), ${meData.user.name}!`;
  }

  const itemsResponse = await fetch('/api/items');
  const itemsData = await itemsResponse.json();
  renderItems(itemsData.items || []);
};

if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (errorElement) {
      errorElement.textContent = '';
    }

    const formData = new FormData(loginForm);
    const payload = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      if (errorElement) {
        errorElement.textContent = 'Credenciais inválidas. Tente novamente.';
      }
      return;
    }

    const data = await response.json();
    setToken(data.token);
    window.location.replace('/dashboard');
  });
}

if (welcomeElement) {
  loadDashboard();
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    clearToken();
    window.location.replace('/login');
  });
}
