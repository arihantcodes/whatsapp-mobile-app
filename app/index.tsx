import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";
import Colors from "../constants/Colors";

const page = () => {
  const openLink = () => {};

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/welcome.png")}
        style={styles.welcome}
      />
      <Text style={styles.headline}>Welcome To Whatsapp</Text>
      <Text style={styles.description}>
        Read our{" "}
        <Text style={styles.link} onPress={openLink}>
          Privacy Policy
        </Text>
        . {'Tap "Agree & Continue" to accept the '}
        <Text style={styles.link} onPress={openLink}>
          Terms of Service
        </Text>
      </Text>
      <Link href={"/otp"}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>AGREE AND CONTINUE</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  welcome: {
    width: "100%",
    height: 300,
    borderRadius: 60,
    marginBottom: 80,
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 80,
    color: Colors.gray,
  },
  link: {
    color: Colors.primary,
  },
  button: {
    width: "100%",
   
    alignItems: "center",
    backgroundColor: "#008169",
    height:35,
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    padding: 1,
    marginTop:5,
    fontSize: 15,
    fontWeight: "500",
  },
});
export default page;
