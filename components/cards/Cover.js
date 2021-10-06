import TopNav from "../../components/TopNav";


const Cover = () => {

    return (
        <>
            {/* <TopNav /> */}
            <img src={require('../../public/coverphoto.jpg')} style={{ filter: 'grayscale(55%)', objectFit: 'cover', minWidth: '100%', maxHeight: '100vh', display: 'block', zIndex: 0 }} />
        </>
    );
};

export default Cover;