import { useEffect } from "react";

import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import HowItWorks from "./components/sections/HowItWorks";
import ScanSection from "./components/sections/ScanSection";

import { checkBackendHealth } from "./services/api";

function App() {
  useEffect(() => {
    async function testBackendConnection() {
      try {
        const data = await checkBackendHealth();

        console.log("Backend response:", data);
      } catch (error) {
        console.error("Backend connection failed:", error);
      }
    }

    testBackendConnection();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <HowItWorks />
        <ScanSection />
      </main>
    </>
  );
}

export default App;