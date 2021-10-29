import React, { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from '../components/cards/CourseCard';

import { Menu, Slider, Checkbox } from "antd";
import { DollarOutlined, DownSquareOutlined } from "@ant-design/icons";

const { SubMenu, ItemGroup } = Menu;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [shipping, setShipping] = useState("");

  
  

//   const { text } = search;

  useEffect(() => {
    loadCourses();
    // fetch categories
    loadCategories();
}, []);

  const loadCourses = async () => {

    const { data } = await axios.get("/api/courses");
    console.log(data, "daasdada courses");
    setCourses(data);
  };

  const loadCategories = async () => {
    await axios.get("/api/admin/categories")
   .then((c) => setCategories(c.data));
  }

  const fetchCourses = async (arg) => {
    console.log(arg, "<<------ arguments");
    setCourses([]);
    await axios.post("/api/search/courses", arg)
    .then((res) => {
      setCourses(res.data);
      console.log(res.data, "resdatadada");
    });
    console.log(courses, "courses")
    console.log(courses.name, "course imagegememgegmge");
    // console.log(courses.data.image.Location, "course image location,,,,,,");
  };

  // 1. load products by default on page load
//   const loadAllProducts = () => {
//     getProductsByCount(12).then((p) => {
//       setProducts(p.data);
//       setLoading(false);
//     });
//   };

  // 2. load products on user search input
//   useEffect(() => {
//     const delayed = setTimeout(() => {
//       fetchProducts({ query: text });
//       if (!text) {
//         loadCourses();
//       }
//     }, 300);
//     return () => clearTimeout(delayed);
//   }, [text]);

  // 3. load products based on price range
  useEffect(() => {
    // console.log("ok to request", price);
    fetchCourses({ categoryIds });
  }, [ok]);

 

  // 4. load products based on category
  // show categories in a list of checkbox
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          onChange={handleCheck}
          className="pb-2 pl-4 pr-4"
          value={c._id}
          name="category"
          checked={categoryIds.includes(c._id)}
        >
          {c.name}
        </Checkbox>
        <br />
      </div>
    ));

  // handle check for categories
  const handleCheck = (e) => {
  
 

    // console.log(e.target.value);
    let inTheState = [...categoryIds];
    let justChecked = e.target.value;
    let foundInTheState = inTheState.indexOf(justChecked); // index or -1

    // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
    if (foundInTheState === -1) {
      inTheState.push(justChecked);
    } else {
      // if found pull out one item from index
      inTheState.splice(foundInTheState, 1);
    }

    setCategoryIds(inTheState);
    // setCategoryIds(categoryIds);
 
    // console.log(inTheState, "is piethe, daar");
    // fetchProducts({ category: inTheState, shipping, price });
    fetchCourses({ categoryIds: inTheState,  });

  };






  return (
    <div className="container-fluid" style={{padding: "0"}}>
      <div className="row" style={{padding: "15px"}}>
        <div className="col-md-3 pt-2">
          <h4 className="text-center" >Filter</h4>
          <hr />

          <Menu defaultOpenKeys={["1", "2"]} mode="inline">
  
 

            <SubMenu
              key="3"
              title={
                <span className="h6">
                   Categories
                </span>
              }
            >
            </SubMenu>
            <div style={{ maringTop: "-10px" }}>{showCategories()}</div>

 
          </Menu>
        </div>

        <div className="col-md-9 pt-2">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4 className="text-danger text-center">Online Courses</h4>
          )}

          {courses.length < 1 && <p>No courses found</p>}

            <div className="col-sm-12 col-md-12 col-lg-8 col-xl-9 pt-2">
                {courses.map((course) => (
                <div key={course._id} className="col-sm-12 col-md-12 col-lg-12 col-xl-4">
                    <CourseCard course={course}/>
                </div>))}
            </div>
        </div>
      </div>
      {/* <Footer /> */}

    </div>
  );
};

export default Courses;
