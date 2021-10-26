import React from "react";
import { useState, useEffect, useRef, Fragment } from "react";
import { BackTop, Button } from 'antd';
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';
import Footer from "../components/Footer";
import Cover from '../components/cards/Cover';
import TopNavIndex from "../components/TopNavIndex";
import DesktopNavIndex  from "../components/DesktopNavIndex";
import Media from 'react-media';
import ScrollButton from '../components/ScrollButton'; 
import DownCircleOutlined from "@ant-design/icons";
import MediaQuery from 'react-responsive';

const Index = ({ courses }) => {

  const divRef = useRef();
  // const isDesktopOrLaptop = useMediaQuery({
  //   query: '(min-width: 1224px)', 
  //   query: '(min-width: 1824px)'
  // })
  // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
  // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  // const [courses, setCourses] = useState([]);

  
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
    
  //   fetchCourses();
  // }, []);

    useEffect(() => {

    }, [])

    return (
      <>

<div>
    {/* <h1>Device Test!</h1>
    <p>You are a desktop or laptop</p>
    <p>You  have a huge screen</p>
  <p>You are a tablet or mobile phone</p> */}

  </div>

      {/* <div style={{ width: '100%' }}> */}
        <div className="cover" style={{ padding: 0, position: 'relative', textAlign: 'center' }}>
        <MediaQuery minWidth={360} maxWidth={1224}>
        <>
                    <div style={{ position: 'absolute', zIndex: 2, width: "100%"}}>
                      <TopNavIndex />     
                    </div>
                      
                    <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "45px" }}>
                      Art Masters Academy
                      {/* <img src={require('../../public/coverphoto.jpg')} /> */}
                    </h1>
                </>        </MediaQuery>
        <MediaQuery minWidth={1224} maxWidth={1824}>
        <>
                  <div style={{ position: 'absolute', zIndex: 2, width: "100%"}}> 
                    <TopNavIndex />
                  </div>        
                  <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "75px" }}>
                    Art Masters Academy
                    {/* <img src={require('../../public/coverphoto.jpg')} /> */}
                  </h1>  
                </>        </MediaQuery>
        <MediaQuery minWidth={1825}>
        <>
                 <div style={{ position: 'absolute', zIndex: 2, width: "100%"}}> 
                    <DesktopNavIndex />
                  </div>    
                  <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "150px" }}>
                        Art Masters Academy
                        {/* <img src={require('../../public/coverphoto.jpg')} /> */}
                  </h1>  
                </>          
        </MediaQuery>
                       
         
   
      
        {/* <button onclick= {{document.getElementById('courses').scrollIntoView()}}>
              down
           </button> */}
        {/* <ScrollButton />  */}

          {/* <p style={{ zIndex: 2, fontSize: '35px', color: 'aliceblue', textAlign: 'center', position: 'absolute', left: 0, right: 0, top: '60%', fontFamily: 'serif', fontWeight: 'bold'}}>mastering art is an art</p> */}
          <Cover style={{ zIndex: 1, position: "absolute" }} />
          <div style={{ position: "absolute", zIndex: 3, top: "85vh", textAlign: "center", right: 0, left: 0 }}>
          <Button
            onClick={() => {
              divRef.current.scrollIntoView({ behavior: "smooth" });
            }} style={{  color: "red", backgroundColor: "transparent", position: "relative", border: "none", ripple: "none" }}
          >
         <div class="arrow"></div>

          </Button>

        </div>
        </div>
  
        <br/><br/>
        <div  className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1  ref={divRef} id="courses" style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'brown' }}>
                Online Courses
              </h1>
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="container-fluid">
            <div className="row">
                {courses.map((course) => (
                  <div key={course._id} className="col-12 col-md-6 col-lg-6 col-xl-4">
                    <CourseCard course={course}/>
                  </div>))}
            </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <Button style={{ fontFamily: 'serif', fontSize: '20px'}} href="/courses">Explore courses</Button>
            </div>
          </div>
        </div>
                  <br/><br/><br/>
          <Footer />
        {/* </div> */}
      </>
    );
  };

  export async function getServerSideProps() {
    const { data } = await axios.get(`${process.env.API}/courses`);
    // console.log("DATA LENGTH =====> ", data.length);
    return {
      props: {
        courses: data,
      },
    };
  }
  
  export default Index;