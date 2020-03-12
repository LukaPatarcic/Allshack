import * as React from "react";
import {MDBCard, MDBCardBody, MDBCol, MDBRow} from "mdbreact";
import AboutListItem from "./AboutListItem";

export default class About extends React.Component{
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <MDBCard className={'mt-5'}>
                <MDBCardBody>
                    <h2 className={'homepage'}>About</h2>
                    <MDBRow className={'mt-5'}>
                        <MDBCol lg={6} md={12} className="px-4 mt-5">
                            <AboutListItem
                                icon={'fas fa-user'}
                                iconColor={'text-indigo'}
                                title={'Connect multiple accounts'}
                                description={
                                    'Have your account connect to your other social media ' +
                                    'accounts like Facebook, Instagram, Twitter and other'
                                }
                            />
                            <AboutListItem
                                icon={'fas fa-comments'}
                                iconColor={'text-indigo'}
                                title={'Chat with friends'}
                                description={
                                    'Chat with your friends instantly. ' +
                                    'Get friend suggestions from connected social media.'
                                }
                            />
                            
                            <AboutListItem
                                icon={'fas fa-chart-pie'}
                                iconColor={'text-indigo'}
                                title={'Check statistics'}
                                description={'' +
                                'Check your statistics on connected social media. ' +
                                'See how many likes, posts and other fun stuff'
                                }
                            />
                        </MDBCol>
                        <MDBCol lg={6} md={12} className="px-4">
                            <img  src={'./images/spaceman.svg'} width={300} alt={'Banner'} className={'img-fluid'}/>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        );
    }

}