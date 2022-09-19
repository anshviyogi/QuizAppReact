import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import './PlayQuiz.css'

function PlayQuiz() {
    const[data,setData] = useState([])
    const[questionNumber,setQuestionNumber] = useState(0)
    const[number,setNumber] = useState([])
    const[inputAnswer,setInputAnswer] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:4000/allData')
    .then(response =>{
      setData(response.data[questionNumber])
      setNumber(response.data)
    })
    .catch(err => console.log(err))
  },[questionNumber])


  function optionButtonHandler(e){
    setQuestionNumber(questionNumber + 1)

    // For database
    const optionAnswer = {
      question: data.question,
      correctAnswer: e.target.innerHTML
    }
    axios.post('http://localhost:4000/send',optionAnswer)
      .catch(err => console.log(err))

  }

  // Saving short answer data
  function shortAnswerButtonHandler(){
    setQuestionNumber(questionNumber + 1)
    const shortAnswer = {
      question:data.question,
      correctAnswer:"",
      inputAnswer:inputAnswer 
    }

    axios.post('http://localhost:4000/send',shortAnswer)
      .catch(err => console.log(err))

      setQuestionNumber(0)

  }

  // No Question yet
  if(number.length === 0){
    return <h1 style={{textAlign:"center",color:"red"}}>Kindly contact admin to add some question for beginning this quiz</h1>
  }

  // If all the tasks are completed
  if(number.length === questionNumber){
    return(
      <div style={{textAlign:"center"}}>
      <h1>Congratulations !! </h1>
      <h3>You've successfully completed the Quiz</h3>
      <h4>Your Record has been saved</h4>
      </div>
    )
  }

  return(
    <>
    
    <div className='header' style={{backgroundColor:"rgb(94,79,196)"}}>
        <h1 style={{color:"white",textAlign:"center",padding:"10px"}}>Play Quiz</h1>
    </div>

    {/* For Short Answer type question */}

    {
      data.option1 === "" && (
        <Container>
        <h1 style={{fontSize:"22px"}}><span style={{fontSize:"24px"}}>Question{questionNumber + 1}:</span> {data.question}</h1>

        <Form.Control type="text" placeholder='Type your answer here' value={inputAnswer} onChange={e => setInputAnswer(e.target.value)} style={{marginBottom:"10px"}}/>

        <div className="d-grid gap-2">
        <Button onClick={shortAnswerButtonHandler}>Next</Button>
        </div>

        </Container>
      )
    }

{/* For MCQ Type Question */}
    {
      data.option1 !== "" && (
        <Container>
        <h1 style={{textAlign:"center",fontSize:"22px"}}><span style={{fontSize:"24px"}}>Question {questionNumber + 1}:</span> {data.question}</h1>

        <div className="d-grid gap-2">

      <Button variant="secondary" size="md" onClick={optionButtonHandler}>
        {data.option1}
      </Button>

      <Button variant="secondary" size="md" onClick={optionButtonHandler}>
        {data.option2}
      </Button>

      <Button variant="secondary" size="md" onClick={optionButtonHandler}>
        {data.option3}
      </Button>

      <Button variant="secondary" size="md" onClick={optionButtonHandler}>
        {data.option4}
      </Button>

        </div>

        </Container>
      )
    }
    </>
  )
}

export default PlayQuiz