import React from "react";
import { motion } from "framer-motion";
import "../assets/Style/About.css";
import "../assets/Style/Home.css";
import Footer from "./Footer";

export default function About() {
  return (
    <>
      <div className="main w-full  ">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="About container bg-[#FFFFFF] w-[68%] h-full "
        >
          <div className="flex gap-10 ">
            <div className="flex flex-col my-10 gap-3">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-6xl font-sans text-slate-600"
              >
                About Us
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center items-center font-serif"
              >
                <span className="font-semibold text-slate-600 text-xl font-sans">
                  Hamro Sampati
                </span>{" "}
                <span>Real-Estate</span> company and culture are a lot like our
                product. They’re crafted, not cobbled, for a delightful
                experience.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="my-3"
            >
              <img
                className="h-[15vw]  rounded-3xl "
                src="https://www.hubspot.com/hs-fs/hubfs/Hubspotters.jpg?width=701&height=468&name=Hubspotters.jpg"
                alt=""
              />
            </motion.div>
          </div>
          <div className="flex mt-20  ">
            <div className="flex gap-5">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <img
                  className="h-[20vw] w-[90vh] rounded-3xl "
                  src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlYWwlMjBlc3RhdGV8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
              </motion.div>

              <div className="flex flex-col gap-4 mt-20">
                <motion.h1
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-2xl font-sans text-slate-600"
                >
                  Our mission: In real estate is to turn dreams into tangible
                  realities.
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="w-[50%] text-justify font-serif "
                >
                  We believe not just in growing bigger, but in growing better.
                  And growing better means aligning the success of your own
                  business with the success of your customers. Win-win!
                </motion.p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full  ">
            <div className="flex mt-20 gap-5  ">
              <div className="flex flex-col gap-3  w-[50%]">
                <motion.h1
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  className="text-2xl font-sans text-slate-600"
                >
                  Our Story of Building Dreams and Transforming Communities
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-justify font-serif"
                >
                  Our story in real estate begins with a passion for creating
                  spaces that inspire, nurture, and thrive. It's a tale woven
                  with threads of dedication, innovation, and a deep
                  understanding of the profound impact that properties have on
                  people's lives. Like many great stories, ours started with a
                  vision—a vision to redefine what real estate means to
                  individuals and communities alike. From the outset, we set out
                  on a mission to not just sell properties, but to craft
                  experiences, fulfill dreams, and shape the very fabric of
                  neighborhoods.
                </motion.p>
              </div>

              <motion.div
                className=""
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <img
                  className="h-[20vw] w-[90vh] rounded-3xl"
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVhbCUyMGVzdGF0ZSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt=""
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-6 ">
        <Footer />
      </div>
    </>
  );
}
