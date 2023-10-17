# **Database Schema**

## `artists`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| username            | string          | not null, unique          |
| first_name          | string          | not null,                 |
| last_name           | string          | not null,                 |
| password            | string          | not null,                 |
| email               | string          | not null, indexed, unique |
| num_followers       | integer         | not null                  |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

## `albums`

| column name         | data type       | details                   |
| ------------------- | ---------       | ------------------------- |
| id                  | integer         | not null, primary key     |
| album_name          | string(50)      | not null                  |
| artist_id           | integer         | not null, foreign key     |
| release_year        | integer         | not null                  |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

* `artist_id` references `artists` table


## `songs`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| song_name           | string(50)      | not null                  |
| length              | decimal(5,2)    | not null, indexed, unique |
| album_id            | integer         | not null, foreign key     |
| artist_id           | integer         | not null, foreign key     |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

* `album_id` references `albums` table
* `artist_id` references `artists` table

## `playlists`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| playlist_name       | string(50)      | not null                  |
| song_id             | integer         | not null, foreign key     |
| artist_id           | integer         | not null, foreign key     |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

* `artist_id` references `artists` table
* `song_id` references `songs` table

## `likes`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| song_id             | integer         | not null, foreign key     |
| artist_id           | integer         | not null, foreign key     |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

* `artist_id` references `artists` table
* `song_id` references `songs` table

## `song_images`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| song_id             | integer         | not null, foreign key     |
| aws                 | string          | not null                  |
| created_at          | datetime        | not null                  |
| updated_at          | datetime        | not null                  |

* `song_id` references `songs` table