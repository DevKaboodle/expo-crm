import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import apiService from "../apiService"; // Ensure correct path
import Table from "../components/table";
import ModalForm from "../components/dynamicForm"; // Ensure correct path

export default function ProductsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await apiService.getProducts();
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const productFields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "sku", label: "SKU", type: "text", required: true },
    { name: "description", label: "Description", type: "text" },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "stock", label: "Stock", type: "number" },
    { name: "weight", label: "Weight (grams)", type: "number" },
    { name: "karat", label: "Karat", type: "select", options: ["14K", "18K", "22K", "24K"] },
    { name: "category", label: "Category", type: "text" },
    { name: "status", label: "Status", type: "select", options: ["available", "out of stock", "discontinued"] },
  ];

  const handleSubmit = async (data) => {
    try {
      await apiService.createProduct(data);
      Alert.alert("Success", "Product Created Successfully!");
      setModalVisible(false);
      fetchProducts(); // Refresh the list
    } catch (error) {
      Alert.alert("Error", "Failed to Create Product");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>+ Add Product</Text>
      </TouchableOpacity>

      {/* Table */}
      <Table
        headers={["Order Id", "User", "Total Price", "Date", "Status"]}
        data={products.map((p) => [`#${p._id}`, p.title, `$${p.price}`, "17 Jun 2021", p.status])}
        onView={(item) => console.log("View", item)}
        onEdit={(item) => console.log("Edit", item)}
        onDelete={(item) => console.log("Delete", item)}
      />

      {/* Modal Form */}
      <ModalForm
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        productFields={productFields}
        handleSubmit={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  addButton: { backgroundColor: "#3498db", padding: 10, borderRadius: 5, marginBottom: 10 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
});
