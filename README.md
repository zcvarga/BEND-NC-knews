# Project Title

Description

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

#### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

#### NOTE 2:

Read this README.md carefully! :)

### Step 1 - Seeding

Data has been provided for both testing and development environments so you will need to write a seed function to seed your database. You should think about how you will write your seed file to use either test data or dev data depending on the environment that you're running in.

1. You should have separate tables for topics, articles, users and comments, and you will need to think carefully about the order in which you seed your data.

- Each topic should have:

  * `slug` field which is a unique string that acts as the table's primary key
  * `description` field which is a string giving a brief description of a given topic

- Each user should have:

  * `username` which is the primary key & unique
  * `avatar_url`
  * `name`

- Each article should have:
  * `article_id` which is the primary key
  * `title`
  * `body`
  * `votes` defaults to 0
  * `topic` field which references the slug in the topics table
  * `author` field that references a user's primary key (username)
  * `created_at` defaults to the current date

* Each comment should have:
  * `comment_id` which is the primary key
  * `author` field that references a user's primary key (username)
  * `article_id` field that references an article's primary key
  * `votes` defaults to 0
  * `created_at` defaults to the current date
  * `body`

- **NOTE:** psql expects Date types to be in a date format - not a timestamp! However, you can easily turn a timestamp into a date using JS...

***

### Step 2 - Building and Testing

1.  Build your Express app
2.  Mount an API Router onto your app
3.  Define the routes described below
4.  Define controller functions for each of your routes.
5.  Use proper project configuration from the offset, being sure to treat development and test differently.
6.  Test each route **as you go**, checking both successful requests and the variety of errors you could expect to encounter.

**HINT** You will need to take advantage of knex migrations in order to efficiently test your application.

***

#### Routes

Your server should have the following end-points:

```http
GET /api/topics
POST /api/topics

GET /api/articles
POST /api/articles

GET /api/articles/:article_id
PATCH /api/articles/:article_id
DELETE /api/articles/:article_id

GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments

PATCH /api/comments/:comment_id
DELETE /api/comments/:comment_id

GET /api/users
POST /api/users

GET /api/users/:username

GET /api
```

***

#### Route Requirements

These have been split into **must haves** and some slightly more advanced _nice to have / if time_. The _if time_ tasks should be **left until you have tested and implemented all other functionality**.

***

```http
GET /api/topics
```

##### Responds with
- an array of topic objects, each of which should have the following properties:
  * `slug`
  * `description`

***

```http
POST /api/topics
```

##### Request body accepts
- an object containing the following properties:
  * `slug` which must be unique
  * `description`

##### Responds with
- the posted topic object

***

```http
GET /api/articles
```

##### Responds with
- an `articles` array of article objects, each of which should have the following properties:
  * `author` which is the `username` from the users table
  * `title`
  * `article_id`
  * `topic`
  * `created_at`
  * `votes`
  * `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

##### Should accept queries
  * `author`, which filters the articles by the username value specified in the query
  * `topic`, which filters the articles by the topic value specified in the query
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

##### If time (the following will make pagination easier when you get to building your front-end application)
- accept the following queries:
  * `limit`, which limits the number of responses (defaults to 10)
  * `p`, stands for page which specifies the page at which to start (calculated using limit)
- add a `total_count` property, displaying the total number of articles (this should display the total number of articles with any filters applied, discounting the limit)

***

```http
POST /api/articles
```

##### Request body accepts
- an object containing the following properties:
  * `title`
  * `body`
  * `topic`
  * `username`

##### Responds with
- the posted article

***

```http
GET /api/articles/:article_id
```

##### Responds with
- an article object,  which should have the following properties:
  * `author` which is the `username` from the users table
  * `title`
  * `article_id`
  * `body`
  * `topic`
  * `created_at`
  * `votes`
  * `comment_count` which is the total count of all the comments with this article_id - you should make use of knex queries in order to achieve this

***

```http
PATCH /api/articles/:article_id
```

##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -100 }` would decrement the current article's vote property by 100

##### Responds with
- the updated article

***

```http
DELETE /api/articles/:article_id
```
##### Should
- delete the given article by `article_id`

##### Responds with
- status 204 and no content

***

```http
GET /api/articles/:article_id/comments
```

##### Responds with
- an array of comments for the given `article_id` of which each comment should have the following properties:
  * `comment_id`
  * `votes`
  * `created_at`
  * `author` which is the `username` from the users table
  * `body`

##### Accepts queries
  * `sort_by`, which sorts the articles by any valid column (defaults to date)
  * `order`, which can be set to `asc` or `desc` for ascending or descending (defaults to descending)

##### If time  (the following will make pagination easier when you get to building your front-end application)
- accept the following queries:
  * `limit`, which limits the number of responses (defaults to 10)
  * `p`, stands for page which specifies the page at which to start (calculated using limit)

***

```http
POST /api/articles/:article_id/comments
```

##### Request body accepts
- an object with the following properties:
  * `username`
  * `body`

##### Responds with
- the posted comment

***

```http
PATCH /api/comments/:comment_id
```
##### Request body accepts
- an object in the form `{ inc_votes: newVote }`

  * `newVote` will indicate how much the `votes` property in the database should be updated by

  e.g.

  `{ inc_votes : 1 }` would increment the current article's vote property by 1

  `{ inc_votes : -1 }` would decrement the current article's vote property by 1

##### Responds with
- the updated comment

***

```http
DELETE /api/comments/:comment_id
```

##### Should
- delete the given comment by `comment_id`

##### Responds with
- status 204 and no content

***

```http
GET /api/users
```

##### Responds with
- an array of user objects, each of which should have the following properties:
  * `username`
  * `avatar_url`
  * `name`

***

```http
POST /api/users
```

##### Request body accepts
- an object containing the following properties:
  * `username`
  * `avatar_url`
  * `name`

##### Responds with
- the posted user

***

```http
GET /api/users/:username
```

##### Responds with
- a user object which should have the following properties:
  * `username`
  * `avatar_url`
  * `name`

***

```http
GET /api
```
##### Responds with
- JSON describing all the available endpoints on your API

***

### Step 3 - Hosting

Make sure your application and your database is hosted using heroku

### Step 4 - Preparing for your review and portfolio

Finally, you should write a README for this project (and remove this one). The README should be broken down like this: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

It should also include the link where your heroku app is hosted.
