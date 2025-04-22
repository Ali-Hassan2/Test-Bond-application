import {useState,React} from 'react'
import Dropdowns from '../Components/Dropdowns'
import { useNavigate } from 'react-router-dom'

const Userinput = () => {
  const foodd = ['Pasta', 'Biryani', 'Hareesa', 'Karahi', 'Pizza', 'Tacos']
  const seasons = ['Winter', 'Autmun', 'Summer']
  const moviegenre = ['Action', 'Comedy', 'Drama', 'Thrillar', 'Horror']
  const musicgenre = ['Pop', 'Rock', 'Classical', 'Hip-Hop']
  const traveldestination = ['Paris', 'Tokyo', 'New York', 'Dubai', 'London']
  const animal = ['Dog', 'Cat', 'Elephent', 'Lion', 'Tiger']
  const sport = ['Football', 'Cricket', 'Basketball', 'Tennis', 'Snooker']
  const favtime = ['Morning', 'Noon', 'Evening', 'Night']
  const icecreamflavor = ['Choclate', 'Vanila', 'Strawberry', 'Mint', 'Cookie Dough']
  const colddrink = ['YES', 'NO']

    // use states
    const [name,setname] = useState("");
    const [food,setfood] = useState("");
    const [season,setseason] = useState("");
    const [movgen,setmovgen] = useState("");
    const [musgen,setmusgen] = useState("");
    const [travel,settravel] = useState("");
    const [an,setan] = useState("");
    const [sports,setsports] = useState("");
    const [ftime,setftime] = useState("");
    const [fice,setfice] = useState("")
    const [drink,setdrink] = useState("");
    const [genlink,setgenlink] = useState("");
    const [answers,setanswers] = useState("");
    const [loading,setloading] = useState(false);
    const [error,seterror] = useState("");

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
    
    const isformfilled = ()=>{
      return(
        name&&
        food &&
        season&&
        movgen&&
        musgen&&
        travel&&
        an&&
        sports&&
        ftime&&
        fice&&
        drink
      )
    }

    const handleanswers = async()=>{

      setloading(true);
      seterror("");
      setanswers([]);

      const url = `http://localhost:8000/api/userinput/getans/${name}`;
      try {
        const response = await fetch(url);
        if(!response.ok){
          throw new Error("There is an error while going to the url.")
        }
        const data = await response.json();
        if(!Array.isArray(data) || data.length === 0){
          console.log("Sorry cannot get the answers");
          setanswers([]);
          seterror("No data related to this found");
        }
        else{
          setanswers(data);
          console.log("The data is ",data);
        }
      } catch (error) {
        console.log("Sorry cannot get the answers cannot make the get call.")
        setanswers([]);
        seterror("Sorry could not fetch answer.")
      }

      setloading(false);
    }
    



  const handlesubmit = async(e)=>{
    e.preventDefault();
    console.log("The musgen is: ",musgen)
    const url = 'http://localhost:8000/api/userinput/submit';



    console.log(name,food,season,movgen,musgen,travel,an,sports,ftime,fice,drink);

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(payload),


      });

      if(!response.ok){
        throw new Error ("There is an error in making a post request.");
      }
      const data = await response.json();
      alert("Data submitted successfully.")
      setgenlink(data.link);
      navigate(`/quiz/${data.link}`);
    } catch (error){
      console.log("There is an error",error)
    }

    console.log(genlink)
  }
  return (
    <div>
      <form action="">
        <input type="Text" placeholder='Your Name' required onChange={(e)=>setname(e.target.value)} /><br />
      </form>

      {/* for consize dropdown showing use the printing function reusable component jo bnaya wa  */}
      <Dropdowns label="Favourite Food" options={foodd} setthing={setfood}/><br />
      <Dropdowns label="Favourite Season" options={seasons} setthing={setseason}/><br />
      <Dropdowns label="Favourite Movie Genre" options={moviegenre} setthing={setmovgen}/><br />
      <Dropdowns label="Favourite Music Genre" options={musicgenre} setthing={setmusgen}/><br />
      <Dropdowns label="Favourite Travel Destination" options={traveldestination} setthing={settravel}/><br />
      <Dropdowns label="Favourite Animal" options={animal} setthing={setan}/><br />
      <Dropdowns label="Favourite Sport" options={sport} setthing={setsports}/><br />
      <Dropdowns label="Favourite Time" options={favtime} setthing={setftime}/><br />
      <Dropdowns label="Favourite Ice Cream Falvor" options={icecreamflavor} setthing={setfice}/><br />
      <Dropdowns label="Favourite Cold Drink" options={colddrink} setthing={setdrink}/><br />



      {isformfilled()&&(
        <button type="submit" onClick={handlesubmit}>Submit</button>
      )}


      <button onClick={handleanswers}>Generate Quiz</button>

      {loading && <p>Loading....</p>}

      {genlink&&(
        <div>
          <h2>Share with friends.</h2>
          <a href={`/quiz/${genlink}`} target="_blank">{genlink}</a>
        </div>
      )}


      {error &&
      <p style={{color:'red'}}>
        {error}
        </p>}
    </div>



  )
}

export default Userinput
