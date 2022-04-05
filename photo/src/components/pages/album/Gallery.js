import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { listAlbums } from '../../../actions/indexActions';
import { Link } from 'react-router-dom';

// I may add album desciption

const Gallery = ({
    success,
    isLoading,
    albums,
    listAlbums
}) => {
    useEffect(() => {
        if (localStorage.userToken) listAlbums(localStorage.userToken);
        if (albums.length) console.log(albums);
    }, [listAlbums]);

    if (isLoading) return (
        <p className="text-center text-primary">Loading ...</p>
    );

    return (
        <>
            <h1 className='text-center'>My gallery</h1>
            <div className="container album-container m-5">
            {
                albums.length && albums.map((album, index) => (
                    <Link to={`/gallery/album/${album.album.name}`}>
                        <div key={index} className="album-item">
                            <div className="card">
                                <div className="card-image">
                                    <img src={album.media && album.media.url ? (album.media.url) : ('/blank.png')} />
                                    <span className="card-title text-black">{album.album.name}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    success : state.index.success,
    isLoading : state.index.isLoading,
    albums : state.index.albums
});

export default connect(mapStateToProps, {
    listAlbums
})(Gallery);