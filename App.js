import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MealsScreen from './screens/Meals';
import Modal from './screens/Modal';

const AppNavigator =  createStackNavigator({
  Meals: {
    screen: MealsScreen,
  }
  }, {
    initialRouteName: 'Meals'
})


const RootStack = createStackNavigator({
  Main: AppNavigator,
  Modal: Modal,
}, {
  mode: 'modal',
  header: 'none',
})

export default createAppContainer(RootStack)
