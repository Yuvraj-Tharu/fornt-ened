// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import "../assets/Style/Unit.css";

// function LandUnitConverter() {
//   const [ropani, setRopani] = useState("");
//   const [aana, setAana] = useState("");
//   const [paisa, setPaisa] = useState("");
//   const [bigaha, setBigaha] = useState("");
//   const [kattha, setKattha] = useState("");
//   const [dhur, setDhur] = useState("");

//   useEffect(() => {
//     if (bigaha !== "") convertBigahaToRopaniAanaPaisa();
//   }, [bigaha]);

//   useEffect(() => {
//     if (kattha !== "" || dhur !== "") convertKatthaDhurToRopaniAanaPaisa();
//   }, [kattha, dhur]);

//   const convertBigahaToRopaniAanaPaisa = () => {
//     const totalBigaha = parseFloat(bigaha) || 0;

//     const totalRopani = totalBigaha * 13.31;
//     const totalAana = totalBigaha * 20;
//     const totalPaisa = totalAana * 64;

//     setRopani(totalRopani.toFixed(2));
//     setAana(totalAana.toFixed(2));
//     setPaisa(totalPaisa.toFixed(2));
//   };

//   const convertKatthaDhurToRopaniAanaPaisa = () => {
//     const totalKattha = parseFloat(kattha) || 0;
//     const totalDhur = parseFloat(dhur) || 0;

//     const totalRopani = totalKattha * 0.6655 + totalDhur * 0.0416;
//     const totalAana = totalKattha * 20 + totalDhur * 1.25;
//     const totalPaisa = totalAana * 64;

//     setRopani(totalRopani.toFixed(2));
//     setAana(totalAana.toFixed(2));
//     setPaisa(totalPaisa.toFixed(2));
//   };

//   const convertRopaniAanaPaisaToBigaha = () => {
//     const totalRopani = parseFloat(ropani) || 0;
//     const totalAana = parseFloat(aana) || 0;
//     const totalPaisa = parseFloat(paisa) || 0;

//     const totalBigaha = totalRopani / 13.31;
//     setBigaha(totalBigaha.toFixed(2));
//   };

//   const convertRopaniAanaPaisaToKatthaDhur = () => {
//     const totalRopani = parseFloat(ropani) || 0;
//     const totalAana = parseFloat(aana) || 0;
//     const totalPaisa = parseFloat(paisa) || 0;

//     const totalKattha = totalRopani / 0.6655;
//     const totalDhur = (totalAana - totalKattha * 20) / 1.25;

//     setKattha(totalKattha.toFixed(2));
//     setDhur(totalDhur.toFixed(2));
//   };

//   const convertAanaPaisaToBigaha = () => {
//     const totalAana = parseFloat(aana) || 0;
//     const totalPaisa = parseFloat(paisa) || 0;

//     const totalBigaha = totalAana / 20 + totalPaisa / 64;
//     setBigaha(totalBigaha.toFixed(2));

//     // Reset Kattha and Dhur
//     setKattha("");
//     setDhur("");
//   };

//   const convertAanaPaisaToKatthaDhur = () => {
//     const totalAana = parseFloat(aana) || 0;
//     const totalPaisa = parseFloat(paisa) || 0;

//     const totalKattha = totalAana / 20 + (totalPaisa / 64) * 1.25;
//     const totalDhur = (totalPaisa % 64) / 4;

//     setKattha(totalKattha.toFixed(2));
//     setDhur(totalDhur.toFixed(2));

//     // Reset Bigaha
//     setBigaha("");
//   };

//   return (
//     <>
//       <div className="loan-calculator ">
//         <motion.div
//           className="top p-10 bg-slate-700 text-white"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="font-semibold text-2xl text-center mb-4">
//             Land Unit Converter
//           </h2>

//           <form action="#">
//             <div className="group">
//               <div className="title">Ropani</div>
//               <input
//                 value={ropani}
//                 type="number"
//                 onChange={(e) => setRopani(e.target.value)}
//                 onBlur={convertRopaniAanaPaisaToBigaha}
//                 className="text-black p-2 w-full rounded-lg"
//               />
//             </div>

//             <div className="group">
//               <div className="title">Aana</div>
//               <input
//                 value={aana}
//                 onChange={(e) => setAana(e.target.value)}
//                 onBlur={convertAanaPaisaToBigaha}
//                 type="number"
//                 className="text-black p-2 w-full rounded-lg"
//               />
//             </div>

//             <div className="group">
//               <div className="title">Paisa</div>
//               <input
//                 value={paisa}
//                 onChange={(e) => setPaisa(e.target.value)}
//                 onBlur={convertAanaPaisaToKatthaDhur}
//                 type="number"
//                 className="text-black p-2 w-full rounded-lg"
//               />
//             </div>
//           </form>
//         </motion.div>

//         <motion.div
//           className="result"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="left">
//             <div className="loan-emi">
//               <h3>Bigaha</h3>
//               <div className="value">
//                 {" "}
//                 <input
//                   type="text"
//                   value={bigaha}
//                   onChange={(e) => setBigaha(e.target.value)}
//                   onBlur={convertBigahaToRopaniAanaPaisa}
//                 />
//               </div>
//             </div>

