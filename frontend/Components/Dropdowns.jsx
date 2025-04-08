import React from 'react'

const Dropdowns = ({label,options,setthing}) => {

  return (
    <div>
      <label>{label}</label>
      <select name="" id="" onChange={(e)=> setthing(e.target.value) }>
        <option value="">Select {label}</option>
        {options.map((lab,index)=>(
            <option key={index} value={lab}>
                {lab}
            </option>
        ))}
      </select>


      


    </div>
  )
}

export default Dropdowns
