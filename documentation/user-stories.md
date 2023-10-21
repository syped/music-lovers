# User Stories

## Users

### Sign Up

* As an unregistered and unauthorized artist, I want to be able to sign up for the website via a sign-up form.
  * When I'm on the `/signup` page:
    * I would like to be able to enter my email, username, first name, last name, and preferred password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the sign-up form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the sign-up form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
    * So that I can try again without needing to refill forms I entered valid data into.

### Log in

* As a registered and unauthorized artist, I want to be able to log in to the website via a log-in form.
  * When I'm on the `/login` page:
    * I would like to be able to enter my email and password on a clearly laid out form.
    * I would like the website to log me in upon successful completion of the log-in form.
      * So that I can seamlessly access the site's functionality
  * When I enter invalid data on the log-in form:
    * I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password).
      * So that I can try again without needing to refill forms I entered valid data into.

### Demo User

* As an unregistered and unauthorized artist, I would like an easy to find and clear button on both the `/signup` and `/login` pages to allow me to visit the site as a guest without signing up or logging in.
  * When I'm on either the `/signup` or `/login` pages:
    * I can click on a Demo User button to log me in and allow me access as a normal artist.
      * So that I can test the site's features and functionality without needing to stop and enter credentials.

### Log Out

* As a logged in artist, I want to log out via an easy to find log out button on the navigation bar.
  * While on any page of the site:
    * I can log out of my account and be redirected to a page displaying new albums and public playlists.
      * So that I can easily log out to keep my information secure.

## Songs

### Viewing Songs
* As a logged in _or_ logged out artist, I want to be able to view all of the songs.
  * When I'm on the `/songs` page:
    * I can view a list of all songs.
      * So that I can see what songs are most popular.
      * So that I can find specific songs I am looking for.

### Upload Songs
* As a logged in artist, I want to be able to upload music.
  * When I'm on the `/upload` page:
    * I can upload each song.
      * So that I can share my songs with artists.

### Edit Songs
* As a logged in artist, I want to be able to edit my song information.
  * When I'm on the `/artists/:id/manage` pages:
    * I can click "Edit" to make permanent changes to songs I have uploaded.
      * So that I can fix any errors I make in my song information.

### Delete Songs
* As a logged in artist, I want to be able to delete my songs by clicking a Delete button associated with the song
  * When I'm on the `/artist/:id/manage` pages:
    * I can click "Delete" to permanently delete a song I have posted.
      * So that I can delete any embarrassing music I regret uploading.

## Albums

### Viewing Albums
* As a logged in _or_ logged out artist, I want to be able to view all albums.
  * When I'm on the `/` page:
    * I can view the most recently released album.
      * So that I can easily find the newest music.
  * When I'm on the `/albums` page:
    * I can view the whole list of albums.
      * So it is easy to find specific albums

### Add Songs to Albums
* As a logged in artist, I want to be able to add songs to their correlating albums.
  * When I'm on the `/artists/:id/manage` page:
    * I can add specific songs to certain owned albums.
      * So it is easier for artists to find my music.

### Edit Albums
* As a logged in artist, I want to be able to edit my album information.
  * When I'm on the `/artists/:id/manage` pages:
    * I can click "Edit" to make permanent changes to albums I have uploaded.
      * So that I can fix any errors I make in my album information.
    * I can click "Delete" to remove any songs from albums
      * To fix any accidental adds.

### Delete Albums
* As a logged in artist, I want to be able to delete my albums by clicking a Delete button associated with the song
  * When I'm on the `/artist/:id/manage` pages:
    * I can click "Delete" to permanently delete an album I have posted.
      * So that I can delete any albums I no longer want to share

## Likes

### Viewing Likes on a Song
* As a logged in _or_ logged out artist, I want to be able to view the number of likes on a song.
  * When I'm on the `/songs` page:
    * I can view which songs have the highest or lowest likes.
      * So it is easier to share song popularity

### Like Songs
* As a logged in artist, I want to be able to like certain songs.
  * When I'm on the `/songs` page:
    * I can click a Like button on specific songs.
      * So all of my liked songs are grouped.

### Unlike Songs
* As a logged in artist, I want to be able to unlike songs.
  * When I'm on the `/songs` page:
    * I can click an Unlike button on specific songs.
      * So I reverse my previous decision of liking the song.

## Playlists

### Viewing Playlists
* As a logged in _or_ logged out artist, I want to be able to view all public playlists and my own private playlists.
  * When I'm on the `/` page:
    * I can view the most recently posted playlists.
      * So that I can easily find the newest playlists.
  * When I'm on the `/playlists` page:
    * I can view all playlists I have permission to see
      * So it is easy to find specific playlists

### Add Songs to Playlists
* As a logged in artist, I want to be able to add songs to my own currated playlists.
  * When I'm on the `/playlists/:id` page that I created:
    * I can click an Add Songs button to choose songs from `/songs`.
      * So I can create my 'sad boi playlist' -Robert.

### Remove Songs from Playlists
* As a logged in artist, I want to be able to remove songs from my own currated playlists.
  * When I'm on the `/playlists/:id` page that I created:
    * I can click a Remove Song button to remove specific songs from my playlists
      * So I can fix any accidental adds