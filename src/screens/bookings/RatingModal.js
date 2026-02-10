import React, { useMemo, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Pressable,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import services from "@api/services";
import { showToast } from '@utils/Toaster'

const RatingModal = ({
    show,
    setShowRatingPopup,
    onSubmit,
    title = "Rate your experience",
    maxStars = 5,
    submitting = false,
    data,
    userDetail
}) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");

    const canSubmit = useMemo(() => rating > 0 && review.trim().length >= 3, [rating, review]);

    const handleSubmit = async () => {
        if (!canSubmit || submitting) return;
        await onSubmit?.({ rating, review: review.trim() });
        const payload = {
            property_id: data.propertyId,
            ratings: rating,
            reviews: review,
            user_id: userDetail?.id,
            bookingCode: data?.bookingCode,
            fromDate: data?.fromDate,
            toDate: data?.toDate
        }
        const res = await services.sendRatingService(payload)
        if (res?.data?.status) {
            showToast('message', 'Rating Submitted')
            handleClose()
        }
    };


    const handleClose = () => {
        if (submitting) return;
        setShowRatingPopup(false)
        setRating(0);
        setReview("");
    };

    return (
        <Modal visible={show} transparent animationType="fade" onRequestClose={handleClose}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.backdrop}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        style={styles.kbWrap}
                    >
                        <TouchableWithoutFeedback>
                            <View style={styles.card}>
                                {/* Header */}
                                <View style={styles.header}>
                                    <Text style={styles.title}>{title}</Text>
                                    <Pressable onPress={handleClose} hitSlop={10} style={styles.closeBtn}>
                                        <Ionicons name="close" size={22} color="#111" />
                                    </Pressable>
                                </View>

                                {/* Stars */}
                                <View style={styles.starRow}>
                                    {Array.from({ length: maxStars }).map((_, i) => {
                                        const starValue = i + 1;
                                        const filled = starValue <= rating;
                                        return (
                                            <Pressable
                                                key={starValue}
                                                onPress={() => setRating(starValue)}
                                                style={styles.starBtn}
                                                hitSlop={8}
                                            >
                                                <Ionicons
                                                    name={filled ? "star" : "star-outline"}
                                                    size={34}
                                                    color={filled ? "#FFB200" : "#B9B9B9"}
                                                />
                                            </Pressable>
                                        );
                                    })}
                                </View>

                                <Text style={styles.hint}>
                                    {rating === 0 ? "Tap stars to rate" : `You rated: ${rating}/${maxStars}`}
                                </Text>

                                {/* Textarea */}
                                <View style={styles.inputWrap}>
                                    <Text style={styles.label}>Write a review</Text>
                                    <TextInput
                                        value={review}
                                        onChangeText={setReview}
                                        placeholder="Tell us what you liked or what we can improve..."
                                        placeholderTextColor="#888"
                                        multiline
                                        numberOfLines={5}
                                        textAlignVertical="top"
                                        style={styles.textArea}
                                        maxLength={500}
                                    />
                                    <Text style={styles.counter}>{review.trim().length}/500</Text>
                                </View>

                                {/* Submit */}
                                <Pressable
                                    onPress={handleSubmit}
                                    disabled={!canSubmit || submitting}
                                    style={({ pressed }) => [
                                        styles.submitBtn,
                                        (!canSubmit || submitting) && styles.submitBtnDisabled,
                                        pressed && canSubmit && !submitting ? { opacity: 0.9 } : null,
                                    ]}
                                >
                                    {submitting ? (
                                        <View style={styles.rowCenter}>
                                            <ActivityIndicator />
                                            <Text style={[styles.submitText, { marginLeft: 10 }]}>Submitting...</Text>
                                        </View>
                                    ) : (
                                        <Text style={styles.submitText}>Submit</Text>
                                    )}
                                </Pressable>

                                {/* Optional: small note */}
                                {!canSubmit && (
                                    <Text style={styles.errorText}>
                                        * Minimum 1 star and at least 3 characters required.
                                    </Text>
                                )}
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

export default RatingModal;

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
        justifyContent: "center",
        padding: 18,
    },
    kbWrap: { flex: 1, justifyContent: "center" },

    card: {
        backgroundColor: "#fff",
        borderRadius: 18,
        padding: 16,
        shadowColor: "#000",
        shadowOpacity: 0.18,
        shadowRadius: 14,
        elevation: 6,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    title: { fontSize: 18, fontWeight: "700", color: "#111" },
    closeBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F1F3F5",
    },

    starRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 6,
    },
    starBtn: { paddingHorizontal: 6 },
    hint: {
        textAlign: "center",
        marginTop: 6,
        color: "#555",
        fontSize: 14,
    },

    inputWrap: { marginTop: 14 },
    label: { fontSize: 14, fontWeight: "600", color: "#222", marginBottom: 8 },
    textArea: {
        minHeight: 120,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        color: "#111",
        backgroundColor: "#FAFAFA",
    },
    counter: {
        textAlign: "right",
        marginTop: 6,
        fontSize: 12,
        color: "#777",
    },

    submitBtn: {
        height: 48,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
        backgroundColor: "#0B5AEC",
    },
    submitBtnDisabled: {
        backgroundColor: "#A9BDF7",
    },
    submitText: { color: "#fff", fontSize: 15, fontWeight: "700" },

    errorText: { marginTop: 8, color: "#D11A2A", fontSize: 12, textAlign: "center" },
    rowCenter: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
});
