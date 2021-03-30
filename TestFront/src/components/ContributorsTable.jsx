import React, { useEffect,useState } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";

const ContributorTables = () => {

   const [contributors, setcontributors] = useState([]);
   const [created, setCreated] = useState(false);

   const DeleteEvent = async(event) =>{
     let id= event.target.value;
    //  console.log(event.target.value);
    try{
      const res = await axios.delete(`http://127.0.0.1:8000/api/contributor/${id}`);
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
                const res=await axios.get("http://127.0.0.1:8000/api/contributor");

                if(res.data)
                {
                    setcontributors(res.data);
                  
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

      <h1>contributors</h1> 
      
      <Table striped bordered hover>
  <thead>
    <tr>
      
      <th>id</th>
      <th>name</th>
      <th>image</th>
      <th>count</th>
      <th>update</th>
      <th>delete</th>
    </tr>
  </thead>
  <tbody>
    {contributors.map((event)=>{
      return (<tr>
        <td>{event._id}</td>
        <td>{ event.name}  </td> 
        <td> <img src={event.image}  width="50px" height="auto" alt=""/> </td> 
        <td>{ event.count}  </td> 
        <td><Link to={{pathname:'/contributor/'+event._id}}>            <Button>update</Button>          </Link></td>
        <td><Button onClick={DeleteEvent} value={event._id}> Delete </Button> </td>
      </tr>)
      
    })

    }
  </tbody>
</Table>

    <Link to={{pathname:'/contributor/new'}}>            <Button>Create contributors</Button>          </Link>
      
    </div>
  );
}

export default ContributorTables;
