const Cover = () => {

    return (
        <img src={require('../../public/coverphoto.jpg')}  style={{ filter: 'grayscale(55%)', objectFit: 'cover', minWidth: '100%', maxHeight: '50vh', display: 'block', zIndex: 0 }} />
    );
};

export default Cover;