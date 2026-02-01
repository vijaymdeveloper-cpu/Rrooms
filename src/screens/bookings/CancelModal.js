import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Pressable,
    TextInput,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import { commonStyles } from "@assets/styles/commonStyles";
import services from "@api/services";
import { showToast } from '@utils/Toaster'

const reasonsList = [
    "Found a better price",
    "Property detail didn't match",
    "Had a different issue",
    "Facing an issue at the property",
    "Property asked for additional money",
    "Don't need this stay",
];

const CancelModal = ({ show, setShow, bookingData, fetchBookedHotels }) => {

    const [selectedReasons, setSelectedReasons] = useState('');
    const [reasonText, setReasonText] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleReason = (item) => {
        setSelectedReasons((prev) => {
            const arr = prev ? prev.split(",").map(r => r.trim()).filter(Boolean) : [];

            if (arr.includes(item)) {
                return arr.filter(r => r !== item && r !== reasonText.trim()).join(", ");
            } else {
                return [...arr.filter(r => r !== reasonText.trim()), item, ...(reasonText ? [reasonText.trim()] : [])].join(", ");
            }
        });
    };

    const handleReasonTextChange = (text) => {
        setReasonText(text);

        setSelectedReasons((prev) => {
            const arr = prev ? prev.split(",").map(r => r.trim()).filter(Boolean) : [];
            const filteredArr = arr.filter(r => r !== reasonText);
            if (text.trim()) filteredArr.push(text.trim());

            return filteredArr.join(", ");
        });
    };

    const onCancelBooking = async () => {
        const payload = {
            bookingStatus: 4,
            reason: selectedReasons,
            cancelledBy: "guest",
        };
        try {
            setLoading(true);
            const res = await services.changeBookingStatusService(bookingData?.id, payload);
            if (res) {
                setShow(false);
                fetchBookedHotels()
                showToast('message', "Your booking is cancelled.")
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const onClose = () => {
        setShow(false)
        setSelectedReasons('');
        setReasonText('');
        setLoading(false);
    };

    return (
        <Modal
            visible={show}
            transparent
            animationType="slide"
            statusBarTranslucent
        >
            <Pressable style={styles.backdrop} onPress={onClose} />

            <View style={styles.sheet}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Why are you cancelling?</Text>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="close" size={28} />
                    </TouchableOpacity>
                </View>

                {/* Body */}
                <View>
                    {reasonsList.map((item, index) => (
                        <Pressable
                            key={index}
                            style={styles.checkboxRow}
                            onPress={() => toggleReason(item)}
                        >
                            <CheckBox
                                value={selectedReasons.includes(item)}
                                onValueChange={() => toggleReason(item)}
                                tintColors={{
                                    true: '#28a745',
                                    false: '#999999',
                                }}
                            />
                            <Text style={styles.checkboxText}>{item}</Text>
                        </Pressable>
                    ))}

                    <TextInput
                        style={styles.textArea}
                        placeholder="Write your reason here…"
                        value={reasonText}
                        onChangeText={handleReasonTextChange} // use the new handler
                        multiline
                        numberOfLines={4}
                    />

                    <TouchableOpacity
                        style={[
                            commonStyles.btn,
                            commonStyles.btnSecondary,
                            commonStyles.mt_4,
                            loading && { opacity: 0.6 },
                        ]}
                        disabled={loading}
                        onPress={onCancelBooking}
                    >
                        <Text style={commonStyles.btnText}>
                            {loading ? "Submitting..." : "Submit"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default CancelModal;


const styles = StyleSheet.create({
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
        paddingBottom: 25
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#eee',
        height: 70,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    body: {
        padding: 0
    },
    checkboxRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    checkboxText: {
        fontSize: 14,
        color: "#333",
    },
    textArea: {
        backgroundColor: '#eee',
        borderRadius: 8,
        minHeight: 90,
        textAlignVertical: "top",
        padding: 12,
    },
});
