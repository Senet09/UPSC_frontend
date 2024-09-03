import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
const averageMarks=43 
const accuracyPercentage=70
const attemptPercentage =80
const Highlights = () => {
  const data = {
    labels: ['Average Marks', 'Accuracy', 'Attempt'],
    datasets: [
      {
        data: [averageMarks, accuracyPercentage, attemptPercentage],
        color: (opacity = 1) => `rgba(0, 64, 128, ${opacity})`, // Dark blue color
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#f0f0f0',
    backgroundGradientTo: '#f0f0f0',
    color: (opacity = 1) => `rgba(0, 64, 128, ${opacity})`, // Dark blue color
    strokeWidth: 2,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Performance Highlights</Text>
      <BarChart
        data={data}
        width={400} // Increased chart width
        height={250} // Increased chart height
        yAxisSuffix="%"
        chartConfig={chartConfig}
        style={styles.chart}
        showValuesOnTopOfBars
        fromZero
      />
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Average Marks</Text>
          <Text style={styles.statValue}>{averageMarks}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Accuracy</Text>
          <Text style={styles.statValue}>{accuracyPercentage}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Attempt</Text>
          <Text style={styles.statValue}>{attemptPercentage}%</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0078ff',
  },
  chart: {
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 4,
  },
  statLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statValue: {
    fontSize: 18,
    color: '#0078ff',
  },
});

export default Highlights;
