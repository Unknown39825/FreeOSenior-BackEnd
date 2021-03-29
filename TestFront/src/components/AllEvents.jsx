import React, { useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
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
