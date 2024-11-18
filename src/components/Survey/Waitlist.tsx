import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { useSurvey } from "./SurveyContext";

const Waitlist = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { submitSurvey } = useSurvey();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await submitSurvey(email);
      toast.success("Thank you for joining our waitlist!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center space-y-8 w-full max-w-xl mx-auto"
    >
      <div className="text-center">
        <h2 className="text-3xl font-medium text-zinc-900 mb-4">
          Join the waitlist
        </h2>
        <p className="text-zinc-600">
          Be the first to know when we launch.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-6 text-lg"
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-violet-500 hover:bg-violet-600 text-white p-6 text-lg"
        >
          {isSubmitting ? "Adding you..." : "Join waitlist"}
        </Button>
      </form>
    </motion.div>
  );
};

export default Waitlist;