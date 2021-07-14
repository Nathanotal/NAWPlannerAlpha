import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { LineChart, Line } from "recharts";

function ChartComponent(props) {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];
  return (
    <View>
      <LineChart width={400} height={400} data={data}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      </LineChart>
    </View>
  );
}

const styles = StyleSheet.create({});

export default ChartComponent;
