import { useState } from "react";
import { Button, ButtonGroup, Card, Form, ToggleButton } from "react-bootstrap";
import HeaderOne from "../../components/headers/HeaderOne";
import "./NewTest.css"

const NewTest = () => {

    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Spiral', value: 'spiral' },
        { name: 'Wave', value: 'wave' },
    ];

    return (
        <div className="new_test">

            <HeaderOne />
            <h1 className="test_header">New Test</h1>

            <div className="container test_form justify-content-center">
                <Form>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Patient ID</Form.Label>
                                <Form.Control className="fa" style={{ borderRadius: "20px" }} placeholder="&#xf2c2; Patient id" />
                            </Form.Group>
                        </div>
                        <div className="col-md-6">
                            <Form.Group className="mb-3">
                                <Form.Label>Type of The Test <span className="warning">(Select the exact type of test carefully.)</span></Form.Label>
                                <div className="col-md-3">
                                    {/* <div className="col-4"><input type="radio" value="spiral" name="test_type"/> Spiral</div> */}
                                    {/* <div className="col-4"><input type="radio" value="Wave" name="test_type"/> Wave</div> */}
                                    <ButtonGroup className="mb-12">
                                        {radios.map((radio, idx) => (
                                            <ToggleButton
                                                key={idx}
                                                id={`radio-${idx}`}
                                                type="radio"
                                                variant="primary"
                                                name="radio"
                                                value={radio.value}
                                                checked={radioValue === radio.value}
                                                onChange={(e) => setRadioValue(e.currentTarget.value)}
                                            >
                                                {radio.name}
                                            </ToggleButton>
                                        ))}
                                    </ButtonGroup>
                                </div>
                            </Form.Group>
                        </div>
                    </div>

                    <div className="row upload">
                        
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <Form.Label>Date</Form.Label>
                            <Form.Control style={{ borderRadius: "20px", width: "50%" }} type="date" name='date' placeholder='&#xf1fd; Date' />
                        </div>
                        <div className="col-md-6">
                            <br />
                            <Button type="submit" className="test_button" style={{ borderRadius: "20px"}}>
                                Do Test
                            </Button>
                        </div>
                    </div>

                </Form>
            </div>

        </div>
    );
}

export default NewTest;