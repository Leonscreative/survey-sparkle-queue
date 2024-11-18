import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useSurvey } from "./SurveyContext";
import confetti from "canvas-confetti";

const Congrats = () => {
  const { setCurrentStep, currentStep } = useSurvey();

  React.useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center space-y-8 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-medium text-zinc-900 mb-4">
          Thank you for your responses!
        </h2>
        <p className="text-xl text-zinc-600">
          We'd love to keep you updated on our progress.
        </p>
      </motion.div>
      <Button
        onClick={() => setCurrentStep(currentStep + 1)}
        className="bg-violet-500 hover:bg-violet-600 text-white px-8 py-6 text-lg"
      >
        Join the waitlist
      </Button>
    </motion.div>
  );
};

export default Congrats;