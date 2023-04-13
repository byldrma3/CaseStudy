import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabs from "./components/CustomTabs";
import HomePage from "../pages/home";
import FavoritesPage from "../pages/favorites";
import BasketPage from "../pages/basket";
import ProductDetailPage from "../pages/productDetail";

export type StackParamList = {
  Home: undefined;
  Favorites: undefined;
  Basket: undefined;
  ProductDetail: { id: number };
};

const Tab = createBottomTabNavigator<StackParamList>();

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabs {...props} />}>
      <Tab.Screen name='Home' component={HomePage} />
      <Tab.Screen name='Favorites' component={FavoritesPage} />
      <Tab.Screen name='Basket' component={BasketPage} />
      <Tab.Screen name='ProductDetail' component={ProductDetailPage} />
    </Tab.Navigator>
  );
};

export default MyTabs;
