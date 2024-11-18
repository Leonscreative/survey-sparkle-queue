import { useSurvey } from "./SurveyContext";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const { currentStep } = useSurvey();
  const totalSteps = 7; // 5 questions + congrats + waitlist

  return (
    <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-violet-500"
        initial={{ width: 0 }}
        animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </div>
  );
};

export default ProgressBar;