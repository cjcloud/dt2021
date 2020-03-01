import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const icon = "../public/football1.svg"


const Navigation = () => {

    return (
        <>
            <container>



                <Navbar bg='primary' variant='dark' >
                    <Navbar.Brand>
                        <a href="/">
                            <img src={process.env.PUBLIC_URL + "/footballWhite.svg"} style={{ width: 30, marginTop: -7 }} />
                        </a>
                    </Navbar.Brand>
                    <Nav className='mr-auto'>

                        <Nav.Link href='/'>Team Tables</Nav.Link>
                        <Nav.Link href='/managersummary'>Manager Summary</Nav.Link>
                        <Nav.Link href='/information'>Info</Nav.Link>
                    </Nav>
                </Navbar>
            </container>

        </>
    )
}

export default Navigation;