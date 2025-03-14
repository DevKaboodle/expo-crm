import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../components/card';
import Table from '../components/table';
import Chart from '../components/chart';

export default function HomeScreen() {
  const [products, setProducts] = useState([]);
  const [year, setYear] = useState('2024');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      {/* Cards */}
      <View style={styles.cardContainer}>
        <Card title="Total Sales" value="1,995" />
        <Card title="Daily Visits" value="2,001" />
        <Card title="Total Income" value="$2,632" />
        <Card title="Total Orders" value="1,711" />
      </View>

      {/* Table */}
      <Table 
        headers={["Order Id", "User", "Total Price", "Date", "Status"]} 
        data={products.slice(0, 5).map(p => [`#${p.id}`, p.title, `$${p.price}`, "17 Jun 2021", "Shipped"])}
      />

      {/* Charts */}
      <View style={styles.chartContainer}>
  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
    <Chart 
      type="pie" 
      data={products.slice(0,5).map(p => ({
        name: p.category,
        population: p.stock,
        color: '#'+Math.random().toString(16).slice(-6),
        legendFontColor: '#000' 
      }))}
    />
    <Chart 
      type="bar" 
      data={{
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [{ data: [30, 45, 28] }]
      }} 
      onYearChange={setYear}
    />
  </ScrollView>
</View>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  cardContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 },
});
