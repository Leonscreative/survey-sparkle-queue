import React, { createContext, useContext, useState } from "react";
import { ref, push } from "firebase/database";
import { db } from "@/lib/firebase";

interface SurveyContextType {
  currentStep: number;
  answers: Record<string, string | string[]>;
  setCurrentStep: (step: number) => void;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  goBack: () => void;
  submitSurvey: (email: string) => Promise<void>;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  const setAnswer = (questionId: string, answer: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const submitSurvey = async (email: string) => {
    const surveyData = {
      answers,
      email,
      timestamp: new Date().toISOString()
    };
    
    const surveysRef = ref(db, 'surveys');
    await push(surveysRef, surveyData);
  };

  return (
    <SurveyContext.Provider
      value={{ currentStep, answers, setCurrentStep, setAnswer, goBack, submitSurvey }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
};