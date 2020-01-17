import React from 'react';
import {View, StyleSheet, ImageBackground, ScrollView, Text,} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import AsyncStorage from "@react-native-community/async-storage";

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            card : ['Miguel Duncan','Rhiannan Seymour','Amir Delacruz','Rajveer Carpenter','Armaan Lowery','Anne Morse','Shanon Newton']
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('access-token', (err, val) => {
            if (!val) {
                this.props.history.push('/login');
            }
        });
    }

    randomName() {
        return <Text style={{fontFamily: 'font'}}>{this.state.card[Math.floor(Math.random()*this.state.card.length)]}</Text>;
    }

    render() {
        return (
            <ImageBackground
                style={{width: '100%', height: '100%',zIndex: -1,resizeMode: 'cover'}}
                source={{uri: 'https://allshak.lukaku.tech/images/background.png'}}>
                <ScrollView style={{paddingHorizontal: 20, paddingTop: 20}}>
                    {this.state.card.map((card,index) => {
                        return (
                            <Card style={{marginBottom: 30}} key={index}>
                                <Card.Title title={this.randomName()}  left={(props) => <Avatar.Image size={50} source={{uri: 'https://robohash.org/' + this.randomName()}}/>} />
                                <Card.Content>
                                    <Title  style={{fontFamily: 'font'}}>Card title</Title>
                                    <Paragraph  style={{fontFamily: 'font'}}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores excepturi in iste labore placeat quam quos ratione reiciendis repudiandae vitae?</Paragraph>
                                </Card.Content>
                            </Card>
                        )
                    })}

                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'flex-start',
        shadowOffset:{  width: 10,  height: 10,  },
        shadowColor: 'black',
        shadowOpacity: 1.0,
    }
});