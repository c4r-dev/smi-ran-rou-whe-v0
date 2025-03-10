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
    const newNumber = Math.floor(Math.random() * 16) + 1;
    setSpins([...spins, newNumber]);
  };

  const getColor = (num) => {
    if ([1, 3, 5, 7, 9, 12, 14, 16].includes(num)) return "red";
    if ([2, 4, 6, 8, 10, 11, 13, 15].includes(num)) return "black";
    return "green";
  };

  const colorCounts = {
    red: spins.filter((num) => getColor(num) === "red").length,
    black: spins.filter((num) => getColor(num) === "black").length,
    green: spins.filter((num) => getColor(num) === "green").length,
  };

  const totalSpins = spins.length || 1;

  // Get unique numbers sorted
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
        backgroundColor: colorMap, // Use dynamic colors
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
      <h2
        style={{
          fontSize: "1.2rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Choose how many times you want to spin the wheel and think how the
        distribution shows on the graphs below.
      </h2>

      <p
        style={{
          fontSize: "0.9rem",
          textTransform: "uppercase",
          fontWeight: "bold",
          color: "#666",
          letterSpacing: "1px",
        }}
      >
        Let’s spin the wheel
      </p>

      <button onClick={handleSpin} style={buttonStyles(true)}>
        1X
      </button>

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
        <div
          style={{
            height: "15px",
            background: "red",
            width: `${(colorCounts.red / totalSpins) * 100}%`,
            marginBottom: "10px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            fontSize: "14px",
          }}
        >
          <span style={{ color: "red" }}>
            🔴 <b>{Math.round((colorCounts.red / totalSpins) * 100)}%</b> RED
          </span>
          <span style={{ color: "black" }}>
            ⚫ <b>{Math.round((colorCounts.black / totalSpins) * 100)}%</b> BLACK
          </span>
          <span style={{ color: "green" }}>
            🟢 <b>{Math.round((colorCounts.green / totalSpins) * 100)}%</b> GREEN
          </span>
        </div>
      </div>

      {/* Number Distribution */}
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

      {/*
        Here we add a flex container for the chart and the SVG side-by-side.
        On narrow screens, flex-wrap will ensure they stack vertically.
      */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div style={{ flex: "1 1 300px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
        <div style={{ flex: "1 1 300px", textAlign: "center" }}>
          {/* Add the roulette-wheel SVG here. Ensure the path is correct. */}
          <img
            src="/roulette-wheel.svg"
            alt="Roulette Wheel"
            style={{
              maxWidth: "300px",  // Adjust width to fit well
              height: "auto",
              display: "block",
              margin: "0 auto"
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
    </div>
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
