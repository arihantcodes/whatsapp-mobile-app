import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Linking,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityBase,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import MaskInput from "react-native-mask-input";

const otp = () => {
  const [loading, setLoading] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();
  const keyboard = Platform.OS === "android" ? "90" : "0";
  const keyboardios = Platform.OS === "ios" ? "90" : "0";
  const openLink = () => {
    Linking.openURL("https://arihant.us");
  };
  const SendOTP = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify/${phoneNumber}`);
    }, 1000);
  };
  const TrySign = async () => {};
  const GER_PHONE = [
    `+`,
    /\d/,
    /\d/,
    " ",

    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    " ",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.description}>
          Please Confirm your country code and enter your mobile number{" "}
        </Text>
        <View style={styles.list}>
          <View style={styles.listitem}>
            <Text style={styles.countryCode}>India</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
          </View>
          <View style={styles.separator} />

          <MaskInput
            value={phoneNumber}
            keyboardType="phone-pad"
            autoFocus={true}
            placeholder="(+91)  Your Phone Numbe"
            placeholderTextColor={Colors.gray}
            style={styles.input}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={GER_PHONE}
          />
        </View>

        


        <TouchableOpacity style={styles.button} onPress={SendOTP}>
          <Text style={styles.buttonText}>SEND OTP</Text>
        </TouchableOpacity>


        <Text style={styles.legal}>
          You must be{' '}
          <Text style={styles.link} onPress={openLink}>
            at least 16 years old
          </Text>{' '}
          to register. Learn how WhatsApp works with the{' '}
          <Text style={styles.link} onPress={openLink}>
            Meta Companies
          </Text>
          .
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
    

    gap: 20,
  },
  legal: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.white,

  },
  link: {
    color: Colors.primary,
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    marginBottom: 60,
    color: Colors.white,
  },
  list: {
    backgroundColor: Colors.lightGray,
    color: Colors.white,
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  listitem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 6,
    marginBottom: 10,
    alignItems: "center",
  },
  countryCode: {
    fontSize: 18,

    color: Colors.white,
  },
  phoneNumber: {
    fontSize: 18,

    color: Colors.white,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.white,
    color: Colors.white,
    opacity: 0.2,
  },
  button: {
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: Colors.black,
    fontSize: 18,
  },
  input: {
    backgroundColor: Colors.lightGray,
    color: Colors.white,
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },
});

export default otp;
