import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default ({ navigation }) => {

    useEffect(() => {
        AsyncStorage.getItem('token')
        /**
         * Si el usuario x existe, tiene token, si no existe, no tiene token
         * Si x existe le envio a Root
         * Si x no existe le envio a OnBoardng
         * 
         */
            .then(x => {
                navigation.navigate(x ? 'Root' : 'OnBoarding')
            })
    }, [])

    return (
        <View>
            <ActivityIndicator />
        </View>
    )
}
