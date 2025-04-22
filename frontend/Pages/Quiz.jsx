import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Quiz = () => {
  const { unqiuelink } = useParams();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // Your static choices
  const foodd = ['Pasta', 'Biryani', 'Hareesa', 'Karahi', 'Pizza', 'Tacos'];
  const seasons = ['Winter', 'Autmun', 'Summer'];
  const moviegenre = ['Action', 'Comedy', 'Drama', 'Thrillar', 'Horror'];
  const musicgenre = ['Pop', 'Rock', 'Classical', 'Hip-Hop'];
  const traveldestination = ['Paris', 'Tokyo', 'New York', 'Dubai', 'London'];
  const animal = ['Dog', 'Cat', 'Elephent', 'Lion', 'Tiger'];
  const sport = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Snooker'];
  const favtime = ['Morning', 'Noon', 'Evening', 'Night'];
  const icecreamflavor = ['Choclate', 'Vanila', 'Strawberry', 'Mint', 'Cookie Dough'];
  const colddrink = ['YES', 'NO'];

  useEffect(() => {
    const getans = async () => {
      const url = `http://localhost:5000/api/userinput/quiz/${unqiuelink}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error while getting the correct answers");

        const data = await response.json();
        if (!data || typeof data !== 'object') return;

        // Create quiz questions with correct answers and 3 shuffled options
        const quizQuestions = [
          {
            question: `What is ${data.name}'s favourite food?`,
            correct: data.favdood,
            options: shuffleOptions(data.favdood, foodd)
          },
          {
            question: `What is ${data.name}'s favourite season?`,
            correct: data.favseason,
            options: shuffleOptions(data.favseason, seasons)
          },
          {
            question: `What is ${data.name}'s favourite movie genre?`,
            correct: data.favmoviegenre,
            options: shuffleOptions(data.favmoviegenre, moviegenre)
          },
          {
            question: `What is ${data.name}'s favourite music genre?`,
            correct: data.favmusicgenre,
            options: shuffleOptions(data.favmusicgenre, musicgenre)
          },
          {
            question: `What is ${data.name}'s favourite travel place?`,
            correct: data.favtravelto,
            options: shuffleOptions(data.favtravelto, traveldestination)
          },
          {
            question: `What is ${data.name}'s favourite animal?`,
            correct: data.favanimal,
            options: shuffleOptions(data.favanimal, animal)
          },
          {
            question: `What is ${data.name}'s favourite sport?`,
            correct: data.favsport,
            options: shuffleOptions(data.favsport, sport)
          },
          {
            question: `What is ${data.name}'s favourite time of day?`,
            correct: data.ftime,
            options: shuffleOptions(data.ftime, favtime)
          },
          {
            question: `What is ${data.name}'s favourite ice cream flavor?`,
            correct: data.favicecreamflavor,
            options: shuffleOptions(data.favicecreamflavor, icecreamflavor)
          },
          {
            question: `Does ${data.name} like cold drinks?`,
            correct: data.drink,
            options: shuffleOptions(data.drink, colddrink)
          }
        ];

        setQuestions(quizQuestions);
      } catch (error) {
        console.log("Error while fetching data:", error);
      }
    };

    getans();
  }, [unqiuelink]);

  // Shuffle correct + 3 random options
  const shuffleOptions = (correct, pool) => {
    const options = new Set([correct]);
    while (options.size < 4) {
      const rand = pool[Math.floor(Math.random() * pool.length)];
      options.add(rand);
    }
    return Array.from(options).sort(() => Math.random() - 0.5);
  };

  const handleAnswer = (selected) => {
    if (selected === questions[current].correct) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  if (questions.length === 0) return <div>Loading quiz...</div>;

  if (finished) {
    return (
      <div style={{ padding: '20px' }}>
        <h2>Quiz Finished!</h2>
        <p>You got {score} out of {questions.length}</p>
      </div>
    );
  }

  const currentQ = questions[current];

  return (
    <div style={{ padding: '20px' }}>
      <h3>{currentQ.question}</h3>
      {currentQ.options.map((opt, i) => (
        <button
          key={i}
          onClick={() => handleAnswer(opt)}
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#eee',
            border: '1px solid #ccc',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
