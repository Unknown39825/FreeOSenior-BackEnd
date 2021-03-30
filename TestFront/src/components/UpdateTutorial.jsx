
import axios from 'axios';
import React, {  useState ,useEffect} from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';

// import config from "../config.json";
export default function Updatetutorial(props) 
{
    let id=props.match.params.id;
    console.log(id);

    const [tutorialPost, settutorial] = useState({
        title:'',
        link:'',
        category:'',
    });

    const [created, setCreated] = useState(false);

    // const [url, setUrl] = useState("helo");
    // const [Data, setData] = useState(undefined);

      useEffect(() => {

       const dataFetch = async ()=>{
           
           try{
                const res=await axios.get(`http://127.0.0.1:8000/api/tutorial/${id}`);
                // console.log("hello");
                console.log(res.data);
                if(res.data)
                {
                    settutorial(res.data);
                }
           }
           catch(error){
               console.log(error);
           }
       }
       if(id!=="new")
       dataFetch();

    },[]);

    // const uploadImage = async event=>{
    //     const files = event.target.files;
    //     await setData(files[0]);
    // }

    // const Submit = async (event)=>{
    //     event.preventDefault();
    //     const data = new FormData();
    //     await data.append('file',Data);
    //     data.append('upload_preset','unknown39825');
    //     const res = await fetch("https://api.cloudinary.com/v1_1/dvhrzmkwd/image/upload",
    //     {
    //         method: 'POST',
    //         body:data
    //     });
    //     const file = await res.json();
    //     // await setUrl(file.secure_url);
    //     await settutorial({
    //         ...tutorialPost,
    //         imglink:file.secure_url
    //     })
    // }

    const handleChange = (e) => {
        settutorial({
            ...tutorialPost,
            [e.target.name]: e.target.value
        })
    }

    const postEvent =async() => {

        if(id!=="new")
        {
            
            try{

            const res= await axios.put( `http://127.0.0.1:8000/api/tutorial/${id}` ,tutorialPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('tutorial Updated');
        }
        else
        {
             try{
            const res= await axios.post( "http://127.0.0.1:8000/api/tutorial" , tutorialPost  );
            console.log(res.data);
            setCreated(true);
        }catch(err){
            console.log(err);
        }
        window.alert('Tutorial created');
        }
        
    }

    const onSubmit =(e) => {
        if(tutorialPost.title.trim() !== ""    &&tutorialPost.category.trim() !== "" &&tutorialPost.link.trim() !== "" )
        {
            postEvent();
        }
        else
        {
            window.alert("tutorial details are  empty");
        }
    }

    if(created)
    {
        return <Redirect to="/"></Redirect>
    }

    console.log(tutorialPost);

    return (
        <Container>
            <div>
             <h1 className="bg-dark m-2 text-white p-2 rounded"> { id!=="new" ? ("update"): ("create")  } tutorial</h1>
             <Form className="text-left m-2 p-5 text-white bg-dark rounded mt-5">

                 <Form.Group controlId="">
                <Form.Label><b>Title of tutorial</b></Form.Label> 
                    <Form.Control className="input" type="text" name="title" value={tutorialPost.title} onChange={handleChange} placeholder="" />
                </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>tutorial category</b></Form.Label>
                <Form.Control className="input"type="text" name="category" value={tutorialPost.category} onChange={handleChange}  placeholder="" />
            </Form.Group>

            <Form.Group controlId="">
                <Form.Label><b>tutorial link </b></Form.Label>
                <Form.Control className="input" type="textarea" name="link" value={tutorialPost.link} onChange={handleChange}  placeholder="" />
            </Form.Group>

              {/* <Form.Group controlId="">
                <Form.Label><b>Image Preview</b></Form.Label>
                <br/>
                <img src={tutorialPost.imglink} height="100" width="auto" alt="image preview"/>
            </Form.Group>

            <div className="test">
            <input type="file" name="file" placeholder="upload a image" onChange={uploadImage} />
            <br/>
            <button onClick={Submit}>upload</button> */}
            
            {/* </div> */}
                
            <Button variant="primary" onClick={onSubmit}>{ id!=="new" ? ("update"): ("create")  }</Button>
            
            </Form>
        </div>
        </Container>
    )
}
