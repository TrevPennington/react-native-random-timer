import React, { useState } from 'react';
import { Text, View, Button, Picker, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 15,
      flexDirection: 'row-reverse',
      color: '#efefef',
      
    },
    title: {
        color: '#efefef',
        fontSize: 20,
        marginTop: 125,
    }
  });


const baseMin = [];
for (var i=0; i <= 60; i++) {
    baseMin.push(i);
}

const baseSec = [];
for (var i=0; i <= 60; i++) {
    baseSec.push(i);
}

const displayMinutes = baseMin.map((minute) => 
    <Picker.Item value={minute} label={minute} />
)

const displaySeconds = baseSec.map((second) => 
    <Picker.Item value={second} label={second} />
)

class Timer extends React.Component {
    constructor(props) {
        super();
        this.state = { 
                baseMinutes: 0, 
                baseSeconds: 0, 
                varMinutes: 0, 
                varSeconds: 0,
                minutes: 0,
                seconds: 0,
                random: 0
            };

        this.updateBaseMin = this.updateBaseMin.bind(this);
        this.updateBaseSec = this.updateBaseSec.bind(this);
        this.updateVarMin = this.updateVarMin.bind(this);
        this.updateVarSec = this.updateVarSec.bind(this);
        this.generate = this.generate.bind(this);
        this.go = this.go.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
    }
    

    updateBaseMin(event) {
        this.setState({ baseMinutes: event.target.value });
    }

    updateBaseSec(event) {
        this.setState({ baseSeconds: event.target.value });
    }

    updateVarMin(event) {
        this.setState({ varMinutes: event.target.value });
    }

    updateVarSec(event) {
        this.setState({ varSeconds: event.target.value });
    }

    generate() {
        

        var min = (this.state.baseSeconds) - (this.state.varSeconds);
        
        console.log('min');
        console.log(min);
        
        var max = (parseInt(this.state.varSeconds)) + (parseInt(this.state.baseSeconds));
        
        
        console.log('max')
        console.log(max)
        
        const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
        this.setState({ random: randomInt });
        this.reset();
        
        
        console.log('randomvar')
        console.log(randomInt)
        console.log('randomstate')
        console.log(this.state.random)
    }


    go() {

        this.timer = setInterval(() => {
            
            if (this.state.seconds == this.state.random) {
                clearInterval(this.timer);
                
            } else {
                this.setState({ seconds: this.state.seconds + 1 })
                
            }
        }, 1000)
    }

    stop = () => {
        clearInterval(this.timer);
     }
 
     reset = () => {
         this.setState({ minutes: 0, seconds: 0 })
         this.stop();
     }




    render() {

        const varMin = [];
        for (var i=0; i <= this.state.baseMinutes; i++) {
            varMin.push(i);
        }
        const displayBaseMin = varMin.map((minute) => 
            <Picker.Item value={minute} label={minute} />
        )

        const varSec = [];
        for (var i=0; i <= this.state.baseSeconds; i++) {
            varSec.push(i);
        }
        const displayBaseSec = varSec.map((second) =>
            <Picker.Item value={second} label={second} />
        )

        const { baseMinutes, baseSeconds, varMinutes, varSeconds, minutes, seconds } = this.state;
        

    return (

        <View>
            <Text>Settings</Text>
            
                <Picker onValueChange={this.updateBaseMin}>
                    {displayMinutes}
                </Picker>
                <Text>:</Text>
                <Picker onValueChange={this.updateBaseSec}>
                    {displaySeconds}
                </Picker>
                <Text>VarTime +-</Text>
                <Picker onValueChange={this.updateVarMin}>
                    {displayBaseMin}
                </Picker>
                <Text>:</Text>
                <Picker onValueChange={this.updateVarSec}>
                    {displayBaseSec}
                </Picker>
               <Button onPress={this.generate} title='new' />
            

           
            <Text>Timer</Text>

            <Text>{minutes}:{seconds}</Text>


            <View>
                <Button onPress={this.go} title='go' />
                <Button onPress={this.stop} title='stop' />
                <Button onPress={this.reset} title='reset' />
            </View>

        </View>
    )
}

export default Timer;