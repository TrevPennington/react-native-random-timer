import React from 'react';
import { Text, View, Button, Picker, StyleSheet, TouchableOpacity } from 'react-native';


const baseMin = [];
for (var i=0; i <= 59; i++) {
    baseMin.push(i);
}

const baseSec = [];
for (var i=0; i <= 59; i++) {
    baseSec.push(i);
}

const displayMinutes = baseMin.map((minute) => 
    <Picker.Item key={minute.toString()} value={minute} label={minute.toString()} />
)

const displaySeconds = baseSec.map((second) => 
    <Picker.Item key={second.toString()} value={second} label={second.toString()} />
)


class RandomTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            
            //SETTINGS
            baseMinutes: 0, 
            baseSeconds: 0, 
            varMinutes: 0, 
            varSeconds: 0,
            
            //TIMER
            random: 0,


            minutes: 0,
            seconds: 0,
            active: false,

            // display
            settings: true,
        };
    }

    toggleDisplay = () => {

        if(!this.state.settings) {
            this.stop();
            this.reset();
        }

        this.setState({ 
            settings: !this.state.settings
        })
    }


    generate = () => {
        var totalSecs = (parseInt(this.state.baseSeconds)) + (parseInt(this.state.baseMinutes) * 60)
        var totalVar = (parseInt(this.state.varSeconds)) + (parseInt(this.state.varMinutes) * 60)
     

        var min = (totalSecs) - (totalVar);
        var max = (totalSecs) + (totalVar);
        
        var randomInt = Math.floor(Math.random() * (max - min + 1) + min);
        this.setState({ random: randomInt });
        this.reset();
     
    }

    go = () => {
        this.setState({ active: true })
        this.timer = setInterval(() => {
            
            if (this.state.seconds == this.state.random) {
                
                this.stop();
                
            } else {
                this.setState({ seconds: this.state.seconds + 1})
                
            }
        }, 1000)
    }

    start = () => {
        if(this.state.seconds === 0) {
            this.generate();
            this.go();
        } else {
            this.go();
        }
    }

    stop = () => {
        clearInterval(this.timer);
        this.setState({ 
                        active: false 
                    })
     }
 
     reset = () => {
        this.stop(); // switched these around
        this.setState({ minutes: 0, seconds: 0 })
         
     }

     resetter = () => { //resetter

        if(this.state.seconds !== 0 && !this.state.active) {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.reset()}
                >               
                <Text>reset</Text>
                </TouchableOpacity> )
        } else {
            return
        } 
    }

    goStop = () => {
        if(this.state.active) {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.stop()}
                >               
                <Text>stop</Text> 
                </TouchableOpacity>
            )
        } else {
            return (
                <TouchableOpacity
                style={styles.button}
                onPress={() => this.start()}
                >               
                <Text>go</Text> 
                </TouchableOpacity>
            )
        }
    }



    render() {

     
                
       
        const varMin = [];
        for (var i=0; i <= this.state.baseMinutes; i++) {
            varMin.push(i);
        }
        const displayBaseMin = varMin.map((minute) => 
            <Picker.Item key={minute.toString()} value={minute} label={minute.toString()} />
        )

        const varSec = [];
        for (var i=0; i <= this.state.baseSeconds; i++) {
            varSec.push(i);
        }
        const displayBaseSec = varSec.map((second) =>
            <Picker.Item key={second.toString()} value={second} label={second.toString()} />
        )



        const { baseMinutes, baseSeconds, varMinutes, varSeconds, minutes, seconds } = this.state;

        if (this.state.settings) {
        return (
                <View style={styles.page}>

                    <Text style={styles.titleMain}>settings</Text>
                    
                    <Text style={styles.subTitle}>set base time</Text>
                    
                    <View style={styles.set}>
                        <Picker style={styles.picker} onValueChange={ // -------------- BASE MINUTES
                            (itemValue) => this.setState({
                                baseMinutes: itemValue
                            })} selectedValue={baseMinutes}>
                            {displayMinutes}
                        </Picker>
                        <Text style={styles.title}>min</Text>

                        <Picker style={styles.picker} onValueChange={ // -------------- BASE SECONDS
                            (itemValue) => this.setState({
                                baseSeconds: itemValue
                            })} selectedValue={baseSeconds}>
                            {displaySeconds}
                        </Picker>
                        <Text style={styles.title}>sec</Text>

                    </View>

                    <Text style={styles.varTitle}>set variance time</Text>

                    <View style={styles.set}>

                        <Picker style={styles.picker} onValueChange={ // -------------- VAR MINUTES
                            (itemValue) => this.setState({
                                varMinutes: itemValue
                            })} selectedValue={varMinutes}>
                            {displayBaseMin}
                        </Picker>
                        <Text style={styles.title}>min</Text>

                        <Picker style={styles.picker} onValueChange={ // -------------- VAR SECONDS
                            (itemValue) => this.setState({
                                varSeconds: itemValue
                            })} selectedValue={varSeconds}>
                            {displayBaseSec}
                        </Picker>
                        <Text style={styles.title}>sec</Text>

                    </View>

                    {/* TEST */}
                    <Text>{this.state.baseSeconds}</Text>
                    <Text>{this.state.varSeconds}</Text>
                    <Text>{this.state.baseMinutes}</Text>
                    <Text>{this.state.varMinutes}</Text>



                    <TouchableOpacity
                        onPress={this.toggleDisplay}
                    >
                        <Text>timer ---></Text>
                    </TouchableOpacity>
                </View>
                )
        } else {
            return (
               <View style={styles.page}>
                    <View style={styles.time}>
                        <Text style={styles.timerText}>{minutes}</Text>
                        <Text style={styles.timerTextColon}>:</Text>
                        <Text style={styles.timerText}>{seconds}</Text>
                    </View>

                   

                    <View style={styles.buttonBar}>

                    {this.goStop()}

                    
                    {this.resetter()}
                    

                    </View>
                    <Text>{this.state.random}</Text>
                    <TouchableOpacity
                        onPress={this.toggleDisplay}
                    >
                        <Text>settings----</Text>
                    </TouchableOpacity>
                </View>
        
            )
        }
        
    }
}

