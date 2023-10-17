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

## MusicLovers

### Upload Music

* As a logged in artist, I want to be able to upload music.
  * When I'm on the `/upload` page:
    * I can upload my music.
      * So that I can share my new music with listeners.

### Viewing Songs

* As a logged in _or_ logged out artist, I want to be able to view a selection of the newest albums and public playlists.
  * When I'm on the `/` page:
    * I can view the most recently released album.
      * So that I can easily find the newest music.
    * I can view the most recently posted playlists.
      * So that I can easily find the newest playlists.

* As a logged in _or_ logged out artist, I want to be able to listen to a specific song
  * When I'm on the `/songs/:id` page:
    * I can view the song image (if there is one) and see who the artist is
      * So I know who I am listening to.
  * When I'm on the `/albums/:id` page:
    * I can view the albums image (if there is one) and see who the artist is
      * So I know who I am listening to.
  * When I'm on the `/playlists/:id` page:
    * I can view the playlists image (if there is one) and see who the artist is
      * So I know who I am listening to.

### Liking Songs
* As a logged in artist, I want to be able to like songs
  * When I am on the `/`, `/songs`, `/albums`, or `/playlists` pages:
    * I can click a "Like" button
      * So that I can easily find the songs I previously enjoyed.

### Updating Music Information

* As a logged in artist, I want to be able to edit my music information.
  * When I'm on the `/artists/:id/manage` pages:
    * I can click "Edit" to make permanent changes to songs I have uploaded.
      * So that I can fix any errors I make in my song information.

### Deleting Music

* As a logged in artist, I want to be able to delete my songs by clicking a Delete button associated with the song
  * When I'm on the `/artist/:id/manage` pages:
    * I can click "Delete" to permanently delete a song I have posted.
      * So that I can delete any embarrassing music I regret uploading.
