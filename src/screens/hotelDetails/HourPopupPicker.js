import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    FlatList,
    Pressable,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HourPopupPicker = ({
    hoursArray = [],
    selectedHour,
    disabled = false,
    onChange,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <View>
            {/* Trigger (select box jaisa) */}
            <TouchableOpacity
                style={[
                    styles.trigger,
                    disabled && { opacity: 0.5 }
                ]}
                disabled={disabled}
                onPress={() => setOpen(true)}
            >
                <Ionicons name="time-outline" size={16} color="#000" />
                <Text style={styles.triggerText}>
                    {selectedHour || "Check-In Time"}
                </Text>
            </TouchableOpacity>

            {/* Popup */}
            <Modal
                visible={open}
                transparent
                animationType="slide"
                statusBarTranslucent={true}
            >
                <Pressable style={styles.backdrop} onPress={() => setOpen(false)} />

                <View style={styles.sheet}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Select Check-in Time</Text>
                        <TouchableOpacity onPress={() => setOpen(false)}>
                            <Ionicons name="close" size={28} />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={hoursArray}
                        keyExtractor={(item) => item}
                        numColumns={3}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 40 }}
                        renderItem={({ item }) => {
                            const active = selectedHour === item;
                            return (
                                <TouchableOpacity
                                    style={[styles.slot, active && styles.slotActive]}
                                    onPress={() => {
                                        onChange(item);
                                        setOpen(false);
                                    }}
                                >
                                    <Text style={[styles.slotText, active && styles.slotTextActive]}>
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            );
                        }}
                    />
                </View>
            </Modal>
        </View>
    );
};


export default HourPopupPicker;

const styles = StyleSheet.create({
    trigger: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#eee',
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 12,
        // marginTop: 10,
        // marginBottom: 10
    },
    triggerText: {
        fontSize: 12,
        color: "#000",
        fontWeight: "600",
        marginLeft: 2,
    },
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
    },
    sheet: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 16,
        paddingTop: 14,
        maxHeight: "70%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 70,
        paddingBottom: 12,
        marginBottom: 12,
    },
    title: {
        fontSize: 17,
        fontWeight: "700",
        color: "#111827",
    },
    slot: {
        flex: 1,
        borderRadius: 12,
        borderColor: '#ddd',
        borderWidth: 1,
        alignItems: "center",
        paddingVertical: 14,
        margin: 6,
    },
    slotActive: {
        backgroundColor: "#28a745",
    },
    slotText: {
        fontSize: 14,
        fontWeight: "600",
        color: "#111827",
    },
    slotTextActive: {
        color: "#fff",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        gap: 10,
        padding: 14,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#e5e7eb",
    },
    cancelBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#e5e7eb",
        alignItems: "center",
    },
    cancelText: {
        fontWeight: "600",
        color: "#111827",
    },
    confirmBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: "#2563eb",
        alignItems: "center",
    },
    confirmText: {
        fontWeight: "600",
        color: "#fff",
    },
});
