import {Card, Badge} from 'antd';
import Link from 'next/link';
import { currencyFormatter } from '../../utils/helpers';


const { Meta } = Card

const CourseCard = ({ course }) => {
    const { name, instructor, price, image, slug, paid, category } = course;

    return (
        <Link href={`/course/${slug}`}>
            <a>
            <Card
                    className="mb-4"
                    style={{ fontFamily: 'serif'}}
                    cover={
                        <img
                        src={image ? image.Location: image}
                        alt={name}
                        style={{ height: "500px", objectFit: "cover", filter: "brightness(0.5)" }}
                        className="p-1"
                        />
                    }
                >                    
                    <h2 style={{ fontWeight: 'normal', textAlign: "center" }}>{name}</h2>
                    {/* <p>by {instructor.name}</p> */}
                    <Badge 
                        count={category}
                        style={{ backgroundColor: "#03a9f4"}}
                        className="pb-2 mr-2"
                    />
                    <h4 className="pt-2" style={{ textAlign: "center"}}>{paid ? currencyFormatter({ 
                        amount: price,
                        currency: "eur",
                    }): "Free"}</h4>
                </Card>
            </a>
        </Link>
    );
};

export default CourseCard;