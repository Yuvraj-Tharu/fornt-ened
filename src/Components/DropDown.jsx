import React from "react";
import { motion } from "framer-motion";
import "../assets/Style/DropDownProfile.css";
import { Link } from "react-router-dom";

export default function DropDown() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col DropDownProfile bg-slate-200 shadow-md z-50"
    >
      <motion.ul
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="flex flex-col gap-4"
      >
        <Link
          to="/creatingListing"
          onClick={() => setOpenProfile((prev) => prev)}
        >
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-600 hover:underline"
          >
            Add Property
          </motion.li>
        </Link>

        <Link
          to="/showUserlisting"
          onClick={() => setOpenProfile((prev) => prev)}
        >
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-600 hover:underline"
          >
            Show Listing
          </motion.li>
        </Link>
        <Link
          to="/emiCalculator"
          onClick={() => setOpenProfile((prev) => prev)}
        >
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-slate-600 hover:underline"
          >
            Emi calculator
          </motion.li>
        </Link>
      </motion.ul>
    </motion.div>
  );
}
