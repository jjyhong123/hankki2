import React, { Component } from 'react'
import { connect } from 'react-redux'
import constants from "../utils/constants"
import { Card, CardImg, CardDeck, Form, FormGroup, Input, Label, Row, Col, Container, Navbar, NavbarBrand, NavItem, Nav, NavLink } from 'reactstrap';
import Footer from '../components/Footer.js'
import CustomNavbar from '../components/CustomNavbar'
import "../index.css"

const Fridge = (props) => {
    return (
        <Container fluid style={{ textAlign: "center" }}>
            <CustomNavbar />
            <Row>
                <Col xs="4">
                    <h3>My fridge</h3>

                    <Form onSubmit={props.addFridgeItem}>
                        <Input value={props.fridgeInput} onChange={props.updateFridgeInput} />
                    </Form>

                    <Form>
                        <FormGroup check>
                            {props.fridgeItems.map((item, index) => {
                                return <p><Label check key={index}>
                                    <Input type="checkbox" />{item}
                                </Label>
                                </p>

                            })}
                        </FormGroup>
                    </Form>

                </Col>

                <Col xs="4">
                    <h3>My pantry</h3>

                    <Form onSubmit={props.addPantryItem}>
                        <Input value={props.pantryInput} onChange={props.updatePantryInput} />
                    </Form>

                    <Form>
                        <FormGroup check>
                            {props.pantryItems.map((item, index) => {
                                return <p><Label check key={index}>
                                    <Input type="checkbox" />{item}
                                </Label>
                                </p>

                            })}
                        </FormGroup>
                    </Form>

                </Col>
                <Col xs="4">
                    <h3>My recipes</h3>
                </Col>
            </Row>

        </Container>
    )
}

function mapStateToProps(state) {
    return {
        fridgeInput: state.fridgeInput,
        fridgeItems: state.fridgeItems,
        pantryInput: state.pantryInput,
        pantryItems: state.pantryItems
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateFridgeInput: (evt) => {
            const action = { type: constants.UPDATE_FRIDGE_INPUT, text: evt.target.value }
            dispatch(action)
        },
        addFridgeItem: (evt) => {
            evt.preventDefault()
            const action = { type: constants.ADD_FRIDGE_ITEM }
            dispatch(action)
        },
        updatePantryInput: (evt) => {
            const action = { type: constants.UPDATE_PANTRY_INPUT, text: evt.target.value }
            dispatch(action)
        },
        addPantryItem: (evt) => {
            evt.preventDefault()
            const action = { type: constants.ADD_PANTRY_ITEM }
            dispatch(action)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Fridge)