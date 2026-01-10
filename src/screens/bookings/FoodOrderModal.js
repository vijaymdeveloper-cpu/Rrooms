import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    FlatList,
    StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import services from "@api/services";
import { commonStyles } from '@assets/styles/commonStyles';
import { showToast } from '@utils/Toaster'

const FoodOrderModal = ({ show, setShow, foodList = [], assignedRooms = [], booking = {} }) => {

    const [room, setRoom] = useState(assignedRooms[0]);
    const [roomOpen, setRoomOpen] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setRoom(assignedRooms[0])
    }, [assignedRooms])

    const updateQty = (item, type) => {
        setCart(prev => {
            const index = prev.findIndex(i => i.id === item.id);

            // FIRST TIME ADD
            if (index === -1 && type === "add") {
                return [...prev, { ...item, qty: 1 }];
            }

            // ITEM EXISTS
            if (index !== -1) {
                const updated = [...prev];
                const currentQty = updated[index].qty;
                const newQty = type === "add"
                    ? currentQty + 1
                    : currentQty - 1;

                // REMOVE ITEM
                if (newQty <= 0) {
                    updated.splice(index, 1);
                    return updated;
                }

                // UPDATE ONLY QTY
                updated[index] = {
                    ...updated[index],
                    qty: newQty,
                };

                return updated;
            }

            return prev;
        });
    };


    const grandTotal = cart.reduce(
        (sum, i) => sum + i.price * i.qty,
        0
    );

    const onClose = () => {
        setShow(false)
        setRoom(assignedRooms[0])
        setCart([])
    }

    const handleSubmitFoodOrder = async () => {
        if (cart.length === 0) {
            Alert.alert("Please Select food Items*");
            return;
        }
        const orderItems = cart?.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            propertyId: item.propertyId,
            amountBeforeTax: item.amountBeforeTax,
            taxAmount: item.taxAmount,
            totalAmount: item.price * item.quantity,
        }));

        const realPayload = {
            user_id: booking?.userId,
            booking_id: booking.id,
            room_number: room,
            order_amount: grandTotal,
            order_items: orderItems,
            created_by: 0,
            nc_type: "Room Service",
            remark: "",
            otherGuestName: booking?.User?.name || "",
            totalFoodAmountBeforeGST: grandTotal,
            propertyId: booking?.propertyId,
        };

        const res = await services.foodOrderService(realPayload);
        if (res?.status) {
            onClose();
            showToast('message', 'Your food order has been placed successfully')
        }
    };

    return (
        <Modal visible={show} animationType="slide" transparent statusBarTranslucent>
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Order Food</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Ionicons name="close" size={24} />
                        </TouchableOpacity>
                    </View>

                    {/* Room Selector */}
                    <TouchableOpacity
                        style={styles.roomBox}
                        onPress={() => setRoomOpen(!roomOpen)}
                    >
                        <Ionicons name="bed-outline" size={18} />
                        <Text style={styles.roomText}>Room No:</Text>
                        <Text style={styles.roomNo}>{room}</Text>
                        <Ionicons
                            name={roomOpen ? "chevron-up" : "chevron-down"}
                            size={18}
                        />
                    </TouchableOpacity>

                    {roomOpen && (
                        <View style={styles.roomDropdown}>
                            {assignedRooms.map(item => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.roomItem}
                                    onPress={() => {
                                        setRoom(item);
                                        setRoomOpen(false);
                                    }}
                                >
                                    <Text style={styles.roomItemText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {/* Food List */}
                    <FlatList
                        data={foodList}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 120 }}
                        renderItem={({ item }) => {
                            const qty = cart.find(i => i.id === item.id)?.qty || 0;

                            return (
                                <View style={styles.foodCard}>
                                    <View>
                                        <Text style={styles.foodName}>{item.name}</Text>
                                        <Text style={styles.foodPrice}>₹{item.price}</Text>
                                    </View>

                                    {qty === 0 ? (
                                        <TouchableOpacity
                                            style={styles.addBtn}
                                            onPress={() => updateQty(item, "add")}
                                        >
                                            <Text style={styles.addText}>ADD</Text>
                                        </TouchableOpacity>
                                    ) : (
                                        <View style={styles.qtyBox}>
                                            <TouchableOpacity onPress={() => updateQty(item, "remove")}>
                                                <Ionicons name="remove" size={14} color="#fff" />
                                            </TouchableOpacity>

                                            <Text style={styles.qty}>{qty}</Text>

                                            <TouchableOpacity onPress={() => updateQty(item, "add")}>
                                                <Ionicons name="add" size={14} color="#fff" />
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            );
                        }}

                    />

                    {/* Footer */}
                    <View style={styles.footer}>
                        <View>
                            <Text style={styles.totalLabel}>Grand Total</Text>
                            <Text style={styles.total}>₹{grandTotal}</Text>
                        </View>

                        <TouchableOpacity style={[commonStyles.btn, commonStyles.btnSecondary]} onPress={handleSubmitFoodOrder}>
                            <Text style={commonStyles.btnText}>Place Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default FoodOrderModal;


const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: "flex-end",
    },
    content: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: "90%",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 20,
        height: 70,
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
    },
    roomBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        gap: 8,
        padding: 14,
    },
    roomText: {
        color: "#555",
    },
    roomNo: {
        fontWeight: "700",
    },
    roomDropdown: {
        backgroundColor: "#fff",
        marginHorizontal: 14,
        borderRadius: 12,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        marginBottom: 10,
    },
    roomItem: {
        padding: 14,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    roomItemText: {
        fontSize: 16,
    },
    foodCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 16
    },
    foodName: {
        fontSize: 16,
        fontWeight: "600",
    },
    foodPrice: {
        color: "#777",
        marginTop: 4,
    },
    addBtn: {
        borderWidth: 1,
        borderColor: "#28a745",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
    },
    addText: {
        color: "#28a745",
        fontWeight: "700",
    },
    qtyBox: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#28a745',
        borderRadius: 22,
        height: 40,
        color: '#fff',
        paddingHorizontal: 14,
        gap: 14,
    },
    qty: {
        fontWeight: "700",
        color: '#fff'
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
        borderTopWidth: 1,
        borderColor: "#eee",
        backgroundColor: "#fff",
    },
    totalLabel: {
        color: "#777",
    },
    total: {
        fontSize: 18,
        fontWeight: "700",
    },
});
