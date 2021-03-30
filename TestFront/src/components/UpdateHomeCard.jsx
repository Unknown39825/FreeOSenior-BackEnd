
import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

// import config from "../config.json";
export default function UpdateHomecard(props) 
{
    let id=props.match.params.id;

    const [HomecardPost, setHomecard] = useState({
        imglink:'',
        title:'',
        seemore:'',
        desc:'',
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    const [Data, setData] = useState(undefined);

      useEffect(() => {

       const dataFetch = async ()=>{
           
           try{
                const res=await axios.get(`${config.BASE}/homecard/${id}`);
                // console.log("hello");
                console.log(res.data);
                if(res.data)
                {
                    setHomecard(res.data);
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
        await setHomecard({
            ...HomecardPost,
            imglink:file.secure_url
        })
    }

    const handleChange = (e) => {
        setHomecard({
            ...HomecardPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {
        
        if(id!=="new")
        {
            try{
            const res= await axios.put( `${config.BASE}/homecard/${id}` ,HomecardPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Homecard Updted');

        }
        else
        {
            try{
            const res= await axios.post( `${config.BASE}/homecard` ,HomecardPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Homecard created');
        }
        
    }

    const onSubmit =(e) => {
        if(HomecardPost.imglink.trim() !== ""  &&HomecardPost.title.trim() !== ""  &&HomecardPost.desc.trim() !== "" &&HomecardPost.seemore.trim() !== "" )
        {
            postEvent();
        }
        else
        {
            window.alert("Homecard details are  empty");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    console.log(HomecardPost);

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded">{ id!=="new" ? ("update"): ("create")  } Homecard</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Title of Homecard</b></Form.Label> 
                    <Form.Control className="input" type="text" name="title" value={HomecardPost.title} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Homecard seemore link</b></Form.Label>
                <Form.Control className="input"type="text" name="seemore" value={HomecardPost.seemore} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>Homecard description </b></Form.Label>
                <Form.Control className="input" type="textarea" name="desc" value={HomecardPost.desc} onChange={handleChange}  placeholder="" />
            </Form.Group>

              <Form.Group controlId="">
                <Form.Label><b>Image Preview</b></Form.Label>
                <br/>
                <img src={HomecardPost.imglink} height="100" width="auto" alt={HomecardPost.title}/>
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
