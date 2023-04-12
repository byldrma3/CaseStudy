import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabs from "./components/CustomTabs";
import HomePage from "../pages/home";
import FavoritesPage from "../pages/favorites";
import BasketPage from "../pages/basket";

const Tab = createBottomTabNavigator();

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
    </Tab.Navigator>
  );
};

export default MyTabs;
