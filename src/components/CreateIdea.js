import React from "react";
import {APP_PATH} from "../constants";
import {BN} from 'bn.js'
import {Link, Redirect} from "react-router-dom";
import {MDBRow, MDBCol, MDBBtn, MDBLink, MDBContainer} from "mdbreact";

class CreateIdea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            link: "",
            description: "",
            image: "",
            price: 0,
            toHome: false,
        };
    }

    updateTitle(val) {
        this.setState({
            ...this.state,
            title: val,
        });
    }

    updatePrice(val) {
        this.setState({
            ...this.state,
            price: val,
        });
    }

    updateDescription(val) {
        this.setState({
            ...this.state,
            description: val,
        });
    }

    updateImage(val) {
        this.setState({
            ...this.state,
            image: val,
        });
    }

    updateLink(val) {
        this.setState({
            ...this.state,
            link: val,
        });
    }

    async CreateIdea() {
        if (this.state.title.length === 0 || parseFloat(this.state.price) === 0)
            return null;

        this.setState({
            toHome: true,
        });

        const price_near = new BN(this.state.price * 100000).mul(new BN("10000000000000000000")).toString();
        try {
            let idea = await this.props.contract.create_idea({
                title: this.state.title,
                description: this.state.description,
                image: this.state.image,
                link: this.state.link,
            }, 10000000000000, price_near);

            /* await this.props.contract.tip_meme({
                 idea_id: idea.idea_id,
                 price_near: parseFloat(this.state.price)
             });*/

        } catch (err) {
            console.error(err);
        }
    }

    render() {
        if (this.state.toHome) {
            return <Redirect to={APP_PATH}/>;
        }
        return (
            <div className='form-container flex flex-col'>
                <div className='flex py-2 px-2 my-6'>
                    <div className='w-1/6 flex mb-auto align-top'>
                        <div className='near-btn'>
                            <Link to={APP_PATH}>Back</Link>
                        </div>
                    </div>

                    <div className='w-4/6 px-10 bg-gray-200'>
                        <div className='w-full'>
                            <h2 className='header justify-center'>Create a meme proposal</h2>
                        </div>
                        <div className='justify-center'>
                            <form
                                className='justify-center'
                                noValidate
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    this.CreateIdea();
                                }}
                            >
                                <MDBRow className='my-5'>
                                    <MDBCol className='my-5'>
                                        <form
                                            onChange={(e) => {
                                                this.updateTitle(e.target.value);
                                            }}
                                            type='text'
                                            placeholder='Title'
                                        />
                                    </MDBCol>
                                    <MDBCol className='my-5'>
                                        <form
                                            onChange={(e) => {
                                                this.updatePrice(e.target.value);
                                            }}
                                            type='text'
                                            placeholder='Price proposal'
                                        />
                                    </MDBCol>
                                    <MDBCol className='my-5'>
                                        <form
                                            onChange={(e) => {
                                                this.updateImage(e.target.value);
                                            }}
                                            type='text'
                                            placeholder='Image url'
                                        />
                                    </MDBCol>
                                    <MDBCol className='my-5'>
                                        <form
                                            onChange={(e) => {
                                                this.updateLink(e.target.value);
                                            }}
                                            type='text'
                                            placeholder='Source Link'
                                        />
                                    </MDBCol>
                                    <MDBCol className='my-5'>
                                        <form
                                            onChange={(e) => {
                                                this.updateDescription(e.target.value);
                                            }}
                                            type='text'
                                            placeholder='Tags'
                                        />
                                    </MDBCol>
                                    <MDBCol className='my-5'>
                                        <MDBBtn className='near-btn' variant='primary' type='submit'>
                                            Create
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </div>
                    </div>
                    <div className='w-1/6 flex'></div>

                </div>
            </div>
        );
    }
}

export default CreateIdea;
