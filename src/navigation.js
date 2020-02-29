import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


const Navigation = () => {

    return (
        <>
            <container>
                <Navbar bg='primary' variant='dark' >
                    <Nav className='mr-auto'>
                        <Nav.Link href='/'>Team Tables</Nav.Link>
                        <Nav.Link href='/managersummary'>Manager Summary</Nav.Link>
                    </Nav>
                </Navbar>
            </container>

        </>
    )
}

export default Navigation;