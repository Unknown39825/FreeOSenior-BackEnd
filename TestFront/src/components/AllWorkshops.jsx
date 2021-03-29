import React, { useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Workshops from './Workshops';
import CreateWorkshop from "./CreateWorkshop";

export default function AllWorkshops() {
    return (
       <Container >
           <Workshops/>
           <CreateWorkshop/>
        </Container>
    )
}
