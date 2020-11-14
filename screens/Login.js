import React from 'react';
import { Text, TextInput, View, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import useForm from '../hooks/useForm'

const styles = StyleSheet.create({
    button: {
        margin: 30,
    },
    title: {
      fontSize: 20,
      marginBottom: 20,  
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        alignSelf: 'stretch',
        marginBottom: 10,
        paddingHorizontal: 10,
    }
})

export default ({ navigation }) => {
    const initialState = { 
        email: '',
        password: '',
    }

    const onSubmit = values => {
        fetch('https://serverless.isaacgordoflores.vercel.app/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify(values),
        })
        .then(x => x.text())
        .then(x => {
            try {
                return JSON.parse(x)
            } catch {
                throw x
            }
        })
        .then(x => {
            AsyncStorage.setItem('token', x.token) // <====================================
            navigation.navigate('Meals')
        })
        .catch(e => Alert.alert('Error ...', e))
    }

    const { subscribe, inputs, handleSubmit } = useForm(initialState, onSubmit)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <TextInput  
                        autoCapitalize='none'
                        value={inputs.email}
                        onChangeText={subscribe('email')}
                        style={styles.input} 
                        placeholder='Email'
            />
            <TextInput  
                        autoCapitalize='none'
                        value={inputs.password}
                        onChangeText={subscribe('password')}
                        style={styles.input}
                        placeholder='Password'
                        secureTextEntry={true}
            />
            <Button style={styles.button} title='Iniciar sesión' onPress={handleSubmit} />
            <Button style={styles.button} title='Registrarse' onPress={() => navigation.navigate('Register')} />
        </View>
    )
}
