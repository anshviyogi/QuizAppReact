import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container,Form } from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
function AddQuestionPage() {
  const navigate = useNavigate()

  const[optionData,setOptionData] = useState('')
  const[question,setQuestion] = useState('')
  const[point,setPoint] = useState('')
  const[shortAnswer,setShortAnswer] = useState('')

  // Option managing states
  const[option1,setOption1] = useState('')
  const[option2,setOption2] = useState('')
  const[option3,setOption3] = useState('')
  const[option4,setOption4] = useState('')

  const[correctAnswer,setCorrectAnswer] = useState('')

  // Data to be saved in MongoDb Database
  const mcqData = {
    question:question,
    questionPoint:point,
    questionType:optionData,
      option1:option1,
      option2:option2,
      option3:option3,
      option4:option4,
    correctAnswer:correctAnswer
  }

  const shortAnswerData = {
    question:question,
    questionPoint:point,
    questionType:optionData,
    correctAnswer:shortAnswer,
      option1:option1,
      option2:option2,
      option3:option3,
      option4:option4
  }

// Handling correct answer


  function MCQHandler(e){
    e.preventDefault()

    // Sending data to server
    axios.post('http://localhost:4000/data',mcqData)

    alert("Data Saved Successfully")
    setOption1('')
    setOption2('')
    setOption3('')
    setOption4('')
    setPoint('')
    setQuestion('')
  }

  function shortAnswerHandler(e){
    e.preventDefault()

    // Sending data to server
    axios.post('http://localhost:4000/data',shortAnswerData)


    alert("Data Saved Successfully")
    setPoint('')
    setShortAnswer('')
    setQuestion('')
  }


  
  return (
    <div>
        <h1 style={{marginLeft:"130px",marginBottom:"20px"}}>Add Questions</h1>

      {/* Question Container */}
        <div className='question-main-div'>
            <Container>
            <Form>

              {/* Question TextField */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Question</Form.Label>
        <Form.Control type="text" name='question' value={question} placeholder="Type your question here" onChange={e => setQuestion(e.target.value)}/>
      </Form.Group>

<div className='row'>
  <div className='col-sm-6'>
    {/* Question Type Dropdown */}

      <Form.Label>Question Type</Form.Label>
      <Form.Select name='option' aria-label="Default select example" onChange={(e) => setOptionData(e.target.value)}>
      <option>Select the question type</option>
      <option>MCQ</option>
      <option>Short Answer</option>
    </Form.Select>
    </div>

    <div className='col-sm-6'>
      {/* Question points containing textfield */}
    <Form.Label>Points</Form.Label>
    <Form.Control
          placeholder="Point for the question"
          aria-label="Username"
          aria-describedby="basic-addon1"
          name='points'
          value={point}
          onChange={e => setPoint(e.target.value)}
        />
    </div>
    </div>

{/* Conditional Statement of question type dropdown*/}

{/* Radio Button Selection */}
    {optionData === "MCQ" && (
      <>
      <br/>
      
      {/* All options with the state management */}

      <input placeholder='Option 1' value={option1} onChange={e => setOption1(e.target.value)} style={{border:"1px solid",borderRadius:"5px",marginRight:"18px"}}/>
      
      <input placeholder='Option 2' value={option2} onChange={e => setOption2(e.target.value)} style={{border:"1px solid",borderRadius:"5px",marginRight:"18px"}}/>

      <input placeholder='Option 3' value={option3} onChange={e => setOption3(e.target.value)} style={{border:"1px solid",borderRadius:"5px",marginRight:"18px"}}/>

      <input placeholder='Option 4' value={option4} onChange={e => setOption4(e.target.value)} style={{border:"1px solid",borderRadius:"5px",marginRight:"18px"}}/>



      <select style={{border:"1px solid",borderRadius:"15px"}} onChange={e => setCorrectAnswer(e.target.value)}>
        <option>Choose correct Answer</option>
        <option >{option1}</option>
        <option >{option2}</option>
        <option >{option3}</option>
        <option >{option4}</option>
      </select>
      </>
    )}

{/* Answer type selection */}

    {optionData === "Short Answer" && (
      <>
      <Form.Label>
          Type the answer for your question here
        </Form.Label>

        <Form.Control
          placeholder="Type the answer here"
          onChange={e => setShortAnswer(e.target.value)}
          value={shortAnswer}
        />
      </>
    )}

{/* For MCQ */}
    {
      optionData === "MCQ" && (
        <>
<div className="d-grid gap-2">
      <Button variant="primary" size="md" onClick={MCQHandler}>
        Add MCQ Question
      </Button>
    </div>
    </>
      )
    }

    {/* For Short answer */}
    <br/>
    {
      optionData === "Short Answer" && (
        <>
<div className="d-grid gap-2">
      <Button variant="primary" size="md" onClick={shortAnswerHandler}>
        Add Short Questions
      </Button>
    </div>
    </>
      )
    }
    </Form>
          </Container>
        </div>
    </div>
  )
}

export default AddQuestionPage