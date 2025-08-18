import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function Income() {
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [incomes, setIncomes] = useState<any[]>([]);

  const handleAddIncome = () => {
    if (type && amount) {
      setIncomes([...incomes, { type, amount: parseFloat(amount) }]);
      setType("");
      setAmount("");
    }
  };

  // Pie Chart için veriyi hazırlama
  const chartData = incomes.map((item, index) => ({
    name: item.type,
    population: item.amount,
    color: chartColors[index % chartColors.length],
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      {/* Sol üst köşede daire grafik */}
      {incomes.length > 0 && (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width * 0.45}
          height={180}
          chartConfig={chartConfig}
          accessor={"population"}
          backgroundColor={"transparent"}
          paddingLeft={"10"}
          absolute
        />
      )}

      {/* Form Alanı */}
      <TextInput
        style={styles.input}
        placeholder="Gelir Türü (Maaş, Kira...)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Miktar"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddIncome}>
        <Text style={styles.addButtonText}>Ekle</Text>
      </TouchableOpacity>

      {/* Liste */}
      <FlatList
        data={incomes}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.type}</Text>
            <Text style={styles.itemAmount}>{item.amount} ₺</Text>
          </View>
        )}
      />
    </View>
  );
}

const chartColors = ["#4CAF50", "#2196F3", "#FFC107", "#E91E63", "#9C27B0"];

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
  },
});
