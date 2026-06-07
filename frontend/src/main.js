import "./styles.css";

const state = {
  apiUrl: localStorage.getItem("apiUrl") || "http://localhost:3000",
  accessToken: localStorage.getItem("accessToken") || "",
  refreshToken: localStorage.getItem("refreshToken") || "",
  user: JSON.parse(localStorage.getItem("authUser") || "null"),
};

const pages = {
  auth: ["Autenticación", "Registro, login y ciclo de vida de JWT"],
  users: ["Usuarios", "Perfil, contenido e interacciones"],
  chat: ["Chat", "Envío e historial de mensajes"],
  rbac: ["RBAC", "Roles, permisos y asignaciones administrativas"],
  config: ["Configuración", "Conexión con la API y sesión local"],
};

document.querySelector("#app").innerHTML = `
  <div class="shell">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">T</div>
        <div><strong>Tinder API Lab</strong><span>Frontend de pruebas</span></div>
      </div>
      <nav class="nav">
        ${Object.entries(pages)
          .map(
            ([key, [title]], index) =>
              `<button data-page="${key}" class="${index === 0 ? "active" : ""}">${title}</button>`,
          )
          .join("")}
      </nav>
      <div class="session">
        Sesión actual
        <strong id="sessionName">Sin autenticar</strong>
      </div>
    </aside>

    <main class="content">
      <header class="topbar">
        <div><h1 id="pageTitle">Autenticación</h1><p id="pageSubtitle">${pages.auth[1]}</p></div>
        <div class="status"><span id="statusDot" class="dot"></span><span id="statusText">API sin comprobar</span></div>
      </header>

      <section id="auth" class="page active">
        <div class="grid">
          <article class="card">
            <h2>Crear una cuenta</h2>
            <p>Registra un usuario y guarda automáticamente sus tokens.</p>
            <form class="form" data-action="register">
              <div class="row">
                <label>Nombre<input name="name" required placeholder="Alex" /></label>
                <label>Edad<input name="age" type="number" min="18" max="120" required value="22" /></label>
              </div>
              <label>Correo<input name="email" type="email" required placeholder="alex@email.com" /></label>
              <label>Contraseña<input name="password" type="password" minlength="8" required placeholder="Mínimo 8 caracteres" /></label>
              <button class="btn">Registrar</button>
            </form>
          </article>

          <article class="card">
            <h2>Iniciar sesión</h2>
            <p>Obtiene access y refresh tokens para las rutas protegidas.</p>
            <form class="form" data-action="login">
              <label>Correo<input name="email" type="email" required placeholder="admin@tinder.local" /></label>
              <label>Contraseña<input name="password" type="password" required placeholder="Contraseña" /></label>
              <button class="btn">Ingresar</button>
            </form>
          </article>

          <article class="card wide">
            <h2>Sesión JWT</h2>
            <p>Prueba extracción del usuario, rotación del refresh token y cierre de sesión.</p>
            <div class="actions">
              <button class="btn" data-request="me">GET /auth/me</button>
              <button class="btn secondary" data-request="refresh">POST /auth/refresh</button>
              <button class="btn danger" data-request="logout">POST /auth/logout</button>
            </div>
            <div id="currentUser" class="empty" style="margin-top: 16px">No hay una sesión activa.</div>
          </article>
        </div>
      </section>

      <section id="users" class="page">
        <div class="quick-actions">
          <button class="btn" data-request="users">Cargar usuarios</button>
        </div>
        <div class="grid three">
          <article class="card wide">
            <h2>Usuarios disponibles</h2>
            <p>Consulta protegida para comprobar el access token.</p>
            <div id="usersList" class="empty">Pulsa “Cargar usuarios”.</div>
          </article>
          <article class="card">
            <h2>Actualizar perfil</h2>
            <p>Actualiza el perfil del usuario autenticado.</p>
            <form class="form" data-action="profile">
              <label>Biografía<textarea name="bio" required placeholder="Cuéntanos algo"></textarea></label>
              <label>Género<input name="gender" required placeholder="Masculino, femenino..." /></label>
              <label>Ciudad<input name="city" required placeholder="Quito" /></label>
              <button class="btn">Guardar perfil</button>
            </form>
          </article>
          <article class="card">
            <h2>Agregar foto</h2>
            <p>Registra una URL de imagen para el usuario actual.</p>
            <form class="form" data-action="photo">
              <label>URL<input name="url" type="url" required placeholder="https://..." /></label>
              <button class="btn">Agregar foto</button>
            </form>
          </article>
          <article class="card">
            <h2>Agregar música</h2>
            <p>Asocia una canción al perfil autenticado.</p>
            <form class="form" data-action="music">
              <label>Título<input name="title" required /></label>
              <label>Artista<input name="artist" required /></label>
              <label>Género<input name="genre" /></label>
              <button class="btn">Agregar música</button>
            </form>
          </article>
          <article class="card">
            <h2>Dar like</h2>
            <p>El usuario origen se obtiene del JWT.</p>
            <form class="form" data-action="like">
              <label>ID del usuario<input name="likedId" type="number" min="1" required /></label>
              <button class="btn">Enviar like</button>
            </form>
          </article>
          <article class="card">
            <h2>Suscripción</h2>
            <p>Cambia el plan del usuario autenticado.</p>
            <form class="form" data-action="subscription">
              <label>Plan<select name="plan"><option>FREE</option><option>PREMIUM</option><option>GOLD</option></select></label>
              <button class="btn">Cambiar plan</button>
            </form>
          </article>
        </div>
      </section>

      <section id="chat" class="page">
        <div class="grid">
          <article class="card">
            <h2>Enviar mensaje</h2>
            <p>El remitente se obtiene del token autenticado.</p>
            <form class="form" data-action="message">
              <label>ID de sala<input name="chatRoomId" type="number" min="1" required /></label>
              <label>Mensaje<textarea name="content" required></textarea></label>
              <button class="btn">Enviar</button>
            </form>
          </article>
          <article class="card">
            <h2>Historial</h2>
            <p>Consulta los mensajes de una sala permitida.</p>
            <form class="form" data-action="history">
              <label>ID de sala<input name="roomId" type="number" min="1" required /></label>
              <button class="btn">Consultar historial</button>
            </form>
            <div id="messagesList" class="empty" style="margin-top: 16px">Sin mensajes cargados.</div>
          </article>
        </div>
      </section>

      <section id="rbac" class="page">
        <div class="quick-actions">
          <button class="btn" data-request="roles">Listar roles</button>
          <button class="btn" data-request="permissions">Listar permisos</button>
          <button class="btn secondary" data-request="userRoles">Asignaciones de roles</button>
          <button class="btn secondary" data-request="rolePermissions">Asignaciones de permisos</button>
        </div>
        <div class="grid">
          <article class="card">
            <h2>Crear rol</h2>
            <p>Requiere rol admin y permiso create_role.</p>
            <form class="form" data-action="createRole">
              <label>Nombre<input name="name" required /></label>
              <label>Descripción<input name="description" /></label>
              <button class="btn">Crear rol</button>
            </form>
          </article>
          <article class="card">
            <h2>Crear permiso</h2>
            <p>Requiere rol admin y permiso create_permission.</p>
            <form class="form" data-action="createPermission">
              <label>Nombre<input name="name" required /></label>
              <label>Descripción<input name="description" /></label>
              <button class="btn">Crear permiso</button>
            </form>
          </article>
          <article class="card">
            <h2>Asignar rol</h2>
            <p>Relaciona un usuario existente con un rol.</p>
            <form class="form" data-action="assignRole">
              <div class="row">
                <label>User ID<input name="userId" type="number" min="1" required /></label>
                <label>Role ID<input name="roleId" type="number" min="1" required /></label>
              </div>
              <button class="btn">Asignar rol</button>
            </form>
          </article>
          <article class="card">
            <h2>Asignar permiso</h2>
            <p>Relaciona un permiso existente con un rol.</p>
            <form class="form" data-action="assignPermission">
              <div class="row">
                <label>Role ID<input name="roleId" type="number" min="1" required /></label>
                <label>Permission ID<input name="permissionId" type="number" min="1" required /></label>
              </div>
              <button class="btn">Asignar permiso</button>
            </form>
          </article>
          <article class="card wide">
            <h2>Resultados RBAC</h2>
            <p>Los listados administrativos aparecerán aquí.</p>
            <div id="rbacList" class="empty">Ejecuta una consulta RBAC.</div>
          </article>
        </div>
      </section>

      <section id="config" class="page">
        <div class="grid">
          <article class="card">
            <h2>URL del backend</h2>
            <p>Por defecto NestJS se ejecuta en el puerto 3000.</p>
            <form class="form" data-action="config">
              <label>API URL<input name="apiUrl" type="url" required value="${state.apiUrl}" /></label>
              <button class="btn">Guardar y comprobar</button>
            </form>
          </article>
          <article class="card">
            <h2>Datos locales</h2>
            <p>Los tokens solo se guardan en localStorage para facilitar las pruebas.</p>
            <div class="actions">
              <button class="btn secondary" data-request="checkApi">Comprobar API</button>
              <button class="btn danger" data-request="clearSession">Borrar sesión local</button>
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>

  <aside id="console" class="console">
    <header><span>Respuesta de la API</span><button id="toggleConsole">Ocultar</button></header>
    <pre id="output">Esperando una petición...</pre>
  </aside>
  <div id="toast" class="toast hidden"></div>
`;

