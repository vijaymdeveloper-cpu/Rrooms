import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { commonStyles } from '@assets/styles/commonStyles';
import Header from '@components/Header';


const DATA = [
    {
        title: "Getting Started",
        content:
            "If you're new to our platform, we'll guide you through the initial setup process, including creating an account, listing your property, and managing your profile.",
    },
    {
        title: "Booking and Reservations",
        content:
            "Learn how to manage reservations, view booking details, and understand the booking process, including payment procedures and cancellations.",
    },
    {
        title: "Property Management",
        content:
            "Get answers to questions about updating your property's information, including room types, rates, availability, and amenities.",
    },
    {
        title: "Marketing and Promotion",
        content:
            "Discover how to enhance your property's visibility, market effectively to potential guests, and take advantage of our promotional tools.",
    },

    {
        title: "Payment and Fees",
        content:
            "Understand how payments work, including commission structures, payment processing, and when and how you receive your earnings.",
    },
    {
        title: "Review Management",
        content:
            "Learn how to respond to guest reviews, address feedback, and maintain a positive online reputation.",
    },
    {
        title: "Technical Support",
        content:
            "Get assistance with any technical issues, troubleshooting, or questions about using our platform effectively.",
    },
    {
        title: "Legal and Compliance",
        content:
            "Find information on legal and regulatory considerations, including tax collection, data privacy, and industry standards.",
    },
    {
        title: "Performance Analytics",
        content:
            "Explore how to access and interpret performance data, reports, and insights to optimize your property's performance.",
    },
    {
        title: "Marketing and Partnership Opportunities",
        content:
            "Learn about potential marketing collaborations, partnership programs, and how to maximize your property's exposure through our platform.",
    },
    {
        title: "Security and Data Protection",
        content:
            "Understand the measures we take to ensure the security of your data and your guests' information.",
    },
];

export default function FaqScreen() {

    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <View style={commonStyles.screenWrapper}>
            <Header showBack={'Faq'} profileIcon={false} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>"Your Questions, Our Answers"</Text>
                    <Text style={styles.paragraph}>
                        Welcome to our "FAQs" segment, a dedicated resource for hotel owners,
                        managers, and hospitality professionals. At RRooms, we understand that
                        navigating the world of online travel and hospitality can raise many
                        questions. This FAQ section is designed to provide you with clear,
                        concise answers to common queries and concerns you may encounter while
                        using our platform.
                    </Text>
                    <Text style={styles.paragraph}>
                        We've compiled a comprehensive list of questions that hoteliers
                        frequently ask us. Our goal is to ensure that you have the information
                        you need to make the most of our services and to help you succeed in
                        the competitive hospitality industry.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={[commonStyles.text_4, commonStyles.mb_3]}>As a community, you get to :</Text>
                    {DATA.map((item, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <View key={index} style={styles.card}>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    style={commonStyles.rowBetweenAligned}
                                    onPress={() => toggleAccordion(index)}
                                >
                                    <Text style={[commonStyles.text_5, commonStyles.fwBold]}>{item.title}</Text>
                                    <Ionicons
                                        name={isOpen ? "chevron-up" : "chevron-down"}
                                        size={16}
                                        color="#333"
                                    />
                                </TouchableOpacity>

                                {isOpen && (
                                    <Text style={styles.content}>{item.content}</Text>
                                )}
                            </View>
                        );
                    })}
                </View>

            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    paragraph: {
        lineHeight: 22,
        marginTop: 8
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
        flex: 1,
        paddingRight: 10,
    },
    content: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
        lineHeight: 20,
    },
});
