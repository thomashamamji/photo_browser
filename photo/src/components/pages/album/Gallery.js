import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { listAlbums } from '../../../actions/indexActions';

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