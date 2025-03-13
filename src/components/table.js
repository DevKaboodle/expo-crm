import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = ({ headers, data }) => {
  return (
    <View style={styles.table}>
      <View style={styles.row}>
        {headers.map((header, index) => (
          <Text key={index} style={styles.header}>{header}</Text>
        ))}
      </View>
      {data.map((row, index) => (
        <View key={index} style={styles.row}>
          {row.map((cell, i) => (
            <Text key={i} style={styles.cell}>{cell}</Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  table: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  cell: {
    fontSize: 14,
  },
});

export default Table;