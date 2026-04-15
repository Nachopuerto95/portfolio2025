# Despliegue en Netlify + CMS admin

Guía para poner el portfolio en Netlify y activar el panel de edición en `/admin`.

## 1. Desplegar en Netlify

1. Haz push de estos cambios a GitHub (rama `main`).
2. Entra a https://app.netlify.com → **Add new site** → **Import an existing project** → GitHub → selecciona `Nachopuerto95/portfolio2025`.
3. Netlify detectará Vite automáticamente. Si pregunta:
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Pulsa **Deploy**. En ~1 minuto tendrás una URL tipo `https://nombre-random.netlify.app`.
5. (Opcional) En **Site settings → Domain** puedes renombrar el subdominio o conectar un dominio propio.

## 2. Crear GitHub OAuth App

Esto permite que el CMS haga login con tu cuenta de GitHub.

1. Ve a https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**.
2. Rellena:
   - **Application name**: `Portfolio CMS` (o lo que quieras)
   - **Homepage URL**: `https://TU-SITIO.netlify.app`
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
3. Pulsa **Register application**.
4. Copia el **Client ID**. Pulsa **Generate a new client secret** y copia el secret (solo se muestra una vez).

## 3. Conectar OAuth en Netlify

1. En tu sitio Netlify → **Site configuration → Access & identity → OAuth** (o **Integrations → OAuth provider** en la UI nueva).
2. **Install provider** → GitHub.
3. Pega el **Client ID** y **Client Secret** del paso anterior.
4. Guarda.

## 4. Usar el panel

1. Entra a `https://TU-SITIO.netlify.app/admin`
2. **Login with GitHub** → autoriza.
3. Edita textos, proyectos, imágenes. Cada **Publish** hace un commit automático a `main` y Netlify redespliega en ~1 min.

## Notas

- El repo debe ser accesible con tu cuenta de GitHub (público o privado con acceso).
- Las imágenes subidas desde el admin van a `public/images/` en el repo.
- Si cambias el subdominio Netlify después, actualiza la **Homepage URL** de la OAuth App.
