import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

export default function Table({ headers, data }) {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(
      data.filter(row => row.some(cell => cell.toLowerCase().includes(search.toLowerCase())))
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
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((cell, index) => (
              <Text key={index} style={styles.cell}>{cell}</Text>
            ))}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 10, borderRadius: 10, marginVertical: 20 },
  search: { padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 5, marginBottom: 10 },
  header: { flexDirection: 'row', borderBottomWidth: 2, paddingBottom: 5 },
  headerText: { flex: 1, fontWeight: 'bold' },
  row: { flexDirection: 'row', borderBottomWidth: 1, paddingVertical: 5 },
  cell: { flex: 1, textAlign: 'center' },
});
