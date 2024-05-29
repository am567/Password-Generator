import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // the first state will decide the length of the password by default you can assign any value
  // is number allowed in password by default not allowed
  // are characters allowed in password by default not allowed 
  // firstly password should be empty
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [characterAllowed, setCharacterAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const generatePassword = useCallback(() => {      // we will be using this to generate our password . memoization and re-rendering is done by react itself...

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"  // it  is our default value 

    if (numberAllowed) str += "0123456789"            // if check on the box then append it 
    if (characterAllowed) str += "!@#$%^&*()_+"          // if check on the box then append it


    for (let i = 1; i < length; i++) {    // we run this loop gor generating random passwords of the size of length

      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)

    }

    setPassword(pass)

  }, [length, numberAllowed, characterAllowed])  // these are the dependencies when there is change in length or some thing it will update but frequently using again and again can burst the code..   

  useEffect(() => {

    generatePassword()

  }, [length, numberAllowed, characterAllowed]) // here if there is change in any one of them the page loads and 100% updation ..


  const copyPasswordToClipboard = () => {

    window.navigator.clipboard.writeText(password)   // basically this we have used to copy the password from the clipboard 
    passwordRef.current.select()

  }


  return (
    <div className='w-full max-w-md mx-auto shadow-md px-4 py-3 my-8 bg-gray-800 rounded-lg text-orange-500 '>

      <h1 className='text-white text-center my-3'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>

        <input                                                 // it is for the text 
          type='text'
          className='outline-none w-full py-1 px-3'
          value={password}
          placeholder='password'
          readOnly
          ref={passwordRef}          // once we have used this whereever there is input it will copy it it will show sign

        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none text-white bg-blue-700 px-3 py-0.5 shrink-1'>
          Copy
        </button>

      </div>
      <div className='flex text-sm gap-x-2'>

        <div className='flex items-center gap-x-1'>

          <input

            type='range'   // basically it is for sliding purpose that we can decide the range of password 
            value={length}
            min={6}
            max={100}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}   // it's an event (where setLength regulates the length of the data based on the event )
            name=''
            id=''

          />
          <label htmlFor="length">Length: {length}</label>

        </div>

        <div className='flex items-center gap-x-1'>

          <input

            type="checkbox"
            name=""
            id=""
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)      // using callback here we are checking the prev value and if you check the box it will reverse the value 
            }}

          />
          <label htmlFor="number">Number</label>

        </div>

        <div className='flex items-center gap-x-1'>

          <input

            type="checkbox"
            name=""
            id=""
            defaultChecked={characterAllowed}
            onChange={() => {
              setCharacterAllowed((prev) => !prev)
            }}

          />
          <label htmlFor="character">Character</label>

        </div>

      </div>

    </div>
  )
}

export default App


// so for this project we will be needing some states for updating the things..
