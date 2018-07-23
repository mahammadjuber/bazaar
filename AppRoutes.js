import {createStackNavigator} from 'react-navigation';
import LaunchPage from './LaunchPage';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import VerifyMobile from './VerifyMobile';
import ResetPassword from './User/ResetPassword';
import Scroll from './Scroll';
import HomeSlider from './AppSlider';
import Sample from './Sample';
import Cart from './Cart';
import HeaderComponent from './Header';
import Test from './Test';
import AppMenu from './AppMenu';
import Checkout from './Checkout';
import Payment from './Payment';
import OrderSuccess from './OrderSuccess';
import ReactTable from  './ReactTable';
import Subscriptions from './User/Subscriptions';
import CancelledSubscriptions from './User/CancelledSubscriptions';
import CompletedSubscriptions from './User/CompletedSubscriptions';
import Dashboard from './User/Dashboard';
import Profile from './User/Profile';
import UpdateProfile from './User/UpdateProfile';
import ChangeAddress from './User/ChangeAddress';
import MyMenu from './MyMenu';
import ProductSearch from './ProductSearch';


const AppRoutes=createStackNavigator({
    LaunchPage:{
      screen:LaunchPage,
    },
    Login:{
      screen:Login,
    },
    Home:{
      screen:Home,
    },
    Signup:{
      screen:Signup,
    },
    VerifyMobile:{
      screen:VerifyMobile,
    },
    ResetPassword:{
      screen:ResetPassword,
    },
    Scroll:{
      screen:Scroll,
    },
    HomeSlider:{
      screen:HomeSlider
    },
    Sample:{
      screen:Sample
    },
    Cart:{
      screen:Cart
    },
    Header:{
      screen:HeaderComponent
    },
    Test:{
      screen:Test,
    },
    AppMenu:{
      screen:AppMenu
    },
    Checkout:{
      screen:Checkout
    },
    Payment:{
      screen:Payment,
    },
    OrderSuccess:{
      screen:OrderSuccess,
    },
    ReactTable:{
      screen:ReactTable,
    },
    Subscriptions:{
      screen:Subscriptions,
    },
    Dashboard:{
      screen:Dashboard,
    },
    Profile:{
        screen:Profile,
    },
    UpdateProfile:{
      screen:UpdateProfile,
    },
    CancelledSubscriptions:{
      screen:CancelledSubscriptions,
    },
    CompletedSubscriptions:{
      screen:CompletedSubscriptions,
    },
    ChangeAddress:{
      screen:ChangeAddress
    },
    MyMenu:{
      screen:MyMenu,
    },
    ProductSearch:{
      screen:ProductSearch
    }
  },
  {
    initialRouteName:'LaunchPage',
  }
  )

  export default AppRoutes;