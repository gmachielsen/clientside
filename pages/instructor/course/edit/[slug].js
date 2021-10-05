import { useState, useEffect } from "react";
import axios from "axios";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import CourseCreateForm from "../forms/CourseCreateForm";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {List, Avatar, Modal, Button, Badge, Switch, Progress } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import UpdateLessonForm from "../forms/UpdateLessonForm";
import ReactPlayer from 'react-player';


const { Item } = List;

const CourseEdit = () => {
  // state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false,
    lessons: [],
  });
  const [image, setImage] = useState({});
  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [imageLessonPreview, setImageLessonPreview] = useState("");

  // state for lessons update
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState({});
  const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
    "Upload Video"
  );
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadImageButtonText, setuploadImageButtonText] = useState("Upload lesson image");



  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    loadCourse();
  }, [slug]);



  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    console.log(data);
    if (data) setValues(data);
    if (data && data.image) setImage(data.image);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });
    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri,
        });
        console.log("IMAGE UPLOADED", data);
        // set image in the state
        setImage(data);
        setValues({ ...values, loading: false });
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async () => {
    try {
      // console.log(values);
      setValues({ ...values, loading: true });
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };


  const handleLessonImage = (e) => {
    let file = e.target.files[0];
    setImageLessonPreview(window.URL.createObjectURL(file));
    setuploadImageButtonText(file.name);
    setValues({ ...values, loading: true });
    setVisible(true)

    // resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async (uri) => {
      try {
        let { data } = await axios.post("/api/course/upload-lessonpicture", {
          lessonimage: uri,
        });
        console.log("Image Lesson Uploaded", data);
        // set lesson image in te state 
        // setLessonImage(data);

        setCurrent({ ...current, lessonimage: data });
        // lessonpicture: data 
      } catch (err) {
        console.log(err);
        setCurrent({ ...current, lessonimage: data });
        toast("LessonImage upload failed, Try later.");
      }
    });
  };


  const handleLessonImageRemove = async () => {
    try {
      const res = await axios.post("/api/course/lessonremove-image",  current.lessonimage);
      console.log(res, "lessonimage data");
      setuploadImageButtonText("Upload Image");
      setImageLessonPreview({});
      setCurrent({ ...current, lessonimage: {} });
      setVisible(false);
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Lesson Image removed failed. Try later.");
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(values);
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values,
        image,
      });
      toast("Course updated!");
      // router.push("/instructor");
    } catch (err) {
      toast(err.response.data);
    }
  };

  const handleDrag = (e, index) => {
    // console.log("ON DRAG => ", index);
    e.dataTransfer.setData("itemIndex", index);
  };

  const handleDrop = async (e, index) => {
    // console.log("ON DROP => ", index);

    const movingItemIndex = e.dataTransfer.getData("itemIndex");
    const targetItemIndex = index;
    let allLessons = values.lessons;

    let movingItem = allLessons[movingItemIndex]; // clicked/dragged item to re-order
    allLessons.splice(movingItemIndex, 1); // remove 1 item from the given index
    allLessons.splice(targetItemIndex, 0, movingItem); // push item after target item index

    setValues({ ...values, lessons: [...allLessons] });
    // save the new lessons order in db
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values,
      image,
    });
    // console.log("LESSONS REARRANGED RES => ", data);
    toast("Lessons rearranged successfully");
  };

  const handleDelete = async (index) => {
    const answer = window.confirm("Are you sure you want to delete?");
    if (!answer) return;
    let allLessons = values.lessons;
    const removed = allLessons.splice(index, 1);
    // console.log("removed", removed[0]._id);
    setValues({ ...values, lessons: allLessons });
    // send request to server
    console.log(removed[0]._id, "removed", slug, "slug");
    const { data } = await axios.put(`/api/course/${slug}/${removed[0]._id}`);
    console.log("LESSON DELETED =>", data);
  };

  /**
   * lesson update functions
   */

  const handleVideo = async (e) => {
    // remove privious video
    if(current.video && current.video.Location) {
      const res = await axios.post(`/api/course/video-remove/${values.instructor._id}`, 
      current.video
      );
      console.log("REMOVED ====>", res);
    }
    // upload
    const file = e.target.files[0]
    setUploadVideoButtonText(file.name);
    setUploading(true);
    // send video as form data
    const videoData = new FormData()
    videoData.append('video', file);
    videoData.append('courseId', values._id);
    // save progress bar and send video as form data to backend
    const { data } = await axios.post(
      `/api/course/video-upload/${values.instructor._id}`,
      videoData,
      {
        onUploadProgress: (e) => 
          setProgress(Math.round((100 * e.loaded) / e.total)),
      }
    );
    console.log(data);
    setCurrent({ ...current, video: data });
    setUploading(false);
  };

  const handleUpdateLesson = async (e) => {
    // console.log("handle update lesson");
    e.preventDefault();
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current
    );
    setUploadVideoButtonText("Upload Video")
    setVisible(false)
    // update ui 
    if(data.ok) {
      let arr = values.lessons;
      const index = arr.findIndex((el) => el._id === current._id);
      arr[index] = current;
      setValues({ ...values, lessons: arr });
      toast('Lesson updated');
    }
  };

  const updateLessonForm = () => (
    <div className="container pt-3">
    {/* {JSON.stringify(current)} */}
    <form onSubmit={handleUpdateLesson}>
      <input
        type="text"
        className="form-control square"
        onChange={(e) => setCurrent({ ...current, title: e.target.value })}
        value={current.title}
        autoFocus
        required
      />

      <textarea
        className="form-control mt-3"
        cols="7"
        rows="7"
        onChange={(e) => setCurrent({ ...current, content: e.target.value })}
        value={current.content}
      ></textarea>

      <div>
        {!uploading && current.video && current.video.Location && (
          <div className="pt-2 d-flex justify-content-center">
            <ReactPlayer
              url={current.video.Location}
              width="410px"
              height="240px"
              controls
            />
          </div>
        )}
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
        </label>
      </div>

      {progress > 0 && (
        <Progress
          className="d-flex justify-content-center pt-2"
          percent={progress}
          steps={10}
        />
      )}
      <div className="d-flex justify-content-between">
        <span className="pt-3 badge"><p>Preview</p></span>
        <p>Preview</p>
        <Switch 
          className="float-right mt-2" 
          disabled={uploading} 
          checked={current.free_preview}
          name="fee_preview"
          onChange={(v) => setCurrent({ ...current, free_preview: v })} 
        />
      </div>
      <div className="d-flex justify-content-center">
                  <label className="btn btn-dark btn-block text-left mt-3">
                      {uploadImageButtonText}
                      <input type="file" name="lessonimage" onChange={handleLessonImage} accept="image/*" hidden/>
                  </label>
                  {imageLessonPreview && visible && (
                      <Badge count="X" onClick={handleLessonImageRemove} className="pointer">
                          <Avatar width={200} src={imageLessonPreview} />
                      </Badge>
                  )}
              </div>
      <Button
        onClick={handleUpdateLesson}
        className="col mt-3"
        size="large"
        type="primary"
        loading={uploading}
        shape="round"
      >
        Save
      </Button>
    </form>
  </div>
  )

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Update Course</h1>
      {/* {JSON.stringify(values)} */}
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleImageRemove={handleImageRemove}
          handleImage={handleImage}
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
          editPage={true}
        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}

      <hr />

      <div className="row pb-5">
        <div className="col lesson-list">
          <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
          <List
            onDragOver={(e) => e.preventDefault()}
            itemLayout="horizontal"
            dataSource={values && values.lessons}
            renderItem={(item, index) => (
              <Item
                draggable
                onDragStart={(e) => handleDrag(e, index)}
                onDrop={(e) => handleDrop(e, index)}
              >
                <Item.Meta
                  onClick={() => {
                    setVisible(true);
                    setCurrent(item);
                  }}
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                ></Item.Meta>

                <DeleteOutlined
                  onClick={() => handleDelete(index)}
                  className="text-danger float-right"
                />
              </Item>
            )}
          ></List>
        </div>
      </div>

      <Modal
        title="Update lesson"
        centered
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {/* <UpdateLessonForm
          current={current}
          setCurrent={setCurrent}
          handleVideo={handleVideo}
          handleUpdateLesson={handleUpdateLesson}
          uploadVideoButtonText={uploadVideoButtonText}
          progress={progress}
          uploading={uploading}
        /> */}
                {updateLessonForm()}

        {/* <pre>{JSON.stringify(current, null, 4)}</pre> */}
      </Modal>
    </InstructorRoute>
  );
};

export default CourseEdit;