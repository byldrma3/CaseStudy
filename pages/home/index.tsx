import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeHeader from "./components/header";
import Card from "../../components/card";
import { useAxios } from "../../hook/useAxios";
import { ApiRoutes } from "../../api/apiRoutes";
import { ProductData } from "../../types";
import { Spinner } from "../../components/spinner";

const HomePage = () => {
  const [loading, data, error] = useAxios<ProductData>({
    method: "GET",
    url: ApiRoutes.Product,
  });

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
          ListHeaderComponent={<HomeHeader size={data?.products.length} />}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card product={item} />}
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
    paddingBottom: 32,
    paddingHorizontal: 22,
  },
});
