import {Card, Badge} from 'antd';
import Link from 'next/link';
import { currencyFormatter } from '../../utils/helpers';
import MediaQuery from 'react-responsive';


const { Meta } = Card

const CourseCard = ({ course }) => {
    const { name, instructor, price, image, slug, paid, category } = course;

    return (
        <>
        <MediaQuery minWidth={360} maxWidth={700}>
            <Link href={`/course/${slug}`}>
            <a>
       
            <Card
                    className="mb-4"
                    style={{ fontFamily: 'serif'}}
                    cover={
                        <img
                        src={image ? image.Location: image}
                        alt={name}
                        style={{ height: "256px", objectFit: "cover", filter: "brightness(0.9)" }}
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
        </MediaQuery>
        

        <MediaQuery minWidth={700} >
        <Link href={`/course/${slug}`}>
        <a>
   
        <Card
                className="mb-4"
                style={{ fontFamily: 'serif'}}
                cover={
                    <img
                    src={image ? image.Location: image}
                    alt={name}
                    style={{ height: "500px", objectFit: "cover", filter: "brightness(0.9)" }}
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
    </MediaQuery>
    </>
        
    );
};

export default CourseCard;