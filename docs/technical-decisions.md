# Choix techniques

## Base de données

- MySQL
- `backend/sql/schema.sql` est la source de vérité du schéma : les modèles SQLAlchemy doivent le refléter (mêmes colonnes, mêmes longueurs, mêmes `NOT NULL`).

## API

- FastAPI (Python)
- SQLAlchemy 2.0 (ORM) + PyMySQL (driver MySQL)
- Pydantic (validation des données reçues et envoyées)

## Front-end

- React
- CSS (CSS Module)

## Conventions

### Langue

- Code, noms de variables et messages renvoyés par l'API : **anglais**.
- Documentation et commentaires SQL : **français**.

### Style Python

- PEP 8 (4 espaces, imports triés : standard → bibliothèques → `app`), appliquée automatiquement par **Ruff** (`ruff format .` puis `ruff check .`).

### Organisation du backend

- **Un router par ressource manipulée** : une route va dans le fichier de la ressource qu'elle lit ou crée. Ex. `GET /companies/{id}/ads` renvoie des annonces, donc elle est dans `routers/ads.py`. Les chemins sont écrits en entier dans chaque route (pas de `prefix`).
- **Imports depuis le paquet** : `from app.models import Ad`, `from app.schemas import AdRead`. Chaque nouveau modèle ou schéma doit être ajouté au `__init__.py` de son dossier.
- **Requêtes SQLAlchemy 2.0** : `db.get(Model, id)` pour un élément par son id, `db.scalars(select(Model).where(...))` pour une liste. Pas de `db.query(...)` (ancienne syntaxe).

### Codes de statut

- **200** : succès, **201** : ressource créée.
- **404** : uniquement quand un **id de l'URL** n'existe pas → `get_or_404()` dans `app/errors.py`.
- **400** : requête invalide :
  - champ manquant, vide ou mal typé : FastAPI renvoie 422 par défaut, on le transforme en 400 dans `app/errors.py` pour respecter le cahier des charges ;
  - id inexistant **dans le corps** de la requête (ex. `company_id`) → `ensure_exists()` dans `app/errors.py`.
