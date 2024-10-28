import { useState, useCallback, useEffect, useRef } from 'react'


function App() {

  const [length, setLength] = useState(8)
  const [number, setNumber] = useState(false)
  const [character, setCharacter] = useState(false)
  const [password, setPassword] = useState("")
  const copyPassword = useRef(null)
  const copypasswordToClipboard = () => {
    copyPassword.current?.select()
    //copyPassword.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

    if (number) str += " 1234567890"
    if (character) str += "!@#$%^&*()_[]{};:"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, number, character])
  useEffect(() => {
    passwordGenerator()
  }, [length, number, character])
  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">

      <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input type="text"
          placeholder='Password'
          value={password}
          className="outline-none w-full py-1 px-3"
          readOnly
          ref={copyPassword}
        />
        <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copypasswordToClipboard}
        >Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }}
          />
          <label htmlFor="">Length:{length}</label>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              id='number'
              className='cursor-pointer'
              defaultChecked={number}
              onChange={() => {
                setNumber((prev) => !prev)
              }}
            />
            <label htmlFor="number" className='cursor-pointer'>Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
              id='character'
              className='cursor-pointer'
              defaultChecked={character}
              onChange={() => {
                setCharacter((prev) => !prev)
              }}
            />
            <label htmlFor="character" className='cursor-pointer'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
