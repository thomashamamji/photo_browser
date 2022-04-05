import React, { useEffect } from 'react';
import {
    listAlbumMedias
} from '../../../actions/indexActions';
import { connect } from 'react-redux'; 

// Styles
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Link } from 'react-router-dom';

function AlbumMediasList({
    medias, success, isLoading, listAlbumMedias, match
}) {
    useEffect(() => {
        if (match.params.albumName && localStorage.userToken) listAlbumMedias(match.params.albumName, localStorage.userToken);
    }, []);

    return (
        <>
            <h1 className="text-center">{match.params.albumName}</h1>
            <div className="container m-3 text-center">
                <ImageList variant="masonry" cols={3} gap={8}>
                {medias.map((item, index) => (
                    <ImageListItem key={index}>
                    {
                        item.type === "img" ? (
                            <img
                                src={`${item.url}?w=248&fit=crop&auto=format`}
                                srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={`Photo number ${index+1}`}
                                loading="lazy"
                                className="text-center"
                                // className={selection && selectedItems.find(item => item.id === index) ? ('media-selected') : ("")}
                                // onClick={selectPhotoItem}
                                id={index}
                            />
                        ) : (
                            <div key={index}>
                                <video
                                    width="350"
                                    controls
                                    alt={item.url}
                                    id={index}
                                    // onClick={selectVideoItem}
                                    // className={selection && selectedItems.find(i => i.id === index) ? ('media-selected') : ("")}
                                >
                                    <source src={item.url} type="video/mp4" />
                                </video>
                                <br />
                                <br />
                            </div>
                        )
                    }
                    </ImageListItem>
                ))}
                </ImageList>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    isLoading: state.index.isLoading,
    medias : state.index.medias,
    success : state.index.success
});

export default connect(mapStateToProps, {
    listAlbumMedias
})(AlbumMediasList);