import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams } from 'expo-router'

const phone = () => {
    const {phone,signin}= useLocalSearchParams<{phone:string,signin:string}>()
    const [code,setCode]=useState('');
    const [number,setNumber]=useState('');
  return (
    <View>
      <Text>phone</Text>
    </View>
  )
}


export default phone