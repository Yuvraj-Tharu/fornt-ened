import React, { useState } from "react";

import { IoIosArrowDropupCircle } from "react-icons/io";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function Footer() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <div className="">
        <MDBFooter className="text-center text-lg-start text-muted bg-[#FAFAFA]">
          <section className="d-flex justify-content-center justify-content-lg-between p-4  bg-[#FAFAFA]">
            <div className="me-5 d-none d-lg-block bg-[#FAFAFA] ">
              <span className="font-serif text-2xl text-slate-600 ml-[244px] bg-[#FAFAFA]">
                Get connected with us on social networks:
              </span>
            </div>

            <div className="text-2xl ">
              <IoIosArrowDropupCircle
                className="z-auto bg-yellow-200 rounded-full animate-bounce"
                onClick={scrollToTop}
                // style={{ display: visible ? "inline" : "none" }}
              />
            </div>
          </section>
          <section className=" ml-[225px]">
            <MDBContainer className="text-center text-md-start mt-5 ">
              <MDBRow className="mt-3">
                <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold  mb-4 text-slate-600">
                    <i className="fas fa-house-chimney-user me-3"></i>
                    Hamro Sampati
                  </h6>
                  <p className="font-serif">
                    Here you can use rows and columns to organize your footer
                    content. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit.
                  </p>
                </MDBCol>

                <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 text-slate-600">
                    Categories
                  </h6>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      Recent property
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      To Sell
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      To Buy
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      To Rent
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 text-slate-600">
                    Links
                  </h6>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      About Us
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif ">
                      Settings
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      Orders
                    </a>
                  </p>
                  <p>
                    <a href="#!" className="text-reset font-serif">
                      Help
                    </a>
                  </p>
                </MDBCol>

                <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                  <h6 className="text-uppercase fw-bold mb-4 text-slate-600">
                    Contact Us
                  </h6>
                  <p>
                    <MDBIcon icon="home" className="me-2 font-serif" />
                    Kathmandu, Bagmati-44600 , Nepal
                  </p>
                  <p>
                    <MDBIcon icon="envelope" className="me-3 font-serif" />
                    info@example.com
                  </p>
                  <p>
                    <MDBIcon icon="phone" className="me-3 font-serif" /> + 01
                    234 567 88
                  </p>
                  <p>
                    <MDBIcon icon="print" className="me-3 font-serif" /> + 01
                    234 567 89
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </section>

          <div className="text-center p-4 font-serif bg-[#FAFAFA] ">
            <a
              className="text-reset fw-bold font-serif "
              href="https://mdbootstrap.com/"
            >
              © 2024 Copyright: &nbsp; HamroSampati.com
            </a>
          </div>
        </MDBFooter>
      </div>
    </>
  );
}
