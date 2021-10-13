import TopNav from "../../components/TopNav";


const Cover = () => {

    return (
        <>
            {/* <TopNav /> */}
            <img src={require('../../public/coverphoto.jpg')} style={{ filter: 'brightness(50%) grayscale(50%)', objectFit: 'cover', minWidth: '100%', maxWidth: '100%', maxHeight: '100vh', minHeight: '100vh', display: 'block', zIndex: 0 }} />
        </>
    );
};

export default Cover;