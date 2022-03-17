# graph-ts-api

Configure the file `.env` with your postgres database data

Run this command to create the initial tables

`npm run create-table`

Run this command to drop all the tables

`npm run drop-table`

Run this command to start the server in development mode 

`npm run dev`

Go to http://localhost:5000/graphql to access to the GraphQL server.

This are some examples to access the data:

**Operation GetMovies**
```
query GetMovies {
  getMovies {
    id
    title
    description
    actors
    releaseYear
    updatedAt
    createdAt    
  }
}
```

**Operation AddMovie**
```
mutation AddMovie($movieInput: CreateMovieInput!) {
  addMovie(MovieInput: $movieInput) {
    id
    title
    description
    actors
    releaseYear
    createdAt
    updatedAt
  }
}
```

**Variables for AddMovie Operation**
```
{
  "movieInput": {
    "title":"Spiderman Homecomming",
    "description": "Spiderman movie",
    "actors" : ["Actor1", "Actor 2"],
    "releaseYear" : "2022"
  }
}
```
