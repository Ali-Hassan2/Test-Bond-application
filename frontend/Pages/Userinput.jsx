import {useState,React} from 'react'
import Dropdowns from '../Components/Dropdowns'

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

    const data = [
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
    ]



  const handlesubmit = async(e)=>{
    e.preventDefault();

    const formdata = new FormData();
    // donot repeat yourself.
    for(let key in data){
      formdata.append(key,data[key]);
    }

    const url = 'http://localhost:5000/api/userinput/submit';

    try {

      const response = await fetch(url,{
        formdata,
        method:'POST'
      })

      if(!response.ok){
        throw new Error ("There is an error in making a post request.");
      }
      alert("Data submitted successfully.")
    } catch (error){
      console.log("There is an error",error)
    }
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



    </div>



  )
}

export default Userinput
