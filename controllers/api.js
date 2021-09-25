const axios = require('axios');
const {apiKey} = require('../data/keys.json');

const handleError = (error, response) => {
    response.status(500).json({ error });
}

exports.getPhotosFromKeyword = (req, res, next) => {
    axios.get(`https://api.pexels.com/v1/search?query=${req.params.keyword}&per_page=${80}`, {
        headers : { 'Authorization': apiKey }
    })
    .then(rp => res.json({
        data : rp.data.photos.map(p => ({
            width : p.width,
            height : p.height,
            src : p.src.original
        }))
    }))
    .catch(err => handleError(err, res));
}

exports.getVideosFromKeyword = (req, res, next) => {
    axios.get(`https://api.pexels.com/videos/search?query=${req.params.keyword}&per_page=${80}`, {
        headers : { 'Authorization': apiKey }
    })
    .then(rp => res.json({
        data : rp.data.videos.map(v => ({
            width : v.video_files[0].width,
            height : v.video_files[0].height,
            src : v.video_files[0].link,
            duration : v.duration
        }))
    }))
    .catch(err => handleError(err, res));
}