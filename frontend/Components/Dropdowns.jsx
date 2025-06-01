const Dropdowns = ({ label, options, setthing }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl border-2 border-black font-semibold mb-4">{label}</h2>
      <div className="grid grid-cols-2 gap-6">
        {options.map((opt, i) => (
          <div
            key={i}
            onClick={() => setthing(opt.text)}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md cursor-pointer hover:scale-105 transition duration-300"
          >
            <img
              src={opt.img}
              alt={opt.text}
              className="w-32 h-32 object-cover border rounded-md"
            />
            <p className="mt-3 font-medium text-center text-lg">{opt.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdowns