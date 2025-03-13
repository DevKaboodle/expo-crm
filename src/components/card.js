import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title, value, icon }) => {
  return (
    <View style={styles.card}>
      {icon}
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
    margin: 10,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Card;