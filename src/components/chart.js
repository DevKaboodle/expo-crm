import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get("window").width;
const maxChartWidth = 400; 

const chartConfig = {
  backgroundGradientFrom: "#f7f7f7",
  backgroundGradientTo: "#ffffff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,  // ✅ Function required
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false
};

export default function Chart({ data, type, onYearChange, selectedYear }) {
  return (
    <View>
      {type === 'bar' && (
        <View>
          <Picker selectedValue={selectedYear} onValueChange={onYearChange}>
            <Picker.Item label="2023" value="2023" />
            <Picker.Item label="2024" value="2024" />
          </Picker>
          <BarChart
            data={data}
            width={Math.min(screenWidth - 40, maxChartWidth)} 
            height={220}
            chartConfig={chartConfig}  // ✅ Ensure chartConfig is passed properly
            verticalLabelRotation={30}
          />
        </View>
      )}

      {type === 'pie' && (
        <PieChart
          data={data}
          width={Math.min(screenWidth - 40, maxChartWidth)} 
          height={220}
          chartConfig={chartConfig}  // ✅ Ensure chartConfig is passed properly
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
    </View>
  );
}
