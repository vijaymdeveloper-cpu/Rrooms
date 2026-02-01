import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { TRAVEL_OPTIONS } from "@constants";

const TravelerChoice = ({ commonStyles, onViewAll, handleFilterByTravelChoise }) => {
  return (
    <View style={[commonStyles.mt_3, commonStyles.mb_3]}>
      <View style={[commonStyles.rowBetween]}>
        <Text style={commonStyles.text_4}>Explore by Traveler’s choice</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContainer, { paddingVertical: 16 }]}
      >
        {TRAVEL_OPTIONS?.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} onPress={() => handleFilterByTravelChoise(item)}>
            <Image source={{ uri: item?.img }} style={styles.cardImage} />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardTitle}>{item?.title}</Text>
              <Text style={styles.cardSubtitle}>{item?.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default TravelerChoice;


const styles = StyleSheet.create({
  card: {
    width: 265,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    marginRight: 14,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  cardImage: {
    width: "100%",
    height: 270,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    position: "absolute",
    bottom: 35,
    left: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#fff",
    position: "absolute",
    bottom: 10,
    left: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
})