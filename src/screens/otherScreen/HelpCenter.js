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

export default function HelpCenterScreen({ navigation }) {
  return (
    <View style={commonStyles.screenWrapper}>
      <Header showBack={'Help & Support'} profileIcon={false} />
      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_3}>Help Center</Text>
          <Text style={styles.paragraph}>
            We are dedicated to providing excellent service and assistance to our guests and website visitors. Whether you have questions about booking a room, need information about our facilities, or want to know more about our policies, you'll find answers to frequently asked questions and helpful resources here.
          </Text>
        </View>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_4}>Contact Us</Text>
          <Text style={styles.paragraph}>If you have specific questions or concerns, please don't hesitate to contact our dedicated customer support team. We are here to assist you</Text>
        </View>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_4}>Contact Information:</Text>
          <Text style={styles.paragraph}>Phone: +917377378030</Text>
          <Text style={styles.paragraph}>Email: info@rrooms.in</Text>
        </View>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_4}>Live Chat</Text>
          <Text style={styles.paragraph}>Click the chat icon in the bottom right corner to chat with a representative during our business hours.</Text>
        </View>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_4}>Visit Us</Text>
          <Text style={styles.paragraph}>If you prefer to speak with someone in person, feel free to visit our property, and our front desk staff will be happy to assist you.</Text>
        </View>

        <View style={commonStyles.mb_4}>
          <Text style={commonStyles.text_4}>Feedback and Suggestions</Text>
          <Text style={styles.paragraph}>Your feedback is important to us. If you have any suggestions for improving our website or services or if you encountered any issues while using our website, please let us know. We value your input and strive to enhance the guest experience continually.</Text>
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
