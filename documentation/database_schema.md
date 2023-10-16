# **Database Schema**

## `users`

| column name | data type | details                   |
| ----------- | --------- | ------------------------- |
| id          | integer   | not null, primary key     |
| username    | string    | not null,                 |
| email       | string    | not null, indexed, unique |
| created_at  | datetime  | not null                  |
| updated-at  | datetime  | not null                  |

## `songs`

| column name | data type | details                   |
| ----------- | --------- | ------------------------- |
| id          | integer   | not null, primary key     |
| song_name   | string    | not null,                 |
| artist      | string    | not null, indexed, unique |
| created_at  | datetime  | not null                  |
| updated-at  | datetime  | not null                  |
