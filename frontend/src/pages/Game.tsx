import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ws = new WebSocket("ws://localhost:8080");

const Game = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const[wait,iswait]=useState(false);
  const[secret,setsecret]= useState<number | null>(null);
  const [start, isStart]=useState(false);

  return (
    <div>
    <div className="bg-green-900 text-white h-screen  p-6" style={{ backgroundImage: "url('/bg.jpg')" }}>
        <div className="flex flex-col items-center">
      <div className="bg-white w-[200px] h-[40px] rounded-2xl flex text-black items-center justify-center m-2 text-xl font-bold">
        Room Id : {roomId}
      </div>
        
        {wait && <div className="text-white text-xl font-bold text-center mt-10 animate-bounce">
      ⚡ Waiting for other player to join
      <span className="animate-pulse text-yellow-200 "> ...</span>
   
      </div>
      }
       {start && <div className="text-white text-xl font-bold text-center mt-10 animate-bounce">
      ⚡ your secret number is 
      <span className="animate-pulse text-yellow-500 "> {secret}</span><br/>
         <span className="text-white text-sm"> !!!(Player-2 has to guess {secret} to win)!!!</span>
      </div>
      }
      </div>

        <div className="mt-[70px] flex justify-evenly ">
            <div>
            <div className="w-[160px] h-[160px] lg:ml-[80px] lg:w-[300px] lg:h-[300px] ">
                <img src="/ph1.jpg" alt="image" className="rounded-3xl"/>
                <span className="text-xl font-bold text-white p-2 m-2">Player 1</span>
            </div>
                {!wait && !start && 
                <div className="mt-[80px] lg:ml-[90px] lg:mt-[120px] bg-blue-700 p-2 rounded-2xl">
                    <span className="font-bold lg:text-xl">choose a number(1-100)</span><br/>
                    <input type="number"  min={1}
                     max={100} className="bg-white rounded-2xl w-[100px] text-black p-1 pl-3" onChange={(e)=>{setsecret(Number(e.target.value))}} required></input>
                    <button  disabled={!secret || secret < 1 || secret > 100} className="bg-green-500 font-bold  m-1 p-1 rounded-xl cursor-pointer hover:bg-red-600" onClick={()=>{isStart(true)}}>Start</button>
                </div>
}
            
            </div>
            {wait ? (
          <div className="w-[160px] h-[160px] lg:ml-[80px] lg:w-[300px] lg:h-[400px]">
            <img src="/wait.jpg" alt="waiting" className="rounded-3xl h-[200px] lg:h-[360px]" />
            <span className="block text-xl font-bold text-white p-2">Player 2</span>
          </div>
        ) : (
           <div className="w-[160px] h-[160px] lg:ml-[80px] lg:w-[300px] lg:h-[300px] ">
                <img src="/ph2.jpg" alt="image" className="rounded-3xl h-[200px] w-[270px] lg:w-[280px] lg:h-[360px]"/>
                <span className="text-xl font-bold text-white p-2 m-2">Player-2</span>
            </div>
        )}
        
        </div>
      
    </div>
    
    </div>
  );
};

export default Game;
