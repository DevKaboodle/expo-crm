import React, { useState,useEffect } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from "react-native";
import Table from "../components/table"; // Ensure you import the Table component
import DynamicForm from "../components/dynamicForm"; // Ensure you import the DynamicForm component
import apiService from "../apiService"; // Ensure this is correctly set up

export default function ProductsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const products = await apiService.getProducts().then(res => res.data);

      console.log(products)
      setProducts(products || []); // Ensure it's always an array
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Fallback to empty array
    }
  };

  const productFields = [
    { name: "title", label: "Title", type: "text" },
    { name: "sku", label: "SKU", type: "text" },
    { name: "description", label: "Description", type: "text" },
    { name: "price", label: "Price", type: "number" },
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
      fetchProducts(); // Refresh product list after adding
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

      {/* Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Product</Text>
            <DynamicForm fields={productFields} onSubmit={handleSubmit} />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  addButton: { backgroundColor: "#3498db", padding: 10, borderRadius: 5, marginBottom: 10 },
  addButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold", textAlign: "center" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  closeButton: { backgroundColor: "#e74c3c", padding: 10, borderRadius: 5, marginTop: 10 },
  closeButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});