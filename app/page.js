"use client";

import { useState } from "react";
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

  const handleSpin = () => {
    const newNumber = Math.floor(Math.random() * 17);
    setSpins([...spins, newNumber]);
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
          <img
            src="/roulette-wheel.svg"
            alt="Roulette Wheel"
            style={{
              maxWidth: "100%", // Ensures it scales properly
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

      <button onClick={handleSpin} className="compare-answer-button">1X</button>

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
            options={{
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
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "white",
          backgroundColor: "red",
          padding: "10px",
          borderRadius: "50%",
          display: "inline-block",
        }}
      >
        {spins.length > 0 ? spins[spins.length - 1] : "-"}
      </div>
    </div >
  );
}

const buttonStyles = (isActive) => ({
  padding: "10px 15px",
  fontSize: "16px",
  fontWeight: "bold",
  backgroundColor: isActive ? "#333" : "#ddd",
  color: isActive ? "#fff" : "#aaa",
  border: "none",
  borderRadius: "6px",
  cursor: isActive ? "pointer" : "not-allowed",
  opacity: isActive ? "1" : "0.6",
  minWidth: "60px",
  textAlign: "center",
  marginTop: "10px",
});
