import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import InfoRuta from "./InfoRuta";
import firebase from "firebase";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Skarmar/Loading";
import moment from "moment";
import colors from "../colors";

function ChartComponent({ thePoints }) {
  const [isLoading, setLoading] = useState(true);
  const [timeSeries, setTimeseries] = useState([]);
  const windowWidth = Dimensions.get("window").width;
  const dataRef = firebase.firestore().collection("timeline");
  const allIDs = ["dataU1", "dataU2", "dataU3", "dataU4", "dataU5", "dataU6"];
  const [topList, setToplist] = useState([]);
  const [nameList, setNamelist] = useState([]);
  const colorMap = {
    Erik: "#4a84e8",
    Nathan: "#db5757",
    Hugo: "#ffcc33",
    Ivar: "#88bd75",
    Andreas: "#8b76bc",
    Petter: "#f49c3e",
  };

  useEffect(() => {
    // getPeople();
    getData();
  }, []);

  function getPeople() {
    const colorList = [];
    const nameList = [];

    allIDs.forEach((id, index) => {
      const color = colorMap[thePoints[index].name];
      nameList.push(thePoints[index].name);
      colorList.push(color);
    });

    // setToplist(colorList);
    return [nameList, colorList];
  }

  async function getData() {
    const rawDataList = [];
    const data = [];

    allIDs.forEach((id) => {
      dataRef
        .doc(id)
        .get()
        .then((data) => {
          rawDataList.push(data.data());
        })
        .then(() => {
          // Workaround because of datarace
          if (id == "dataU6") {
            const ans = getPeople();
            const nameList = ans[0];
            const colorList = ans[1];
            //Set x-axis
            rawDataList[0].x.forEach((x) => {
              const a = moment(x.toDate()).format("dddd");
              const newPoint = { x: a };
              data.push(newPoint);
            });

            // Fill y-values

            rawDataList.forEach((dataObj, pIndex) => {
              const max = dataObj.y.length - 1;

              dataObj.y.forEach((y, index) => {
                if (index == max) {
                  data[index][nameList[pIndex]] = thePoints[pIndex].points;
                } else {
                  data[index][nameList[pIndex]] = y;
                }
              });
            });
            // console.log(data);
            setToplist(colorList);
            setNamelist(nameList);
            setTimeseries(data);
            setLoading(false);
          }
        });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loading namn="Loading graph..."></Loading>
      ) : (
        <LineChart
          width={windowWidth - 20}
          height={windowWidth - 20}
          data={timeSeries}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          {/* <XAxis dataKey="x" /> */}
          {/* <YAxis /> */}
          <Tooltip />
          {/* <Legend /> */}
          {nameList.map((id, index) => (
            <Line
              dot={false}
              key={id}
              type="monotone"
              dataKey={id}
              stroke={topList[index]}
              strokeWidth={4}
            />
          ))}
          {/* <Line
            type="monotone"
            dataKey="dataU1"
            stroke="#82ca9d"
            strokeWidth={4}
          /> */}
          {/* <Legend></Legend> */}
        </LineChart>
      )}
    </>
  );
}

const styles = StyleSheet.create({});

export default ChartComponent;
