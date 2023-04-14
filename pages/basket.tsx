import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";

const BasketPage = () => {
  const cart = useSelector((state: any) => state.cart);
  return (
    <SafeAreaView>
      {cart?.products.map((item: any) => (
        <View key={item.id}>
          <Text>{item.title}</Text>
          <Text>{item.quantity}</Text>
        </View>
      ))}
      <Text>{cart.totalPrice}</Text>
    </SafeAreaView>
  );
};

export default BasketPage;
