import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigator } from "./navigators/StackNavigation";

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StackNavigator />
    </SafeAreaView>
  );
}
