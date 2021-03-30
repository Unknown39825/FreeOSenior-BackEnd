import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

const Tables = () => {

   const [Workshop, setWorkshop] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`http://127.0.0.1:8000/api/workshop/${id}`);
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
                const res=await axios.get("http://127.0.0.1:8000/api/workshop");

                if(res.data)
                {
                    setWorkshop(res.data);
                  
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
        window.location.reload();
    }

  return (
    <div className="container">

      <h1>Workshops</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>imglink</th>
      <th>title</th>
      <th>author</th>
      <th>desc</th>
      <th>date</th>
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {Workshop.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td> <img src={event.imglink} height="30px" width="auto" alt=""/> </td> 
        <td>{ event.title}  </td> 
        <td>{ event.author}  </td> 
        <td>{ event.desc}  </td> 
        <td>{ event.date}  </td> 
        
        <td><Link to={{pathname:'/workshop/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/workshop/new'}}>            <Button>Create Workshop</Button>          </Link>
      
    </div>
  );
}

export default Tables;
