import React from "react";
import { Container} from "react-bootstrap";
import Events from './Events';
import CreateEvent from "./CreateEvent";

export default function AllEvents() {
    return (
       <Container >
           <Events/>
           <CreateEvent/>
        </Container>
    )
}
