import { useState, useEffect } from "react";
import axios from "axios";
import AdminRoute from "../../../components/routes/AdminRoute";
import Link from "next/link";
import { AlertTwoTone, CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Space, Card } from 'antd';

const AdminCoursesIndex = () => {
  const [courses, setCourses] = useState([]);
///

useEffect(() => {
    loadCourses();
  }, []);
console.log(courses, "courses")
const loadCourses = async () => {
    const { data } = await axios.get("/api/admin/courses");
    setCourses(data);
}





const deleteCourse = async (id) => {
    try {
        await axios.delete(`/api/admin/course/delete/${id}`);
    } catch(err) {
        console.log(err);
    }
    // console.log(id, "iddididididid");
    // alert("ji");
}
///


  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <AdminRoute>
 <div className="container-fluid" style={{ padding: 0 }}>
        <div className="jumbotron text-center square">                    
        <h1 style={{ color: "white" }}>Courses</h1>
        </div>
        <br/>

            <div className="row">
            <table>
                <tr>
                    <th>Name</th>
                    <th>Instructor</th>
                    <th>Action</th>
                </tr>
                {courses.map((course) => (
                    <tr>
                        <td>{course.name}</td>
                        <td>{course.instructor}</td>
                        <td><button onClick={() => deleteCourse(course._id)}>Delete</button></td>
                    </tr>
                ))}
  
          
            </table>
                

                        {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>

                
                        {courses.map((course) => (

                            <tr>
                            <td>1</td>
                            <td>{ course.name }</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            </tr>
                        ))}

                        </tbody>

                        </Table> */}
            </div>
        </div>
    </AdminRoute>
  );
};

export default AdminCoursesIndex;