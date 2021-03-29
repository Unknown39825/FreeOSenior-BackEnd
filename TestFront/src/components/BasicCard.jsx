import React from 'react';
import { Button, Card, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingButton from './LoadingButton';
export default function BasicCard(
    {
      title=undefined,
      image=undefined,
      link=undefined,
      desc=undefined,
      date=undefined,
    }

    ) {
    return (
  <Card style={{ margin:'30px 5px', borderRadius:'20px',minHeight:'25rem',padding:'20px 10px'}} className='bg-dark text-white'>
    <Card.Img variant="top" src={image} />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>
        {desc}
      </Card.Text>
      <Button variant="primary">{link}</Button>
       <Card.Footer className="text-muted">{date}</Card.Footer>
    </Card.Body>

</Card>
    )
}
