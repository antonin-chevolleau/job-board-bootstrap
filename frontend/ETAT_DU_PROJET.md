# État actuel du projet frontend

## Résumé actuel

Le projet est une application React avec Vite. Elle utilise `react-router-dom` pour gérer plusieurs pages.

### Structure principale

- `src/main.jsx` : point d'entrée React. Il monte `<App />` dans `#root` et entoure l'application avec `<BrowserRouter>`.
- `src/App.jsx` : composant principal. Il affiche le header et définit les routes.
- `src/Header/` : composant du menu de navigation.
- `src/Link/` : composant de lien basé sur `react-router-dom`.
- `src/Articles/` : composant d'affichage d'une annonce.
- `src/Login/` : formulaire de connexion.
- `src/Create/` : formulaire de création de compte.

### Routes existantes

Dans `App.jsx`, trois routes sont définies :

```jsx
<Route path="/" element={<Home />} />
<Route path="/login" element={<Login />} />
<Route path="/create" element={<Create />} />
```

- `/` affiche la liste des annonces.
- `/login` affiche le formulaire de connexion.
- `/create` affiche le formulaire de création de compte.

### Navigation

Le header contient actuellement :

- un logo qui renvoie vers `/` ;
- un lien `Annonces` vers `/` ;
- un lien `Login` vers `/login`.

Le formulaire de login contient aussi un lien vers `/create`.
Le formulaire de création de compte contient un lien vers `/login`.

## Points positifs

- Le projet est bien découpé en composants.
- Les fichiers CSS sont majoritairement organisés en CSS modules.
- React Router est installé et utilisé.
- Les pages principales commencent à être séparées : accueil, login, création de compte.
- Les formulaires utilisent des states React pour stocker l'email et le mot de passe.

## Problèmes actuels repérés

### 1. Erreurs ESLint dans `Login.jsx` et `Create.jsx`

La commande suivante échoue :

```bash
npm run lint
```

Erreurs actuelles :

```txt
src/Create/Create.jsx
  'reponse' is assigned a value but never used

src/Login/Login.jsx
  'reponse' is assigned a value but never used
```

La variable `reponse` est créée mais elle n'est jamais utilisée correctement.

### 2. Mauvaise lecture de la réponse `fetch`

Dans `Login.jsx` et `Create.jsx`, le code fait :

```js
const data = await Response.json();
```

Problème : `Response` avec une majuscule ne correspond pas à la variable créée par `fetch`.
Il faudrait lire le JSON depuis la réponse réelle retournée par `fetch`.

### 3. Mauvais nom de propriété dans `fetch`

Dans `Login.jsx` et `Create.jsx`, le code utilise :

```js
header: {
  "Content-Type": "application/json",
}
```

La propriété correcte est :

```js
headers
```

Avec `header`, le serveur risque de ne pas recevoir correctement l'information indiquant que le corps de la requête est du JSON.

### 4. URL de connexion probablement incorrecte

Dans `Login.jsx`, le formulaire de connexion envoie actuellement la requête vers :

```js
http://localhost:3000/create
```

Pour une connexion, on s'attendrait plutôt à une route backend du type :

```txt
/login
```

À vérifier selon le backend.

### 5. Différence de casse dans l'URL de création

Dans `Create.jsx`, la requête est envoyée vers :

```js
http://localhost:3000/Create
```

Attention : `/Create` et `/create` sont deux routes différentes pour beaucoup de serveurs.
Il faut vérifier la route exacte côté backend et garder une convention claire, généralement en minuscule.

### 6. Le composant `Link` utilise une classe CSS module, mais le CSS cible `a`

Dans `Link.jsx`, le lien utilise :

```jsx
className={style.a}
```

Mais dans `Link.module.css`, le CSS est écrit comme ceci :

```css
a {
  text-decoration: none;
}
```

Dans un CSS module, il vaut mieux écrire une classe :

```css
.a {
  text-decoration: none;
}
```

Sinon `style.a` risque de ne pas correspondre à une classe définie dans le module.

### 7. Les boutons n'utilisent pas la classe CSS prévue

Dans `Login.module.css` et `Create.module.css`, une classe `.button` existe :

```css
.button {
  margin-top: 5px;
}
```

Mais dans les composants, les boutons n'ont pas :

```jsx
className={style.button}
```

Donc cette règle CSS n'est pas appliquée.

### 8. Les formulaires `Login` et `Create` sont très similaires

Les fichiers `Login.jsx` et `Create.jsx` ont beaucoup de code en commun :

- deux states : `email`, `password` ;
- un formulaire ;
- deux inputs ;
- un bouton ;
- un appel `fetch`.

Cela fonctionne pour apprendre, mais plus tard il serait possible de factoriser certaines parties.

### 9. Les annonces sont codées en dur dans `App.jsx`

Les annonces sont actuellement écrites directement dans le composant `Home`.

Amélioration possible :

- créer un tableau d'annonces ;
- utiliser `.map()` pour afficher les articles ;
- plus tard, récupérer les annonces depuis une API backend.

### 10. Le composant `Article` utilise des noms de props peu conventionnels

Actuellement :

```jsx
Articlename
Description
Dateannonce
```

En React, on utilise souvent le camelCase :

```jsx
articleName
 description
 dateAnnonce
```

Ce n'est pas bloquant, mais ce serait plus propre.

## Améliorations possibles

### Court terme

1. Corriger les appels `fetch` dans `Login.jsx` et `Create.jsx`.
2. Corriger `header` en `headers`.
3. Lire la réponse avec la bonne variable.
4. Vérifier les routes backend : `/login`, `/create`, etc.
5. Corriger `Link.module.css` pour utiliser `.a` au lieu de `a`.
6. Ajouter `className={style.button}` aux boutons.
7. Relancer :

```bash
npm run lint
npm run build
```

### Moyen terme

1. Créer une vraie page `Home.jsx` au lieu de garder `Home` dans `App.jsx`.
2. Créer un tableau d'annonces et afficher les articles avec `.map()`.
3. Ajouter une page détail d'annonce, par exemple `/annonces/:id`.
4. Ajouter une gestion des erreurs dans les formulaires.
5. Ajouter un message de succès ou d'échec après connexion ou inscription.
6. Rediriger l'utilisateur après une connexion réussie.

### Long terme

1. Connecter le frontend à une vraie API backend.
2. Gérer l'authentification avec un token ou une session.
3. Ajouter une protection des routes privées.
4. Ajouter une gestion globale de l'utilisateur connecté.
5. Améliorer le responsive design.
6. Ajouter des tests.

## État des vérifications

### `npm run lint`

Actuellement, la commande échoue à cause de variables `reponse` non utilisées dans :

- `src/Login/Login.jsx`
- `src/Create/Create.jsx`

### `npm run build`

Non relancé dans ce document, mais le problème principal visible concerne surtout le lint et la logique des formulaires.
