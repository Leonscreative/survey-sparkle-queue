import { AnimatePresence } from "framer-motion";
import { SurveyProvider, useSurvey } from "@/components/Survey/SurveyContext";
import ProgressBar from "@/components/Survey/ProgressBar";
import Question from "@/components/Survey/Question";
import Congrats from "@/components/Survey/Congrats";
import Waitlist from "@/components/Survey/Waitlist";

const questions = [
  {
    id: "work-situation",
    title: "What is your current work situation?",
    options: [
      "Full-time remote worker",
      "Freelancer",
      "Digital nomad",
      "Business owner",
      "Other",
    ],
  },
  {
    id: "stay-duration",
    title: "How long do you typically stay in one location?",
    options: [
      "Less than 1 month",
      "1-3 months",
      "3-6 months",
      "6+ months",
    ],
  },
  {
    id: "hua-hin-attraction",
    title: "What attracts you to Hua Hin?",
    options: [
      "Beach lifestyle",
      "Cost of living",
      "Local culture",
      "Weather",
      "Infrastructure",
      "Other",
    ],
  },
  {
    id: "coworking-frequency",
    title: "How often would you use a coworking space?",
    options: [
      "Daily",
      "2-3 times per week",
      "Weekly",
      "Occasionally",
    ],
  },
  {
    id: "additional-services",
    title: "Which services interest you most?",
    options: [
      "Professional networking events",
      "Skill-sharing workshops",
      "Social activities",
      "Virtual office services",
      "Storage lockers",
      "Wide screen monitor",
      "Printing/scanning services",
    ],
  },
];

const SurveyContent = () => {
  const { currentStep } = useSurvey();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl mx-auto">
        <ProgressBar />
        <div className="mt-12">
          <AnimatePresence mode="wait">
            {currentStep < questions.length ? (
              <Question key={currentStep} {...questions[currentStep]} />
            ) : currentStep === questions.length ? (
              <Congrats key="congrats" />
            ) : (
              <Waitlist key="waitlist" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const Index = () => (
  <SurveyProvider>
    <SurveyContent />
  </SurveyProvider>
);

export default Index;