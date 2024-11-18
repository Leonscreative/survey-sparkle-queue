import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSurvey } from "./SurveyContext";

interface QuestionProps {
  id: string;
  title: string;
  options: string[];
}

const Question = ({ id, title, options }: QuestionProps) => {
  const { setCurrentStep, setAnswer, currentStep } = useSurvey();

  const handleAnswer = (answer: string) => {
    setAnswer(id, answer);
    setCurrentStep(currentStep + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-8 w-full max-w-xl mx-auto"
    >
      <h2 className="text-3xl font-medium text-zinc-900">{title}</h2>
      <div className="grid gap-4 w-full">
        {options.map((option) => (
          <Button
            key={option}
            variant="outline"
            className="w-full p-6 text-lg hover:bg-violet-50 hover:text-violet-600 hover:border-violet-200 transition-all duration-200"
            onClick={() => handleAnswer(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    </motion.div>
  );
};

export default Question;