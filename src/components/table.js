import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from "react-native";

export default function Table({ headers, data, onView, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter((row) =>
        row.some((cell) => cell.toLowerCase().includes(search.toLowerCase()))
      )
    );
  }, [search, data]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={
          <View style={styles.header}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.headerText}>{header}</Text>
            ))}
            <Text style={styles.headerText}>Actions</Text>
          </View>
        }
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            {item.map((cell, cellIndex) => (
              <Text key={cellIndex} style={styles.cell}>{cell}</Text>
            ))}
            <View style={styles.actions}>
              <TouchableOpacity style={styles.viewButton} onPress={() => onView(item)}>
                <Text style={styles.actionText}>👁 View</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.editButton} onPress={() => onEdit(item)}>
                <Text style={styles.actionText}>✏ Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item)}>
                <Text style={styles.actionText}>🗑 Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#fff", padding: 10, borderRadius: 10, marginVertical: 20 },
  search: { padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 5, marginBottom: 10 },
  header: { flexDirection: "row", borderBottomWidth: 2, paddingBottom: 5 },
  headerText: { flex: 1, fontWeight: "bold", textAlign: "center" },
  row: { flexDirection: "row", borderBottomWidth: 1, paddingVertical: 5, alignItems: "center" },
  cell: { flex: 1, textAlign: "center" },
  actions: { flexDirection: "row", justifyContent: "space-around", flex: 1 },
  actionText: { color: "#fff", fontWeight: "bold" },
  viewButton: { backgroundColor: "#3498db", padding: 5, borderRadius: 5, marginHorizontal: 2 },
  editButton: { backgroundColor: "#f1c40f", padding: 5, borderRadius: 5, marginHorizontal: 2 },
  deleteButton: { backgroundColor: "#e74c3c", padding: 5, borderRadius: 5, marginHorizontal: 2 },
});
