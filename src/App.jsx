import { useState } from 'react'
import VoiceNotes from './componend/VoiceNotes'
import './App.css'
import NotesToVoice from './componend/NotestoVoice'

function App() {

  return (
    <>
     <div className='screen'>
      <VoiceNotes/>
      <NotesToVoice/>
     </div>
    </>
  )
}

export default App
