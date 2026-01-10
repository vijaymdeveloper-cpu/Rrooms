import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

export default function SearchBox({placeholder = 'Search for City, Location or Hotel Name', height = 58}) {

    const navigation = useNavigation();
    const { searchVal } = useSelector((state)=> state.property)

    return (
        <View style={[styles.searchBox, {height}]}>
            <Icon name="search-outline" size={28} color="#999" />
            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={searchVal}
                style={styles.searchInput}
                onFocus={() => navigation.navigate("Search")}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        shadowColor: "#000",
        elevation: 3,
        paddingHorizontal: 14,
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: "#999",
    },
    searchInput: {
        height: 58,
        fontSize: 16,
        color: '#8E949A',
        borderRadius: 12,
        paddingHorizontal: 10
    },
});