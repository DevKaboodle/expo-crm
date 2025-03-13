import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Card from '../components/card';
import Table from '../components/table';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Card title="Total Sales" value="1,995" />
        <Card title="Daily Visits" value="2,001" />
      </View>
      <View style={styles.row}>
        <Card title="Total Income" value="$2,632" />
        <Card title="Total Orders" value="1,711" />
      </View>
      <Table 
        headers={["Order Id", "User", "Total Price", "Date", "Status"]} 
        data={[["#OD1711", "John Doe", "$900", "17 Jun 2021", "Shipping"]]} 
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
