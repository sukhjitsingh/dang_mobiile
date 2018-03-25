import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Account Login',
    headerStyle: { backgroundColor: '#2C7181', borderBottomWidth: 0 },
    headerTitleStyle: { fontSize: 16 }
  };

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }

  async loginButtonPressed() {
    this.setState({ isLoading: true })

    const { email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        this.setState({ isLoading: false })
        Alert.alert(
          'Logged In!',
          'You have successfully Logged in!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        this.setState({ isLoading: false, errors: responseJSON.errors })
        Alert.alert('Login failed!', `Unable to sigin.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Login failed!', 'Unable to Signin. Please try again later')
    }
  }
  render() {
    const { email, password } = this.state
    return (
      <View style={styles.container}>

        <View style={styles.textInputContainer}>
          <Input
            containerStyle={styles.loginInput}
            placeholder="Email"
            placeholderTextColor="white"
            value={this.email}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            leftIcon={
              <MaterialCommunityIcons
                name="email"
                size={24}
                color='white'
              />
            }
            onChangeText={(email) => this.setState({email})}
          />

          <Input
            containerStyle={styles.loginInput}
            placeholder="Password"
            placeholderTextColor="white"
            value={this.password}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            leftIcon={
              <MaterialCommunityIcons
                name='lock'
                size={24}
                color='white'
              />
            }
            onChangeText={(password) => this.setState({password})} 
          />

          <Button
            text='Login'
            containerStyle={{ marginTop: 20 }}
            buttonStyle={{
              backgroundColor: "#81542C",
              borderRadius: 10,
              paddingHorizontal: 40,
            }}
            onPress={() => this.loginButtonPressed()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C7181',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textInputContainer: {
    height: 150,
    justifyContent: 'space-between'
  },

  loginInput: {
  }
});
