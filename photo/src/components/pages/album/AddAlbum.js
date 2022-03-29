import React, { useEffect, useState } from 'react';
import { addAlbum } from '../../../actions/indexActions';
import { connect } from 'react-redux';

function AddAlbum({
    history,
    addAlbum,
    success,
    isLoading,
    token
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const onSubmit = e => {
        e.preventDefault();
        if (name && sessionStorage.userToken) {
            // Send request
            addAlbum(name, sessionStorage.userToken);
        }

        else {
            // Set error
            setError("Missing name fields.");
            console.log(name, sessionStorage.userToken);
        }
    }

    useEffect(() => {
        if (success && !isLoading) {
            // history.push("/"); // Later /album/name
        }

        else if (!isLoading && success === false) setError("Album creation failed.");
    }, [success, isLoading, name]);
    
    return (
        <>
            <h1 className="text-center">Adding an album</h1>
                <form onSubmit={onSubmit}>
                    <div className='album-adding-container'>
                        <div>
                            <input id="name" placeholder='Name' type="text" className="validate" value={name} onChange={e => setName(e.target.value)} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="pt-3">
                            <button className="btn waves-effect waves-light" type="submit">Add</button>
                        </div>
                    </div>
                    {
                        error ? (
                            <p className="p-2">
                                {error}
                            </p>
                        ) : null
                    }
                </form>
        </>
    );
}

const mapStateToProps = state => ({
    success : state.index.success,
    isLoading : state.index.isLoading
});

export default connect(mapStateToProps, {
    addAlbum
})(AddAlbum);