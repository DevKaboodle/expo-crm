import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const DynamicForm = ({ fields, onSubmit }) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({
      ...acc,
      [field.name]: field.type === "select" ? field.options?.[0] || "" : "",
    }), {})
  );
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let valid = true;
    let newErrors = {};

    fields.forEach((field) => {
      if (!formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }

      if (field.type === "email" && formData[field.name]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.name])) {
          newErrors[field.name] = "Enter a valid email";
          valid = false;
        }
      }

      if (field.type === "phone" && formData[field.name]) {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData[field.name])) {
          newErrors[field.name] = "Phone must be 10 digits";
          valid = false;
        }
      }

      if (field.type === "number" && formData[field.name]) {
        if (isNaN(formData[field.name])) {
          newErrors[field.name] = "Must be a valid number";
          valid = false;
        }
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
    } else {
      Alert.alert("Validation Error", "Please fix the errors before submitting.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {fields.map((field) => (
        <View key={field.name} style={styles.inputContainer}>
          <Text style={styles.label}>{field.label}</Text>

          {field.type === "select" ? (
            <Picker
              selectedValue={formData[field.name]}
              onValueChange={(value) => handleChange(field.name, value)}
              style={styles.picker}
            >
              {field.options.map((option) => (
                <Picker.Item key={option} label={option} value={option} />
              ))}
            </Picker>
          ) : (
            <TextInput
              style={[styles.input, errors[field.name] && styles.errorInput]}
              value={formData[field.name]}
              onChangeText={(text) => handleChange(field.name, text)}
              keyboardType={field.type === "number" || field.type === "phone" ? "numeric" : "default"}
              placeholder={`Enter ${field.label}`}
            />
          )}

          {errors[field.name] && <Text style={styles.errorText}>{errors[field.name]}</Text>}
        </View>
      ))}

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const ModalForm = ({ modalVisible, setModalVisible, productFields, handleSubmit }) => {
  return (
    <Modal visible={modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          {/* Close Button (Cross Icon) */}
          <TouchableOpacity style={styles.closeIcon} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeIconText}>✕</Text>
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Add Product</Text>
          <DynamicForm fields={productFields} onSubmit={handleSubmit} />
          
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    width: "90%", // Increased width
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  closeIcon: {
    position: "absolute",
    right: 15,
    top: 10,
    zIndex: 1,
  },
  closeIconText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  container: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    width: "100%",
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "red",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ModalForm;
