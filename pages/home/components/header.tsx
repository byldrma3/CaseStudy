import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AlignLeft, Filter, Search } from "react-native-feather";

interface HomeHeaderProps {
  size?: number;
}

const HomeHeader = ({ size = undefined }: HomeHeaderProps) => {
  return (
    <View>
      <Text style={styles.title}>
        Ürünler <Text style={styles.subTitle}>(Toplam {size} adet)</Text>
      </Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Search width={13} height={13} color={"#B9B9B9"} />
          <TextInput placeholder='Search Product' style={styles.input} />
        </View>
        <TouchableOpacity style={[styles.btnContainer, { marginRight: 8 }]}>
          <Filter width={13} height={13} color={"#B9B9B9"} />
          <Text style={styles.btnText}>Filter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnContainer}>
          <AlignLeft width={13} height={13} color={"#B9B9B9"} />
          <Text style={styles.btnText}>Sort</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  title: {
    fontSize: 12,
    fontFamily: "Inter-Bold",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#9B9B9B",
  },
  container: {
    flexDirection: "row",
    marginBottom: 33,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B9B9B9",
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginRight: 19,
  },
  input: {
    marginLeft: 3,
    flex: 1,
    flexGrow: 1,
    fontSize: 12,
    fontFamily: "Inter-Regular",
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B9B9B9",
    paddingHorizontal: 4,
  },
  btnText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    marginLeft: 3,
  },
});
