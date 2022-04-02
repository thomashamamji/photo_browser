import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { listAlbums } from '../../../actions/indexActions';

// I may add album desciption

const Gallery = ({
    success,
    isLoading,
    albums,
    listAlbums
}) => {
    useEffect(() => {
        listAlbums(sessionStorage.userToken);
        if (albums.length) console.log(albums);
    }, [listAlbums]);

    return (
        <>
            <h1 className='text-center'>My gallery</h1>
            <div className="container album-container m-5">
            {
                albums.length && albums.map((album, index) => (
                    <>
                        <div key={index} className="album-item">
                            <div className="card">
                                <div className="card-image">
                                    <img src={album.media && album.media.url ? (album.media.url) : ('/blank.png')} />
                                    <span className="card-title text-black">{album.album.name}</span>
                                </div>
                            </div>
                        </div>
                    </>
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