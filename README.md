# Job Board Bootstrap

Mini job board pour l'agence fictive HireLoop : base MySQL, API REST FastAPI, puis front-end.
Le cahier des charges est dans [`docs/requirements.md`](docs/requirements.md) et les choix techniques dans [`docs/technical-decisions.md`](docs/technical-decisions.md).

## Structure

```
backend/
├── app/
│   ├── main.py          # point d'entrée : crée l'app FastAPI et branche les routers
│   ├── database.py      # connexion MySQL (engine, session, get_db)
│   ├── errors.py        # gestion des erreurs : 404, 400
│   ├── models/          # tables SQL vues par SQLAlchemy (une classe = une table)
│   ├── schemas/         # format JSON des requêtes/réponses (Pydantic)
│   └── routers/         # les routes de l'API, un fichier par ressource
├── scripts/check_db.py  # affiche le contenu de la base (test de connexion)
└── sql/
    ├── schema.sql       # création des tables (source de vérité du schéma)
    ├── seed.sql         # données de test
    └── queries.sql      # les 3 requêtes SQL demandées
```

## Installation

Prérequis : Python 3.9+ et MySQL.

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements-dev.txt

cd backend
cp .env.example .env          # puis renseigner le mot de passe MySQL
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS hireloop"
mysql -u root -p hireloop < sql/schema.sql
mysql -u root -p hireloop < sql/seed.sql
```

## Lancer l'API

Depuis `backend/` :

```bash
uvicorn app.main:app --reload
```

La documentation interactive (pour tester les routes) est sur http://localhost:8000/docs.

## Vérifier le style du code

Depuis `backend/` :

```bash
ruff format .   # met en forme le code
ruff check .    # signale les imports inutilisés, mal triés, etc.
```
