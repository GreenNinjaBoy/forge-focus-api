import React from 'react';
import styles from '../styles/About.module.css';
import {Carousel} from 'react-bootstrap'

const About = () => {
    return (
        <div className={styles.Background}>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=First slide&bg=373940"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>Welcome!</h3>
                        <p>When you strive to achieve your goals in life but find it difficult to keep things in oreder then Forge Focus is the place for you!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Second slide&bg=282c34"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>About Forge Focus</h3>
                        <p>Forge Focus provides an area where you can take action and plan.</p>
                        <p>We aim to provide you the user an easy place to which you can create and refine on areas you either wish to achieve or improve on in your day to day life </p>
                        <p>From here you can create new areas of refinement, add goals and view areas you have already been refining</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Refinement</h3>
                        <p>By creating areas of refinement, you the user can define and seperate all the different areas of your life that you wish to focus on and refine.</p>
                        <p>With each refinement area, you can then set goals you wish to work towards and set assignments that need to be achieved</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="holder.js/800x400?text=Fourth slide&bg=20232a"
                        alt="Fourth Slide"
                    />
                    <Carousel.Caption>
                        <h3>Miscellaneous Assignments</h3>
                        <p>If there is any assignments that do no fit with the area in which you are refining then we have provided you with a miscellaneous section to store these</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    )
}

export default About