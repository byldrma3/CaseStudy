import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Text,
} from "react-native";
import { Heart } from "react-native-feather";
import { truncate } from "../hook/truncate";
import { useDispatch } from "react-redux";
import { addToCart } from "../utils/cartReducer";

const { width } = Dimensions.get("window");

const FavroitesCard = ({
  item,
  handleRemoveFavoriteClick,
  navigation,
}: any) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    navigation.navigate("ProductDetail", { id: item.id });
  };

  const handleAddToCart = () => {
    dispatch(addToCart(item));
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigate}>
      <View style={{ position: "relative" }}>
        <Image source={{ uri: item.thumbnail }} style={styles.image} />
        <View style={styles.imagesfavorites}>
          <TouchableOpacity
            style={styles.favoritesHeart}
            onPress={() => handleRemoveFavoriteClick(item.id)}>
            <Heart width={20} height={20} color={"#D90000"} fill={"#D90000"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 5, marginBottom: 11, paddingHorizontal: 4 }}>
        <Text style={styles.title}>{truncate(item.title)}</Text>
        <Text style={styles.description}>{truncate(item.description)}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.price}>{item.price} TL</Text>
          <TouchableOpacity style={styles.bagBtn} onPress={handleAddToCart}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FavroitesCard;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 30,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
  image: {
    width: "100%",
    height: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imagesfavorites: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  favoritesHeart: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    color: "#1C1C1C",
    marginBottom: 2,
  },
  description: {
    fontSize: 10,
    color: "#9B9B9B",
    fontFamily: "Inter-Regular",
    marginBottom: 5,
  },
  price: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    color: "#1C1C1C",
  },
  bagBtn: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
