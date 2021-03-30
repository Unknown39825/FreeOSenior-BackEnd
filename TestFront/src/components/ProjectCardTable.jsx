import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json"

const ProjectCardTables = () => {

   const [projectCard, setprojectCard] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`${config.BASE}/projectcard/${id}`);
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
                const res=await axios.get(`${config.BASE}/projectcard`);

                if(res.data)
                {
                    setprojectCard(res.data);
                  
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

      <h1>projectCard</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>title</th>
      <th>desc</th>
      <th>drivelink</th>
      <th>semester</th>
      <th>image link</th>
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {projectCard.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td>{ event.title}  </td> 
        <td>{ event.desc}  </td> 
        <td>{ event.dlink.slice(0,20)+"...."}  </td> 
        <td>{ event.sem}  </td> 
        <td> <img src={event.imglink} height="30px" width="auto" alt=""/> </td> 
        <td><Link to={{pathname:'/projectCard/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/projectCard/new'}}>            <Button>Create projectCard</Button>          </Link>
      
    </div>
  );
}

export default ProjectCardTables;
