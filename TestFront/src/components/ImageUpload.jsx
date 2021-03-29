import React, { useState } from 'react'

export default function ImageUpload() {
    
    // use this url in the body and then send in the request.
    const [url, setUrl] = useState("");
    const [Data, setData] = useState(undefined);

    const uploadImage = async event=>{
        const files = event.target.files;
        await setData(files[0]);
        console.log(Data);
    }

    const Submit = async ()=>{
        const data = new FormData();
        await data.append('file',Data);
        data.append('upload_preset','unknown39825');
        const res = await fetch("https://api.cloudinary.com/v1_1/dvhrzmkwd/image/upload",
        {
            method: 'POST',
            body:data
        });
        const file = await res.json();
        setUrl(file.secure_url);
    }

    return (
        <div className="test">
            <h1>Upload Image to Cloudnary in React</h1>
            <input type="file" name="file" placeholder="upload a image" onChange={uploadImage} />
            <br/>
            <button onClick={Submit}>Submit</button>
            <br/>
            <p>{url}</p>
        </div>
    )
}
