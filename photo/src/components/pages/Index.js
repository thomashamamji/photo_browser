import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPhotosFromKeyword, getVideosFromKeyword } from '../../actions/indexActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

const modes = ["Masquer", "Photo", "Video"];
const percentage = 40;

function Index({
    getPhotosFromKeyword, getVideosFromKeyword, success, isLoading, videos, photos
}) {
    const [mode, setMode] = useState(0);
    const [userKeyword, setUserKeyword] = useState("");
    const [windowHeight, setWindowHeight] = useState(document.windowHeight);
    const [windowWidth, setWindowWidth] = useState(document.windowWidth);
    const [storedPhotos, setStoredPhotos] = useState([]);
    const [storedVideos, setStoredVideos] = useState([]);

    useEffect(() => {
        console.log(photos, videos);
        setWindowHeight(document.windowHeight);
        setWindowWidth(document.windowWidth);
        if (userKeyword && mode) setStoredPhotos(photos);
    }, [getPhotosFromKeyword, getVideosFromKeyword, mode, photos]);

    const onSubmit = e => {
        e.preventDefault();
        if (userKeyword && mode == 1) {
            getPhotosFromKeyword(userKeyword);
        }

        else if (userKeyword && mode == 2) {
            getVideosFromKeyword(userKeyword);
        }
    }

    function clearDisplay (e) {
        e.preventDefault();
        setMode(0);
        setUserKeyword("");
        setStoredPhotos([]);
    }

    return (
        <Fragment>
            <div className="album-add-container">
                <Link to="/album/add">
                    <button className="btn waves-effect waves-light">
                        +  
                    </button>
                </Link>
            </div>
            <div className="gallery-link-container">
                <Link to="/gallery">
                    <button className='btn waves-effect waves-light'>
                        Gallery
                    </button>
                </Link>
            </div>
            <h1 className="text-center">Générer un média adapté</h1>
            <div className="centered">
                <div className="row mt-5 centered">
                    <div className="centered">
                        <div className="mt-2 mb-2 centered text-center">
                            <Button variant="contained" color="primary" onClick={e => setMode(1)}>
                                Photo
                            </Button>
                        </div>
                    </div>
                    <div className="centered">
                        <div className="mt-2 mb-2 centered text-center">
                            <Button variant="contained" color="primary" onClick={e => setMode(2)}>
                                Vidéo
                            </Button>
                        </div>
                    </div>
                    {
                        mode ? (
                            <form onSubmit={onSubmit}>
                                <div className="centered mt-5 text-center">
                                    <h4>Quel est le mot qui décrit le mieux votre site web ?</h4>
                                    <label><strong>Média</strong> {modes[mode]}</label>
                                    <br />
                                    <br />
                                    <TextField label="Mot-clé" onChange={e => setUserKeyword(e.target.value)} variant="standard" />
                                    <br />
                                    <br />
                                    <Button color="success" variant={userKeyword ? ("contained") : ("disabled")} type="submit">
                                        Générer
                                    </Button>
                                </div>
                            </form>
                        ) : null
                    }
                    <div className="mt-5" />
                    {
                        photos.length && mode ? (
                            <Fragment>
                                <h2 className="text-center">
                                    Résultats
                                </h2>
                                <div className="gallery">
                                <ImageList variant="masonry" cols={3} gap={8}>
                                {storedPhotos.map((item, index) => (
                                    <ImageListItem key={index}>
                                    <img
                                        src={`${item.src}?w=248&fit=crop&auto=format`}
                                        srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                        alt={`Photo ${userKeyword} number ${index+1}`}
                                        loading="lazy"
                                    />
                                    </ImageListItem>
                                ))}
                                </ImageList>
                                </div>
                            </Fragment>
                        ) : null
                    }
                    <div className="mt-5" />
                    {
                        mode ? (
                            <Button color="error" variant="outlined" onClick={clearDisplay}>
                                Annuler
                            </Button>
                        ) : null
                    }
                    <div className="mt-5" />
                </div>
            </div>
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
    photos : state.index.photos,
    videos : state.index.videos,
    isLoading : state.index.isLoading,
    success : state.index.success
});

export default connect(mapStateToProps, {
    getPhotosFromKeyword,
    getVideosFromKeyword
})(Index);