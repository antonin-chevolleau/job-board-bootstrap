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

## Problèmes repérés dans `Login.jsx`

### 1. `useState` est utilisé mais pas importé

Dans `Login.jsx`, le code utilise :

```jsx
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
```

Mais `useState` n'est pas importé depuis React. Au chargement de la page `/login`, cela peut provoquer une erreur du type :

```txt
ReferenceError: useState is not defined
```

Idée de correction : importer `useState` depuis React.

### 2. Mauvais nom de propriété dans `fetch`

Dans l'appel `fetch`, le code utilise :

```js
header: {
  "Content-Type": "application/json",
}
```

La bonne propriété s'appelle `headers` avec un `s`.

Avec `header`, le navigateur n'envoie pas correctement l'en-tête `Content-Type`. Le serveur peut donc ne pas comprendre que le body envoyé est du JSON.

### 3. Mauvaise variable utilisée pour lire la réponse

Le code crée une variable :

```js
const reponse = await fetch(...)
```

Mais ensuite il fait :

```js
const data = await Response.json();
```

Problèmes :

- `Response` avec une majuscule ne correspond pas à la variable `reponse`.
- Il faut lire le JSON depuis la réponse reçue par `fetch`.
- Le nom `reponse` contient probablement une faute de frappe, il serait plus clair d'utiliser `response`.

Idée de correction : utiliser la variable retournée par `fetch` pour appeler `.json()`.

### 4. Le CSS module est importé mais pas utilisé

Dans `Login.jsx`, il y a :

```jsx
import style from "./Login.module.css"
```

Mais dans le JSX, aucune classe n'utilise `style` :

```jsx
<form onSubmit={handleLogin}>
```

Donc les classes `.div` et `.div_identifier` définies dans `Login.module.css` ne sont pas appliquées.

### 5. Certaines règles CSS du module sont globales

Dans `Login.module.css`, il y a :

```css
label {}
input {}
button {}
```

Dans un CSS module, il vaut mieux utiliser des classes, par exemple `.input`, `.button`, etc. Sinon ces sélecteurs peuvent s'appliquer de manière plus globale que prévu aux balises `label`, `input` et `button` du composant.

### 6. Pas encore de gestion d'erreur

Le formulaire envoie la requête, mais il n'y a pas encore de gestion pour :

- afficher un message si l'identifiant est faux ;
- afficher un message si le serveur est éteint ;
- rediriger l'utilisateur si la connexion réussit ;
- gérer un éventuel token retourné par le backend.

### Résumé

Le formulaire est bien structuré dans l'idée : deux states, un `onSubmit`, un `fetch` vers le backend. Les principaux problèmes sont liés à l'import de `useState`, à la configuration de `fetch`, à la lecture de la réponse, et au CSS module qui n'est pas encore réellement utilisé dans le JSX.
