import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getPhotosFromKeyword, getVideosFromKeyword, addMediaToAlbum } from '../../actions/indexActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

const modes = ["Hidden", "Photo", "Video"];

// I just need scripts to add the selected medias to any album now

function Index({
    getPhotosFromKeyword, getVideosFromKeyword, success, isLoading, videos, photos
}) {
    const [mode, setMode] = useState(0);
    const [userKeyword, setUserKeyword] = useState("");
    const [storedPhotos, setStoredPhotos] = useState([]);
    const [storedVideos, setStoredVideos] = useState([]);
    const [selection, setSelection] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        console.log(photos, videos, storedPhotos, storedVideos);
        if (userKeyword && mode && photos.length < 20) setStoredPhotos(photos);
        else if (userKeyword && mode && photos.length) setStoredPhotos(photos.slice(0, 19));
        if (userKeyword && mode && videos.length < 20) setStoredVideos(videos);
        else if (userKeyword && mode && videos.length) setStoredVideos(videos.slice(0, 19));
        console.log(selectedItems);
    }, [getPhotosFromKeyword, getVideosFromKeyword, photos, videos]);

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
        setStoredVideos([]);
    }

    function readMorePhotos (e) {
        e.preventDefault();
        if (photos.length-storedPhotos.length < 20) setStoredPhotos(photos);
        else {
            const tmp = [...photos];
            const array = tmp.slice(storedPhotos.length, storedPhotos.length+20);
            console.log(tmp, array);
            setStoredPhotos([ ...storedPhotos, ...array ]);
        }
    }

    function readMoreVideos (e) {
        e.preventDefault();
        if (videos.length-storedVideos.length < 20) setStoredVideos(videos);
        else {
            const tmp = [...videos];
            const array = tmp.slice(storedVideos.length, storedVideos.length+20);
            console.log(tmp, array);
            setStoredVideos([ ...storedVideos, ...array ]);
        }
    }

    function selectPhotoItem (e) {
        if (selection && !selectedItems.find(i => i.id == parseInt(e.target.id))) setSelectedItems([ ...selectedItems, { id : parseInt(e.currentTarget.id), src : e.target.src, type : "img" } ]);
        else if (selection) {
            const tmp = [...selectedItems];
            const items = tmp.filter(t => t.id !== parseInt(e.target.id));
            setSelectedItems(items);
        }
    }

    function selectVideoItem (e) {
        if (selection && !selectedItems.find(i => i.id == parseInt(e.target.id))) setSelectedItems([ ...selectedItems, { id : parseInt(e.currentTarget.id), src : e.currentTarget.lastChild.src, type : "video" } ]);
        else if (selection) {
            const tmp = [...selectedItems];
            const items = tmp.filter(t => t.id !== parseInt(e.target.id));
            setSelectedItems(items, e.currentTarget.lastChild.src);
        }
    }

    function handleModeChange (modeNb) {
        if (modeNb !== mode) {
            setUserKeyword("");
            setStoredPhotos([]);
            setStoredVideos([]);
            setMode(modeNb);
        }
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
            <h1 className="text-center">Find a media</h1>
            <div className="centered">
                <div className="row mt-5 centered">
                    <div className="centered">
                        <div className="mt-2 mb-2 centered text-center">
                            <Button variant="contained" color="primary" onClick={handleModeChange(1)}>
                                Photo
                            </Button>
                        </div>
                    </div>
                    <div className="centered">
                        <div className="mt-2 mb-2 centered text-center">
                            <Button variant="contained" color="primary" onClick={handleModeChange(2)}>
                                Vidéo
                            </Button>
                        </div>
                    </div>
                    <h3 className="text-center p-2">{selection ? (`${selectedItems.length} selected medias`) : null}</h3>
                    {
                        storedPhotos.length || storedVideos.length ? (
                            <Button color="primary" variant="outlined" onClick={e => setSelection(!selection)}>
                                {selection ? ("Cancel selection") : ("Select")}
                            </Button>
                        ) : null
                    }
                    {
                        mode ? (
                            <form onSubmit={onSubmit}>
                                <div className="centered mt-5 text-center">
                                    <h4>What is the word that best describes the medias you are searching for ?</h4>
                                    <label><strong>{modes[mode]}</strong> media</label>
                                    <br />
                                    <br />
                                    <TextField label="Something" onChange={e => setUserKeyword(e.target.value)} variant="standard" />
                                    <br />
                                    <br />
                                    <Button color="success" variant={userKeyword ? ("contained") : ("disabled")} type="submit">
                                        Search
                                    </Button>
                                </div>
                            </form>
                        ) : null
                    }
                    <div className="mt-5" />
                    {
                        storedPhotos.length && mode ? (
                            <Fragment>
                                <h2 className="text-center">
                                    Photos
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
                                        className={selection && selectedItems.find(item => item.id === index) ? ('media-selected') : ("")}
                                        onClick={selectPhotoItem}
                                        id={index}
                                    />
                                    </ImageListItem>
                                ))}
                                </ImageList>
                                </div>
                            </Fragment>
                        ) : null
                    }
                    {
                        photos.length && storedPhotos.length < photos.length ? (
                            <Button color='primary' variant="contained" onClick={readMorePhotos}>
                                More
                            </Button>
                        ) : null
                    }
                    {
                        storedVideos.length && mode ? (
                            <>
                                <h2 className="text-center">
                                    Movies
                                </h2>
                                <div className="gallery text-center">
                                {
                                    storedVideos.map((v, index) => (
                                        <div key={index}>
                                            <video width="350" controls alt={v.src} id={index} onClick={selectVideoItem} className={selection && selectedItems.find(item => item.id === index) ? ('media-selected') : ("")}>
                                                <source src={v.src} type="video/mp4" />
                                            </video>
                                            <br />
                                            <br />
                                        </div>
                                    ))
                                }
                                </div>
                            </>
                        ) : null
                    }
                    {
                        videos.length && storedVideos.length < videos.length ? (
                            <Button color="primary" variant="contained" onClick={readMoreVideos}>
                                More
                            </Button>
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
    getVideosFromKeyword,
    addMediaToAlbum
})(Index);