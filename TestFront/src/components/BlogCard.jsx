import React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';
export default function BlogCard(
    {blog,
    read=true,
    loading=false
    }

    ) {
    return (
  <Card style={{ margin:'30px 5px', borderRadius:'20px',minHeight:'25rem',padding:'20px 10px'}} className='bg-dark text-white'>
    <Card.Img variant="top" src={blog.img} />
  <Card.Body>
    <Card.Title style={{textTransform:'capitalize'}}>by {blog.title}</Card.Title>
    
    <br/>
    <br/>
    
  </Card.Body>
  <Card.Footer className="text-muted" >{"updated at "+blog.updatedAt}</Card.Footer>
</Card>
    )
}
