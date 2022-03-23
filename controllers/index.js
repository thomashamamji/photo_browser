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

exports.remove_media = (req, res, next) => {
    const {
        id
    } = req.params;

    if (id) {
        runSQLQuery(`select AlbumMedia.Id_album from Media join AlbumMedia on (AlbumMedia.Id_media=Media.Id_media) where Media.Id_media="${id}";`)
        .then(rr => {
            if (rr.length) {
                rr.forEach(rritem => {
                    runSQLQuery(`delete from AlbumMedia where Id_media="${id}" and Id_album="${rritem.Id_album}";`).then(rrw => {
                        if (rrw.affectedRows) {
                            runSQLQuery(`delete from Media where Id_media="${id}";`)
                            .then(r =>  {
                                if (r.affectedRows) res.json({
                                    success : true,
                                    data : r
                                });
    
                                else res.status(400).json({
                                    success : false,
                                    msg : "An error occured while deleting."
                                });
                            })
                            .catch(err => handleError(err, res));
                        }
    
                        else res.status(400).json({
                            success : false,
                            msg : "An error occured while deleting the AlbumMedia table linked to this Media."
                        });
                    })
                    .catch(err => handleError(err, res));
                });
            }

            else res.status(400).json({
                success : false,
                msg : "An error occured while listing the AlbumMedia table(s) linked to this Media."
            })
        })
    }

    else res.status(400).json({
        success : false,
        msg : "Missing media id."
    });
}

exports.remove_album = (req, res, next) => {
    const {
        id
    } = req.params;

    if (id) {
        runSQLQuery(`select Media.Id_media from Album join AlbumMedia on (AlbumMedia.Id_album=Album.Id_album) join Media on (Media.Id_media=AlbumMedia.Id_media) where Album.Id_album = "${id}";`).then(r => {
            if (r.length) {
                r.forEach(ritem => {
                    runSQLQuery(`delete from AlbumMedia where Id_media="${ritem.Id_media}" and Id_album="${id}";`).then(amr => {
                        if (amr.affectedRows) {
                            runSQLQuery(`delete from Media where Id_media="${ritem.Id_media}";`)
                            .then(rw =>  console.log(`Deleted media ${ritem.Id_media} successfully`))
                            .catch(err => handleError(err, res));
                        }

                        else handleError("An error occured while deleting AlbumMedia table.", res);
                    })
                    .catch(err => handleError(err, res));
                });
                setTimeout(() => {
                    runSQLQuery(`delete from Album where Id_album="${id}";`).then(rw => {
                        if (rw.affectedRows) {
                            res.json({ success : true, list : r });
                        }

                        else res.status(400).json({
                            success : false,
                            msg : "An error occured while trying to delete the final album table."
                        });
                    })
                    .catch(err => handleError(err, res));
                }, 500);
            }

            else res.status(400).json({ success: false, msg : "An error occured while listing album's medias." });
        })
        .catch(err => handleError(err, res));
    }

    else res.status(400).json({
        success : false,
        msg : "Missing album id."
    });
}

exports.copy_media_to_album = (req, res, next) => {
    const {
        Id_media,
        Id_album
    } = req.body;

    if (Id_media && Id_album) {
        runSQLQuery(`select Id_media from AlbumMedia where Id_media="${Id_media}" and Id_album="${Id_album}";`).then(rr => {
            if (rr.length) res.status(400).json({
                success : false,
                msg : "This media is already linked to the Album table."
            });

            else {
                runSQLQuery(`insert into AlbumMedia(Id_media, Id_album, createdAt) values("${Id_media}", "${Id_album}", CURDATE());`).then(rw => {
                    if (rw.affectedRows) {
                        res.json({
                            success : true,
                            data: rw
                        })
                    }
        
                    else res.status(400).json({
                        success : false,
                        msg : "An error occured while inserting AlbumMedia table."
                    });
                })
                .catch(err => handleError(err, res));
            }
        })
        .catch(err => handleError(err, res));
    }

    else res.status(400).json({
        success : false,
        msg : "Missing some fields."
    })
}

exports.list_albums = (req, res, next) => {
    runSQLQuery(`select * from Album where Id_user="${req.user.Id_user}";`).then(ar => res.json({ success : true, data : ar }))
    .catch(err => handleError(err, res));
}

exports.remove_media_all_albums = (req, res, next) => {
    if (!req.body.type && !req.body.url) return res.status(400).json({
        success : false,
        msg : "Missing some fields."
    });

    runSQLQuery(`select Id_media from Media where url="${req.body.url}" and type="${req.body.type}";`).then(lr => {
        if (!lr.length) return res.status(400).json({ success : false, msg : "Noting to delete, everything is okay." });

        lr.forEach(media => {
            runSQLQuery(`select Album.Id_album from Media join AlbumMedia on (AlbumMedia.Id_media=Media.Id_media) join Album on (Album.Id_album=AlbumMedia.Id_album) where Media.Id_media="${media.Id_media}";`)
            .then(lr2 => {
                if (lr2.length) {
                    lr2.forEach(album => {
                        runSQLQuery(`delete from AlbumMedia where Id_media="${media.Id_media}" and Id_album="${album.Id_album}";`).then(dr => {
                            if (!dr.affectedRows) return res.status(400).json({
                                success : false,
                                msg : "There was an error while deleting the link that connects the media to the album."
                            });
                        })
                        .catch(err => handleError(err, res));
                    });

                    runSQLQuery(`delete from Media where Id_media="${media.Id_media}";`).then(wr => {
                        if (!wr.affectedRows) return res.status(400).json({
                            success : false,
                            msg : "An error occured while deleting the media table."
                        });
                    }).catch(err => handleError(err, res));
                }

                else return res.status(400).json({
                    success : false,
                    msg : "An error occured while listing the albums linked to the media."
                })
            })
            .catch(err => handleError(err, res));
        });

        setTimeout(() => {
            res.json({ success : true });
        }, 500);
    })
    .catch(err => handleError(err, res));
}