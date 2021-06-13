import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const CoinItem = ({ coin }) => {
  return (
    <View style={styles.containerItem}>
      <View style={styles.coinName}>
        <Image source={{ uri: coin.image }} style={styles.image} />
        <View style={styles.containerName}>
          <Text style={styles.text}>{coin.name}</Text>
          <Text style={styles.textSymbol}>{coin.symbol}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textPrice}>{coin.current_price}</Text>
        <Text
          style={[
            styles.pricePercentage,
            coin.price_change_percentage_24h > 0
              ? styles.priceUp
              : styles.priceDown,
          ]}
        >
          {coin.price_change_percentage_24h}
        </Text>
      </View>
    </View>
  );
};

export default CoinItem;

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: "#121212",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  coinName: {
    flexDirection: "row",
  },
  text: {
    color: "#ffffff",
  },
  image: {
    height: 30,
    width: 30,
  },
  textSymbol: {
    color: "#434343",
    textTransform: "uppercase",
  },
  containerName: {
    marginLeft: 10,
  },
  pricePercentage: {
    textAlign: "right",
  },
  textPrice: {
    color: "#fff",
    textAlign: "right",
  },
  priceUp: {
    color: "#00B5B9",
  },
  priceDown: {
    color: "#fc4422",
  },
});