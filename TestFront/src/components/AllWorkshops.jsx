import React from "react";
import {Container} from "react-bootstrap";
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
