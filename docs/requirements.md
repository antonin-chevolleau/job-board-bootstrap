# Cahier des charges : Bootstrap Job Board

## Contexte et objectif

- **Cas pratique :** l'agence de recrutement fictive **HireLoop** veut lancer un mini job board.
- **But :** s'entraîner, sur un petit exemple guidé, avec les mêmes outils que le projet Job Board : modélisation SQL, API REST et JavaScript asynchrone (`fetch()`).
- **Principe :** il faut aussi casser volontairement certaines choses pour reconnaître les symptômes dans le vrai projet.
- **Ordre de travail imposé :** base de données, puis API, puis front-end. Une erreur sur l'un des trois se paie sur tout le projet.
- **Règle à retenir :** _« Data outlives code, and APIs outlive front-ends. Design the boring parts first. »_

## 1. Modélisation de la base de données (SQL)

**Spec métier :**

- Des entreprises publient des annonces.
- Chaque annonce appartient à exactement une catégorie.
- Une personne peut postuler à plusieurs annonces, et une annonce peut recevoir plusieurs candidatures.
- Chaque candidature garde une trace du message envoyé et de la date.

**À faire :**

- Créer les tables en SQL. Cela implique au moins : entreprises, annonces, catégories, personnes et candidatures, avec une relation many-to-many entre personnes et annonces portée par la candidature.
- Insérer à la main des données de test : 2 entreprises, 3 annonces, 3 personnes et quelques candidatures.
- Écrire 3 requêtes SQL :
  1. nombre d'annonces publiées par entreprise ;
  2. annonce ayant reçu le plus de candidatures ;
  3. liste des candidats d'une annonce donnée, avec leur message.
- Un JOIN sur 3 tables est normal : ce sont les requêtes que les futures routes de l'API exécuteront.

## 2. API REST

**Routes minimales :**

| Route                        | Rôle                                           |
| ---------------------------- | ---------------------------------------------- |
| `GET /companies/:id/ads`     | Lister les annonces d'une entreprise           |
| `GET /ads/:id`               | Détail complet d'une annonce                   |
| `POST /ads`                  | Créer une annonce                              |
| `POST /ads/:id/applications` | Enregistrer une candidature pour cette annonce |

**Règles REST :**

- Les routes nomment des **ressources**, pas des actions. `/ads/:id/applications` est correct, `/createApplication?adId=...` ne l'est pas.
- Le verbe HTTP dit l'action (GET, QUERY, POST, PUT, PATCH, DELETE), et l'URL dit sur quoi elle porte.

**Codes de statut :**

- **200** pour un succès normal, **201** quand une ressource a été créée.
- **400** si un champ obligatoire manque dans le corps de la requête.
- **404** si l'id dans l'URL n'existe pas.
- Référence : MDN, HTTP response status codes.

**Test :** vérifier chaque route avec un client REST (curl, Postman, Insomnia ou l'UI de test du framework) **avant** d'écrire la moindre ligne de front.

## 3. Front-end dynamique

Une seule page HTML/CSS minimale qui :

- récupère la liste des annonces via l'API au chargement de la page ;
- affiche pour chaque annonce son titre et une courte description ;
- affiche le détail complet au clic sur un bouton **« View details »**, sans rechargement de la page.

**Contraintes techniques :**

- Utiliser `fetch()` (ou équivalent) avec une gestion asynchrone de la réponse.
- Mettre à jour le DOM directement (`innerHTML`, `createElement`, etc.), sans navigation vers une nouvelle page.

**Symptôme d'échec :** si le clic change l'URL ou fait clignoter ou recharger la page, ce n'est pas bon.
