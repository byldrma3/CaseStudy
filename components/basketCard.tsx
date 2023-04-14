import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../types";
import { truncate } from "../hook/truncate";
import { Trash2 } from "react-native-feather";
import { removeFromCart, addToCart } from "../utils/cartReducer";
import { useDispatch, useSelector } from "react-redux";

interface CardProps {
  product: Product;
  navigation: any;
}

const BasketCard = ({ product, navigation }: CardProps) => {
  const cart = useSelector((state: any) => state.cart);
  const cartItem = cart.products.find((item: any) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const dispatch = useDispatch();
  const handleNavigate = () => {
    navigation.navigate("ProductDetail", { id: product.id });
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleHardRemoveFromCart = () => {
    dispatch(
      removeFromCart({
        id: product.id,
        type: "hard",
      })
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handleNavigate}>
      <View style={styles.cardImageContainer}>
        <Image
          style={styles.cardImage}
          source={{
            uri: product.thumbnail,
          }}
        />
        <View>
          <Text style={styles.cardTitle}>{truncate(product.title)}</Text>
          <Text style={styles.cardDescription}>
            {truncate(product.description)}
          </Text>
        </View>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity
          style={styles.increaseOperation}
          onPress={handleRemoveFromCart}>
          <Text>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity
          style={styles.increaseOperation}
          onPress={handleAddToCart}>
          <Text>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginLeft: 6.5 }}
          onPress={handleHardRemoveFromCart}>
          <Trash2 color={"red"} width={16} height={16} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BasketCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 10,
    marginBottom: 13,
  },
  cardImageContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 70,
    height: 40,
    marginRight: 4,
  },
  cardTitle: {
    fontSize: 12,
    color: "#1C1C1C",
    fontFamily: "Inter-Bold",
  },
  cardDescription: {
    fontSize: 10,
    color: "#9B9B9B",
    fontFamily: "Inter-Regular",
  },
  cardActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  increaseOperation: {
    width: 20,
    height: 20,
    backgroundColor: "#A7A7A7",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  quantity: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    marginHorizontal: 6,
  },
});
