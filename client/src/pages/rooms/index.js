import React, { useCallback, useContext, useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../components/Firebase/firebase";
import { AuthContext } from "../../components/Firebase/auth";
import {
    Button, Form, FormGroup, Input, Label,
    Card, CardImg, CardBody, CardText, CardHeader
} from 'reactstrap';
import API from "../../utils/api";
import { useDispatch } from 'react-redux';
import { updateUser } from "../../actions";
import "./style.css";
import { set } from "mongoose";

const mongojs = require("mongojs");

const Rooms = () => {
    const { currentUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState(""); // actually a location ID
    const [description, setDescription] = useState("");
    const [locations, setLocations] = useState([]);
    const [features, setFeatures] = useState([]);
    const [selectedFeatureIds, setSelectedFeatureIds] = useState([]);

    useEffect(() => {
        getLocations();
        getFeatures();
    }, []);

    const getLocations = () => {
        API.getLocations()
            .then(res => {
                console.log(res.data);
                setLocations(res.data);
            });
    };

    const getFeatures = () => {
        API.getFeatures()
            .then(res => {
                console.log(res.data);
                setFeatures(res.data);
            });
    };

    const handleLocationChange = event => {
        const index = event.target.selectedIndex;
        const optionElement = event.target.childNodes[index];
        setLocation(optionElement.getAttribute('data-id'));
    };

    const handleFeatureChange = event => {
        const featureId = event.target.getAttribute('data-id');
        if (event.target.checked) {
            setSelectedFeatureIds([...selectedFeatureIds, featureId]);
        } else {
            setSelectedFeatureIds(selectedFeatureIds.filter((id) => (id !== featureId)));
        }
    };

    const addRoom = event => {
        event.preventDefault();
        console.log("Add room location: " + location); // not working. = null
        API.saveRoom({
            building: mongojs.ObjectId(location),
            roomName: name,
            description: description,
            features: selectedFeatureIds.map((featureId) => (mongojs.ObjectId(featureId)))
        }
        ).then(res => console.log(res.data))
            .catch(err => console.log(err));

    };

    return (
        <div>
            <Card id="room-card" className="mx-auto shadow-lg">
                <CardHeader className="login-header">Create a room</CardHeader>
                <CardBody>
                    <Form onSubmit={addRoom}>
                        <FormGroup>
                            <Label for="selectLocation">Select a location</Label>
                            <Input type="select" name="select" id="selectLocation"
                                onChange={handleLocationChange}
                            >
                                {!locations || locations.map((loc) => (
                                    <option check key={loc._id} data-id={loc._id}>
                                        {loc.name}
                                    </option>
                                ))
                                }
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input name="name" type="text" placeholder="Room name"
                                value={name}
                                onChange={event => setName(event.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input name="description" type="text" placeholder="Description"
                                value={description}
                                onChange={event => setDescription(event.target.value)}
                            />
                        </FormGroup>
                        {!features || features.map((feature) => (
                            <FormGroup check key={feature.name}>
                                <Label check>
                                    <Input type="checkbox" data-id={feature._id}
                                        onClick={handleFeatureChange}
                                    />{' '}
                                    {feature.name}
                                </Label>
                            </FormGroup>
                        ))
                        }
                        <Button type="submit" className="btn-block">Create room</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );

}

export default withRouter(Rooms);