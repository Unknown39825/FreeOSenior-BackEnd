import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

const Tables = () => {

   const [Event, setEvent] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`http://127.0.0.1:8000/api/event/${id}`);
      if(res.data)
      {
        window.alert("delted");
        console.log(res.data);
        await setCreated(true);
        
      }
      
    }
    catch(error)
    {
      window.alert("unable to delete");
    }
    
   }
    
     useEffect(() => {
       const dataFetch = async ()=>{
           try{
                const res=await axios.get("http://127.0.0.1:8000/api/event");

                if(res.data)
                {
                    setEvent(res.data);
                  
                }
           }
           catch(error){
               console.log(error);
           }
       }
       dataFetch();

    },[]);
    
     if(created)
    {
        return <Redirect to="/"></Redirect>
    }

  return (
    <div className="container">

      <h1>Events</h1>
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>Image</th>
      <th>Title</th>
      <th>Link</th>
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {Event.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td> <img src={event.img} height="30px" width="auto" alt=""/> </td> 
        <td>{ event.title}  </td> 
        <td>{ event.link}  </td> 
        
        <td><Link to={{pathname:'/workshop/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>
      
    </div>
  );
}

export default Tables;
