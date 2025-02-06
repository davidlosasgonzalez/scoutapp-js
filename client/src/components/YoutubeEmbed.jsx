import PropTypes from 'prop-types';

const YoutubeEmbed = ({ youtubeId }) => {
    return (
        <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allowFullScreen
        ></iframe>
    );
};

YoutubeEmbed.propTypes = {
    youtubeId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
