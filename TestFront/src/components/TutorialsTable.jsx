import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json"

const TurtorialTables = () => {

   const [tutorials, settutorials] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`${config.BASE}/tutorial/${id}`);
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
                const res=await axios.get(`${config.BASE}/tutorial`);

                if(res.data)
                {
                    settutorials(res.data);
                  
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

      <h1>tutorials</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>title</th>
      <th>link</th>
      <th>category</th>      
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {tutorials.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td>{ event.title}  </td> 
        <td><iframe width="100" height="auto" src={event.link} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></td> 
        <td>{ event.category}  </td> 
        <td><Link to={{pathname:'/tutorial/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/tutorial/new'}}>            <Button>Create tutorials</Button>          </Link>
      
    </div>
  );
}

export default TurtorialTables;
