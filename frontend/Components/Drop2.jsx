import React from 'react'

function Drop2({ options, onSelect, action }) {
    return (
      <div className="text-center">
        <div className="grid grid-cols-2 gap-6">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition duration-300"
              onClick={() => onSelect(opt.text)}
            >
              <img
                src={opt.img}
                alt={opt.text}
                className="w-32 h-32 object-cover border rounded-md"
               onClick={action} />
              <p className="mt-3 font-medium text-center text-lg">{opt.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Drop2
