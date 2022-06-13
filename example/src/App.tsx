import React from 'react'
import logo from './logo.svg'
import './App.css'
import { Button, Input } from 'fluid'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Input
          label={'Username'}
          description={'Please Input Your Username'}
          errorMessage={'error'}
        />
        <Button>hello</Button>
      </header>
    </div>
  )
}

export default App
