
import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

// import config from "../config.json";
export default function UpdateWorkshop(props) {
    let id=props.match.params.id;
    console.log(id);
    const [EventPost, setEvent] = useState({
        imglink:'',
        title:'',
        dlink:'',
        desc:'',
        sem:''
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    const [Data, setData] = useState(undefined);

     useEffect(() => {

       const dataFetch = async ()=>{
           
           try{
                const res=await axios.get(`${config.BASE}/projectcard/${id}`);
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
       if(id!="new")
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

            const res= await axios.put( `${config.BASE}/projectcard/${id}` ,EventPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('project Updated');
        }
        else
        {
            console.log("create api called");
             try{
            const res= await axios.post( `${config.BASE}/projectcard` , EventPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Project created');
        }
        
    }

    const onSubmit =(e) => {

        if(EventPost.title.trim() !== ""  && EventPost.desc.trim() !== ""  && EventPost.dlink.trim() !== ""  )
        {
            if(Number.isInteger(Number.parseInt(EventPost.sem)))
            postEvent();
            else
            {
                window.alert("not numeric sem");
            }
            
        }
        else
        {
            window.alert("Project details are  empty");
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
             <h1 className="bg-dark m-2 text-white p-2 rounded">{ id!=="new" ? ("update"): ("create")  } Project Card</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Title of Project</b></Form.Label> 
                    <Form.Control className="input" type="text" name="title" value={EventPost.title} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Project DriveLink</b></Form.Label>
                <Form.Control className="input"type="text" name="dlink" value={EventPost.dlink} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Project descriptin </b></Form.Label>
                <Form.Control className="input" type="textarea" name="desc" value={EventPost.desc} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>project Sem </b></Form.Label>
                <Form.Control className="input" type="test" name="sem" value={EventPost.sem} onChange={handleChange}  placeholder="" />
            </Form.Group>

             <Form.Group controlId="">
                <Form.Label><b>Image Preview</b></Form.Label>
                <br/>
                <img src={EventPost.imglink} height="100" width="auto" alt={EventPost.imglink}/>
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
