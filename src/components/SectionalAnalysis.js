import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const LineChartPage = () => {
  const data = [
    {
      subject: 'Math',
      score: 80,
    },
    {
      subject: 'English',
      score: 60,
    },
    {
      subject: 'Science',
      score: 75,
    },
    {
      subject: 'History',
      score: 85,
    },
    {
      subject: 'Art',
      score: 90,
    },
  ];

  const chartConfig = {
    backgroundGradientFrom: '#f1f1f1',
    backgroundGradientTo: '#f1f1f1',
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Use a blue color
    strokeWidth: 2,
  };

  const renderSubjectItem = (item) => (
    <TouchableOpacity key={item.subject} style={styles.subjectItem} onPress={() => handleSubjectPress(item)}>
      <Icon name="book-outline" size={24} color="#3498db" style={styles.icon} />
      <Text style={styles.subjectName}>{item.subject}</Text>
      <Text style={styles.subjectScore}>{item.score}%</Text>
    </TouchableOpacity>
  );

  const handleSubjectPress = (item) => {
    // Handle the click event for the subject item
    console.log(`Clicked on ${item.subject}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Sectional Analysis</Text>
      <LineChart
        data={{
          labels: data.map((item) => item.subject),
          datasets: [
            {
              data: data.map((item) => item.score),
            },
          ],
        }}
        width={300}
        height={300}
        chartConfig={chartConfig}
        style={styles.chart}
      />
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Subject List:</Text>
        {data.map(renderSubjectItem)}
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
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  listContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#000"
  },
  subjectItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  icon: {
    marginRight: 10,
  },
  subjectName: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  subjectScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
});

export default LineChartPage;
