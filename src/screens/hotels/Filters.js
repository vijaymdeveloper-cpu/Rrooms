import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TRAVEL_OPTIONS } from '@constants'

const { height } = Dimensions.get("window");

export default function Filters({
  show,
  setShowFilter,
  propertCategories,
  roomCategories,
  fetchProperties,
  filterValues,
  setSearch,
  setFilter,
  dispatch,
  commonStyles }) {

  const filterCheckHandler = (name, id) => {
    let selectedValues = filterValues?.[name] || [];

    let updatedValues;

    if (selectedValues.includes(id)) {
      updatedValues = selectedValues.filter(item => item !== id);
    } else {
      updatedValues = [...selectedValues, id];
    }

    dispatch(setFilter({ [name]: updatedValues }));
  };

  const clearHandler = () => {
    dispatch(
      setFilter({
        propertyCategoryFilter: [],
        roomCategoryFilter: [],
        travellerChoice: [],
        localityFilter: [],
        latlongFilter: { lat: null, long: null },
      })
    );
    dispatch(setSearch(""));
    dispatch(fetchProperties())
  };

  useEffect(() => {
    return () => {
      clearHandler()
    }
  }, [])


  return (
    <View style={{ flex: 1 }}>

      <Modal
        visible={show}
        animationType="slide"
        transparent
      >
        <View style={styles.overlay}>
          <View style={styles.sheet}>

            <View style={styles.header}>
              <Text style={styles.title}>Filters</Text>

              <TouchableOpacity onPress={() => setShowFilter(false)}>
                <Ionicons name="close-outline" size={26} color="#333" />
              </TouchableOpacity>
            </View>

            {/* <Text style={styles.heading}>
              Sort By
            </Text>
            <View style={commonStyles.row}>
              <FilterChip label="Low to High" />
              <FilterChip label="High to Low" />
            </View> */}

            <Text style={styles.heading}>
              Traveller Choice
            </Text>
            <View style={[commonStyles.row, {flexWrap: 'wrap'}]}>
              {TRAVEL_OPTIONS?.map((data) => (
                <FilterChip
                  key={data.id}
                  label={data.title}
                  active={filterValues?.travellerChoice?.includes(data.id)}
                  onPress={() =>
                    filterCheckHandler("travellerChoice", data.id)
                  }
                />
              ))}
            </View>

            <Text style={styles.heading}>
              Property By Category
            </Text>
            <View style={[commonStyles.row, {flexWrap: 'wrap'}]}>
              {propertCategories?.map((data) => (
                <FilterChip
                  key={data.id}
                  label={data.name}
                  active={filterValues?.propertyCategoryFilter?.includes(data.id)}
                  onPress={() =>
                    filterCheckHandler("propertyCategoryFilter", data.id)
                  }
                />
              ))}
            </View>

            <Text style={styles.heading}>
              Rooms By Category
            </Text>
            <View style={[commonStyles.row, {flexWrap: 'wrap'}]}>
              {roomCategories?.map((data) => (
                <FilterChip
                  key={data.id}
                  label={
                    data?.name
                      ? data.name.trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
                      : ""
                  }
                  active={filterValues?.roomCategoryFilter?.includes(data.id)}
                  onPress={() =>
                    filterCheckHandler("roomCategoryFilter", data.id)
                  }
                />
              ))}
            </View>

            <View style={styles.footer}>
              <TouchableOpacity>
                <Text style={{ color: "#666", fontWeight: "600" }} onPress={clearHandler}>
                  Clear All
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.applyBtn} onPress={()=> setShowFilter(false)}>
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Apply
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </Modal>

    </View>
  );
}


const FilterChip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.chip,
      active && {
        backgroundColor: "#FF8C00",
        borderColor: "#FF8C00",
      },
    ]}
  >
    <Text style={{ color: active ? "#fff" : "#333" }}>
      {label}
    </Text>

    {active && (
      <Ionicons
        name="checkmark"
        size={14}
        color="#fff"
        style={{ marginLeft: 6 }}
      />
    )}
  </TouchableOpacity>
);





export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: height * 0.85,
  },

  /* Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },

  heading: {
    marginTop: 18,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    flexDirection: "row",
    alignItems: "center",
  },

  /* Chip */
  chip: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  /* Footer */
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 14,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  applyBtn: {
    backgroundColor: "#1e90ff",
    paddingHorizontal: 28,
    paddingVertical: 10,
    borderRadius: 24,
  },
});
