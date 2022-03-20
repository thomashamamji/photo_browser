const { runSQLQuery, handleError } = require('../config/db');

// An album needs to be created during the user registration process

exports.add_album = (req, res, next) => {
    const {
        name
    } = req.params;

    if (name) {
        runSQLQuery(`select Id_album from Album join Users on (Album.Id_user=Users.Id_user) where name="${name}" and Users.Id_user="${req.user.Id_user}";`)
        .then(rr => {
            if (!rr.length) {
                runSQLQuery(`insert into Album(name, createdAt, updatedAt, Id_user, Id_album) values("${name}", CURDATE(), CURDATE(), "${req.user.Id_user}", uuid());`)
                .then(wr => res.json({ success : true, data : wr }))
                .catch(err => handleError(err, res));
            }

            else return res.status(400).json({
                success : false,
                msg : "Name already taken."
            });
        })
        .catch(err => handleError(err, res));
    }

    else return res.status(400).json({ success : false, msg : "Missing album name." });
}

exports.add_media = (req, res, next) => {
    const {
        name, // Name of the album
        url,
        type
    } = req.body;

    if (url && type) {
        runSQLQuery(`select Id_album from Album join Users on (Users.Id_user=Album.Id_user) where Album.name="${name}" and Users.Id_user = "${req.user.Id_user}";`).then(rr => {
            runSQLQuery("select uuid() as uuid;").then(id => {
                runSQLQuery(`insert into Media(url, type, updatedAt, createdAt, Id_media) values("${url}", "${type}", CURDATE(), CURDATE(), "${id[0].uuid}");`)
                .then(rw => {
                    if (rw.affectedRows && rr.length) runSQLQuery(`insert into AlbumMedia(Id_album, Id_media, createdAt) values("${rr[0].Id_album}", "${id[0].uuid}", CURDATE());`).then(rw2 => {
                        if (rw2.affectedRows) {
                            res.json({ success: true, data : rw2 })
                        }
                        else handleError("An error occured during AlbumMedia insertion.", res);
                    })
                    .catch(err => handleError(err, res));
                    else handleError("An error occured during Media insertion.", res);
                })
                .catch(err => handleError(err, res));
            })
            .catch(err => handleError(err, res));
        })
        .catch(err => handleError(err, res));
    }

    else res.status(400).json({
        success : false,
        msg : "Missing some fields."
    });
}

exports.list_album_medias = (req, res, next) => {
    const {
        name
    } = req.params;

    if (name) {
        runSQLQuery(`select Media.Id_media, url, type from Media join Album on (Album.Id_user="${req.user.Id_user}") join AlbumMedia on (Media.Id_media=AlbumMedia.Id_media and Album.Id_album=AlbumMedia.Id_album) where Album.name="${name}";`)
        .then(rr => {
            res.json({
                success : true,
                result : rr
            });
        })
        .catch(err => handleError(err, res));
    }

    else res.status(400).json({
        success: false,
        msg : "Missing album name."
    })
}