import { useState } from "react";

const Start = () => {
    const [showInput, setShowInput] = useState(false);
  return (
    <div className=" h-screen bg-cover  relative flex flex-col  "style={{ backgroundImage: "url('/bg.jpg')" }}>
        {/* <audio src="/sound.mp3" autoPlay loop hidden /> */}
    <div>
        <h1 className="text-4xl p-1 font-extrabold tracking-tight pt-[-190px]">
        <span className="text-white">Guess</span>{" "}
        <span className="text-red-600">It</span>
        </h1>
    </div>
     <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-red-700 text-xl flex items-center justify-center text-white font-bold w-[200px] h-[70px] rounded-2xl hover:scale-105 cursor-pointer hover:bg-red-900 transition">
          Create a Room
        </div>
        <div className="bg-blue-700 text-xl m-8 flex items-center justify-center text-white font-bold w-[200px] h-[70px] rounded-2xl hover:scale-105 cursor-pointer hover:bg-blue-900 transition"
        onClick={() => setShowInput(true)}>
          Join a Room
        </div>
        { showInput && 
        <div>
            <input className="text-black  p-2  bg-white" type="text" placeholder="enter room id" ></input>
            <button className="bg-blue-700 p-2 cursor-pointer hover:bg-red-500 text-white font-bold m-1">join</button>
        </div>
}
      </div>

    </div>
  )
}

export default Start
