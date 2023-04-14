import {
  View,
  Pressable,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Home, Heart, ShoppingBag } from "react-native-feather";
import { useSelector } from "react-redux";

function CustomTabs({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const cart = useSelector((state: any) => state.cart);
  const totalproduct = cart?.products.reduce(
    (acc: any, item: any) => acc + item.quantity,
    0
  );

  return (
    <View style={styles.mainContainer}>
      {state.routes.slice(0, 3).map((route: any, index: any) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            key={index}
            onLongPress={onLongPress}
            style={[
              styles.mainItemContainer,
              { borderRightWidth: label == "notes" ? 3 : 0 },
            ]}>
            <Pressable
              onPress={onPress}
              style={{
                borderRadius: 20,
              }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                  padding: 15,
                  position: "relative",
                }}>
                {label == "Home" && (
                  <Home
                    stroke={isFocused ? "#000" : "#B0B0B0"}
                    width={20}
                    height={22.5}
                  />
                )}
                {label == "Favorites" && (
                  <Heart
                    stroke={isFocused ? "#000" : "#B0B0B0"}
                    width={20}
                    height={22.5}
                  />
                )}
                {label == "Basket" && (
                  <View>
                    {totalproduct > 0 && (
                      <View style={styles.bagContainer}>
                        <Text style={styles.bagText}>{totalproduct}</Text>
                      </View>
                    )}
                    <ShoppingBag
                      stroke={isFocused ? "#000" : "#B0B0B0"}
                      width={20}
                      height={22.5}
                    />
                  </View>
                )}
                {isFocused && <Text style={styles.mainItemText}>{label}</Text>}
              </View>
            </Pressable>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default CustomTabs;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#E2E2E2",
    height: 90,
    width: "100%",
    borderRadius: 30,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 1,
    borderColor: "#333B42",
  },
  mainItemText: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
  },
  bagContainer: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "#D90000",
    borderRadius: 10,
    zIndex: 1,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bagText: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "Inter-Bold",
  },
});
