
import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import config from "../config.json"

// import config from "../config.json";
export default function Updatecontributor(props) 
{
    let id=props.match.params.id;
    console.log(id);

    const [contributorPost, setcontributor] = useState({
        name:'',
        count:'',
        image:''
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    const [Data, setData] = useState(undefined);

      useEffect(() => {

       const dataFetch = async ()=>{
           
           try{
                const res=await axios.get(`${config.BASE}/contributor/${id}`);
                // console.log("hello");
                console.log(res.data);
                if(res.data)
                {
                    setcontributor(res.data);
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
        await setcontributor({
            ...contributorPost,
            image:file.secure_url
        })
    }

    const handleChange = (e) => {
        setcontributor({
            ...contributorPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {

        if(id!=="new")
        {
            
            try{

            const res= await axios.put( `${config.BASE}/contributor/${id}` ,contributorPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
            window.alert('contributor Updated');
        }
        else
        {
            console.log("hello");
             try{
            const res= await axios.post(`${config.BASE}/contributor` , contributorPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('contributor created');
        }
        
    }

    const onSubmit =(e) => {
        if(contributorPost.name.trim() !== "" && contributorPost.count.trim!=="" )
        {
            postEvent();
        }
        else
        {
            window.alert("contributor details are  empty");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    console.log(contributorPost);

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded"> { id!=="new" ? ("update"): ("create")  } contributor</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Name Of contributor</b></Form.Label> 
                    <Form.Control className="input" type="text" name="name" value={contributorPost.name} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>contribution count </b></Form.Label>
                <Form.Control className="input"type="text" name="count" value={contributorPost.count} onChange={handleChange}  placeholder="" />
            </Form.Group>

            {/* <Form.Group controlId="">
                <Form.Label><b>contributor link </b></Form.Label>
                <Form.Control className="input" type="textarea" name="link" value={contributorPost.link} onChange={handleChange}  placeholder="" />
            </Form.Group> */}

               <Form.Group controlId="">
                <Form.Label><b>Image Preview</b></Form.Label>
                <br/>
                <img src={contributorPost.image} height="100" width="auto" alt="image preview"/>
            </Form.Group>

            <div className="test">
            <input type="file" name="file" placeholder="upload a image" onChange={uploadImage} />
            <br/>
            <button onClick={Submit}>upload</button> 
            
            </div>
                
            <Button variant="primary" onClick={onSubmit}>{ id!=="new" ? ("update"): ("create")  }</Button>
            
            </Form>
        </div>
        </Container>
    )
}
