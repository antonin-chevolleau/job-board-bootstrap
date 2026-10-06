-- 1. Nombre d'annonces publiées par entreprise
SELECT companies.name, COUNT(ads.id) AS ad_count
FROM companies
LEFT JOIN ads ON ads.company_id = companies.id
GROUP BY companies.id, companies.name;

-- 2. Annonce ayant reçu le plus de candidatures
SELECT ads.title, COUNT(applications.id) AS application_count
FROM ads
JOIN applications ON applications.ad_id = ads.id
GROUP BY ads.id, ads.title
ORDER BY application_count DESC
LIMIT 1;

-- 3. Liste des candidats d'une annonce donnée (ici l'annonce 1), avec leur message
SELECT people.name, applications.message
FROM applications
JOIN people ON people.id = applications.person_id
WHERE applications.ad_id = 1;
