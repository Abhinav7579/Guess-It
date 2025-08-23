import { useNavigate } from "react-router-dom"

const Welcome = () => {
  const navigate=useNavigate();
  return (
    <div className=" h-screen flex justify-center bg-cover "style={{ backgroundImage: "url('/bg.jpg')" }}>
        <audio src="/sound.mp3" autoPlay loop hidden />
      <div className="text-center space-y-4">
        <div>  
    <span className="flex justify-center">
    <img 
      src="/logo.png" 
      alt="Logo" 
      className="w-19 h-20  object-contain mt-8"
    />
    </span>
    <h1 className="text-6xl font-extrabold tracking-tight pt-[-190px]">
        <span className="text-white">Guess</span>{" "}
        <span className="text-red-600">It</span>
        </h1>
        </div>

        <p className="text-xl text-gray-300 font-medium ">
          Be the first to guess the number and win!
        </p>

      
        <button className="bg-blue-700 m-8 cursor-pointer hover:bg-red-700 transition-colors hover:scale-105 px-8 py-3 mt-[180px] rounded-2xl text-white font-semibold shadow-lg" onClick={()=>{navigate("/start")}}>
          Start Game
        </button>
      </div>
    </div>
  )
}

export default Welcome
