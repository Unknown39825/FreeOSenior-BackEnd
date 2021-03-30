
import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

// import config from "../config.json";
export default function UpdateWorkshop(props) {
    let id=props.match.params.id;
    const [EventPost, setEvent] = useState({
        imglink:'',
        title:'',
        author:'',
        desc:'',
        date:''
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    const [Data, setData] = useState(undefined);

     useEffect(() => {

       const dataFetch = async ()=>{
           
           try{
                const res=await axios.get(`${config.BASE}/workshop/${id}`);
                // console.log("hello");
                console.log(res.data);
                if(res.data)
                {
                    setEvent(res.data);
                }
           }
           catch(error){
               console.log(error);
           }
       }
       if(id!=="new")
       dataFetch();

    },[]);

    const uploadImage = async event=>{
        const files = event.target.files;
        await setData(files[0]);
    }

    const Submit = async (event)=>{
        event.preventDefault();
        const data = new FormData();
        await data.append('file',Data);
        data.append('upload_preset','unknown39825');
        const res = await fetch("https://api.cloudinary.com/v1_1/dvhrzmkwd/image/upload",
        {
            method: 'POST',
            body:data
        });
        const file = await res.json();
        // await setUrl(file.secure_url);
        await setEvent({
            ...EventPost,
            imglink:file.secure_url
        })
    }

    const handleChange = (e) => {
        setEvent({
            ...EventPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {
          if(id!=="new")
        {
            
            try{

            const res= await axios.put( `${config.BASE}/workshop/${id}` ,EventPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Workshop Updated');
        }
        else
        {
            console.log("create api called");
             try{
            const res= await axios.post( `${config.BASE}/workshop` , EventPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Workshop  created');
        }
        
    }

    const onSubmit =(e) => {
        if(EventPost.author.trim() !== ""  && EventPost.title.trim() !== ""  && EventPost.desc.trim() !== "" && EventPost.date.trim() !== "" )
        {
            postEvent();
        }
        else
        {
            window.alert("Workshop details are  empty");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    console.log(EventPost);

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded">{ id!=="new" ? ("update"): ("create")  } Workshop</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Title of Workshop</b></Form.Label> 
                    <Form.Control className="input" type="text" name="title" value={EventPost.title} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Event author</b></Form.Label>
                <Form.Control className="input"type="text" name="author" value={EventPost.author} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Event descriptin </b></Form.Label>
                <Form.Control className="input" type="textarea" name="desc" value={EventPost.desc} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Event descriptin </b></Form.Label>
                <Form.Control className="input" type="date" name="date" value={EventPost.date} onChange={handleChange}  placeholder="" />
            </Form.Group>

             <Form.Group controlId="">
                <Form.Label><b>Image Preview</b></Form.Label>
                <br/>
                <img src={EventPost.imglink} height="100" width="auto" alt={EventPost.title}/>
            </Form.Group>

            <div className="test">
            <input type="file" name="file" placeholder="upload a image" onChange={uploadImage} />
            <br/>
            <button onClick={Submit}>upload</button>
            
            </div>
                
            <Button variant="primary" onClick={onSubmit}>{ id!=="new" ? ("update"): ("create")  } </Button>
            
            </Form>
        </div>
        </Container>
    )
}