//             <div className="total-interest mt-2">
//               <h3>Kattha</h3>
//               <div className="value">
//                 <input
//                   value={kattha}
//                   onChange={(e) => setKattha(e.target.value)}
//                   onBlur={convertKatthaDhurToRopaniAanaPaisa}
//                   type="text"
//                   className="text-black p-2 w-full rounded-lg"
//                 />
//               </div>
//             </div>

//             <div className="total-amount mt-2">
//               <h3>Dhur</h3>
//               <div className="value">
//                 {" "}
//                 <input
//                   value={dhur}
//                   onChange={(e) => setDhur(e.target.value)}
//                   onBlur={convertKatthaDhurToRopaniAanaPaisa}
//                   type="text"
//                   className="text-black p-2 w-full rounded-lg"
//                 />
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }

// export default LandUnitConverter;

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../assets/Style/Unit.css";

const LandUnitConverter = () => {
  const [ropani, setRopani] = useState("");
  const [aana, setAana] = useState("");
  const [paisa, setPaisa] = useState("");
  const [bigaha, setBigaha] = useState("");
  const [kattha, setKattha] = useState("");
  const [dhur, setDhur] = useState("");

  useEffect(() => {
    if (ropani || aana || paisa) {
      convertRopaniAanaPaisaToBigahaKatthaDhur();
    }
  }, [ropani, aana, paisa]);

  useEffect(() => {
    if (bigaha || kattha || dhur) {
      convertBigahaKatthaDhurToRopaniAanaPaisa();
    }
  }, [bigaha, kattha, dhur]);

  const convertRopaniAanaPaisaToBigahaKatthaDhur = () => {
    const totalRopani = parseFloat(ropani) || 0;
    const totalAana = parseFloat(aana) || 0;
    const totalPaisa = parseFloat(paisa) || 0;

    const totalSquareFeet =
      totalRopani * 5476.24 + totalAana * 342.265 + totalPaisa * 85.56;
    const bigahaValue = Math.floor(totalSquareFeet / 72900);
    const remainingSquareFeet1 = totalSquareFeet % 72900;
    const katthaValue = Math.floor(remainingSquareFeet1 / 3645);
    const remainingSquareFeet2 = remainingSquareFeet1 % 3645;
    const dhurValue = (remainingSquareFeet2 / 182.25).toFixed(2);

    setBigaha(bigahaValue.toFixed(0)); // Ensuring integer display
    setKattha(katthaValue.toFixed(0)); // Ensuring integer display
    setDhur(dhurValue);
  };

  const convertBigahaKatthaDhurToRopaniAanaPaisa = () => {
    const totalBigaha = parseFloat(bigaha) || 0;
    const totalKattha = parseFloat(kattha) || 0;
    const totalDhur = parseFloat(dhur) || 0;

    const totalSquareFeet =
      totalBigaha * 72900 + totalKattha * 3645 + totalDhur * 182.25;
    const ropaniValue = Math.floor(totalSquareFeet / 5476.24);
    const remainingSquareFeet1 = totalSquareFeet % 5476.24;
    const aanaValue = Math.floor(remainingSquareFeet1 / 342.265);
    const remainingSquareFeet2 = remainingSquareFeet1 % 342.265;
    const paisaValue = (remainingSquareFeet2 / 85.56).toFixed(2);

    setRopani(ropaniValue.toFixed(0)); // Ensuring integer display
    setAana(aanaValue.toFixed(0)); // Ensuring integer display
    setPaisa(paisaValue);
  };

  return (
    <div className="land-unit-converter">
      <motion.div
        className="top p-10 bg-slate-700 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-semibold text-2xl text-center mb-4">
          Land Unit Converter
        </h2>

        <form className="flex justify-between">
          <div className="group">
            <div className="title">Ropani</div>
            <input
              value={ropani}
              type="number"
              onChange={(e) => setRopani(e.target.value)}
              className="text-black p-2 w-full rounded-lg"
            />
          </div>

          <div className="group">
            <div className="title">Aana</div>
            <input
              value={aana}
              type="number"
              onChange={(e) => setAana(e.target.value)}
              className="text-black p-2 w-full rounded-lg"
            />
          </div>

          <div className="group">
            <div className="title">Paisa</div>
            <input
              value={paisa}
              type="number"
              onChange={(e) => setPaisa(e.target.value)}
              className="text-black p-2 w-full rounded-lg"
            />
          </div>
        </form>
      </motion.div>

      <motion.div
        className="result"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="left">
          <div className="result-group">
            <h3>Bigaha</h3>
            <div className="value">
              <input
                type="number"
                value={bigaha}
                onChange={(e) => setBigaha(e.target.value)}
                className="text-black p-2 w-full rounded-lg"
              />
            </div>
          </div>

          <div className="result-group mt-2">
            <h3>Kattha</h3>
            <div className="value">
              <input
                type="number"
                value={kattha}
                onChange={(e) => setKattha(e.target.value)}
                className="text-black p-2 w-full rounded-lg"
              />
            </div>
          </div>

          <div className="result-group mt-2">
            <h3>Dhur</h3>
            <div className="value">
              <input
                type="number"
                value={dhur}
                onChange={(e) => setDhur(e.target.value)}
                className="text-black p-2 w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandUnitConverter;
