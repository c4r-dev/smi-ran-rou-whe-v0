"use client";

import { useState, useCallback, useMemo } from "react";
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

// Constants moved outside the component
const COLORS = {
  RED: [3, 4, 5, 7, 9, 11, 13, 15],
  BLACK: [1, 2, 6, 8, 10, 12, 14, 16],
  GREEN: [0],
};

// Helper function moved outside the component
const getColor = (num) => {
  if (COLORS.RED.includes(num)) return "red";
  if (COLORS.BLACK.includes(num)) return "black";
  if (COLORS.GREEN.includes(num)) return "green";
  return "gray"; // Fallback color
};

export default function Page() {
  const [spins, setSpins] = useState([]);

  // Using useCallback to prevent unnecessary re-renders
  const handleSpin = useCallback((times = 1) => {
    const newSpins = [];
    for (let i = 0; i < times; i++) {
      const newNumber = Math.floor(Math.random() * 17);
      newSpins.push(newNumber);
    }
    setSpins(newSpins);
  }, []);

  // Using useMemo to optimize calculations
  const statistics = useMemo(() => {
    const colorCounts = {
      red: spins.filter((num) => getColor(num) === "red").length,
      black: spins.filter((num) => getColor(num) === "black").length,
      green: spins.filter((num) => getColor(num) === "green").length,
    };

    const totalSpins = spins.length || 1;
    const uniqueNumbers = Array.from(new Set(spins)).sort((a, b) => a - b);
    const colorMap = uniqueNumbers.map(getColor);

    return {
      colorCounts,
      totalSpins,
      uniqueNumbers,
      colorMap,
    };
  }, [spins]);

  // Chart data preparation using memoization
  const chartData = useMemo(() => {
    return {
      labels: statistics.uniqueNumbers,
      datasets: [
        {
          label: "Repetition",
          data: statistics.uniqueNumbers.map(
            (num) => spins.filter((x) => x === num).length
          ),
          backgroundColor: statistics.colorMap,
        },
      ],
    };
  }, [statistics, spins]);

  return (
    <div style={{ textAlign: "center", maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      {/* Flex container for heading and SVG */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "10px",
          minHeight: "150px",
          height: "auto",
          width: "100%",
        }}
      >
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "50px",
            flex: "2",
            maxWidth: "66%",
            textAlign: "center",
          }}
        >
          Choose how many times you want to spin the wheel and think how the distribution shows on the graphs below.
        </h2>

        <div
          style={{
            flex: "1",
            maxWidth: "33%",
            textAlign: "center",
            minHeight: "200px",
          }}
        >
          <div className="image-container">
            <Image
              src="/roulette-wheel.svg"
              alt="Roulette Wheel"
              width={300}
              height={300}
              style={{
                transform: "rotate(11deg)",
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "0 auto",
                minHeight: "120px",
              }}
              priority
            />
          </div>
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
        Let&apos;s spin the wheel
      </p>

      {/* Button Container for Horizontal Layout */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <div className="button-container">
          {[1, 10, 100, 1000].map(times => (
            <button
              key={times}
              onClick={() => handleSpin(times)}
              className="compare-answer-button"
              aria-label={`Spin ${times} times`}
            >
              {times}X
            </button>
          ))}
        </div>
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
          {Object.entries(statistics.colorCounts).map(([color, count]) => (
            <div
              key={color}
              style={{
                background: color,
                width: `${(count / statistics.totalSpins) * 100}%`,
              }}
              aria-label={`${color} percentage: ${((count / statistics.totalSpins) * 100).toFixed(1)}%`}
            ></div>
          ))}
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
            {((statistics.colorCounts.red / statistics.totalSpins) * 100).toFixed(1)}%
          </span>
          <span style={{ color: "black", flex: 1, textAlign: "center" }}>
            {((statistics.colorCounts.black / statistics.totalSpins) * 100).toFixed(1)}%
          </span>
          <span style={{ color: "green", flex: 1, textAlign: "right" }}>
            {((statistics.colorCounts.green / statistics.totalSpins) * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Number Distribution (Chart) */}
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
            height={125}
            options={{
              maintainAspectRatio: false,
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  callbacks: {
                    title: (tooltipItems) => {
                      return `Number: ${tooltipItems[0].label}`;
                    },
                    label: (tooltipItem) => {
                      return `Count: ${tooltipItem.raw}`;
                    }
                  }
                }
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
                backgroundColor: getColor(num),
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              aria-label={`Spin result ${index + 1}: ${num}, color: ${getColor(num)}`}
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
            aria-label="No spins yet"
          >
            -
          </div>
        )}
      </div>
    </div>
  );
}