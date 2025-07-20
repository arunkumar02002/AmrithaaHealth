import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import logo from '../../Assets/logos.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fonts from '../../Fonts/Fonts';
import Colors from '../../Colors/Colors';
import { EmergencyAPI } from '../APICall/EmergencyFlowApiCall'; // Import API call

const EmergencyContactScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState(null);
  const [contacts, setContacts] = useState([]);
  

  // Fetch emergency contacts using the API
  useEffect(() => {
       const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjNkZjgzMjM0ZGFkYmEzZmM0ZTA3MTJkMGE2Y2MzZmY4NGQzYzVmM2IxYTQ3NWY1YzZkNjE2YjQ5N2U5YzU1M2Y3NDkzNTkzM2RiMzFkNzEiLCJpYXQiOjE3NTIwNTgyMjUuMjgwODM1LCJuYmYiOjE3NTIwNTgyMjUuMjgwODM4LCJleHAiOjE3ODM1OTQyMjUuMjQ2Mzg2LCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.OSU8CyIgsr95JlHCaPtt4AXBrFW9LElZw97mRPuwpdt8AUgk_mXu6Simd84igrulLdia3CGhEz4jwA4yvje-o94aEyycErWocPt-02TcUgpCGUarFfmHXzdykBnG9P9C7-7T1oy_GtaXmB06OrxwpK8HW0u-k89b2NbsJMaFGm1MD9bcUa0tWoj74hEGqC_5ja1yznmrryqxa3EcnV21TsLbYgA5h9oAic9JK_UkHz9Zx0b8ob1FQJFwkgtWiUJqEzg9qlUDf5jP0nDUdv3_qXa2_Gat31ME5gq6JmApXFL0JrI_9ZgUEp9m_F_r2tpX6Sl8Gzr0_34h-t285C3db0o0-PQRLsyABvJFd5UW0spYsMZwcjL_yXfVN93YnQC1ti6Bw7NHxXiHxVubSK-UaJVRaEnFRclVGNxHNUT_VXj8zqxyDUtknHqc7rz3nZuwAhxo54PUwPnuTRO8k9zQaMhU7sIvfMhPsr-5zHGlFkClOo4CqcwVHI5i4SG42TlyJMZIdP-_cLLH-U6pD7NgKdqCgJkZlAVKLOI-KNo4HmKf4BLCAZKdA05YrOETg5S6R7fBcE06DxBXWqLJPVLWnZUk_S7FAxNfL5Cne3DjmQN1qnv6QJtfxneXjAFypSOaH2Fpet_-MsA6aJmZvvYo0eAP7L2nQ_ZdX5ffa3P1M08'; // Add the token here

    EmergencyAPI(token)
      .then((data) => {
        setProfileData(data.data);
        setContacts(data.data); // Set contacts data here
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
      });
  }, []);

  // Navigate back
  const handleBack = () => {
    navigation.goBack();
  };

  // Add a new emergency contact
  const handleAddContact = () => {
    console.log('Add contact pressed');
    Alert.alert(
      'Add Contact',
      'Add new emergency contact functionality',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Add',
          onPress: () => {
            navigation.navigate('AddEmergencyContact'); // Navigate to the Add contact screen
          },
        },
      ],
    );
  };

  // Edit an existing emergency contact
  const handleEditContact = (contact) => {
    console.log('Edit contact:', contact);
    Alert.alert(
      'Edit Contact',
      `Edit ${contact.name}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Edit',
          onPress: () => {
            navigation.navigate('EditEmergencyContact', { contactId: contact.id });
          },
        },
      ],
    );
  };

  // Delete an emergency contact
  const handleDeleteContact = (contactId) => {
    Alert.alert(
      'Delete Contact',
      'Are you sure you want to delete this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setContacts((prev) => prev.filter(contact => contact.id !== contactId)); // Remove contact from state
          },
        },
      ],
    );
  };

  // Render individual contact item
const renderContactItem = (contact) => (
  <TouchableOpacity key={contact.id}>
    <View style={styles.contactItem}>
      <View style={styles.contactContent}>
        {/* Avatar: First letter of name as initial */}
        <View style={[styles.avatarContainer, { backgroundColor: contact.color || '#4F7DB6' }]}>
          <Text style={styles.avatarText}>
            {contact.name && contact.name.length > 0 ? contact.name.charAt(0).toUpperCase() : '?'}
          </Text>
        </View>

        {/* Contact Information */}
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactNumber}>Contact no : {contact.mobile}</Text>
        </View>
      </View>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => handleEditContact(contact)}>
        <Icon name="edit" size={16} color="#7518AA" />
        <Text style={styles.editText}>Edit</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.statusBar} />

      {/* Header with Gradient */}
      <LinearGradient colors={['#ffffff', '#C3DFFF']} start={{ x: 0, y: 0.3 }} end={{ x: 0, y: 0 }} style={styles.topBackground}>
        <View style={styles.header}>
          <Image source={logo} style={styles.logo} />
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hi, Welcome</Text>
            <Text style={styles.userName}>Janmani Kumar</Text>
          </View>
          <TouchableOpacity style={[styles.notificationButton, { right: hp('2%') }]}>
            <Icon name="notifications-on" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.notificationButton, { backgroundColor: 'red' }]}>
            <MaterialCommunityIcons name="alarm-light-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.titleSection}>
          <View style={styles.titleRow}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="chevron-left" size={30} color="#000" />
            </TouchableOpacity>
            <Text style={styles.pageTitle}>Emergency Contact</Text>
            <TouchableOpacity style={styles.addContactButton} onPress={handleAddContact}>
              <Icon name="add" size={16} color="#FFFFFF" />
              <Text style={styles.addContactText}>Add Contact</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.contactsList}>
            {contacts.length > 0 ? (
              contacts.map((contact) => renderContactItem(contact))
            ) : (
              <View style={styles.emptyState}>
                <Icon name="contacts" size={64} color="#D1D5DB" />
                <Text style={styles.emptyStateTitle}>No Emergency Contacts</Text>
                <Text style={styles.emptyStateText}>Add emergency contacts to help in case of urgent situations</Text>
                <TouchableOpacity style={styles.addFirstContactButton} onPress={handleAddContact}>
                  <Text style={styles.addFirstContactText}>Add First Contact</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  headerGradient: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  backButton: {
    padding: 8,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  welcomeText: {
    fontSize: 12,
    color: '#E0E7FF',
    fontWeight: '400',
  },
  welcomeName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  titleSection: {
  
    paddingTop: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pageTitle: {
  fontSize:  Fonts.size.PageHeading,
    color: '#4a4a4a',
    fontWeight: '700',
     fontFamily:Fonts.family.regular
  },
  addContactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7518AA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor:'#7518AA',
  },
  addContactText: {
    color: '#FFFFFF',
   fontSize:  Fonts.size.PageSubSubHeading,
    fontWeight: '500',
    marginLeft: 4,
     fontFamily:Fonts.family.regular
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  contactsList: {
    marginBottom: 20,
  },
 contactItem: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 16,
  marginBottom: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  // iOS Shadow
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,

  // Android Shadow
  elevation: 5,

  // Layout
  width: '100%', // use 100% for proper layout within the parent
  alignSelf: 'center', // ensure centered in container
},

  contactContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    color: '#FFFFFF',
   fontSize:  Fonts.size.PageHeading,
    fontWeight: '600',
     fontFamily:Fonts.family.regular
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
  fontSize:  Fonts.size.PageHeading,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
     fontFamily:Fonts.family.regular
  },
  contactNumber: {
    fontSize:  Fonts.size.PageHeading,
    color: '#6B7280',
     fontFamily:Fonts.family.regular
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  editText: {
    color: '#7518AA',
   fontSize:  Fonts.size.PageHeading,
    marginLeft: 4,
     fontFamily:Fonts.family.regular
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
     fontFamily:Fonts.family.regular
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
     fontFamily:Fonts.family.regular
  },
  addFirstContactButton: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstContactText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
     fontFamily:Fonts.family.regular
  },
  topBackground: {
      paddingTop: hp('4%'),
      paddingBottom: hp('2%'),
      paddingHorizontal: wp('4%'),
      height: hp('100%'),
    },
      header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: wp('10%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  greetingContainer: {
    flex: 1,
    marginLeft: wp('3%'),
  },
  greeting: {
   fontSize:  Fonts.size.TopHeading,
    color: 'black',
    opacity: 0.9,
     fontFamily:Fonts.family.regular
  },
  userName: {
   fontSize:  Fonts.size.TopSubheading,
    fontWeight: 'bold',
    color: 'black',
     fontFamily:Fonts.family.regular
  },
  notificationButton: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: wp('5%'),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});

export default EmergencyContactScreen;