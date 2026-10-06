# Suivi du projet frontend

## Problème rencontré : navigation entre les pages

### Symptômes

- Le menu était visible, mais le clic sur `Login` ne permettait pas d'afficher la page de connexion.
- Les routes étaient importées dans `App.jsx`, mais elles n'étaient pas utilisées.
- Le lien du menu pointait vers une mauvaise URL : `/Logine` au lieu de `/login`.
- Le logo utilisait un lien HTML classique : `href="index.html"`.

### Causes

1. `react-router-dom` était installé, mais les routes n'étaient pas configurées dans `App.jsx`.
2. Le composant `App` affichait directement les articles, sans utiliser `<Routes>` et `<Route>`.
3. Le lien `Login` ne correspondait à aucune route existante.
4. Le logo utilisait un lien HTML classique, ce qui n'est pas idéal dans une application React avec React Router.

### Correction mise en place

#### Dans `main.jsx`

L'application est entourée avec `BrowserRouter` :

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

#### Dans `App.jsx`

Les routes ont été ajoutées :

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
</Routes>
```

La page d'accueil a été séparée dans un composant `Home`.

#### Dans `Header.jsx`

Les liens du menu ont été corrigés :

```jsx
<Link href="/" label="Annonces" />
<Link href="/login" label="Login" />
```

Le logo utilise maintenant React Router :

```jsx
<RouterLink to="/">
  <img src="/images/home.png" alt="Accueil" />
</RouterLink>
```

### Résultat

- `/` affiche la liste des annonces.
- `/login` affiche la page de connexion.
- La navigation fonctionne sans rechargement complet de la page.

### Vérifications effectuées

```bash
npm run build
npm run lint
```

Les deux commandes passent correctement.
