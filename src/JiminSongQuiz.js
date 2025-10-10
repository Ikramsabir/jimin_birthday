// src/JiminSongQuiz.js
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function JiminSongQuiz() {
  const quizData = [
  { line: "You are my penicillium, saving me, saving me", options: ["Serendipity", "Filter", "Like Crazy"], answer: "Serendipity" },
  { line: "I can’t be your boyfriend, I’m just your filter", options: ["Promise", "Filter", "Lie"], answer: "Filter" },
  { line: "Caught in a lie, find the me who was pure", options: ["Lie", "Promise", "Christmas Love"], answer: "Lie" },
  { line: "I’m the one I should love in this world", options: ["Like Crazy", "Promise", "Alone"], answer: "Promise" },
  { line: "I’d rather be lost in this dream forever", options: [ "Serendipity", "Closer Than This","Like Crazy"], answer: "Like Crazy" },
  { line: "Don't cry my love, this is the last gift from me", options: ["Alone", "Closer Than This", "Lie"], answer: "Closer Than This" },
  { line: "I just wanna stay in this moment", options: ["Serendipity", "Like Crazy", "Set Me Free Pt.2"], answer: "Like Crazy" },
  { line: "I want to hold you and fly across the sky", options: ["Promise", "Serendipity", "Christmas Love"], answer: "Serendipity" },
  { line: "Please don't see me as weak", options: ["Lie", "Alone", "Promise"], answer: "Promise" },
  { line: "I feel so empty, I just need somebody", options: ["Set Me Free Pt.2", "Like Crazy", "Alone"], answer: "Alone" },
  { line: "Set me free, yeah", options: ["Like Crazy", "Set Me Free Pt.2", "Lie"], answer: "Set Me Free Pt.2" },
  { line: "The snow is falling again, that time of the year", options: ["Promise", "Christmas Love", "Closer Than This"], answer: "Christmas Love" },
  { line: "Tell me it’s okay, love me like you used to", options: ["Like Crazy", "Promise", "Lie"], answer: "Like Crazy" },
  { line: "You know me, you know my heart", options: ["Promise", "Serendipity", "Alone"], answer: "Promise" },
  { line: "The lights are fading and I’m all alone", options: [ "Set Me Free Pt.2","Alone", "Filter"], answer: "Alone" },
  { line: "Let me be your light, baby", options: ["Serendipity", "Promise", "Lie"], answer: "Serendipity" },
  { line: "I want to breathe, I hate this night", options: ["Lie", "Promise", "Set Me Free Pt.2"], answer: "Lie" },
  { line: "You make me begin", options: ["Begin", "Promise", "Closer Than This"], answer: "Closer Than This" },
  { line: "I want to erase myself, I want to disappear", options: ["Alone", "Lie", "Filter"], answer: "Lie" },
  { line: "When I see you smile, it feels like spring", options: ["Christmas Love", "Serendipity", "Promise"], answer: "Christmas Love" },
  { line: "Feels like I'm trapped inside this dream", options: ["Like Crazy", "Set Me Free Pt.2", "Filter"], answer: "Like Crazy" },
  { line: "I'm the one who locked myself up", options: ["Lie", "Set Me Free Pt.2", "Promise"], answer: "Set Me Free Pt.2" },
  { line: "When I see your face, my heart starts to bloom", options: [ "Promise", "Christmas Love","Serendipity"], answer: "Serendipity" },
  { line: "This is my promise to you", options: ["Promise", "Lie", "Closer Than This"], answer: "Promise" },
  { line: "Don’t hide your sadness, it’s okay to cry", options: [ "Alone","Closer Than This", "Promise"], answer: "Closer Than This" },
  { line: "I’m lost in the city lights", options: ["Like Crazy", "Filter", "Lie"], answer: "Like Crazy" },
  { line: "You are the cause of my euphoria", options: ["Serendipity", "Lie", "Promise"], answer: "Serendipity" },
  { line: "You make me feel alive again", options: ["Promise", "Set Me Free Pt.2", "Alone"], answer: "Set Me Free Pt.2" },
  { line: "Love me now, touch me now", options: ["Serendipity", "Lie", "Filter"], answer: "Serendipity" },
  { line: "I promise I won’t make you wait", options: [ "Closer Than This", "Alone","Promise"], answer: "Promise" },
];


 const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showWrong, setShowWrong] = useState(false);

  const handleAnswer = (opt) => {
    if (opt === quizData[current].answer) {
      setScore(score + 1);
      nextQuestion();
    } else {
      setShowWrong(true);
      setTimeout(() => {
        setShowWrong(false);
        nextQuestion();
      }, 700); // تبقى الرسالة 2 ثواني
    }
  };

  const nextQuestion = () => {
    if (current + 1 < quizData.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartGame = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setShowWrong(false);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex flex-col items-center justify-center p-6 text-center">
      <h2 className="text-3xl font-bold text-pink-500 mb-8">
        🎵 Guess the Jimin Song!
      </h2>

      {showWrong ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-300 text-red-700 p-6 rounded-2xl shadow-md"
        >
          ❌ Wrong answer! Try again!
        </motion.div>
      ) : !showResult ? (
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <p className="text-lg font-semibold mb-6 text-gray-700">
            💬 "{quizData[current].line}"
          </p>

          <div className="flex flex-col gap-4">
            {quizData[current].options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt)}
                className="bg-pink-200 hover:bg-pink-400 text-gray-800 font-medium py-2 rounded-xl transition"
              >
                {opt}
              </button>
            ))}
          </div>

          <p className="mt-6 text-sm text-gray-600">
            Question {current + 1} / {quizData.length}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
        >
          <h3 className="text-2xl font-bold text-pink-600 mb-4">🎉 Result</h3>
          <p className="text-lg text-gray-700 mb-4">
            You got{" "}
            <span className="text-pink-500 font-bold">{score}</span> out of{" "}
            {quizData.length} correct!
          </p>
          <button
            onClick={restartGame}
            className="bg-pink-300 hover:bg-pink-400 text-gray-800 font-semibold py-2 px-4 rounded-xl transition"
          >
            🔁 Play Again
          </button>
        </motion.div>
      )}
    </div>
  );
};

