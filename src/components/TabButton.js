import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const TabButton = ({ label, value, activeValue, onPress }) => {
    const isActive = value === activeValue;

    return (
        <TouchableOpacity
            onPress={() => onPress(value)}
            style={[
                styles.tabItem,
                isActive && styles.tabItemActive,
            ]}
        >
            <Text
                style={[
                    styles.tabLabel,
                    isActive && styles.tabLabelActive,
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
};

export default TabButton;


const styles = StyleSheet.create({
    tabItem: {
        // width: '50%',
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
    },
    tabLabel: {
        color: "#374151",
    },
    tabItemActive: {
        backgroundColor: "#1e90ff",
    },
    tabLabelActive: {
        fontWeight: "600",
        color: "#fff",
    },
})
