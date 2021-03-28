import React from 'react'
import { Spinner,Button } from 'react-bootstrap'

export default function LoadingButton(props) {
    return (
        <Button variant="primary" onClick={props.onClick}>
        {props.loading?(
            <div>
                
                 <Spinner
             as="span"
            animation="grow"
            size="sm"
         role="status"
        aria-hidden="true"
            />
        Loading...
            </div>
        ):(
            <span>
                {props.children}
            </span>
        )
    }
    </Button>
    )
}
