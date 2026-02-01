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

export default function TermsScreen() {
    return (
        <View style={commonStyles.screenWrapper}>
            <Header showBack={'Terms and Conditions'} profileIcon={false} />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={commonStyles.mb_4}>
                    <Text style={styles.paragraph}>
                        This website www.rrooms.in (Website) and its mobile application
                        “RROOMS” (Application) (collectively known as “RROOMS”, website and
                        mobile application) are owned and operated by RRooms Hospitality India
                        Pvt. ltd, a company incorporated under the laws of India, has its
                        registered place of business at B2-1409, DLF MYPAD, VIBHUTI KHAND,
                        GOMTI NAGAR, LUCKNOW, UTTAR PRADESH - 226010. RROOMS acts as a
                        facilitator, merely providing an online platform for booking hotels
                        from a specific hotel/or any type of accommodation listed on the
                        RROOMS website/App. By using this Website/ Application you hereby
                        acknowledge and agree that RROOMS is not a hotel/guest house owner and
                        has no control over the conduct or behavior of the Channel Partner or
                        the quality, fitness, or suitability of the services provided by
                        Channel Partner. RROOMS disclaims any liabilities in this regard.
                        RROOMS shall not be responsible and shall not be required to mediate
                        or resolve any dispute or disagreement between User and Channel
                        Partner. In no event, shall RROOMS be made a party dispute between
                        User(s) and Channel Partner(s).
                    </Text>
                </View>

                <Text style={[commonStyles.text_3, commonStyles.mb_2]}>CONDITIONS:</Text>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>1. ELIGIBILITY (AGE RESTRICTIONS)</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        The user hereby represents and warrants that he or she is eighteen
                        (18) years of age or above and is capable of entering, performing, and
                        adhering to these Usage Terms. The user agrees to be bound by these
                        Usage Terms
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>2. ASSENT & ACCEPTANCE</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        RROOMS provides Services on the Website/Application subject to
                        complete adherence to the Usage Terms by the User. By accessing,
                        viewing, or using this Website/ Application, the User acknowledges,
                        declare, confirm, represent & warrant to RROOMS that he or she has
                        read and understood the Usage Terms and accept them as an agreement as
                        to the binding legal contract equivalent of a duly signed contract
                        binding on him or her. This agreement is effective immediately upon
                        your accessing, viewing, or using this Website/ Application. A user is
                        advised to regularly check for any amendments or updates to the Usage
                        Terms mentioned herein from time to time.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>3. INTELLECTUAL PROPERTY</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        The User agrees that any feedback, comments, ideas, suggestions,
                        information, or any other content that the User contributes to RROOMS
                        or this Website/ Application (including the name you submit with any
                        content) will be deemed to include a royalty-free, perpetual,
                        irrevocable, nonexclusive right and license for RROOMS to adopt,
                        publish, reproduce, disseminate, transmit, distribute, copy, use,
                        create derivative works from, display worldwide, or act on such
                        content--without additional approval or consideration--in any form,
                        media, or technology now known or later developed for the full term of
                        any rights that may exist in such content, and you waive any claim to
                        the contrary.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>4. INDEMNIFICATION</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        Without prejudice to and in addition to any other remedies, reliefs,
                        or legal recourses available to RROOMS herein or any applicable laws
                        or otherwise, User agrees to indemnify, defend, and hold RROOMS
                        harmless including but not limited to its affiliate, agents, and
                        employees from and against all losses, liabilities, claims, damages,
                        demands, costs and expenses (including legal fees and disbursements in
                        connection therewith and interest chargeable thereon) asserted against
                        or incurred by RROOMS that arise out of or related to your use or
                        misuse of the Website, any violation by you of these terms and
                        conditions, or any breach of representations, warranties and covenants
                        made by you herein.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>5. USE OF WEBSITE/APP</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        This website/app may only be used to make genuine and valid
                        reservations or purchases. This website/app may not be used to make
                        any fraudulent, false, or exploratory reservations. You will be held
                        financially accountable for all uses of this website/app. You will be
                        responsible for maintaining the confidentiality of your passwords,
                        login information, and account information. You confirm and adhere
                        that the registration data, information/data provided or uploaded by
                        the User to the Website/Application: (a) not be fraudulent or involve
                        the use of counterfeit or stolen Credit Cards; or (b) not be false,
                        inaccurate, misleading, or incomplete; or (c) not infringe any third
                        party's intellectual property, trade secret, or other proprietary
                        rights, or rights of publicity or privacy; or (d) not be defamatory,
                        libelous, unlawfully threatening, or unlawfully harassing; or (f) not
                        contain any viruses.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>6. LIMITATIONS ON LIABILITY</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        RROOMS shall not be liable for any damages of any kind whatsoever
                        including but not limited to direct, indirect, incidental, punitive,
                        exemplary, and consequential damages, damages for loss of use, data or
                        profits, or other intangible losses, which may arise or are arising
                        from the use of this Website/ Application or any of the information,
                        software, services and related graphics contained within the Website/
                        Application or any of the Services offered, regardless of whether such
                        damages are based on contract, tort, negligence, strict liability or
                        otherwise, and even if RROOMS has been advised of the possibility of
                        damages. NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN OR
                        ELSEWHERE, RROOMS ENTIRE LIABILITY TO THE USER FOR ANY CLAIM ARISING
                        OUT OF PURCHASING / BROWSING THE WEBSITE/ APPLICATION SHALL BE LIMITED
                        TO THE AMOUNT EQUIVALENT TO THE PRICE PAID FOR THE PRODUCT AND
                        SERVICES GIVING RISE TO SUCH CLAIM. RROOMS Guests are requested to
                        kindly take due care of all their valuables and belongings. RROOMS
                        management and its employees shall NOT be responsible for any loss,
                        theft, or damage to the Guests' valuables and belongings.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>7. JURISDICTION</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        This Agreement and all transactions entered into on or through
                        Website/ Application shall be interpreted, construed, and governed by
                        the laws of India which shall apply to this Agreement without regard
                        to principles of conflict of laws. User agrees that all claims,
                        differences, and disputes arising under or in connection with or in
                        relation hereto, the Website/ Application, the Usage Terms, or any
                        transactions entered into on or through the Website/ Application or
                        the relationship between User and RROOMS shall be subject to the
                        exclusive jurisdiction of the courts at Lucknow, India, and User
                        hereby accede to and accept the jurisdiction of such courts.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>8. THIRD-PARTY LINKS</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        This Website/ Application may at RROOMS sole discretion, contain links
                        to sites owned and maintained by persons or entities other than
                        RROOMS. RROOMS may also provide links to the other sites to enable the
                        Customer to make payment to RROOMS. Any of the foregoing links do not
                        constitute an endorsement by RROOMS of any such sites and are provided
                        only as a convenience. RROOMS is not responsible for the content or
                        links displayed on such sites. Any decision to view the contents of
                        any linked site is solely the responsibility of the Customer and is
                        made at the Customer's own risk.
                    </Text>
                </View>

                <View style={commonStyles.mb_2}>
                    <Text style={commonStyles.text_4}>9. RESERVATION/ BOOKING OF SERVICES</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        The process of booking Services from this Website/ Application may
                        require you to disclose confidential information including Credit Card
                        number, etc. To prevent any possibility of unauthorized access to your
                        confidential information such as name, etc., you shall not use/access
                        this site from unsecured computers, communication links, mobile
                        phones, or locations such as Cyber-Cafe(s), and other commercially
                        available internet-enabled computers or computer services. That
                        relying on declarations, confirmations, information, and obligations
                        made/undertaken by the User under Usage Terms, and believing the same
                        to be true and acting on the faith thereof, RROOMS has agreed to
                        provide the Services to the User as per the Usage Terms mentioned
                        herein. In particular, the User does hereby agree, promise, declare,
                        confirm, covenant, undertake, and represent & warrant to RROOMS:
                    </Text>
                </View>


                <View style={commonStyles.mb_4}>
                    <Text style={styles.paragraph}>
                        the User is not under any legal or other deficiency which prevents/may
                        prevent the User from: (i) entering into a valid contract under the
                        applicable laws; and (ii) making valid payment to RROOMS for Services
                        ordered by the User.
                    </Text>
                    <Text style={styles.paragraph}>
                        In the event of detecting any suspicious activity from the User’s
                        account, RROOMS reserves the right to cancel all pending and future
                        bookings owing to any such incident without any liability to the User.
                    </Text>
                    <Text style={styles.paragraph}>
                        In a credit card transaction; the User must use their credit card for
                        which the User has full right & authority to validly use such a Credit
                        Card for making payment to RROOMS. RROOMS shall not be liable for any
                        credit card fraud.
                    </Text>
                    <Text style={styles.paragraph}>
                        While using the Website/ Application User shall at all times strictly
                        comply with the payment procedure and the Usage Terms in their
                        entirety.
                    </Text>
                    <Text style={styles.paragraph}>
                        Your use of the Services shall be deemed fully satisfied with the
                        description, look, and design of the accommodation and usage fee of
                        the Accommodation as has been displayed on the RROOMS Website/
                        Application.
                    </Text>
                    <Text style={styles.paragraph}>
                        The User agrees and acknowledges that in the Website/ Application, all
                        Services are offered only at the sole discretion of RROOMS.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_4}>10. SMS POLICY</Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        As we continue to strive to improve our services, RROOMS may reach out
                        to guests (regardless of their DND activation) to get feedback on
                        their experience through calls and messages.
                    </Text>
                    <Text style={[styles.paragraph, { paddingLeft: 20 }]}>
                        HOTEL GUEST POLICIES According to government regulations, a valid
                        original Photo ID has to be carried by every person above the age of
                        18 staying at the hotel. The identification proofs accepted are a
                        Driving License, Voter ID Card, Passport, and Adhaar Card. Without a
                        valid original ID, the guest will not be allowed to check in. Note:
                        PAN Cards will not be accepted as a valid ID card. Only original Photo
                        IDs will be accepted at the time of check-in. Photocopy or Softcopy of
                        ID proofs will not be accepted. If suitable proof of identification is
                        not presented at check-in, the accommodation can be declined to guests
                        posing as a couple. RROOMS will not be responsible for any check-in
                        declined by the hotel due to the aforesaid reason and RROOMS shall not
                        be able to process any refund. In the case of unmarried couples/
                        guests, only two guests are allowed in one room. No charges for
                        children below 9 years of age. Standard room charges will be
                        applicable for children above 9 years of age. The hotel may check the
                        room condition at the time of your check-out and can charge you if
                        there is damage to the property or the room Conditions found
                        unsatisfactory. Your special requests would be passed on to the hotel
                        and those shall be subject to the terms and conditions of the
                        concerned hotel. We shall not be liable for any discrepancy in such
                        services or the performance or consequences of such services.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_3}>PAY AT HOTEL</Text>
                    <Text style={styles.paragraph}>
                        In case of any amendment (date change) in your hotel reservation,
                        RROOMS will inform and advise you about he availability and applicable
                        new rates. Amendments/Cancellations of booking can only be made by
                        RROOMS. The hotel cannot modify your booking or process refunds for
                        bookings made at the special RROOMS rates. Such
                        amendments/cancellations of booking shall be according to the
                        respected hotel policy. Please read the hotel policy before booking.
                        The amount can be paid by the guest at the hotel. Guests might be
                        asked to pay in cash if the credit/debit card machine or any other
                        cashless payment mode at the hotel is absent or dysfunctional. If the
                        guest plans to check in at the hotel late or early from the check-in
                        time selected, they must inform customer support in advance. The hotel
                        can release the room in case you have not checked in under 20 minutes
                        of the check-in time selected and have not informed the hotel about
                        your late check-in. Guest must pay the full amount at the time of
                        check-in; the hotel's payment cannot be withheld by the customer.
                    </Text>
                </View>

                <View style={commonStyles.mb_4}>
                    <Text style={commonStyles.text_3}>FEEDBACK</Text>
                    <Text style={styles.paragraph}>
                        RROOMS welcomes your feedback, comments, and suggestions for improving
                        the Website/App and Services ("Feedback"). Feel free to connect to us
                        at contact@rrooms.in
                    </Text>
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