const output = document.querySelector("#output");
const toast = document.querySelector("#toast");

function saveSession(data) {
  state.accessToken = data.accessToken;
  state.refreshToken = data.refreshToken;
  state.user = data.user;
  localStorage.setItem("accessToken", state.accessToken);
  localStorage.setItem("refreshToken", state.refreshToken);
  localStorage.setItem("authUser", JSON.stringify(state.user));
  renderSession();
}

function clearSession() {
  state.accessToken = "";
  state.refreshToken = "";
  state.user = null;
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("authUser");
  renderSession();
}

function renderSession() {
  document.querySelector("#sessionName").textContent = state.user
    ? `${state.user.name} (${state.user.roles?.join(", ") || "sin rol"})`
    : "Sin autenticar";
  document.querySelector("#currentUser").innerHTML = state.user
    ? `<div class="data-item"><strong>${escapeHtml(state.user.name)}</strong><small>${escapeHtml(state.user.email)} · ID ${state.user.id}<br>Roles: ${escapeHtml(state.user.roles?.join(", ") || "ninguno")}<br>Permisos: ${escapeHtml(state.user.permissions?.join(", ") || "ninguno")}</small></div>`
    : "No hay una sesión activa.";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showToast(message, error = false) {
  toast.textContent = message;
  toast.className = `toast${error ? " error" : ""}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.add("hidden"), 2800);
}

function showOutput(label, data) {
  output.textContent = `${label}\n\n${typeof data === "string" ? data : JSON.stringify(data, null, 2)}`;
}

async function parseResponse(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function refreshAccessToken() {
  if (!state.refreshToken) return false;
  const response = await fetch(`${state.apiUrl}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: state.refreshToken }),
  });
  if (!response.ok) {
    clearSession();
    return false;
  }
  saveSession(await response.json());
  return true;
}

