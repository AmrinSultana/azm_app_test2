import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const CompanyHeader = () => {

    const [showMenu, setShowMenu] = useState(false);
    const navigation = useNavigation('');
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };


    const handleoptions = (option) => {
        if (option === "Post") {
            navigation.navigate('Post');
        }
        else if (option === "Logout") {
            console.log("navigate to Logout screen");
        }
        setShowMenu(false);

    }

    return (
        <View style={styles.header}>
            <Text style={styles.headertext}>Al Zahem and Malhotra</Text>
            <TouchableOpacity onPress={toggleMenu}>
                <Icon name="ellipsis-v" size={20} color="#FDF7E4" /> 
            </TouchableOpacity>

            {showMenu && (
                <View style={styles.dropdownMenu}>
                    <TouchableOpacity onPress={() => handleoptions("Post")}>
                        <Text style={styles.menuOption}>Post</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleoptions("Logout")}>
                        <Text style={styles.menuOption}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#0E21A0',
    },

    headertext: {
        color: '#FDF7E4',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dropdownMenu: {
        position: 'absolute',
        top: '100%', // Position the menu below the header
        right: 10,
        width: '50%',
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        zIndex: 1, // Ensure menu is on top of other components
    },
    menuOption: {
        color: '#000', // Change menu option color
        fontSize: 16,
        paddingVertical: 5,
    },
})

export default CompanyHeader;
