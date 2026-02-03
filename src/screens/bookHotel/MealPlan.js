import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MealPlan = ({ mealCharges, mealPlan, setMealPlan }) => {

    const [showMeanPlan, setShowMealPlan] = useState(false)

    const handleToggleMealPlan = () => {
        setShowMealPlan(!showMeanPlan)
    }

    const mealPlanHandler = (value) => {
        if (mealPlan === value) {
            setMealPlan('ep');
        } else {
            setMealPlan(value);
        }
    };


    return (

        <View style={styles.card}>
            <TouchableOpacity style={styles.heading} onPress={handleToggleMealPlan}>
                <Text style={styles.subTitle}>
                    {mealPlan == 'ep' ? 'Select Meal Plan' : 'Meal Plan Added'}{" "}
                    {
                        mealPlan != 'ep' ?
                        <Text style={styles.smallText}>
                            {mealCharges[mealPlan]}/Adult/Day
                        </Text> : null
                    }

                </Text>
                <Ionicons name="chevron-down" size={20} color="black" />
            </TouchableOpacity>
            {
                showMeanPlan &&
                <View style={styles.mealPlan}>

                    {/* CP */}
                    <Pressable
                        style={styles.row}
                        onPress={() => mealPlanHandler('breakFastPrice')}
                    >
                        <Ionicons
                            name={mealPlan === 'breakFastPrice' ? 'checkbox' : 'square-outline'}
                            size={20}
                            color="#000"
                        />
                        <Text style={styles.label}>CP</Text>
                        <Text style={styles.subLabel}>(Breakfast  ₹{mealCharges?.breakFastPrice})</Text>
                    </Pressable>

                    {/* MAP */}
                    <Pressable
                        style={styles.row}
                        onPress={() => mealPlanHandler('map')}
                    >
                        <Ionicons
                            name={mealPlan === 'map' ? 'checkbox' : 'square-outline'}
                            size={20}
                            color="#000"
                        />
                        <Text style={styles.label}>MAP</Text>
                        <Text style={styles.subLabel}>
                            (Breakfast + Lunch or Dinner ₹{mealCharges?.map})
                        </Text>
                    </Pressable>

                    {/* AP */}
                    <Pressable
                        style={styles.row}
                        onPress={() => mealPlanHandler('ap')}
                    >
                        <Ionicons
                            name={mealPlan === 'ap' ? 'checkbox' : 'square-outline'}
                            size={20}
                            color="#000"
                        />
                        <Text style={styles.label}>AP</Text>
                        <Text style={styles.subLabel}>
                            (Breakfast + Lunch + Dinner ₹{mealCharges?.ap})
                        </Text>
                    </Pressable>

                </View>
            }
        </View>

    );
};

export default MealPlan;

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    heading: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    smallText: {
        fontSize: 12,
        fontWeight: "400",
        color: "#000",
    },
    mealPlan: {
        marginTop: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginTop: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    subLabel: {
        fontSize: 12,
        color: '#000',
    },
});
