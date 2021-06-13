import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  FlatList,
  TextInput,
} from "react-native";

import CoinItem from "./components/CoinItem";

export default function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const takeDataCoins = async () => {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&parkline=false"
    );
    const data = await res.json();
    setCoins(data);
  };

  useEffect(() => {
    takeDataCoins();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#141414" />
      <View style={styles.header}>
        <Text style={styles.title}>CriptoMonedas</Text>
        <TextInput
          placeholder="Search a Coin"
          placeholderTextColor="#858585"
          style={styles.search}
          onChangeText={(text) => setSearch(text)}
        />
      </View>
      <FlatList
        refreshing={refreshing}
        onRefresh={async () => {
          setRefreshing(true);
          await takeDataCoins();
          setRefreshing(false);
        }}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )}
        renderItem={({ item }) => {
          return <CoinItem coin={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141414",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    marginTop: 10,
    fontSize: 20,
  },
  list: {
    width: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  search: {
    color: "#ffff",
    borderBottomColor: "#4657ce",
    borderBottomWidth: 1,
    textAlign: "center",
    width: "40%",
  },
});
