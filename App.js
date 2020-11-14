import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MealsScreen from './screens/Meals';
import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import AuthLoading from './screens/AuthLoading';
import Modal from './screens/Modal';

/**
 * ONBOARDINGNAVIGATOR si tiene historial entre las pantallas por ser createStackNavigator
 */
const OnBoardingNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
},{
  initialRouteName: 'Register',
})

/**
 * Navegador de la App
 */
const AppNavigator = createStackNavigator({
  Meals: {
    screen: MealsScreen,
         }
  }, {
    initialRouteName: 'Meals'
})

/**
 * RootStack 
 */
const RootStack = createStackNavigator({
  Main: AppNavigator,
  Modal: Modal,
}, {
  mode: 'modal',
  headerMode: 'none',
})

/**
 * BaseStack, createSwitchNavigator no tiene historial entre las pantallas
 */
const BaseStack = createSwitchNavigator({
  /**
   * AuthLoading
   Pantalla que se encarga de revisar esta lógica:
   Si se encuentra dentro de AsyncStorage un token.
   En caso positivo se envia al usuario a Root.
   En caso negativo se envia al usuario a OnBoarding.

   Lo creamos dentro de createSwitchNavigator por que no me interesa 
   que persista dentro del historial de la navegación.
   */
  AuthLoading: AuthLoading,
  OnBoarding: OnBoardingNavigator,
  Root: RootStack,

},{
  initialRouteName: 'AuthLoading'
})

export default createAppContainer(BaseStack)
