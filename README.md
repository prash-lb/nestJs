# Projet de Réservation de Films - API REST

## Description
Ce projet est une API de réservation de films qui permet aux utilisateurs de réserver des séances de films. L'API est construite avec **NestJS** et utilise **TypeORM** pour interagir avec une base de données relationnelle.

### Fonctionnalités principales
- Réservation de séances de films.
- Vérification de chevauchements de réservation.
- Gestion des réservations d'un utilisateur.
- Suppression d'une réservation.
- Recherche de films avec des filtres (par genre, par acteur/réalisateur et par année de sortie).
- Possibilité de tester avec différents filtres grâce à un "swapper".

## Prérequis
- **Node.js** : v14.x ou supérieur
- **npm** : v6.x ou supérieur
- **Base de données** : PostgreSQL (ou une autre base de données configurée dans `ormconfig.json`).

## Installation

1. Clonez ce repository sur votre machine locale :

   ```bash
   git clone https://github.com/votre-utilisateur/reservation-films.git
    cd Serveur
    npm install
    npm run start :dev
  
##Endpoints
1. Post /reservation

Permet de créer une réservation.

Corps de la requête : 
  ```json
  {
    "idMovie": 123,
    "dateDebut": "2023-05-01T14:00:00Z",
    "dateFin": "2023-05-01T16:00:00Z"
  }
````
si la reservation est correcte elle revoie l'objet sinon un code errer sera retourné

2.Get /reservation 
permet de récuperer les réservations de l'utilisateur
la réponse va être une liste d'objet :
```json

[
  {
    "idMovie": 123,
    "dateDebut": "2023-05-01T14:00:00Z",
    "dateFin": "2023-05-01T16:00:00Z"
  }
]
````
3. Delete /reservation/{id]
Permet de supprimer une réservation.
Le paramètre est le id du film qu'on souhaite annler.

5. Post /movies
Permet de récuperer la liste des films par pagination et par filtre
corp de la requête :
````json
{
  "pagination": 1,
  "search": {
    "primary_release_year": 2020,
    "with_original_language": "en",
    "with_genre": "Action,Comedy",
    "with_crew": "Quentin Tarantino"
  }
}
`````
La réposne sera un objet contenant les films filtré si on a remplie search et paginer avec le pagination voulut.
réponse :
```json
 
{
  "page": 1,
  "results": [
    {
      "adult": false,
      "backdrop_path": "/path/to/image.jpg",
      "genre_ids": [
        28,
        12
      ],
      "id": 12345,
      "original_language": "en",
      "original_title": "Avengers: Endgame",
      "overview": "Les Avengers tentent de sauver le monde.",
      "popularity": 100.5,
      "poster_path": "/path/to/poster.jpg",
      "release_date": "2019-04-26",
      "title": "Avengers: Endgame",
      "video": false,
      "vote_average": 8.4,
      "vote_count": 12000
    }
  ],
  "total_pages": 100,
  "total_results": 2000
}
````
5. Post auth/register
Permet de s'inscrire.

Corps de la requête:

```json
{
  "email": "test@hotmail.com",
  "password": "password",
  "firstname": "prashath",
  "lastname": "siva"
}
````
réponse soit un objet ou un code erreur :
````json
{
  "response": {
    "message": "inscription réussit",
    "error": "",
    "statusCode": 200
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjYsInVzZXJuYW1lIjoidGVlc3RAaG90bWFpbC5jb20iLCJpYXQiOjE3NDQyOTk2MjMsImV4cCI6MTc0NDMwMTQyM30.Eew8U4GKA9pEpsYGZgN7G5VTDSLL3CKXiudEaTI0X-k"
}
````

6.Post auth/login
Permet de se connecter
Corps de la requête : 
```json
{
  "email": "test@hotmail.com",
  "password": "password"
}
````
réponse : 
```json

{
  "response": {
    "message": "connexion réussit",
    "error": "",
    "statusCode": 200
  },
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidGVzdEBob3RtYWlsLmNvbSIsImlhdCI6MTc0NDI5OTc0MiwiZXhwIjoxNzQ0MzAxNTQyfQ.Nfoq_I-UcmC78GJkeLsHvtQBTiBqJHUvQYK3TSYBQKg"
}
````
7.Get user/users

Permet de récuperer la liste des users. 

8. /api
Permet d'afficher Swagger, qui permet de tester les endpoints de manière interactive et offre une documentation plus complète que celle du README

##Déploiement

Le projet a été déployé sur Render. Vous pouvez accéder à l'API à l'adresse suivante :

[https://nestjs-21nj.onrender.com]

##Test

npm run test

##Conclusion

Ce projet vous permet de gérer les réservations de films pour un utilisateur donné, de vérifier les chevauchements et de s'assurer que la durée de chaque réservation est correcte (2 heures). De plus, il permet de rechercher des films en utilisant plusieurs critères (genre, acteur/réalisateur, année de sortie) et de tester différentes combinaisons de filtres grâce à l'endpoint "swapper".
