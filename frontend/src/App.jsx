
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Article from './Articles/Articles.jsx'
import Header from './Header/Header.jsx'
import './index.css'

function App() {
  return (
    <>
      <Header />
      <Article Articlename={"Nom Article"} Description={"À propos du poste Au sein de notre direction des systèmes d'information (DSI) et directement rattaché(e) au Chief Technology Officer (CTO), vous prendrez une part active à la conception, au développement et au déploiement de nos plateformes SaaS à forte audience. Ce poste clé exige une maîtrise approfondie des architectures orientées services, une solide culture DevOps et une passion affirmée pour la qualité logicielle. Missions principales Architecture et développement : Concevoir des API RESTful et GraphQL performantes sous Node.js / TypeScript et concevoir des interfaces utilisateur modernes avec React.js. Qualité du code : Garantir les bonnes pratiques (TDD, revues de code, automatisation du CI/CD) et veiller à la sécurité globale des applications (OWASP). Optimisation des infrastructures : Intervenir sur le déploiement applicatif dans un environnement cloud conteneurisé (Docker, Kubernetes sur AWS). Mentorat et méthodologie : Accompagner la montée en compétences des développeurs juniors et participer aux rituels de la méthode Agile (Scrum / Kanban). Profil recherché Titulaire d'un diplôme d'ingénieur ou équivalent (Bac+5 en informatique), vous justifiez d'une expérience réussie sur une fonction similaire. Vous maîtrisez parfaitement l'écosystème JavaScript / TypeScript, les bases de données relationnelles (PostgreSQL) et NoSQL (MongoDB), ainsi que l'utilisation des pipelines de CI/CD (GitHub Actions, GitLab CI). Un niveau d'anglais technique courant est indispensable pour communiquer avec nos équipes internationales. Modalités de candidature : Transmettez votre CV et un lien vers votre profil GitHub ou vos projets."} Dateannonce={"12/12/12"} ></Article>
      <Article Articlename={"Deuxieme article"} Description={"Deuxieme exemple"} Dateannonce={"12/13/26"}></Article>
    </>

  )
}

export default App
