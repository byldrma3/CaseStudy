import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeft } from "react-native-feather";

const CheckoutPage = ({ navigation }: any) => {
  const handleBackClick = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackClick}>
          <ChevronLeft color={"#000"} />
        </TouchableOpacity>
        <Text>Checkout</Text>
        <Text></Text>
      </View>
      <View style={styles.container}>
        <TextInput placeholder='Name' style={styles.input} />
        <TextInput placeholder='EMAIL' style={styles.input} />
        <TextInput placeholder='PHONE' style={styles.input} />
      </View>
    </SafeAreaView>
  );
};

export default CheckoutPage;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 29,
    paddingHorizontal: 20,
  },
  container: {
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B9B9B9",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 17,
    marginBottom: 10,
  },
});
