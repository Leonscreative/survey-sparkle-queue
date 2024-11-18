import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useSurvey } from "./SurveyContext";
import { toast } from "sonner";

interface PricingQuestionProps {
  id: string;
  title: string;
}

const PricingQuestion = ({ id, title }: PricingQuestionProps) => {
  const { setCurrentStep, setAnswer, currentStep, goBack } = useSurvey();
  const [dailyPass, setDailyPass] = useState("");
  const [monthlyPass, setMonthlyPass] = useState("");
  const [longTerm, setLongTerm] = useState("");

  const handleSubmit = () => {
    if (!dailyPass || !monthlyPass || !longTerm) {
      toast.error("Please fill in all fields");
      return;
    }

    if (isNaN(Number(dailyPass)) || isNaN(Number(monthlyPass))) {
      toast.error("Please enter valid numbers for pricing");
      return;
    }

    setAnswer(id, {
      dailyPass: Number(dailyPass),
      monthlyPass: Number(monthlyPass),
      longTerm,
    });
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
      
      <div className="w-full space-y-6">
        <div className="space-y-2">
          <Label htmlFor="daily-pass">What would you pay for a daily pass? ($)</Label>
          <Input
            id="daily-pass"
            type="number"
            min="0"
            value={dailyPass}
            onChange={(e) => setDailyPass(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="monthly-pass">What would you pay for a monthly membership? ($)</Label>
          <Input
            id="monthly-pass"
            type="number"
            min="0"
            value={monthlyPass}
            onChange={(e) => setMonthlyPass(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="space-y-2">
          <Label>Would you commit to longer-term memberships for a discount?</Label>
          <RadioGroup value={longTerm} onValueChange={setLongTerm} className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <Button onClick={handleSubmit}>Next</Button>
        <Button variant="ghost" onClick={goBack} className="text-zinc-600 hover:text-zinc-900">
          Go Back
        </Button>
      </div>
    </motion.div>
  );
};

export default PricingQuestion;