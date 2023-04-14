import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import FavroitesCard from "../components/favoritesCard";
import { removeFromFavorites } from "../utils/favoritesReducer";

const FavoritesPage = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites);

  const handleRemoveFavoriteClick = (id: number) => {
    dispatch(removeFromFavorites(id));
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favorites.favoriteProducts}
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        renderItem={({ item }) => (
          <FavroitesCard
            item={item}
            navigation={navigation}
            handleRemoveFavoriteClick={handleRemoveFavoriteClick}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default FavoritesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
