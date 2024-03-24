import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaskInput from 'react-native-mask-input';
import { isClerkAPIResponseError, useSignIn, useSignUp } from '@clerk/clerk-expo';

const GER_PHONE = [
  `+`,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

const Page = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 0;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();

  const openLink = () => {
    Linking.openURL('https://galaxies.dev');
  };

  const sendOTP = async () => {
    console.log('sendOTP', phoneNumber);
    setLoading(true);

    try {
      await signUp!.create({
        phoneNumber,
      });
      console.log('TESafter createT: ', signUp!.createdSessionId);

      signUp!.preparePhoneNumberVerification();

      console.log('after prepare: ');
      router.push(`/verify/${phoneNumber}`);
    } catch (err) {
      console.log('error', JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        if (err.errors[0].code === 'form_identifier_exists') {
          // User signed up before
          console.log('User signed up before');
          await trySignIn();
        } else {
          setLoading(false);
          Alert.alert('Error', err.errors[0].message);
        }
      }
    }
  };

  const trySignIn = async () => {
    console.log('trySignIn', phoneNumber);

    const { supportedFirstFactors } = await signIn!.create({
      identifier: phoneNumber,
    });

    const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
      return factor.strategy === 'phone_code';
    });

    const { phoneNumberId } = firstPhoneFactor;

    await signIn!.prepareFirstFactor({
      strategy: 'phone_code',
      phoneNumberId,
    });

    router.push(`/verify/${phoneNumber}?signin=true`);
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={keyboardVerticalOffset}
      style={{ flex: 1 }}
      behavior="padding">
      {loading && (
        <View style={[StyleSheet.absoluteFill,]}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={{ fontSize: 18, padding: 10 }}>Sending code...</Text>
        </View>
      )}

      <View style={styles.container}>
        <Text style={styles.description}>
          WhatsApp will need to verify your account. Carrier charges may apply.
        </Text>

        <View style={styles.list}>
          <View style={styles.listitem}>
            <Text style={styles.countryCode}>India</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.white} />
          </View>
          <View style={styles.separator} />

          <MaskInput
            value={phoneNumber}
            keyboardType="numeric"
            autoFocus
            placeholder="+91 your phone number"
            placeholderTextColor={Colors.white}
            onChangeText={(masked, unmasked) => {
              setPhoneNumber(masked);
            }}
            mask={GER_PHONE}
            style={styles.input}
          />
        </View>

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

        <View style={{ flex: 1 }} />

        <TouchableOpacity
          style={[styles.button, phoneNumber !== '' ? styles.enabled : null, { marginBottom: 20 }]}
          onPress={sendOTP}>
          <Text style={[styles.buttonText, phoneNumber !== '' ? styles.enabled : null]}>Next</Text>
        </TouchableOpacity>
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
  enabled: {
    backgroundColor: Colors.white,
    color: '#000',
  },
  legal: {
    fontSize: 12,
    textAlign: "center",
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


export default Page;