import { Camera, FileText, ScanSearch } from "lucide-react";

import Card from "../../common/Card";
import Container from "../../common/Container";
import SectionTitle from "../../common/SectionTitle";

const steps = [
  {
    number: "01",
    title: "Upload or Capture",
    description:
      "Choose a clear skin image from your device or capture one using the webcam.",
    icon: Camera,
  },
  {
    number: "02",
    title: "AI Analysis",
    description:
      "Our FastAPI backend prepares the image and sends it to the trained machine-learning model.",
    icon: ScanSearch,
  },
  {
    number: "03",
    title: "Review Your Result",
    description:
      "Receive an AI-assisted prediction, confidence score, and structured report.",
    icon: FileText,
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-y border-slate-800 bg-slate-900/30 py-20 sm:py-24"
    >
      <Container>
        <SectionTitle
          eyebrow="Simple Process"
          title="How DermaAI Works"
          description="The complete scan process is designed to be clear, fast, and easy to understand."
          align="center"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <Card
                key={step.number}
                variant="interactive"
                className="relative h-full"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                    <Icon size={24} />
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-4xl font-bold text-slate-800"
                  >
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-xl font-semibold text-white">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-400">
                  {step.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default HowItWorks;