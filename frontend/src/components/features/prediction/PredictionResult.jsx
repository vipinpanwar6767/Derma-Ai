import {
  AlertTriangle,
  BrainCircuit,
  ShieldCheck,
} from "lucide-react";


const CLASS_INFO = {
  akiec: {
    name: "Actinic Keratoses",
    shortCode: "AKIEC",
  },

  bcc: {
    name: "Basal Cell Carcinoma",
    shortCode: "BCC",
  },

  bkl: {
    name: "Benign Keratosis-like Lesions",
    shortCode: "BKL",
  },

  df: {
    name: "Dermatofibroma",
    shortCode: "DF",
  },

  mel: {
    name: "Melanoma",
    shortCode: "MEL",
  },

  nv: {
    name: "Melanocytic Nevi",
    shortCode: "NV",
  },

  vasc: {
    name: "Vascular Lesions",
    shortCode: "VASC",
  },
};


function PredictionResult({ result }) {
  if (!result) {
    return null;
  }


  const classInfo =
    CLASS_INFO[result.predicted_class] || {
      name: result.predicted_class,
      shortCode: result.predicted_class,
    };


  const confidence =
    result.confidence * 100;


  // This is UI guidance only.
  // It is NOT a medical certainty threshold.
  const isLowConfidence =
    confidence < 50;


  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-950/60">

      {/* Header */}

      <div className="border-b border-slate-800 px-6 py-5">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">

            <BrainCircuit size={21} />

          </div>


          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">
              AI Analysis Result
            </p>

            <p className="mt-1 text-sm text-slate-400">
              HAM10000 lesion classification
            </p>

          </div>

        </div>

      </div>


      {/* Main result */}

      <div className="p-6">

        <div className="grid gap-4 sm:grid-cols-2">

          {/* Predicted category */}

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">

            <p className="text-sm text-slate-400">
              Predicted Category
            </p>


            <h3 className="mt-2 text-xl font-semibold text-white">

              {classInfo.name}

            </h3>


            <p className="mt-1 text-sm font-medium text-cyan-400">

              {classInfo.shortCode}

            </p>

          </div>


          {/* Confidence */}

          <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-5">

            <p className="text-sm text-slate-400">
              Model Confidence
            </p>


            <p className="mt-2 text-3xl font-bold text-white">

              {confidence.toFixed(2)}%

            </p>


            {/* Confidence bar */}

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-500"
                style={{
                  width: `${Math.min(
                    confidence,
                    100
                  )}%`,
                }}
              />

            </div>

          </div>

        </div>


        {/* Low confidence guidance */}

        {isLowConfidence && (

          <div className="mt-5 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">

            <AlertTriangle
              size={20}
              className="mt-0.5 shrink-0 text-amber-400"
            />


            <div>

              <p className="font-semibold text-amber-300">
                Low model confidence
              </p>


              <p className="mt-1 text-sm leading-6 text-slate-400">

                The model is not strongly confident
                about this classification. Try a
                clear, close-up image of the relevant
                skin lesion with good lighting.

              </p>

            </div>

          </div>

        )}


        {/* Medical disclaimer */}

        <div className="mt-5 flex gap-3 rounded-xl border border-slate-800 bg-slate-900/50 p-4">

          <ShieldCheck
            size={20}
            className="mt-0.5 shrink-0 text-cyan-400"
          />


          <p className="text-sm leading-6 text-slate-400">

            DermaAI provides an AI-assisted
            preliminary lesion classification for
            educational purposes. It is not a medical
            diagnosis and should not replace
            evaluation by a qualified healthcare
            professional.

          </p>

        </div>

      </div>

    </div>
  );
}


export default PredictionResult;