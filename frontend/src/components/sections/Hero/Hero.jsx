import { CheckCircle2, ScanLine, ShieldCheck, Sparkles } from "lucide-react";

import Button from "../../common/Button";
import Card from "../../common/Card";
import Container from "../../common/Container";

const trustPoints = [
  "Fast AI-assisted analysis",
  "Confidence score included",
  "Secure image handling",
];

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-10 top-1/3 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
              <Sparkles size={16} />
              AI-Powered Skin Analysis
            </div>

            <h1
              style={{ fontFamily: "Poppins, sans-serif" }}
              className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Understand Your Skin With{" "}
              <span className="text-cyan-400">
                Artificial Intelligence
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-400">
              Upload a clear skin image and receive an AI-assisted prediction,
              confidence score, and structured scan report within seconds.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button>
                <ScanLine size={18} className="mr-2" />
                Start Skin Scan
              </Button>

              <Button variant="secondary">
                Learn How It Works
              </Button>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {trustPoints.map((point) => (
                <div
                  key={point}
                  className="flex items-center gap-2 text-sm text-slate-300"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-400"
                  />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <Card
            variant="glass"
            className="relative overflow-hidden border-cyan-500/20 p-0"
          >
            <div className="border-b border-white/10 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-400">
                    AI Analysis Preview
                  </p>

                  <h2 className="mt-1 text-xl font-semibold text-white">
                    Skin Scan Result
                  </h2>
                </div>

                <div className="rounded-xl bg-cyan-500/10 p-3 text-cyan-400">
                  <ScanLine size={24} />
                </div>
              </div>
            </div>

            <div className="space-y-6 p-6">
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                  <ScanLine size={36} />
                </div>

                <p className="mt-4 text-sm text-slate-400">
                  Uploaded skin image preview
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">
                      Possible Condition
                    </p>

                    <p className="mt-1 text-xl font-semibold text-white">
                      Example Prediction
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
                    94.8%
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div className="h-full w-[94.8%] rounded-full bg-cyan-400" />
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <ShieldCheck
                  size={21}
                  className="mt-0.5 shrink-0 text-cyan-400"
                />

                <p className="text-sm leading-6 text-slate-400">
                  DermaAI provides educational AI-assisted results and does not
                  replace professional medical diagnosis.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}

export default Hero;