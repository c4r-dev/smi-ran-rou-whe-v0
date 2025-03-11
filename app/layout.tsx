import "./globals.css";
import FaviconButton from "./components/FaviconButton";

export const metadata = {
  title: "Roulette Wheel",
  description: "Roulette Wheel is a simple game to test your intuition.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {/* Header */}
        <header className="header">
          <FaviconButton />
          <div className="title-container responsive-title">
            <h1 className="title">Let&rsquo;s explore Roulette Wheel Results</h1>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ marginTop: "60px" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