async function api(path, options = {}, retry = true) {
  const headers = { ...(options.headers || {}) };
  if (options.body) headers["Content-Type"] = "application/json";
  if (state.accessToken) headers.Authorization = `Bearer ${state.accessToken}`;

  let response;
  try {
    response = await fetch(`${state.apiUrl}${path}`, { ...options, headers });
  } catch {
    setApiStatus(false);
    throw new Error(`No se pudo conectar con ${state.apiUrl}`);
  }

  const data = await parseResponse(response);
  if (response.status === 401 && retry && path !== "/auth/refresh" && (await refreshAccessToken())) {
    return api(path, options, false);
  }
  if (!response.ok) {
    const message = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    const error = new Error(message || `HTTP ${response.status}`);
    error.details = data;
    throw error;
  }
  setApiStatus(true);
  return data;
}

function setApiStatus(online) {
  document.querySelector("#statusDot").classList.toggle("online", online);
  document.querySelector("#statusText").textContent = online ? "API conectada" : "API sin conexión";
}

function formData(form) {
  const values = Object.fromEntries(new FormData(form).entries());
  form.querySelectorAll('input[type="number"]').forEach((input) => {
    if (values[input.name] !== "") values[input.name] = Number(values[input.name]);
  });
  return values;
}

function renderList(target, items, title) {
  const element = document.querySelector(target);
  if (!Array.isArray(items) || !items.length) {
    element.className = "empty";
    element.textContent = `No hay ${title.toLowerCase()} para mostrar.`;
    return;
  }
  element.className = "data-list";
  element.innerHTML = items
    .map(
      (item) =>
        `<div class="data-item"><strong>${escapeHtml(item.name || item.title || item.content || `${title} #${item.id}`)}</strong><small>${escapeHtml(JSON.stringify(item))}</small></div>`,
    )
    .join("");
}

