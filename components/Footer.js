import React, { useState } from 'react'
import Link from "next/link";
import { Button } from "antd";
import { FacebookOutlined } from "@ant-design/icons";

const Footer = () => {
    const [visible, setVisible] = useState(false);
    
    return (
        <footer style={{ backgroundColor: '#000', fontFamily: 'serif'}}>
                <section className="newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="content text-center" style={{ color: 'white', backgroundColor: 'black'}}>
                                    <br/>
                                    <h2 style={{ color: 'white' }}>Keep in touch</h2>
                                    <p>Subscribe for our newsletter and keep in touch on social media</p>
                                    <div className="subscribe input-group mb-3" style={{ justifyContent: 'center'}}>
                                            <div>
                                                <Button href="/user/newsletter">Subscribe</Button>
                                            </div>        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container">
                    <div className="row text-center d-flex justify-content-center pt-5 mb-3" style={{ margin: 'auto', display: 'flex'}}>
          
                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6  className="text-uppercase font-weight">
                                <Link style={{ color: 'red' }} href="/about"><p style={{ color: "white" }}>About us</p></Link>
                                </h6>
                            </div>

                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6 className="text-uppercase font-weight">
                                <Link href="/courses"><p style={{ color: "white" }}>Courses</p></Link>
                                </h6>
                            </div>

                            <div className="col-lg-2 col-xl-1 mb-3">
                                <h6 className="text-uppercase font-weight">
                                <Link href="/"><p style={{ color: "white" }}>Instructors</p></Link>
                                </h6>
                            </div>
                    </div>
                    <hr style={{ height: "1px", color: "white", width: "50%", margin: "auto" }} />

                        {/* <hr className="rgba-white-light" style={{ margin: '0 15%'}}></hr>
                        <hr className="clearfix d-md-none rgba-white-light" style={{ margin: '10% 15% 5%'}}></hr> */}
                        <br/>
                        <br/>

                        <p class="text-center text-muted">&copy; 2021 Artmastersacademy</p>
                        <br/>
                    
                </div>
                {/* <div class="container">
                    <footer class="py-3 my-4">
                        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Home</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Features</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">Pricing</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">FAQs</a></li>
                        <li class="nav-item"><a href="#" class="nav-link px-2 text-muted">About</a></li>
                        </ul>
                        <p class="text-center text-muted">&copy; 2021 Company, Inc</p>
                    </footer>
                </div> */}
        </footer>
    )
}

export default Footer;

{/* <div className="row pb-3">

                    <div className="col-md-12 text-center" style={{ color: 'white' }}>

                        <div className="mb-5 social flex-center">

                            <a className="fb-ic">
                                <i icon={ <FacebookOutlined /> } className="fab fa-facebook-f fa-lg white-text mr-4" style={{ color: 'white' }}> </i>
                            </a>
                            <a className="tw-ic">
                                <i className="fab fa-twitter fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="gplus-ic">
                                <i className="fab fa-google-plus-g fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="li-ic">
                                <i className="fab fa-linkedin-in fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="ins-ic">
                                <i className="fab fa-instagram fa-lg white-text mr-4"> </i>
                            </a>
                            <a className="pin-ic">
                                <i className="fab fa-pinterest fa-lg white-text"> </i>
                            </a>

                        </div>

                    </div>

                    </div> */}