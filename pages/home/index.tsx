import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "./components/header";
import Card from "../../components/card";
import { useAxios } from "../../hook/useAxios";
import { ApiRoutes } from "../../api/apiRoutes";
import { ProductData, Product } from "../../types";
import { Spinner } from "../../components/spinner";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../navigators/BottomTabs";

type HomePageProps = {
  navigation: StackNavigationProp<StackParamList, "Home">;
};

const HomePage = ({ navigation }: HomePageProps) => {
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );
  const [searchText, setSearchText] = React.useState<string>("");
  const [loading, data, error, request] = useAxios<ProductData>({
    method: "GET",
    url: searchText
      ? `${ApiRoutes.ProductSearch}?q=${searchText}`
      : ApiRoutes.Product,
  });

  function handleSortByPrice() {
    const direction = sortDirection === "asc" ? "desc" : "asc";
    data?.products.sort((a, b) => {
      if (sortDirection === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setSortDirection(direction);
  }

  const handleSearch = () => {
    request();
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Hata oluştu</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainCardContainer}>
        <FlatList
          data={data?.products}
          ListHeaderComponent={
            <HomeHeader
              handleSortByPrice={handleSortByPrice}
              handleSearch={handleSearch}
              searchText={searchText}
              setSearchText={setSearchText}
              size={data?.products.length}
            />
          }
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card product={item} navigation={navigation} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainCardContainer: {
    flex: 1,
    marginTop: 33,
  },
  flatListContainer: {
    paddingBottom: 80,
    paddingHorizontal: 22,
  },
});
