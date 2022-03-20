CREATE TABLE Users(
   Id_user VARCHAR(50),
   username VARCHAR(50) NOT NULL,
   firstname VARCHAR(50) NOT NULL,
   createdAt DATE NOT NULL,
   lastname VARCHAR(50) NOT NULL,
   email VARCHAR(255) NOT NULL,
   updatedAt DATETIME NOT NULL,
   PRIMARY KEY(Id_user)
);

CREATE TABLE Album(
   Id_album VARCHAR(50),
   name VARCHAR(50) NOT NULL,
   createdAt DATE,
   updatedAt DATE,
   Id_user VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_album),
   FOREIGN KEY(Id_user) REFERENCES Users(Id_user)
);

CREATE TABLE Media(
   Id_media VARCHAR(50),
   name VARCHAR(50) NOT NULL,
   updatedAt DATE,
   url VARCHAR(255) NOT NULL,
   createdAt DATE,
   type VARCHAR(50) NOT NULL,
   PRIMARY KEY(Id_media)
);

CREATE TABLE AlbumMedia(
   Id_album VARCHAR(50),
   Id_media VARCHAR(50),
   createdAt DATETIME NOT NULL,
   PRIMARY KEY(Id_album, Id_media),
   FOREIGN KEY(Id_album) REFERENCES Album(Id_album),
   FOREIGN KEY(Id_media) REFERENCES Media(Id_media)
);

CREATE TABLE AlbumShareHistory(
   Id_user VARCHAR(50),
   Id_album VARCHAR(50),
   createdAt DATETIME NOT NULL,
   PRIMARY KEY(Id_user, Id_album),
   FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
   FOREIGN KEY(Id_album) REFERENCES Album(Id_album)
);

CREATE TABLE MediaShareHistory(
   Id_user VARCHAR(50),
   Id_media VARCHAR(50),
   createdAt DATETIME NOT NULL,
   PRIMARY KEY(Id_user, Id_media),
   FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
   FOREIGN KEY(Id_media) REFERENCES Media(Id_media)
);

CREATE TABLE MediaDeleting(
   Id_user VARCHAR(50),
   Id_album VARCHAR(50),
   Id_media VARCHAR(50),
   createdAt DATETIME NOT NULL,
   PRIMARY KEY(Id_user, Id_album, Id_media),
   FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
   FOREIGN KEY(Id_album) REFERENCES Album(Id_album),
   FOREIGN KEY(Id_media) REFERENCES Media(Id_media)
);

CREATE TABLE AlbumDeleting(
   Id_user VARCHAR(50),
   Id_album VARCHAR(50),
   createdAt DATETIME NOT NULL,
   PRIMARY KEY(Id_user, Id_album),
   FOREIGN KEY(Id_user) REFERENCES Users(Id_user),
   FOREIGN KEY(Id_album) REFERENCES Album(Id_album)
);
