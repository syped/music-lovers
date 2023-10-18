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

## `albums`

| column name         | data type       | details                   |
| ------------------- | ---------       | ------------------------- |
| id                  | integer         | not null, primary key     |
| album_name          | string(50)      | not null                  |
| artist_id           | integer         | not null, foreign key     |
| release_year        | integer         | not null                  |

* `artist_id` references `artists` table


## `songs`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| song_name           | string(50)      | not null                  |
| length              | decimal(5,2)    | not null, indexed, unique |
| album_id            | integer         | not null, foreign key     |
| artist_id           | integer         | not null, foreign key     |

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

* `artist_id` references `artists` table
* `song_id` references `songs` table

## `album_images`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| album_id            | integer         | not null, foreign key     |
| song_id             | integer         | not null, foreign key     |
| url                 | string          | not null                  |

* `album_id` references `albums` table
* `song_id` references `songs` table

## `playlist_images`

| column name         | data type       | details                   |
| ------------------- | --------------- | ------------------------- |
| id                  | integer         | not null, primary key     |
| playlist_id         | integer         | not null, foreign key     |
| album_images_id     | integer         | not null, foreign key     |
| url                 | string          | not null                  |

* `playlist_id` references `playlists` table
* `album_images_id` references `album_images` table