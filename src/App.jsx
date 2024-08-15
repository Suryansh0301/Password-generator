import { useCallback, useEffect, useRef, useState } from "react"

export default function App() {
  const [length,setLength]=useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState("hello")
  const [isActive, setIsActive] = useState(false);

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+='!@#$%^&*()_{}[]~"'

    for (let i = 1; i <= length; i++) {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      
    }

    setPassword(pass);

  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,30);
    window.navigator.clipboard.writeText(password)
  },[password])


  return (
    
      <div className=" flex flex-wrap w-full max-w-xl justify-center rounded-xl mx-auto shadow-lg shadow-teal-900 px-4 py-2 my-8"style={{backgroundColor : '#49BEB7'}}>
        <h1 className="text-3xl  text-center my-3"style={{color : '#F1F1F1'}}>Password Generator</h1>
        <div className="flex flex-wrap justify-center">
          <input type="text" readOnly  ref={passwordRef} value={password}
           className="w-96 rounded-l-lg p-1 font-bold "style={{color : '#085F63' , backgroundColor : '#F1F1F1'}}/>
           <button
      onClick={copyPasswordToClipboard}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      onMouseLeave={() => setIsActive(false)}
      className="rounded-r-lg py-1 px-2 mr-3 font-bold"
      style={{
        color: isActive ? '#FFFFFF' : '#F1F1F1',
        backgroundColor: isActive ? '#003F46' : '#085F63',
      }}
    >
      Copy
    </button>
        </div>
        <div className="flex my-2 px-2">
          <div className="">
            <input onChange={(e)=>{setLength(e.target.value)}} type="range" min={6} max={30} className="cursor-pointer" style={{ accentColor : '#085F63'}} />
            <label className="font-bold m-2 "style={{color : '#085F63'}}>Length : {length}</label>
          </div>
          <div>
            <input onChange={()=>{setNumberAllowed((prev)=>!prev)}} type="checkbox" defaultChecked={numberAllowed} className="m-1 cursor-pointer"  style={{ accentColor : '#085F63'}}/>
            <label className='font-bold' style={{color : '#F1F1F1'}}>Numbers</label>
          </div>
          <div>
            <input onChange={()=>{setCharAllowed((prev)=>!prev)}} type="checkbox" defaultChecked={charAllowed} className="m-1 cursor-pointer"  style={{ accentColor : '#085F63'}}/>
            <label className='font-bold' style={{color : '#F1F1F1'}}>Characters</label>
          </div>
        </div>
        
      
      </div>
    
  )
}