"use client";

import { useState } from "react";
import Image from "next/image";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Page() {
  const [spins, setSpins] = useState([]);

  // Modified handleSpin to accept a parameter (times)
  const handleSpin = (times = 1) => {
    const newSpins = []; // ✅ Always start fresh with an empty array
    for (let i = 0; i < times; i++) {
      const newNumber = Math.floor(Math.random() * 17);
      newSpins.push(newNumber);
    }
    setSpins(newSpins);
  };

  const getColor = (num) => {
    if ([3, 4, 5, 7, 9, 11, 13, 15].includes(num)) return "red";
    if ([1, 2, 6, 8, 10, 12, 14, 16].includes(num)) return "black";
    if ([0].includes(num)) return "green";
  };

  const colorCounts = {
    red: spins.filter((num) => getColor(num) === "red").length,
    black: spins.filter((num) => getColor(num) === "black").length,
    green: spins.filter((num) => getColor(num) === "green").length,
  };

  const totalSpins = spins.length || 1;

  const uniqueNumbers = Array.from(new Set(spins)).sort((a, b) => a - b);
  const colorMap = uniqueNumbers.map(getColor);

  const chartData = {
    labels: uniqueNumbers,
    datasets: [
      {
        label: "Repetition",
        data: uniqueNumbers.map(
          (num) => spins.filter((x) => x === num).length
        ),
        backgroundColor: colorMap,
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* Flex container for heading and SVG */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Distribute items evenly
          flexWrap: "wrap",
          gap: "20px",
          minHeight: "325px",
          height: "auto",
          width: "100%", // Ensure full width
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "20px",
            flex: "2", // 66% width
            maxWidth: "66%", // Limit to 66% of the space
            textAlign: "center", // Center text
          }}
        >
          Choose how many times you want to spin the wheel and think how the distribution shows on the graphs below.
        </h2>

        <div
          style={{
            flex: "1", // 33% width
            maxWidth: "33%", // Control the image size
            textAlign: "center",
            minHeight: "200px",
          }}
        >
          <Image
            src="/roulette-wheel.svg"
            alt="Roulette Wheel"
            width={200} // Adjust based on the image dimensions
            height={200} // Adjust based on the image dimensions
            style={{
              maxWidth: "100%",
              height: "auto",
              display: "block",
              margin: "0 auto",
              minHeight: "120px",
            }}
          />
        </div>
      </div>


      <p
        style={{
          fontSize: "0.9rem",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#666",
          letterSpacing: "1px",
          marginTop: "-20px",
        }}
      >
        Let’s spin the wheel
      </p>

      {/* Button Container for Horizontal Layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => handleSpin(1)} className="compare-answer-button">
          1X
        </button>
        <button onClick={() => handleSpin(10)} className="compare-answer-button">
          10X
        </button>
        <button onClick={() => handleSpin(100)} className="compare-answer-button">
          100X
        </button>
        <button onClick={() => handleSpin(1000)} className="compare-answer-button">
          1000X
        </button>
      </div>


      {/* Color Distribution */}
      <div
        style={{
          marginTop: "20px",
          padding: "10px",
          background: "#f0f0f0",
          borderRadius: "8px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          COLOR DISTRIBUTION
        </h3>

        <div style={{ display: "flex", height: "15px", borderRadius: "5px", overflow: "hidden" }}>
          <div
            style={{
              background: "red",
              width: `${(colorCounts.red / totalSpins) * 100}%`,
            }}
          ></div>
          <div
            style={{
              background: "black",
              width: `${(colorCounts.black / totalSpins) * 100}%`,
            }}
          ></div>
          <div
            style={{
              background: "green",
              width: `${(colorCounts.green / totalSpins) * 100}%`,
            }}
          ></div>
        </div>

        {/* Percentages Below */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5px",
            fontSize: "12px",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <span style={{ color: "red", flex: 1, textAlign: "left" }}>
            {((colorCounts.red / totalSpins) * 100).toFixed(1)}%
          </span>
          <span style={{ color: "black", flex: 1, textAlign: "center" }}>
            {((colorCounts.black / totalSpins) * 100).toFixed(1)}%
          </span>
          <span style={{ color: "green", flex: 1, textAlign: "right" }}>
            {((colorCounts.green / totalSpins) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Number Distribution (Chart & SVG side by side) */}
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "left",
          marginTop: "20px",
        }}
      >
        NUMBER DISTRIBUTION
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ flex: "1", maxWidth: "100%" }}>
          <Bar
            data={{
              ...chartData,
              datasets: [
                {
                  ...chartData.datasets[0],
                  label: "",
                },
              ],
            }}
            height={125} // Reduce height (adjust as needed)
            options={{
              maintainAspectRatio: false, // Ensure height change is applied
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    stepSize: 1,
                  },
                },
              },
            }}
          />
        </div>

      </div>

      {/* Number Runs */}
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          textAlign: "left",
          marginTop: "20px",
        }}
      >
        NUMBER RUNS
      </h3>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
        {spins.length > 0 ? (
          spins.slice(0, 25).map((num, index) => (
            <div
              key={index}
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "white",
                backgroundColor: getColor(num), // Use color-coding function
                padding: "10px",
                borderRadius: "50%",
                display: "inline-block",
                width: "40px",
                height: "40px",
                textAlign: "center",
                lineHeight: "40px",
              }}
            >
              {num}
            </div>
          ))
        ) : (
          <div
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "50%",
              display: "inline-block",
              width: "40px",
              height: "40px",
              textAlign: "center",
              lineHeight: "40px",
            }}
          >
            -
          </div>
        )}
      </div>

    </div >
  );
}