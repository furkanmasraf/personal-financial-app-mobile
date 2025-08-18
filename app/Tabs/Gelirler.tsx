import { StyleSheet, Text, View } from "react-native";

export default function Income() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>💵 Gelirler</Text>
      <Text style={styles.subtitle}>Burada gelir kayıtlarını göreceksin.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginTop: 8,
  },
});
