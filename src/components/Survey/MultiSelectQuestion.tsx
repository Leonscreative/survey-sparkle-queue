import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useSurvey } from "./SurveyContext";
import { toast } from "sonner";

interface MultiSelectQuestionProps {
  id: string;
  title: string;
  options: string[];
  maxSelections?: number;
}

const MultiSelectQuestion = ({ id, title, options, maxSelections = 3 }: MultiSelectQuestionProps) => {
  const { setCurrentStep, setAnswer, currentStep } = useSurvey();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        if (prev.length >= maxSelections) {
          toast.error(`You can only select up to ${maxSelections} options`);
          return prev;
        }
        return [...prev, option];
      }
    });
  };

  const handleNext = () => {
    if (selectedOptions.length === 0) {
      toast.error("Please select at least one option");
      return;
    }
    setAnswer(id, selectedOptions);
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
          <div key={option} className="flex items-center space-x-3">
            <Checkbox
              id={option}
              checked={selectedOptions.includes(option)}
              onCheckedChange={() => handleOptionToggle(option)}
            />
            <label
              htmlFor={option}
              className="text-lg text-zinc-700 cursor-pointer"
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      <Button onClick={handleNext} className="mt-6">
        Next
      </Button>
    </motion.div>
  );
};

export default MultiSelectQuestion;