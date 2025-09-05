import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function ExpenseScreen() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [category, setCategory] = useState("Yemek");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const data = [
    { name: "Yemek", amount: expenses.filter(e => e.category === "Yemek").reduce((s, e) => s + e.amount, 0), color: "#FF6384" },
    { name: "Ulaşım", amount: expenses.filter(e => e.category === "Ulaşım").reduce((s, e) => s + e.amount, 0), color: "#36A2EB" },
    { name: "Eğlence", amount: expenses.filter(e => e.category === "Eğlence").reduce((s, e) => s + e.amount, 0), color: "#FFCE56" },
    { name: "Diğer", amount: expenses.filter(e => e.category === "Diğer").reduce((s, e) => s + e.amount, 0), color: "#4BC0C0" },
  ];

  const addExpense = () => {
    if (!amount) return;
    const newExpense = { id: Date.now(), category, amount: parseFloat(amount), note };
    setExpenses([...expenses, newExpense]);
    setAmount("");
    setNote("");
    Keyboard.dismiss(); // Klavyeyi kapat
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#f9f9f9" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        {/* Toplam Gider */}
        <View style={{ backgroundColor: "#007BFF", padding: 16, borderRadius: 12, marginBottom: 20 }}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>Toplam Gider</Text>
          <Text style={{ color: "#fff", fontSize: 24, fontWeight: "bold" }}>{total} ₺</Text>
        </View>

        {/* Grafik */}
        <PieChart
          data={data.filter(d => d.amount > 0).map(d => ({
            name: d.name,
            population: d.amount,
            color: d.color,
            legendFontColor: "#333",
            legendFontSize: 12,
          }))}
          width={screenWidth - 30}
          height={180}
          chartConfig={{ color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})` }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />

        {/* Form */}
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>Kategori</Text>
          <Picker selectedValue={category} onValueChange={setCategory} style={{ backgroundColor: "#fff", borderRadius: 8 }}>
            <Picker.Item label="Yemek" value="Yemek" />
            <Picker.Item label="Ulaşım" value="Ulaşım" />
            <Picker.Item label="Eğlence" value="Eğlence" />
            <Picker.Item label="Diğer" value="Diğer" />
          </Picker>

          <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 10 }}>Tutar</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="₺0.00"
            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10, marginTop: 5 }}
          />

          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Not</Text>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Açıklama ekle..."
            style={{ backgroundColor: "#fff", padding: 10, borderRadius: 8, marginBottom: 10, marginTop: 5 }}
          />

          <TouchableOpacity
            onPress={addExpense}
            style={{ backgroundColor: "#007BFF", padding: 14, borderRadius: 8, alignItems: "center" }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Gider Ekle</Text>
          </TouchableOpacity>
        </View>

        {/* Liste */}
        <FlatList
          style={{ marginTop: 20 }}
          data={expenses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 14,
                borderRadius: 10,
                marginBottom: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.category}</Text>
                {item.note ? <Text style={{ color: "#555" }}>{item.note}</Text> : null}
              </View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: "#E63946" }}>-{item.amount} ₺</Text>
            </View>
          )}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
