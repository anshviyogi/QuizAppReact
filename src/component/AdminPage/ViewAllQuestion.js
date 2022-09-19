import axios, { Axios } from 'axios';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'

const ViewAllQuestion = () => {

const[data,setData] = useState([])
const[order,setOrder] = useState("ASC")
const[deleteId,setDeleteId] = useState('')

// Navigate
const navigate = useNavigate()

// Fetching data from mongodb
  useEffect(()=>{
    axios.get('http://localhost:4000/allData')
      .then(response =>{
        // console.log(response)
        setData(response.data)
      })
      .catch(err => console.log(err))
  },[data])

  // Sorting table data
  const sorting = (col)=>{
    if(order === "ASC"){
        const sorted = [...data].sort((a,b)=> a[col].toLowerCase() > b[col].toLowerCase() ? 1:-1)

        setData(sorted)
        setOrder("DSC")
    }
    if(order === "DSC"){
        const sorted = [...data].sort((a,b)=> a[col].toLowerCase() < b[col].toLowerCase() ? 1:-1)

        setData(sorted)
        setOrder("ASC")
    }
  }

  function deleteHandler(id){
    axios.delete(`http://localhost:4000/delete/${id}`)
  }

   return (
    <>
    <h1 style={{textAlign:"center"}}>Questions Data</h1>
    <Table striped bordered hover>
    <thead>
      <tr>
        <th onClick={()=>sorting("question")}>Question</th>
        <th onClick={()=>sorting("questionType")}>Question Type</th>
        <th onClick={()=>sorting("points")}>Point</th>
        <th onClick={()=>sorting("option1")}>Option 1</th>
        <th onClick={()=>sorting("option2")}>Option 2</th>
        <th onClick={()=>sorting("option3")}>Option 3</th>
        <th onClick={()=>sorting("option4")}>Option 4</th>
        <th onClick={()=>sorting("correctAnswer")}>Correct Option</th>
      </tr>
    </thead>

    <tbody>
      {
        data.map(dataList =>{
            return(
                <tr>
                    <td>{dataList.question}</td>
                    <td>{dataList.questionType}</td>
                    <td>{dataList.points}</td>
                    <td>{dataList.option1}</td>
                    <td>{dataList.option2}</td>
                    <td>{dataList.option3}</td>
                    <td>{dataList.option4}</td>
                    <td>{dataList.correctAnswer}</td>
                    <td><a style={{cursor:"pointer",backgroundColor:"red",color:"white",padding:"2px",borderRadius:"5px"}} onClick={()=> deleteHandler(dataList._id)}>Delete</a></td>
                </tr>
            )
        })
      }
    </tbody>
  </Table>
  </>
   );
};

export default ViewAllQuestion