import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import BasketCard from "../components/basketCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../navigators/BottomTabs";

interface ProductDetailProps {
  navigation: StackNavigationProp<StackParamList, "Home">;
}

const BasketPage = ({ navigation }: ProductDetailProps) => {
  const cart = useSelector((state: any) => state.cart);
  const handleCheckoutClick = () => {
    navigation.navigate("Checkout");
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={cart?.products}
        renderItem={({ item }) => (
          <BasketCard product={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContainer}
      />
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <View style={styles.price}>
            <Text style={styles.priceText}>Price:</Text>
            <Text style={styles.priceText}>{cart?.totalPrice} TL</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>Discount:</Text>
            <Text style={styles.priceText}>{cart?.totalPrice} TL</Text>
          </View>
          <View style={styles.price}>
            <Text style={styles.priceText}>Total:</Text>
            <Text style={styles.priceText}>{cart?.totalPrice} TL</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={handleCheckoutClick}>
          <Text style={styles.btnText}>CHECKOUT</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BasketPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatListContainer: {
    paddingHorizontal: 22,
    minHeight: "100%",
  },
  footer: {
    padding: 22,
    position: "absolute",
    bottom: 0,
    paddingBottom: 110,
    width: "100%",
    backgroundColor: "#F2F2F2",
  },
  addToCartBtn: {
    flexDirection: "row",
    backgroundColor: "#BAB9B9",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
  priceContainer: {
    marginBottom: 52,
  },
  price: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
  },
});
