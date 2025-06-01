import { useState, React } from 'react';
import Dropdowns from '../Components/Dropdowns';
import { useNavigate } from 'react-router-dom';
import quizdata from './data';
import audio from '../src/assets/audio.wav'
import './Userinput.css'
import { createWebSocketModuleRunnerTransport } from 'vite/module-runner';



const Userinput = () => {
  const navigate = useNavigate();
  const [currque, setcurr] = useState(0);
  const [responses, setResponses] = useState({});

  const [name, setname] = useState("");
  const [food, setfood] = useState("");
  const [season, setseason] = useState("");
  const [movgen, setmovgen] = useState("");
  const [musgen, setmusgen] = useState("");
  const [travel, settravel] = useState("");
  const [an, setan] = useState("");
  const [sports, setsports] = useState("");
  const [ftime, setftime] = useState("");
  const [fice, setfice] = useState("");
  const [drink, setdrink] = useState("");
  const [genlink, setgenlink] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [copied,setcopied] = useState(false);

  const payload = {
    name,
    food,
    season,
    movgen,
    musgen,
    travel,
    an,
    sports,
    ftime,
    fice,
    drink,
  };

  const isformfilled = () => {
    return (
      name &&
      food &&
      season &&
      movgen &&
      musgen &&
      travel &&
      an &&
      sports &&
      ftime &&
      fice &&
      drink
    );
  };

  const handleAnswer = (key, value) => {
    if (currque < quizdata.length - 1) {
      setcurr(currque + 1);
      new Audio(audio).play()
    } else {
      alert('Quiz completed!');
    }
  };
  


  console.log("The value of food is:",food)
  console.log("The value of season is:",season)
  console.log("The name is",name)

  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8000/api/userinput/submit';
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("There is an error in making a post request.");
      }
      const data = await response.json();
      setgenlink(data.link);
    } catch (error) {
      console.error("Submission error: ", error);
    }
  };

  const question = quizdata[currque];


  const handlecopy = () =>{
    const data_to_copy = `${window.location.origin}/quiz/${genlink}`;
    navigator.clipboard.writeText(data_to_copy)
    .then(()=>{
      setcopied(true);
      setTimeout(()=>{
        setcopied(false)
      },2000)
    }).catch(err =>{
      console.warn("Cannot copy",err)
    })
  }

  return (
    <div className='w-[100vw] h-[100vh]  flex justify-center items-center'>
      <div className='bg-amber-200 rounded-lg shadow-md shadow-black/30 h-[900px] w-[800px] flex justify-center items-center flex-col gap-[0px]'>
        <form>
          <h1 className='text-5xl relative -top-[40px] text-center '>Welcome To Bond Test</h1>
          <input
            type="text"
            className=' in border-none shadow-md shadow-black/30 w-[500px] relative -top-[20px] h-[50px] outline-0'
            placeholder='Your Name'
            required
            onChange={(e) => setname(e.target.value)}
          />
        </form>
        {name.length > 0 && (

<div className=' w-[500px] px-4 py-2 flex flex-wrap justify-center items-center'>

{question && (
  <Dropdowns
  label={question.label}
  options={question.options}
  setthing={(val) => {
    const key = question.key;

    switch (key) {
      case "food":
        setfood(val);
        break;
      case "season":
        setseason(val);
        break;
      case "movgen":
        setmovgen(val);
        break;
      case "musgen":
        setmusgen(val);
        break;
      case "travel":
        settravel(val);
        break;
      case "an":
        setan(val);
        break;
      case "sports":
        setsports(val);
        break;
      case "ftime":
        setftime(val);
        break;
      case "fice":
        setfice(val);
        break;
      case "drink":
        setdrink(val);
        break;
      default:
        break;
    }

    handleAnswer(key, val);
  }}
/>

)}

</div>

        )}


  

        {isformfilled() && (
          <button type="submit" onClick={handlesubmit} className='relative top-[20px] text-2xl bg-pink-400 w-[300px] h-[50px] rounded-[50px] text-white cursor-pointer shadow-md shadow-black/30'>Submit</button>
        )}

        {loading && <p>Loading....</p>}

        {genlink && (
          <div className='relative top-[30px] h-[100px] flex justify-around flex-col'>
            <h2 className='text-lg text-black '>Share with friends.</h2>
            <div className='flex gap-[20px]'>
            <a  className='relative text-blue-500' href={`/quiz/${genlink}`} target="_blank" rel="noreferrer">{genlink}</a>
            <button className='cursor-pointer hover:text-blue-500' onClick={handlecopy}>{copied ? 'Copied' : "Copy"}</button>
            </div>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default Userinput;