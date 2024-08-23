import React, { useState, useEffect } from "react";
import "../assets/Style/emiCal.css";
import Chart from "chart.js/auto";
import { motion } from "framer-motion";

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [myChart, setMyChart] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (myChart) {
      updateChart();
    } else {
      displayChart();
    }
  }, [totalInterest, loanAmount]);

  const displayChart = () => {
    const ctx = document.getElementById("myChart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Total Interest", "Principal Loan Amount"],
        datasets: [
          {
            data: [parseFloat(totalInterest), parseFloat(loanAmount)],
            backgroundColor: ["#e63946", "#334155"],
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
    setMyChart(chart);
    // setLoading(true);
  };

  const updateChart = () => {
    myChart.data.datasets[0].data[0] = parseFloat(totalInterest);
    myChart.data.datasets[0].data[1] = parseFloat(loanAmount);
    myChart.update();
  };

  const calculateEmi = () => {
    const principle = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const time = parseFloat(loanTerm);

    const emiValue =
      (principle * rate * Math.pow(1 + rate, time)) /
      (Math.pow(1 + rate, time) - 1);
    setEmi(emiValue.toFixed(2));

    const totalPayment = emiValue * time;
    setTotalAmount(totalPayment.toFixed(2));

    const totalInterestPayable = totalPayment - principle;
    setTotalInterest(totalInterestPayable.toFixed(2));
  };

  return (
    <>
      <div className="loan-calculator ">
        <motion.div
          className="top p-10 bg-slate-700 text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-semibold text-2xl text-center mb-4">
            EMI Calculator
          </h2>

          <form action="#">
            <div className="group">
              <div className="title">Amount</div>
              <input
                value={loanAmount}
                type="number"
                onChange={(e) => setLoanAmount(e.target.value)}
                className="text-black p-2 w-full rounded-lg"
              />
            </div>

            <div className="group">
              <div className="title">Interest Rate</div>
              <input
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                type="number"
                className="text-black p-2 w-full rounded-lg"
              />
            </div>

            <div className="group">
              <div className="title">Tenure (in months)</div>
              <input
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                type="number"
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
            <div className="loan-emi">
              <h3>Loan EMI</h3>
              <div className="value">{emi}</div>
            </div>

            <div className="total-interest mt-2">
              <h3>Total Interest Payable</h3>
              <div className="value">{totalInterest}</div>
            </div>

            <div className="total-amount mt-2">
              <h3>Total Amount</h3>
              <div className="value">{totalAmount}</div>
            </div>

            <button
              className="calculate-btn bg-slate-700"
              onClick={calculateEmi}
            >
              Calculate
            </button>
          </div>

          <div className="right">
            {loading ? (
              <div>Loading chart...</div>
            ) : (
              <motion.canvas
                id="myChart"
                style={{ width: "400px", height: "400px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              ></motion.canvas>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
