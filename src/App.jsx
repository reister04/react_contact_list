import React, { useState, useEffect }from 'react';
import {Container, Image, Col, Row, Form, InputGroup, Button} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

import './app.css';

const App = () => {

    const [contacts, setContacts] = useState([]);
    const [del, setDel] = useState(false);
    
    useEffect(() => {
        const contacts = JSON.parse(localStorage.getItem('contacts'));
        if (contacts) {
            setContacts(contacts);
        }
    }, []);

    useEffect(() => {
        if (del == true) {
            localStorage.setItem('contacts', JSON.stringify(contacts));
            setDel(false);
        } else {
            if (contacts.length !== 0) {
                localStorage.setItem('contacts', JSON.stringify(contacts));
            }
        }
    }, [contacts]);

    const handleSubmit = (event) => {
        event.preventDefault();
        let name = event.target[0].value;
        name = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

        let email = event.target[1].value;
        
        if (name != '' && email != '') {
            setContacts([...contacts, {name, email}]);
            event.target[0].value = "";
            event.target[1].value = "";
        }
    }

    const handleDelete = (index) => {
        setDel(true)
        setContacts(contacts.filter((contact, i) => i !== index));
    }

    return (
        <div>
            <Container className="pt-2">
                <Row>
                    <Col lg="6">
                        <h1 className="fs-5">Contact Form</h1>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group as={Col} className="mb-3" controlId="name">
                                <Form.Label className="form-label-md">
                                    Name:
                                </Form.Label>   
                                <InputGroup className="border border-dark border-2 rounded">
                                    <InputGroup.Text><FontAwesomeIcon icon={faUser} /></InputGroup.Text>
                                    <Form.Control className="form-control-md"
                                    placeholder="Enter name"
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className="form-label-md">
                                    Email:
                                </Form.Label>
                                <InputGroup className="border border-dark border-2 rounded">
                                    <InputGroup.Text><FontAwesomeIcon icon={faEnvelope} /></InputGroup.Text>
                                    <Form.Control className="form-control-md" type="email"
                                    placeholder="Enter email"
                                    />
                                </InputGroup>                        
                            </Form.Group>
                            <Form.Group>
                                <Button variant="dark" type="submit" className="mb-3 w-100 border border-dark border-2">
                                    Add
                                </Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col lg="6">
                        <Container className="border border-dark border-2 rounded overflow-auto bg-warning" style={{height: '60vh'}} >
                            <h1 className="fs-5 text-center">Contacts</h1>
                            {contacts.map((details, index) => {
                                const str = details.name;
                                const initials = str.split(" ").map(word => word[0]).join("").toUpperCase();
                                return (
                                    <Container key={index} className="bg-light text-dark d-flex align-items-center justify-content-between mb-2 border border-dark border-2 py-2 rounded">
                                        <div className="bg-dark text-light rounded-circle text-center d-flex justify-content-center align-items-center" style={{width: 40, height: 40}}>{initials}</div>
                                        <div className="ms-2 me-auto">
                                            <p className="m-0 fw-bold" style={{fontSize: 12}}>{details.name}</p>
                                            <a href="" style={{fontSize: 12}}>{details.email}</a>
                                        </div>
                                        <div className="">
                                            <Button onClick={() => handleDelete(index) } className="d-flex justify-content-center align-items-center rounded-circle btn btn-danger" style={{height: 28, width: 28}}>X</Button>
                                        </div>
                                    </Container>
                                )
                            })}
                        </Container>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default App