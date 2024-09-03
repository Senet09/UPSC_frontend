import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const MarksAnalysisPage = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [80, 85, 90, 88, 92, 95],
      },
    ],
  };

  // Calculate average marks and accuracy (dummy values for illustration)
  const averageMarks = data.datasets[0].data.reduce((sum, mark) => sum + mark, 0) / data.datasets[0].data.length;
  const averageAccuracy = 85; // Dummy value for illustration
  const testAttempts = "5/1200"; // Dummy value for illustration

  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        bezier
        style={styles.chart}
      />

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Average Marks</Text>
          <Text style={styles.statValue}>{averageMarks.toFixed(2)}</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statTitle}>Average Accuracy</Text>
          <Text style={styles.statValue}>{averageAccuracy.toFixed(2)}%</Text>
        </View>
      </View>

      <View style={styles.testAttemptsContainer}>
        <Text style={styles.testAttemptsTitle}>Test Attempts</Text>
        <Text style={styles.testAttemptsValue}>{testAttempts}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 8,
  },
  statTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  testAttemptsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  testAttemptsTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  testAttemptsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default MarksAnalysisPage;
