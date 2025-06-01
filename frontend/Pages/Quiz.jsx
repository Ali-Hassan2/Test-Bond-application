import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import biryani from '../src/assets/biryani.jpg'
import pasta from '../src/assets/pasta.jpg'
import steak from '../src/assets/steak.jpg'
import karahi from '../src/assets/karahi.jpg'
import winter from '../src/assets/winter.jpg'
import summer from '../src/assets/summer.jpg'
import autumun from '../src/assets/autumun.jpg'
import spring from '../src/assets/spring.jpg'
import action from '../src/assets/action.jpg'
import rom from '../src/assets/rom.jpg'
import horror from '../src/assets/horror.jpg'
import comedy from '../src/assets/comedy.jpg'
import pop from '../src/assets/pop.jpg'
import rock from '../src/assets/rock.jpg'
import jazz from '../src/assets/jazz.jpg';
import classs from '../src/assets/class.jpg';
import mountains from '../src/assets/mountains.jpg';
import beach from '../src/assets/beach.jpg';
import forest from '../src/assets/forest.jpg';
import dessert from '../src/assets/dessert.jpg';
import cat from '../src/assets/cat.jpg';
import dog from '../src/assets/dog.jpg';
import ele from '../src/assets/ele.jpg';
import lion from '../src/assets/lion.jpg';
import football from '../src/assets/football.jpg';
import cricket from '../src/assets/cricket.jpg';
import basketball from '../src/assets/basketball.jpg';
import tennis from '../src/assets/tennis.jpg';
import reading from '../src/assets/reading.jpg';
import gaming from '../src/assets/gaming.jpg';
import tv from '../src/assets/tv.jpg';
import sleeping from '../src/assets/sleeping.jpg';
import vice from '../src/assets/vice.jpg';
import cice from '../src/assets/cice.jpg';
import sice from '../src/assets/sice.jpg';
import pice from '../src/assets/pice.jpg';
import tea from '../src/assets/tea.jpg';
import coffee from '../src/assets/coffee.jpg';
import juice from '../src/assets/juice.jpg';
import coc from '../src/assets/coc.jpg';
import './Quiz.css'
import audio from '../src/assets/audio.wav'


import data from './data'
import Drop2 from '../Components/Drop2';

