# Photo browser

Medias gallery created to get photos found from multiple well known websites.  
This software allows users to create albums in a gallery and add medias inside.  
It will also be possible for users to share albums and photos by email or message.  

## The concept

![Medias browser](https://user-images.githubusercontent.com/45339466/159161799-0d83f19d-18fe-471b-95b4-f4ee28519609.jpeg)

## Database Configuration
The Node.js backend is using a local MySQL database with the following configuration :

### User creation

> create user photo_browser_dbuser identified by "password";

### Database creation

> create database photo_browser_db;

### Privileges settings

> grant all privileges on photo_browser_db.* to 'photo_browser_dbuser'@'%';
> 
> grant all privileges;

## How it looks like

### Dashboard

<img width="1440" alt="Dashboard" src="https://user-images.githubusercontent.com/45339466/201495313-4c139e76-cf15-4a84-9d5d-c10fe1f7629c.png">

### Search a photo

<img width="1440" alt="Search a photo" src="https://user-images.githubusercontent.com/45339466/201495361-9b7e162e-afcb-4caa-aa69-91beb47f6d5d.png">

### Results for cat

<img width="1440" alt="Results for cat" src="https://user-images.githubusercontent.com/45339466/201495374-bf0a11ad-d71a-4f5b-93ca-29ed155f3491.png">

### Selecting some cats

<img width="1440" alt="Selecting some cats" src="https://user-images.githubusercontent.com/45339466/201495379-23187e27-3eba-41ef-bd9c-e9634727ba8c.png">

### Adding the cats to the Recents album

<img width="1440" alt="Adding medias to an album" src="https://user-images.githubusercontent.com/45339466/201495382-478e6e97-18a9-4dfc-ad46-9ed5a62fa681.png">

### Listing the Recents album

<img width="1440" alt="image" src="https://user-images.githubusercontent.com/45339466/201495563-a10f6673-365c-4418-95b5-f5756c44d3cb.png">

## Frameworks  
<img style="text-align:center;" height="200" alt="Capture d’écran 2024-07-05 à 20 57 47" src="https://github.com/thomashamamji/photo_browser/assets/45339466/343b515b-aa6a-402a-9faa-1c205c60b1dd">
<img height="200" alt="Capture d’écran 2024-07-05 à 20 56 49" src="https://github.com/thomashamamji/photo_browser/assets/45339466/7c5198de-c4b3-440d-9818-0144b30afc20">
<img height="200" alt="Capture d’écran 2024-07-05 à 21 00 17" src="https://github.com/thomashamamji/photo_browser/assets/45339466/dcd736ea-3325-4da9-85b3-8846f0c11e32">

