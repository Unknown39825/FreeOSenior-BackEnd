import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import config from "../config.json"
const HomeCardTables = () => {

   const [HomeCard, setHomeCard] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`${config.BASE}/homecard/${id}`);
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
                const res=await axios.get(`${config.BASE}/homecard`);

                if(res.data)
                {
                    setHomeCard(res.data);
                  
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

      <h1>HomeCards</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>imglink</th>
      <th>title</th>
      <th>seemore</th>
      <th>desc</th>
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {HomeCard.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td> <img src={event.imglink} height="30px" width="auto" alt=""/> </td> 
        <td>{ event.title}  </td> 
        <td>{ event.seemore}  </td> 
        <td>{ event.desc}  </td> 
        
        <td><Link to={{pathname:'/homecard/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/homecard/new'}}>            <Button>Create HomeCard</Button>          </Link>
      
    </div>
  );
}

export default HomeCardTables;
