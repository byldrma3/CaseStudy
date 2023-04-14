import React, { useEffect } from "react";
import {
  Text,
  Dimensions,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAxios } from "../../hook/useAxios";
import { ApiRoutes } from "../../api/apiRoutes";
import { RouteProp } from "@react-navigation/native";
import { StackParamList } from "../../navigators/BottomTabs";
import { Product } from "../../types";
import { Spinner } from "../../components/spinner";
import Carousel from "react-native-reanimated-carousel";
import { calculateDiscountedPrice } from "../../hook/discountedPrice";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/cartReducer";

type DetailScreenRouteProp = RouteProp<StackParamList, "ProductDetail">;

interface ProductDetailProps {
  route: DetailScreenRouteProp;
}

const { width } = Dimensions.get("window");

const ProductDetailPage = ({ route }: ProductDetailProps) => {
  const dispatch = useDispatch();
  const { id } = route.params;
  const [loading, data, error, request] = useAxios<Product>({
    method: "GET",
    url: ApiRoutes.Product + "/" + id,
  });
  const [addToCardLoaing, setAddToCardLoading] = React.useState<boolean>(false);

  useEffect(() => {
    request();
  }, [id]);

  const handleAddToCartClick = () => {
    const product = data as Product;
    dispatch(addToCart(product));
    setAddToCardLoading(true);
    setTimeout(() => {
      setAddToCardLoading(false);
    }, 1000);
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Hata oluştu</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Carousel
          loop
          width={width}
          height={width / 1.5}
          autoPlay={false}
          data={data?.images || []}
          scrollAnimationDuration={1000}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
              }}>
              <Image
                source={{ uri: data?.images[index] }}
                style={{
                  width: width,
                  height: width / 1.5,
                  resizeMode: "cover",
                }}
              />
            </View>
          )}
        />
        <View style={styles.itemContainer}>
          <View style={styles.itemHeader}>
            <Text style={styles.title}>{data?.title}</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{data?.price}TL</Text>
              <Text style={styles.discount}>
                {calculateDiscountedPrice(data as Product).toFixed()}TL
              </Text>
            </View>
          </View>
          <Text style={styles.description}>{data?.description}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.addToCartBtn,
          addToCardLoaing && { backgroundColor: "green" },
        ]}
        onPress={handleAddToCartClick}>
        {addToCardLoaing && <ActivityIndicator size='small' color='#fff' />}
        <Text
          style={[
            styles.btnText,
            addToCardLoaing && { color: "#fff", marginLeft: 6 },
          ]}>
          {addToCardLoaing ? "ADDED TO YOUR CART" : "ADD TO CART"}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProductDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 90,
  },
  itemContainer: {
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
    color: "#1C1C1C",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  price: {
    fontSize: 12,
    color: "#7E7E7E",
    fontFamily: "Inter-Bold",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
    marginRight: 3,
  },
  discount: {
    fontSize: 15,
    color: "#1C1C1C",
    fontFamily: "Inter-Bold",
  },
  description: {
    fontSize: 13,
    color: "#645E5E",
  },
  addToCartBtn: {
    flexDirection: "row",
    backgroundColor: "#BAB9B9",
    marginHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
  },
});
