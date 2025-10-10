// src/JiminPage.js
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import JiminSongQuiz from "./JiminSongQuiz";
import Confetti from "react-confetti";
import Slider from "react-slick";
import { ArrowDown, Gift, Instagram, Twitter, Send } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function JiminPage() {
  const targetDate = new Date("2025-10-13T00:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showSurprise, setShowSurprise] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isBirthday, setIsBirthday] = useState(false);
  const [cards, setCards] = useState([]);
  const [points, setPoints] = useState(120); // البداية 120
  const [matched, setMatched] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [attempts, setAttempts] = useState(0); // كل محاولة (زوج كروت)
  const [startTimestamp, setStartTimestamp] = useState(null);

  const fullText = "Happy Birthday Jimin 🎂";
  const topRef = useRef(null);

  // Typing effect
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, []);

  // Countdown
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsBirthday(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((distance / (1000 * 60)) % 60),
          seconds: Math.floor((distance / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Slider images
  const images = [
    process.env.PUBLIC_URL + "/images/jimin1.jpg",
    process.env.PUBLIC_URL + "/images/jimin2.jpg",
    process.env.PUBLIC_URL + "/images/jimin3.jpg",
    process.env.PUBLIC_URL + "/images/jimin4.jpg",
    process.env.PUBLIC_URL + "/images/jimin5.jpg",
    process.env.PUBLIC_URL + "/images/jimin6.jpg",
    process.env.PUBLIC_URL + "/images/jimin7.jpg",
    process.env.PUBLIC_URL + "/images/jimin8.jpg",
    process.env.PUBLIC_URL + "/images/jimin9.jpg",
    process.env.PUBLIC_URL + "/images/jimin10.jpg",
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

const imagess = [ 
  process.env.PUBLIC_URL +"/images/jiminn1.jpg", 
  process.env.PUBLIC_URL +"/images/jiminn2.jpg", 
  process.env.PUBLIC_URL +"/images/jiminn3.jpg", 
  process.env.PUBLIC_URL +"/images/jiminn4.jpg", 
  process.env.PUBLIC_URL +"/images/jiminn5.jpg", 
  process.env.PUBLIC_URL +"/images/jiminn6.jpg", 
];

 // Shuffle and duplicate cards
  useEffect(() => {
    const shuffled = [...imagess, ...imagess]
      .sort(() => Math.random() - 0.5)
      .map((img, index) => ({ id: index, img }));
    setCards(shuffled);
  }, []);

  const handleFlip = (index) => {
  if (!startTimestamp) setStartTimestamp(Date.now()); // أول مرة كنضغطو

  if (flipped.includes(index) || matched.includes(index)) return;

  const newFlipped = [...flipped, index];
  setFlipped(newFlipped);

  if (newFlipped.length === 2) {
    setAttempts(prev => prev + 1);
    const firstCard = cards[newFlipped[0]];
    const secondCard = cards[newFlipped[1]];

    if (firstCard.img === secondCard.img) {
      setMatched(prev => [...prev, ...newFlipped]);
    } else {
      setPoints(prev => Math.max(0, prev - 10));
    }

    setTimeout(() => setFlipped([]), 800);
  }
};

 // عند بداية اللعبة
useEffect(() => {
  setStartTimestamp(Date.now());
}, []);

// عند كل مرة كتسالي فيها اللعبة أو كتفوز
const updatePoints = () => {
  if (!startTimestamp) return;
  const elapsed = Date.now() - startTimestamp; // المدة بالميلي ثانية
  const earnedPoints = Math.max(0, Math.floor(1000 - elapsed / 100)); // الوقت قليل = نقاط كثيرة
  setPoints(earnedPoints);
};
// ملي كتكملي اللعبة
useEffect(() => {
  if (matched.length === cards.length && startTimestamp) {
    const elapsed = Date.now() - startTimestamp; // بالميلي ثانية
    const earnedPoints = Math.max(0, 120 - Math.floor(elapsed / 1000)); // مثال: كل ثانية ناقص 1 نقطة
    setPoints(earnedPoints);
  }
}, [matched]);

// Reset the memory game
const resetGame = () => {
  const reshuffled = [...imagess, ...imagess]
    .sort(() => Math.random() - 0.5)
    .map((img, index) => ({ id: index, img }));
  setCards(reshuffled);
  setFlipped([]);
  setMatched([]);
  setPoints(120);
  setAttempts(0);
  setStartTimestamp(Date.now());
};


  // Quiz State
const [currentQuestion, setCurrentQuestion] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);
const [score, setScore] = useState(0);

const handleAnswer = (option) => {
  setSelectedAnswer(option);
  const correct = option === quizQuestions[currentQuestion].answer;
  setIsCorrect(correct);
  if (correct) setScore((prev) => prev + 1);
};

const handleNextQuestion = () => {
  setSelectedAnswer(null);
  setIsCorrect(null);
  setCurrentQuestion((prev) => prev + 1);
};


  const quizQuestions = [
    { question: "What is Jimin's full name?", options: ["Park Ji-min", "Kim Tae-hyung", "Min Yoongi", "Jung Hoseok"], answer: "Park Ji-min" },
    { question: "In which year was Jimin born?", options: ["1994","1995","1993","1996"], answer: "1995" },
    { question: "What is Jimin's blood type?", options: ["A","B","AB","O"], answer: "A" },
    { question: "Which BTS album features Jimin's solo song 'Lie'?", options: ["Wings","Map of the Soul: 7","Love Yourself: Her","BE"], answer: "Wings" },
    { question: "Which BTS unit did Jimin train in before debuting?", options: ["Rap line","Dance line","None","Vocal line"], answer: "Vocal line" },
    { question: "What is Jimin's nickname among fans?", options: ["TaeTae","Chimmy","Yoongi","Hobi"], answer: "Chimmy" },
    { question: "Which city is Jimin originally from?", options: ["Seoul","Daegu","Busan","Incheon"], answer: "Busan" },
    { question: "What is Jimin's favorite color?", options: ["Blue","Pink","Black","Yellow"], answer: "Pink" },
    { question: "Which song is Jimin’s first official solo?", options: ["Serendipity","Lie","Promise","Filter"], answer: "Serendipity" },
    { question: "What year did BTS debut?", options: ["2014","2012","2013","2015"], answer: "2013" },
    { question: "What dance style is Jimin most skilled in?", options: ["Hip-Hop","Popping","K-Pop only","Contemporary"], answer: "Contemporary" },
    { question: "Which BTS song has Jimin singing the main high note in the chorus?", options: ["Boy With Luv","Fake Love","Dynamite","Fire"], answer: "Fake Love" },
    { question: "Jimin has a tattoo symbolizing?", options: ["BTS","Family","Love","Friendship"], answer: "BTS" },
    { question: "Which variety show is Jimin known to be playful in?", options: ["Knowing Bros","Run BTS!","Weekly Idol","Idol Room"], answer: "Run BTS!" },
    { question: "Jimin’s birthday is on?", options: ["October 13","December 30","September 1","August 18"], answer: "October 13" },
    { question: "What was Jimin’s major in high school?", options: ["Music","Theatre","Visual Arts","Dance"], answer: "Dance" },
    { question: "Which solo song did Jimin release in 2020?", options: ["Serendipity","Filter","Lie","Promise"], answer: "Filter" },
    { question: "Which BTS member is Jimin closest to?", options: ["Jungkook","Jin","Suga","RM"], answer: "Jungkook" },
    { question: "What is Jimin's favorite food?", options: ["Pizza","Korean BBQ","Ice Cream","Sushi"], answer: "Korean BBQ" },
    { question: "Jimin is known for his?", options: ["Rap skills","Makeup skills","Guitar skills","Smile"], answer: "Smile" },
    { question: "Which BTS tour did Jimin first perform in?", options: ["The Red Bullet","Love Yourself Tour","Map of the Soul Tour","Wings Tour"], answer: "The Red Bullet" },
    { question: "Which song features Jimin’s emotional dance performance?", options: ["Dynamite","Lie","Butter","Life Goes On"], answer: "Lie" },
    { question: "What is Jimin's favorite dessert?", options: ["Chocolate","Cake","Ice Cream","Cookies"], answer: "Chocolate" },
    { question: "Which BTS song is known for Jimin's high note ending?", options: ["Boy With Luv","DNA","Fire","Spring Day"], answer: "Spring Day" },
    { question: "Which instrument can Jimin play?", options: ["Piano","Guitar","Drums","Violin"], answer: "Piano" },
    { question: "Jimin's solo song 'Promise' was released as?", options: ["Album track","Single on Spotify only","SoundCloud track","MV only"], answer: "SoundCloud track" },
    { question: "How tall is Jimin approximately?", options: ["170 cm","174 cm","180 cm","165 cm"], answer: "174 cm" },
    { question: "Which BTS concept suits Jimin the most?", options: ["Angel / Soft concept","Bad boy concept","Cool rapper","Hip-Hop dancer"], answer: "Angel / Soft concept" },
    { question: "Jimin’s first audition was for?", options: ["JYP","Big Hit Entertainment","YG","SM"], answer: "Big Hit Entertainment" },
    { question: "Jimin is known for which habit in BTS?", options: ["Always eating","Winking at the camera","Playing guitar","Rap battles"], answer: "Winking at the camera" },
  ];
  
    //game puzel 
    

  return (
    <div className="bg-gradient-to-br from-pink-100 via-yellow-100 to-white text-gray-800 min-h-screen transition-all duration-700">

      {showSurprise && (
        <Confetti width={window.innerWidth} height={document.body.scrollHeight} recycle={false} numberOfPieces={400} />
      )}
      {isBirthday && (
        <Confetti width={window.innerWidth} height={document.body.scrollHeight} numberOfPieces={600} recycle={true} />
      )}

      {/* Header */}
      <section ref={topRef} className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-pink-500 drop-shadow-lg"
        >
          {typedText}
        </motion.h1>

        {isBirthday && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-6 text-3xl font-bold text-yellow-500"
          >
            🎉 Today is Jimin’s Birthday! 💛
          </motion.div>
        )}

        <ArrowDown
          className="animate-bounce w-10 h-10 mt-10 text-yellow-400 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        />
      </section>

      {/* Surprise */}
      <section className="min-h-screen py-20 text-center bg-pink-200/30 backdrop-blur-sm flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold mb-6 text-pink-500">🎁 Special Surprise</h2>
        {!showSurprise ? (
          <button
            onClick={() => setShowSurprise(true)}
            className="bg-yellow-300 text-black font-semibold px-8 py-4 rounded-3xl flex items-center gap-3 transition-transform hover:scale-110"
          >
            <Gift className="w-6 h-6" /> Click for a surprise
          </button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-6 text-3xl font-bold text-pink-600"
          >
            💖 Happy Birthday Jimin! 💛
          </motion.div>
        )}
      </section>

      {/* Countdown */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center bg-yellow-50 py-20">
        {!isBirthday ? (
          <>
            <h2 className="text-4xl font-bold mb-6 text-pink-500">⏳ Countdown</h2>
            <div className="flex justify-center gap-6 text-2xl font-semibold">
              {Object.entries(timeLeft).map(([label, value]) => (
                <div key={label} className="bg-pink-200/50 px-6 py-4 rounded-2xl shadow-md hover:scale-110 transition-transform">
                  {value}
                  {label[0]}
                </div>
              ))}
            </div>
          </>
        ) : (
          <h2 className="text-5xl font-extrabold text-yellow-400 animate-bounce">
            🎊 Happy Birthday Jimin! 💛
          </h2>
        )}
      </section>

      {/* Slider */}
<section className="py-20">
  <h2 className="text-4xl font-bold mb-10 text-center text-pink-500">📸 Lovely Moments</h2>
  <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
    <style>{`
      .slick-slide {
        display: flex !important;
        justify-content: center;
        align-items: center;
      }
    `}</style>
    <Slider
      dots={true}
      infinite={true}
      speed={600}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={3000}
      fade={true}
      cssEase="ease-in-out"
    >
      {images.map((img, i) => (
        <div key={i}>
          <img
            src={img}
            alt={`Jimin ${i}`}
            className="max-w-full max-h-[400px] object-contain rounded-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>
      ))}
    </Slider>
  </div>
</section>

                   {/* Quiz Section */}
      <section className="min-h-screen flex flex-col justify-center items-center py-20 bg-gradient-to-r from-yellow-50 via-pink-50 to-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-8 text-pink-500"
        >
          🎮 Jimin Quiz — Test Your Knowledge!
        </motion.h2>

        {currentQuestion < quizQuestions.length ? (
          <div className="bg-white/70 shadow-xl rounded-3xl p-8 text-center max-w-md">
            <p className="text-lg mb-6 font-medium text-gray-700">
              {quizQuestions[currentQuestion].question}
            </p>

            <div className="flex flex-col gap-4">
              {quizQuestions[currentQuestion].options.map((option, i) => (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleAnswer(option)}
                  className={`border-2 font-semibold py-2 rounded-xl transition-all ${
                    selectedAnswer === option
                      ? isCorrect
                        ? "bg-green-100 border-green-400 text-green-600"
                        : "bg-red-100 border-red-400 text-red-600"
                      : "border-pink-300 text-pink-600 hover:bg-pink-100"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>

            {selectedAnswer && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-lg font-bold">
                {isCorrect ? "✅ Correct! 💛" : `❌ Wrong! Answer: ${quizQuestions[currentQuestion].answer}`}
              </motion.div>
            )}

            {selectedAnswer && (
              <button
                onClick={handleNextQuestion}
                className="mt-6 bg-yellow-300 text-black px-6 py-2 rounded-xl font-semibold hover:bg-yellow-400 transition-all"
              >
                Next
              </button>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-3xl font-bold text-pink-500 mb-4">🎉 Quiz Completed!</h3>
            <p className="text-xl text-gray-700 mb-6">Your Score: {score} / {quizQuestions.length}</p>
            <button
              onClick={() => { setCurrentQuestion(0); setScore(0); }}
              className="bg-pink-400 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-500 transition-all"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </section>



    {/*game memorie*/}
     <div className="min-h-screen py-20 bg-yellow-50 text-center">
      <h2 className="text-4xl font-bold mb-10 text-pink-500">🧠 Memory Game — Match Jimin!</h2>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
        {cards.map((card, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          return (
            <motion.div
              key={card.id}
              onClick={() => handleFlip(index)}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-xl shadow-lg w-full aspect-square flex items-center justify-center overflow-hidden ${
                isFlipped ? "bg-white" : "bg-pink-200"
              }`}
            >
              {isFlipped && (
                <img src={card.img} alt="Jimin" className="w-full h-full object-cover rounded-xl" />
              )}
            </motion.div>
          );
        })}
      </div>

      {matched.length === cards.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 text-3xl font-bold text-green-600"
        >
          🎉 Congratulations! You matched all cards! 💛
         { /*<p className="mt-4 text-xl text-gray-700">Your Points: {points}</p>*/}
          <button
            onClick={resetGame}
            className="mt-6 bg-pink-400 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-500 transition-all"
          >
            Restart Game
          </button>
        </motion.div>
      )}
    </div>
       
        <JiminSongQuiz />

      {/* Footer */}
      <footer className="py-12 bg-pink-300/70 text-center text-white">
        <p className="mb-4 text-lg">Made with love by ARMY 💛</p>
        <div className="flex justify-center gap-8 text-2xl">
          <a href="https://www.instagram.com/ikram____sabir/" target="_blank" className="hover:scale-125 hover:text-yellow-100 transition-transform">
            <Instagram />
          </a>
          <a href="https://x.com/IkramSa16871175" target="_blank" className="hover:scale-125 hover:text-yellow-100 transition-transform">
            <Twitter />
          </a>
        </div>
      </footer>
    </div>
  );
}