const actions = {
  register: (data) => api("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => api("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  profile: (data) => api("/users/profile", { method: "PATCH", body: JSON.stringify(data) }),
  photo: (data) => api("/users/photo", { method: "POST", body: JSON.stringify(data) }),
  music: (data) => {
    if (!data.genre) delete data.genre;
    return api("/users/music", { method: "POST", body: JSON.stringify(data) });
  },
  like: (data) => api("/users/like", { method: "POST", body: JSON.stringify(data) }),
  subscription: (data) => api("/users/subscription", { method: "PATCH", body: JSON.stringify(data) }),
  message: (data) => api("/users/chat/send", { method: "POST", body: JSON.stringify(data) }),
  history: async ({ roomId }) => {
    const data = await api(`/users/chat/${roomId}`);
    renderList("#messagesList", data, "Mensajes");
    return data;
  },
  createRole: (data) => api("/roles", { method: "POST", body: JSON.stringify(data) }),
  createPermission: (data) => api("/permissions", { method: "POST", body: JSON.stringify(data) }),
  assignRole: (data) => api("/user-roles", { method: "POST", body: JSON.stringify(data) }),
  assignPermission: (data) => api("/role-permissions", { method: "POST", body: JSON.stringify(data) }),
  config: async ({ apiUrl }) => {
    state.apiUrl = apiUrl.replace(/\/$/, "");
    localStorage.setItem("apiUrl", state.apiUrl);
    return checkApi();
  },
};

async function checkApi() {
  const response = await fetch(state.apiUrl);
  const data = await parseResponse(response);
  if (!response.ok) throw new Error(`API respondió HTTP ${response.status}`);
  setApiStatus(true);
  return data;
}

const requests = {
  me: async () => {
    const user = await api("/auth/me");
    state.user = user;
    localStorage.setItem("authUser", JSON.stringify(user));
    renderSession();
    return user;
  },
  refresh: async () => {
    if (!state.refreshToken) throw new Error("No existe un refresh token local");
    const data = await api("/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: state.refreshToken }),
    }, false);
    saveSession(data);
    return data;
  },
  logout: async () => {
    const data = await api("/auth/logout", { method: "POST" });
    clearSession();
    return data ?? "Sesión cerrada";
  },
  users: async () => {
    const data = await api("/users");
    renderList("#usersList", data, "Usuarios");
    return data;
  },
  roles: () => loadRbac("/roles", "Roles"),
  permissions: () => loadRbac("/permissions", "Permisos"),
  userRoles: () => loadRbac("/user-roles", "Roles de usuario"),
  rolePermissions: () => loadRbac("/role-permissions", "Permisos de rol"),
  checkApi,
  clearSession: () => {
    clearSession();
    return "Tokens y usuario eliminados de localStorage";
  },
};

async function loadRbac(path, title) {
  const data = await api(path);
  renderList("#rbacList", data, title);
  return data;
}

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-page], .page").forEach((element) => element.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.page}`).classList.add("active");
    document.querySelector("#pageTitle").textContent = pages[button.dataset.page][0];
    document.querySelector("#pageSubtitle").textContent = pages[button.dataset.page][1];
  });
});

document.querySelectorAll("form[data-action]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const action = form.dataset.action;
    try {
      const data = await actions[action](formData(form));
      if (action === "login" || action === "register") saveSession(data);
      showOutput(`${action}: OK`, data);
      showToast("Petición completada");
    } catch (error) {
      showOutput(`${action}: ERROR`, error.details || error.message);
      showToast(error.message, true);
    }
  });
});

document.querySelectorAll("[data-request]").forEach((button) => {
  button.addEventListener("click", async () => {
    const request = button.dataset.request;
    try {
      const data = await requests[request]();
      showOutput(`${request}: OK`, data);
      showToast("Petición completada");
    } catch (error) {
      showOutput(`${request}: ERROR`, error.details || error.message);
      showToast(error.message, true);
    }
  });
});

document.querySelector("#toggleConsole").addEventListener("click", (event) => {
  const consoleElement = document.querySelector("#console");
  consoleElement.classList.toggle("collapsed");
  event.currentTarget.textContent = consoleElement.classList.contains("collapsed") ? "Mostrar" : "Ocultar";
});

renderSession();
checkApi().then(
  (data) => showOutput("API conectada", data),
  (error) => {
    setApiStatus(false);
    showOutput("API sin conexión", error.message);
  },
);
