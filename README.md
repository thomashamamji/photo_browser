# photo_browser

Medias gallery created to get photos found from multiple well known websites.
This software allows users to create album in a gallery and add medias in it.
It is also possible for the user to share album and photos by email or message.

![Medias browser](https://user-images.githubusercontent.com/45339466/159161799-0d83f19d-18fe-471b-95b4-f4ee28519609.jpeg)

Database Configuration
The Node.js backend is using a local MySQL database with the following configuration :

### User creation

> create user photo_browser_dbuser identified by "password";

### Database creation

> create database photo_browser_db;

### Privileges settings

> grant all privileges on photo_browser_db.* to 'photo_browser_dbuser'@'%';
> grant all privileges;