export default RandomTimer;


const styles = StyleSheet.create({
    page: {
        marginTop: 50,
        alignItems: `center`,
        alignContent: `center`,
        justifyContent: `center`,
    },

    titleMain: {
        marginBottom: 0,
        alignSelf: `flex-start`,
        marginLeft: 40,
        fontSize: 20,
        letterSpacing: 1
    },  
    subTitle: {
        marginTop: 40,
        marginBottom: -40
    },
    varTitle: {
        marginTop: 70,
        marginBottom: -40
    },

    set: {
        width: `70%`,
        flexDirection: `row`,
        alignItems: `center`,
        alignContent: `center`,
        justifyContent: `center`
        // backgroundColor: `yellow`
    },
    title: {
        flex: 1,
        textAlign: `center`,
        marginLeft: -75,
        fontSize: 18,
        

        // backgroundColor: `blue`
    },
    picker: {
        flex: 2,
        alignContent: `center`,
        // backgroundColor: `red`
        
    },

    time: {
        flexDirection: `row`,
        justifyContent: `center`,
        // backgroundColor: `yellow`
    },
    timerText: {
        width: 80,
        fontSize: 70,
        margin: 10,
        textAlign: `center`,
        // backgroundColor: `peru`
    },

    timerTextColon: {
        width: 20,
        fontSize: 70,
        margin: 5,
        textAlign: `center`,
        // backgroundColor: `peru`
    },

    buttonBar: {
        flexDirection: `column`,
        alignItems: `center`,
        alignContent: `center`,
        justifyContent: `center`,
        width: `80%`,
        height: 200,
        // backgroundColor: `grey`
        
    },
    button: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 80,
        borderWidth: 1,
        borderColor: `#222`,
        padding: 20,
        borderRadius: 80/ 2,
    }
})