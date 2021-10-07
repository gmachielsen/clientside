import React from "react";
import { useState, useEffect, useRef } from "react";
import { BackTop, Button } from 'antd';
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';
import Footer from "../components/Footer";
import Cover from '../components/cards/Cover';
import TopNavIndex from "../components/TopNavIndex";
import Media from 'react-media';
import ScrollButton from '../components/ScrollButton'; 
import DownCircleOutlined from "@ant-design/icons";
import { FaArrowCircleDown, FaArrowDown } from 'react-icons/fa';
const Index = ({ courses }) => {
  const divRef = useRef();

  // const [courses, setCourses] = useState([]);

  
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
    
  //   fetchCourses();
  // }, []);

    return (
      <>

      <div style={{position: 'absolute', width: '100%' }}>
        <div className="cover" style={{ padding: 0, position: 'relative', textAlign: 'center' }}>
          <div style={{ position: 'absolute', zIndex: 2, width: "100%"}}>
              <TopNavIndex />
          </div>

          <Media query={{ maxWidth: 5000, minWidth: 3500}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "150px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
          />

          <Media query={{ maxWidth: 3500, minWidth: 2500}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "150px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
          />

          <Media query={{ maxWidth: 2500, minWidth: 1900}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "150px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
          />

          <Media query={{ maxWidth: 1899, minWidth: 1600}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "150px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
          />

          <Media query={{ maxWidth: 1599, minWidth: 1300}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "125px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
          />

        <Media query={{ maxWidth: 1299, minWidth: 1099}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "100px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
        />

        <Media query={{ maxWidth: 1099, minWidth: 700}} render={() =>
            (
              <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "75px" }}>
              Art Masters Academy
              {/* <img src={require('../../public/coverphoto.jpg')} /> */}
            </h1>          
            )}
        />
        <Media 
          
          query={{ maxWidth: 699 }} render={() =>
          (
            <h1 className="text-center artmastersacademytitle" style={{ padding: 0, position: 'absolute', left: 0, right: 0, top: '30%', color: 'white', zIndex: 2, fontFamily: 'serif', fontSize: "45px" }}>
            Art Masters Academy
            {/* <img src={require('../../public/coverphoto.jpg')} /> */}
          </h1>          
          )}

          
          
        />
      <Button
        onClick={() => {
          divRef.current.scrollIntoView({ behavior: "smooth" });
        }} style={{ position: "absolute", zIndex: 3, top: "90vh", color: "red",backgroundColor: "transparent", justifyContent: "center" }}
       ><FaArrowDown /></Button>
        {/* <button onclick= {{document.getElementById('courses').scrollIntoView()}}>
              down
           </button> */}
        {/* <ScrollButton />  */}

          {/* <p style={{ zIndex: 2, fontSize: '35px', color: 'aliceblue', textAlign: 'center', position: 'absolute', left: 0, right: 0, top: '60%', fontFamily: 'serif', fontWeight: 'bold'}}>mastering art is an art</p> */}
          <Cover style={{ zIndex: 1 }} />
        </div>
        <br/><br/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 text-center">
              <h1 ref={divRef} id="courses" style={{ fontFamily: 'serif', fontWeight: 'bold', color: 'brown' }}>
                Our Courses
              </h1>
            </div>
          </div>
        </div>
        <br/><br/>
        <div className="container-fluid">
            <div className="row">
                {courses.map((course) => (
                  <div key={course._id} className="col-sm-12 col-md-6 col-lg-6 col-xl-3">
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
        </div>
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