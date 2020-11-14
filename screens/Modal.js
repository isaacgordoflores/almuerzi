import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import useFetch from '../hooks/useFetch';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ({ navigation }) => {
    const id = navigation.getParam('_id') // Recojo la _id del item en la constante id para encadenarla al template string mediante backticks ``
    const { loading, data } = useFetch(`https://serverless.isaacgordoflores.vercel.app/api/meals/${id}`)

    console.log(data)

    return(
        <View style={styles.container}>
            {loading ? <Text>Cargando...</Text> :
                <>
                <Text>{data._id}</Text>
                <Text>{data.name}</Text>
                <Text>{data.desc}</Text>
                <Button title="Aceptar" onPress={() => {
                    AsyncStorage.getItem('token')
                    .then(x => {
                        if (x) {
                            fetch('https://serverless.isaacgordoflores.vercel.app/api/orders', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: x, // x es el token autorizado
                            },
                            body: JSON.stringify({
                                meal_id: id,
                            })
                        
                        }).then(x => {
                            //console.log(x); 
                            if (x.status !== 201) {
                                return alert('Orden no generada')
                            }
                            alert('Orden generada con éxito')
                            navigation.navigate('Meals') 
                        })
                        }
                        })
                    
                }} />
                <Button title="Cancelar" onPress={() => navigation.navigate('Meals')} />
                </>
            }
        </View>
    )
}

