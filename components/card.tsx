import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Product } from "../types";
import { truncate } from "../hook/truncate";
import { calculateDiscountedPrice } from "../hook/discountedPrice";

interface CardProps {
  product: Product;
  navigation: any;
}

const Card = ({ product, navigation }: CardProps) => {
  const discountedPrice = calculateDiscountedPrice(product).toFixed();
  const handleNavigate = () => {
    navigation.navigate("ProductDetail", { id: product.id });
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
      <View>
        <Text style={styles.cardDiscount}>{discountedPrice} TL</Text>
        <Text style={styles.cardPrice}>{product.price} TL</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

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
  cardDiscount: {
    fontSize: 12,
    color: "#1C1C1C",
    fontFamily: "Inter-Bold",
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 12,
    color: "#7E7E7E",
    fontFamily: "Inter-Bold",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
});
