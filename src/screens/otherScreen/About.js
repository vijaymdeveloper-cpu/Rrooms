import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { commonStyles } from '@assets/styles/commonStyles'
import Header from '@components/Header'

export default function AboutScreen({ navigation }) {
    return (
        <View style={commonStyles.screenWrapper}>
            <Header showBack={'About RROOMS'} profileIcon={false} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_3}>Introduction</Text>
                    <Text style={styles.paragraph}>
                        Welcome to RRooms, your gateway to seamless travel experiences around
                        the world. With its extensive reach, user-friendly interface, and
                        commitment to excellence, RRooms offers hoteliers a reliable and
                        efficient channel to connect with a diverse range of travelers. This
                        brief highlights the key reasons why RRooms is the first choice for
                        hoteliers in India for guest bookings, emphasizing its benefits and
                        advantages for hotel partners.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Our Mission</Text>
                    <Text style={styles.paragraph}>RRooms aims to establish itself as the first choice for hoteliers in
                        India when it comes to guest bookings. RRooms offers hotel partners
                        the opportunity to connect with a vast customer base and increase
                        their bookings. With RRooms, hoteliers can benefit from enhanced
                        exposure, competitive visibility, and a seamless booking process,
                        making it an invaluable partner in the ever-growing Indian hospitality
                        Industry</Text>
                    <Text style={styles.paragraph}>Our mission is clear: to empower travelers & hoteliers with the tools
                        and information they need to make informed decisions about their
                        guests & their stays. We believe that where you stay should be an
                        integral part of your journey, and finding the perfect hotel should be
                        an exciting part of the adventure.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={[commonStyles.text_3, commonStyles.mb_3]}>What Sets Us Apart</Text>
                    <Text style={commonStyles.text_4}>Extensive Network and Market Reach:</Text>
                    <Text style={styles.paragraph}>RRooms boasts an extensive network and a wide market reach, attracting
                        a diverse pool of travelers seeking accommodation in India. By
                        partnering with RRooms, hoteliers gain access to this vast customer
                        base, increasing their visibility and enhancing the chances of
                        attracting potential guests.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>User Friendly Booking Platform</Text>
                    <Text style={styles.paragraph}>RRooms provides hoteliers with a user-friendly and intuitive booking
                        platform that simplifies the process of managing and updating their
                        hotel inventory. Hoteliers can easily list their properties, update
                        availability, and manage bookings, ensuring a seamless experience
                        while maximizing their occupancy rates. Our platform is designed with
                        you (customer) in mind. It's easy to navigate, and packed with useful
                        features to simplify your search for the ideal hotel.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Competitive Exposure and Visibility:</Text>
                    <Text style={styles.paragraph}>RRooms offers hoteliers competitive exposure and visibility in the
                        Indian hospitality market. By featuring properties prominently on the
                        platform, RRooms ensures that hotel partners can showcase their unique
                        offerings, amenities, and competitive pricing to a wide audience of
                        potential guests.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Targeted Marketing and Promotional Opportunities:</Text>
                    <Text style={styles.paragraph}>RRooms understands the importance of targeted marketing and promotion
                        for hoteliers. Through its marketing initiatives, RRooms actively
                        promotes partner hotels, leveraging various channels to increase their
                        visibility and attract relevant travelers. Hoteliers benefit from
                        enhanced exposure and increased bookings through these targeted
                        marketing efforts.</Text>
                </View>






                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Flexible Booking Policies:</Text>
                    <Text style={styles.paragraph}>RRooms recognizes the importance of flexibility in booking policies
                        for hoteliers. The platform allows hotel partners to define their own
                        cancellation policies, room rates, and other terms, providing them
                        with the flexibility to tailor their offerings to their specific
                        requirements and market dynamics. We provide detailed and accurate
                        information about each property, including photos, amenities, guest
                        reviews, and real-time pricing. You can trust that what you see is
                        what you get.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Secure and Reliable Payment Processing:</Text>
                    <Text style={styles.paragraph}>RRooms ensures secure and reliable payment processing for hoteliers,
                        providing them with peace of mind when it comes to financial
                        transactions. The platform handles the payment process efficiently,
                        ensuring prompt remittances and minimizing the risk of payment-related
                        issues.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Dedicated Support and Account Management:</Text>
                    <Text style={styles.paragraph}>RRooms offers dedicated support and account management for its hotel
                        partners. The platform provides a responsive and knowledgeable support
                        team to assist hoteliers with any queries, technical issues, or
                        general assistance they may require, ensuring a smooth and efficient
                        partnership experience.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Best Deals:</Text>
                    <Text style={styles.paragraph}>We work tirelessly to secure the best deals and exclusive discounts
                        for our users, helping you get the most value out of your travel
                        budget.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>Extensive Selection:</Text>
                    <Text style={styles.paragraph}>We offer an extensive selection of hotels, from budget-friendly
                        options to opulent retreats, ensuring there's something for every
                        traveler and every occasion.</Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>24/7 Support:</Text>
                    <Text style={styles.paragraph}>Our dedicated customer support team is available around the clock to
                        assist you with any inquiries, reservations, or concerns you may have.
                        Join us in exploring the world of opportunities. Let's redefine the
                        hospitality industry together. Let us be your trusted companion on
                        your next adventure.</Text>
                </View>

                <View style={[commonStyles.mb_8]}>
                    <Text style={commonStyles.text_4}>Thank you for choosing RRooms.</Text>
                </View>

            </ScrollView>
        </View>
    );
}



const styles = StyleSheet.create({
    paragraph: {
        lineHeight: 22,
        marginTop: 8
    }
});
