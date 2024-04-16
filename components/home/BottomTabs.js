import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { Divider } from 'react-native-elements'

export const bottomTabIcons = [
    {
        name: 'Home',
        active: 'https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png',
        inactive: 'https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png',
    },
    {
        name: 'Search',
        active: 'https://img.icons8.com/ios-filled/500/ffffff/search--v1.png',
        inactive: 'https://img.icons8.com/ios/50/ffffff/search--v1.png',
    },
    {
        name: 'Reels',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png',
        inactive: 'https://img.icons8.com/ios/50/ffffff/instagram-reel.png',
    },
    {
        name: 'Shop',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/shopping-bag.png',
        inactive: 'https://img.icons8.com/ios/50/ffffff/shopping-bag.png',
    },
    {
        name: 'Profile',
        active: 'https://img.icons8.com/ios-filled/50/ffffff/user.png',
        inactive: 'https://img.icons8.com/ios/50/ffffff/user.png',
    },
]

const BottomTabs = () => {
    const [activeTab, setActiveTab] = useState('Home')

    const Icon = ({icon}) => (
        <TouchableOpacity onPress={() => setActiveTab(icon.name)}>
            <Image 
                source={{ uri: activeTab === icon.name ? icon.active : icon.inactive }} 
                style={[
                    styles.icon,
                    icon.name === 'Profile' ? styles.profilePic() : null,
                    activeTab === 'Profile' && icon.name == activeTab ? styles.profilePic(activeTab) : null,
                ]} 
            />
        </TouchableOpacity>
    )
    return (
        <View style={styles.wrapper}>
            <Divider width={1} orientation='vertical' />
            <View style={styles.container}>
            {bottomTabIcons.map((icon, index) => (
                    <Icon key={index} icon={icon} />  
            ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   wrapper: {
        position: 'absolute',
        bottom: '3%',
        width: '100%',
        backgroundColor: '#000',
        zIndex: 999,
   },
   
    container: {
         flexDirection: 'row',
         justifyContent: 'space-around',
         height: 50,
         paddingTop: 10,
   },

    icon: {
        width: 30,
        height: 30,
    },

    profilePic: (activeTab = '') => ({
        borderRadius: 50,
        borderWidth: activeTab === 'Profile' ? 2 : 0,
        borderColor: '#fff',
    }),
})

export default BottomTabs