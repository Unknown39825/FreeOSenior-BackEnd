import React, { useEffect,useState } from "react";
import axios from "axios";
import BasicCard from "./BasicCard";
import { Col, Container, Row, Spinner } from "react-bootstrap";
// import { Col, Row } from "react-bootstrap";

export default function Events() {

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [bload, setbload] = useState(false);
    
     useEffect(() => {

       const dataFetch = async ()=>{
           try{
                const res=await axios.get("http://127.0.0.1:8000/api/event");

                if(res.data)
                {
                    setBlogs(res.data);
                    setLoading(false);
                }
           }
           catch(error){
               console.log(error);
           }
       }
       dataFetch();

    },[]);

    return(
      <div>
          {loading?
          (
              
            <div>
                 <Spinner animation="grow" role="status" style={{width:"200px",height:'200px'}} as="h1" className="m-5" >
                    <span className="sr-only">Loading...</span>
                </Spinner>

            </div>
          ):

          (
              <div>
                    <Container fluid>

            <h1 className="bg-dark m-2 text-white p-2 rounded">Event Testing</h1>
            
            <Row>
                {blogs ?
                (
                    <>
                    {blogs.map((blog)=>(
                        <Col lg='6' sm='12' >
                        <BasicCard image={blog.img}  title={blog.title} link= {blog.link} />
                        </Col>
                    ))
                    
                    }

                    </>

                ):
                (
                    <>
                        <Col lg='12'>
                       <BasicCard/>
                        </Col>

                    </>
                )
                
            }
            </Row>
        </Container>
              </div>
          )
          
        }
      </div>
    );
        
}