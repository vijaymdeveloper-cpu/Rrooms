import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Counter = ({ label, value, setValue }) => {

    return (
        <View style={styles.counterBox}>
            <Text style={styles.counterLabel}>{label}</Text>

            <View style={styles.counter}>
                <TouchableOpacity
                    style={styles.counterBtn}
                    onPress={() => value > 0 && setValue(value - 1)}
                >
                    <Text style={styles.counterText}>−</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setValue(value + 1)}
                >
                    <Text >{value}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.counterBtn}
                    onPress={() => setValue(value + 1)}
                >
                    <Text style={styles.counterText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Counter;

const styles = StyleSheet.create({
    counterBox: { width: '30%', },
    counterLabel: {
        fontWeight: '500',
        marginBottom: 5,
    },
    counter: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e8fcedff',
        borderRadius: 36,
        overflow: 'hidden',
    },
    counterValue: {
        height: 40,
        fontSize: 14,
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    counterBtn: {
        height: 40,
        fontSize: 18,
        justifyContent: 'center',
        paddingHorizontal: 18,
    },
})