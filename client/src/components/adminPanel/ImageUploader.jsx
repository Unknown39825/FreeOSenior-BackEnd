import React, { useState } from "react";
import {
  Container,
  Paper,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import PublishIcon from "@mui/icons-material/Publish";
import { useDropzone } from "react-dropzone";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "15px",
  },
  paper: {
    padding: "40px 20px",
    margin: "20px auto",
  },
  uploadIn: {
    padding: "40px 20px",
  },
  dropzone: {
    border: "2px dashed #cccccc",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    backgroundColor: "#f9f9f9",
  },
}));

const ImageUploader = () => {
  const classes = useStyles();
  const [Data, setData] = useState(undefined);
  const [imgUrl, setimgUrl] = useState("");

  const onDrop = (acceptedFiles) => {
    setData(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const CloudinarySubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData();
      data.append("file", Data);
      data.append("upload_preset", "unknown39825");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dd0tebi6a/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      setimgUrl(file.secure_url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={4} className={classes.paper}>
        <Grid container alignItems="center" justifyContent="center">
          <h1 style={{ fontFamily: "arial", fontSize: 40 }}>Image Uploader</h1>
        </Grid>
        <TextField
          id="outlined-basic"
          value={imgUrl}
          variant="outlined"
          fullWidth
          disabled
        />
        <br />
        <br />
        <div
          {...getRootProps({ className: classes.dropzone })}
          style={{
            borderColor: isDragActive ? "#2196f3" : "#cccccc",
            backgroundColor: isDragActive ? "#e3f2fd" : "#f9f9f9",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag and drop an image here, or click to select one</p>
          )}
        </div>
        <br />
        <Button
          variant="contained"
          color="primary"
          startIcon={<PublishIcon />}
          onClick={CloudinarySubmit}
          disabled={!Data} // Disable button if no file is selected
        >
          Upload
        </Button>
      </Paper>
    </Container>
  );
};

export default ImageUploader;
