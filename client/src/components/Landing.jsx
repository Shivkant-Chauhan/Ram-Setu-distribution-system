import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import logo from "../static/img/carousel1.jpeg"
import logo2 from "../static/img/carousel2.jpeg"
import logo3 from "../static/img/carousel3.jpeg"

function Landing() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={logo}
          alt="First slide"
          />
        <Carousel.Caption>
          <p>The vision of our honourable Prime Minister Narendra Modi to make India a global superpower “VISWAGURU” will only be achieved when the underprivileged kids of India will get access to Laptops</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={logo2}
          alt="Second slide"
          />

        <Carousel.Caption>
          <p>This scheme is aimed to provide laptops to students who showed academic excellence in class 12th board exams.This will help uttar pradesh to achieve its goal of 1 Trillion GDP by developing Uttar Pradesh as an IT hub.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={logo3}
          alt="Third slide"
          />

        <Carousel.Caption>
          <p>By the vision of CM Yogi AdityaNath of equality and social justice we have special scholarships for minority groups and underrepresented people.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Landing;