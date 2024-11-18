import { AnimatePresence } from "framer-motion";
import { SurveyProvider, useSurvey } from "@/components/Survey/SurveyContext";
import ProgressBar from "@/components/Survey/ProgressBar";
import Question from "@/components/Survey/Question";
import Congrats from "@/components/Survey/Congrats";
import Waitlist from "@/components/Survey/Waitlist";

const questions = [
  {
    id: "role",
    title: "What best describes your role?",
    options: ["Developer", "Designer", "Product Manager", "Founder", "Other"],
  },
  {
    id: "experience",
    title: "How many years of experience do you have?",
    options: ["0-2 years", "3-5 years", "6-10 years", "10+ years"],
  },
  {
    id: "team-size",
    title: "What's your team size?",
    options: ["Solo", "2-5", "6-20", "21-100", "100+"],
  },
  {
    id: "challenges",
    title: "What's your biggest challenge?",
    options: [
      "Time management",
      "Team collaboration",
      "Technical complexity",
      "Resource constraints",
      "Other",
    ],
  },
  {
    id: "goals",
    title: "What's your primary goal for the next year?",
    options: [
      "Grow the team",
      "Launch new products",
      "Improve existing products",
      "Learn new skills",
      "Other",
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