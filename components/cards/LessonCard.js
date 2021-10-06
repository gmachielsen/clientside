import { Card, Avatar } from "antd";
// const {Item} = List;
const LessonCard = ({ lesson, setPreview, showModal, setShowModal, }) => {
    return (
        <div className="lesson" style={{ textAlign: 'center', padding: 'inherit' }}>
                       

                    <Card bordered={false} style={{ position: 'relative', width: 500, height: 500 }} cover={<img style={{ width: 500, height: 500, objectFit: 'cover', textAlign: 'center'}} alt="example" src={lesson.lessonimage && lesson.lessonimage !== null && (lesson.lessonimage.Location)} />}>
                        
                        <h1 style={{ textAlign: 'center' }}>{lesson.title}</h1>

                        <p style={{ textAlign: 'center' }}>{lesson.video && lesson.video !== null && lesson.free_preview && (
                                <span className="text-primary pointer" onClick={() => {
                                    setPreview(lesson.video.Location);
                                    setShowModal(!showModal);
                                }}>Preview</span>
                            )}
                        </p>
                    </Card>
                    <br/>
        </div>
    );
};

export default LessonCard;