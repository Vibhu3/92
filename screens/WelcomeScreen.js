import React, {Component} from 'react'
import {View,Text,TextInput,TouchableOpacity,StyleSheet, Alert,Modal, ScrollView, KeyboardAvoidingView} from 'react-native'
import db from '../config'
import firebase from 'firebase'
export default class WelcomeScreen extends Component {
    constructor(){
        super()
        this.state={
            emailId:'',
            password:',',
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }
    userlogin=(emailId,password)=>{
firebase.auth().signInWithEmailAndPassword(emailId,password)
.then(()=>{
    return Alert.alert("successfullylogin")
})
.catch((error)=>{
    var errorcode=error.code
    var errorMessage=error.message
    return Alert.alert(errorMessage)
})
    }
    userSignUp = (emailId, password, confirmPassword) => {
        if (password !== confirmPassword) {
          return Alert.alert("password doesn't match\nCheck your password.");
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(emailId, password)
            .then(() => {
              db.collection("users").add({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                contact: this.state.contact,
                email_id: this.state.emailId,
                address: this.state.address,
                IsBookRequestActive: false
              });
              return Alert.alert("User Added Successfully", "", [
                {
                  text: "OK",
                  onPress: () => this.setState({ isModalVisible: false })
                }
              ]);
            })
            .catch(error => {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              return Alert.alert(errorMessage);
            });
        }
      };
    showModal = () => {
        return (
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
          >
            <ScrollView style={styles.scrollview}>
              <View style={styles.signupView}>
                <Text style={styles.signupText}> SIGN UP </Text>
              </View>
              <View style={{ flex: 0.95 }}>
                <Text style={styles.label}>First Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"First Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      firstName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Last Name </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Last Name"}
                  maxLength={12}
                  onChangeText={text => {
                    this.setState({
                      lastName: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Contact </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Contact"}
                  maxLength={10}
                  keyboardType={"numeric"}
                  onChangeText={text => {
                    this.setState({
                      contact: text
                    });
                  }}
                />
    
                <Text style={styles.label}> Address </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Address"}
                  multiline={true}
                  onChangeText={text => {
                    this.setState({
                      address: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Email </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Email"}
                  keyboardType={"email-address"}
                  onChangeText={text => {
                    this.setState({
                      emailId: text
                    });
                  }}
                />
    
                <Text style={styles.label}> Password </Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      password: text
                    });
                  }}
                />
    
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  style={styles.formInput}
                  placeholder={"Confrim Password"}
                  secureTextEntry={true}
                  onChangeText={text => {
                    this.setState({
                      confirmPassword: text
                    });
                  }}
                />
              </View>
    
              <View style={{ flex: 0.2, alignItems: "center" }}>
                <TouchableOpacity
                  style={styles.registerButton}
                  onPress={() =>
                    this.userSignUp(
                      this.state.emailId,
                      this.state.password,
                      this.state.confirmPassword
                    )
                  }
                >
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
                <Text
                  style={styles.cancelButtonText}
                  onPress={() => {
                    this.setState({ isModalVisible: false });
                  }}
                >
                  Cancel
                </Text>
              </View>
            </ScrollView>
          </Modal>
        );
      };
    render(){
        return(
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>GROCERY APP</Text>
                </View>
                <View>
                <TextInput
                style={styles.loginBox}
                placeholder="abc@example.com"
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}/>
                 <TextInput
                style={styles.loginBox}
                placeholder="enter password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                       password:text
                    })
                }}/>
                <TouchableOpacity
                style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={()=>{
                    this.userlogin(this.state.emailId,this.state.password)
                }}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                        this.userSignup(this.state.emailId,this.state.password)
                    }}>
                        <Text style={styles.buttonText}>sign up</Text>
                </TouchableOpacity>
            </View>
    </View>
        )
    }
}
const styles= StyleSheet.create({
    container:{flex:1,backgroundColor:'#f8ve85'},
    loginBox:{width:300,
        height:40,
  borderBottomWidth:1.5,
  borderColor:'#ff8865',
  fontSize:20,
  margin:10,
  paddingLeft:10  
    },
    button:{
        width:300, 
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        backgroundColor:'#ff9800',
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height:0
        },
shadowOpacity:0.30,
shadowRadius:0.32,
elevation:16
    },
    buttonText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:50
    }
})