const Quiz = () => {
  const { uniquelink } = useParams();
  const [quizstart, setquizstart] = useState(false);
  const [questions, setquestions] = useState([]);
  const [finished, setfinished] = useState(false);
  const [score, setscore] = useState(0);
  const [currentque, setcurrentque] = useState(0);

  const [curr, setcurr] = useState(0);


  const getanswers = async () => {
    setquizstart(true);

    const url = `http://localhost:8000/api/userinput/getanswers/${uniquelink}`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Error in making fetch call");
      else {
        const data = await response.json();
        console.log("The data is:", data);
        if (data.success && data.name) {
          setquestions(generating_questions(data));
        } else {
          console.log("Sorry, cannot get the data");
          setquestions([]);
        }
      }
    } catch (error) {
      console.log("Sorry, cannot make a fetch get call", error);
      setquestions([]);
    }
  };

  const quest = data[curr];
  const handlequestions = () => {
    if (curr < data.length - 1) {
      setcurr(curr + 1);
      new Audio(audio).play();
    }
    else {
      alert("Test compeleted");
      setcurr(0);
    }
  }


  const generating_questions = (data) => {
    return [
      {
        question: `What is ${data.name}'s favourite food?`,
        correct: data.favfood,
        options: [
          { text: "Biryani", img: biryani },
          { text: "Pasta", img: pasta },
          { text: "Steak", img: steak },
          { text: "Karahi", img: karahi },
        ],
      },
      {
        question: `What is ${data.name}'s favourite season?`,
        correct: data.favseason,
        options: [
          { text: "Winter", img: winter },
          { text: "Summer", img: summer },
          { text: "Autumn", img: autumun },
          { text: "Spring", img: spring },
        ],
      },
      {
        question: `What is ${data.name}'s favourite movie genre?`,
        correct: data.favmoviegenre,
        options: [
          { text: "Action", img: action },
          { text: "Romance", img: rom },
          { text: "Horror", img: horror },
          { text: "Comedy", img: comedy },
        ],
      },
      {
        question: `What is ${data.name}'s favourite music genre?`,
        correct: data.favmusicgenre,
        options: [
          { text: "Pop", img: pop },
          { text: "Rock", img: rock },
          { text: "Jazz", img: jazz },
          { text: "Classical", img: classs },
        ],
      },
      {
        question: `What is ${data.name}'s favourite travel place?`,
        correct: data.favtravelto,
        options: [
          { text: "Mountains", img: mountains },
          { text: "Beach", img: beach },
          { text: "Forest", img: forest },
          { text: "Desert", img: dessert },
        ],
      },
      {
        question: `What is ${data.name}'s favourite animal?`,
        correct: data.favanimal,
        options: [
          { text: "Cat", img: cat },
          { text: "Dog", img: dog },
          { text: "Elephant", img: ele },
          { text: "Lion", img: lion },
        ],
      },
      {
        question: `What is ${data.name}'s favourite sport?`,
        correct: data.favsport,
        options: [
          { text: "Football", img: football },
          { text: "Cricket", img: cricket },
          { text: "Basketball", img: basketball },
          { text: "Tennis", img: tennis },
        ],
      },
      {
        question: `What is ${data.name}'s favourite time of day?`,
        correct: data.ftime,
        options: [
          { text: "Reading", img: reading },
          { text: "Gaming", img: gaming },
          { text: "Watching TV", img: tv },
          { text: "Sleeping", img: sleeping },
        ],
      },
      {
        question: `What is ${data.name}'s favourite ice cream flavor?`,
        correct: data.favicecreamflavor,
        options: [
          { text: "Vanilla", img: vice },
          { text: "Chocolate", img: cice },
          { text: "Strawberry", img: sice },
          { text: "Pistachio", img: pice },
        ],
      },
      {
        question: `What ${data.name}'s favourite drink?`,
        correct: data.drink,
        options: [
          { text: "Tea", img: tea },
          { text: "Coffee", img: coffee },
          { text: "Juice", img: juice },
          { text: "Coke", img: coc },
        ],
      },
    ];
  };
  

  const handleanswer = (selectedanswer) => {
    const isCorrect = selectedanswer === questions[currentque].correct;
    const newScore = isCorrect ? score + 1 : score;
    setscore(newScore);

    if (currentque + 1 < questions.length) {
      setcurrentque(currentque + 1);
    } else {
      setfinished(true);
      alert(`Quiz Finished! Your final score is: ${newScore}`);
    }
  };

  if (!quizstart) {
    return (
      <div className='w-full h-[100vh] border-3 border-red-400 flex
      justify-center items-center'>
        <div className='h-[400px] w-[600px] border-3 bg-amber-200 border-amber-400 
        flex justify-center items-center flex-col gap-[40px]'>
          <h1 className=' text-4xl'>Welcome to Test Bond Application</h1>
          <button onClick={getanswers} className='bg-blue-600 w-[200px] h-[40px] rounded-3xl text-white cursor-pointer'>Start Quiz</button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div>
        <p>Quiz is Loading.....</p>
      </div>
    );
  }

  const currentQuestion = questions[currentque];

  return (
    <div className='w-full h-[100vh] border-4 border-red-800 flex justify-center items-center'>

      <div className=' shadow-md shadow-md/30 bg-amber-200  w-[700px] h-[900px] flex justify-center items-center flex-col'>

        <h3 className='text-4xl text-red relative -top-[20px]'>{currentQuestion.question}</h3>
        <Drop2
          options={currentQuestion.options}
          onSelect={(selected) => handleanswer(selected)}
         action={handlequestions}/>

      </div>


      {finished && (
  <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-black to-gray-900 bg-opacity-90 flex justify-center items-center z-50 animate-fade-in">
    <div className="bg-[#0f172a] text-white p-10 rounded-2xl shadow-2xl border border-blue-700 max-w-md w-full flex flex-col items-center gap-6 scale-95 animate-slide-up">
      <h2 className="text-4xl font-extrabold text-green-400 tracking-wide drop-shadow-sm animate-pulse">🎉 Quiz Completed!</h2>
      <p className="text-lg text-gray-300">
        Your final score is: <span className="font-semibold text-white">{score}/{questions.length}</span>
      </p>
      <button
        onClick={() => {
          setquizstart(false);
          setfinished(false);
          setscore(0);
          setcurrentque(0);
        }}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg text-white font-semibold hover:scale-105 transition-transform duration-300 shadow-md"
      >
        🔙 Go to Home
      </button>
    </div>
  </div>
)}

    </div>

   
  );
};

export default Quiz;
