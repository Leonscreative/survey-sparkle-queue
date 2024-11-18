import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSurvey } from "./SurveyContext";
import MultiSelectQuestion from "./MultiSelectQuestion";
import PricingQuestion from "./PricingQuestion";

interface BaseQuestionProps {
  id: string;
  title: string;
  type?: string;
  options?: string[];
}

type QuestionProps = BaseQuestionProps;

const Question = ({ id, title, options, type }: QuestionProps) => {
  const { setCurrentStep, setAnswer, currentStep, goBack } = useSurvey();

  if (type === "pricing") {
    return <PricingQuestion id={id} title={title} />;
  }

  if (id === "additional-services") {
    return <MultiSelectQuestion id={id} title={title} options={options || []} />;
  }

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
        {options?.map((option) => (
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
      {currentStep > 0 && (
        <Button
          variant="ghost"
          onClick={goBack}
          className="mt-4 text-zinc-600 hover:text-zinc-900"
        >
          Go Back
        </Button>
      )}
    </motion.div>
  );
};

export default Question;