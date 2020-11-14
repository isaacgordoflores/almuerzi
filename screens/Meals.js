import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import ListItem from '../components/ListItem';
import useFetch from '../hooks/useFetch';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    list: {
        alignSelf: 'stretch',
    },
    title: {
        alignItems: 'center',
    }
})

const Meals = ({ navigation }) => { // defino navigation para que pueda usarlo en onPress

    const { loading, data: meals } = useFetch('https://serverless.isaacgordoflores.vercel.app/api/meals')

    return (
        <View style = {styles.container}>
            {loading ? <Text>Cargando...</Text> : 
            <FlatList
                style = {styles.list}
                data = {meals}
                keyExtractor = { x => x._id } // a keyExtractor le asignamos la _id del item
                renderItem = {({ item }) =>
                    <ListItem
                        onPress = { // Al presionar enviamos a la pantalla MODAL los datos capturados por la _id 
                                    () => navigation.navigate('Modal', { _id: item._id })
                                  }
                        name = { item.name }
                    />
                }
            />
            }
        </View>
    )
}

Meals.navigationOptions = ({
    title: 'Comidas disponibles'
})

export default Meals