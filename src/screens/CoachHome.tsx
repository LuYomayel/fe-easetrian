import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TopBarNav} from '../components/TopBarNav';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {Title} from '../components/Title';

const CoachHome = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <TopBarNav pageName="gymManagment" hideBackButton={false} />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.tabGroup}>
            <View style={styles.tabTab}>
              <View style={styles.frame}>
                <Text style={styles.iconTab}>🏠</Text>
              </View>
              <Text style={styles.titleTab}>Dashboard</Text>
            </View>
            <View style={styles.tabTab}>
              <View style={styles.frame}>
                <Text style={styles.iconTab}>👥</Text>
              </View>
              <Text style={styles.titleTab}>Students</Text>
            </View>
            <View style={styles.tabTab}>
              <View style={styles.frame}>
                <Text style={styles.iconTab}>📅</Text>
              </View>
              <Text style={styles.titleTab}>Scheduling</Text>
            </View>
            <View style={styles.tabTab}>
              <View style={styles.frame}>
                <Text style={styles.iconTab}>📚</Text>
              </View>
              <Text style={styles.titleTab}>Resources</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionTitle}>
              <View style={styles.text}>
                <Text style={styles.title}>Activity Summary</Text>
                <Text style={styles.subtitle}>Week of November 22, 2021</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.listList}>
              <View style={styles.row}>
                <View style={styles.metric}>
                  <Text style={styles.title}>Training Sessions</Text>
                  <Text style={styles.data}>15</Text>
                  <Text style={styles.changeList}>+3%</Text>
                </View>
                <View style={styles.metric}>
                  <Text style={styles.title}>Active Students</Text>
                  <Text style={styles.data}>50</Text>
                  <Text style={styles.textWrapper}>-2%</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            {/* <View style={styles.div}>
              <Text style={styles.title}>Training Schedule</Text>
            </View> */}
            <Title title="Training Schedule" />
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>View All</Text>
              <Image
                source={require('../assets/icon-right.png')}
                style={styles.buttonIcon}
              />
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>🗓️</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Monday</Text>
                <Text style={styles.subtitle}>8:00 AM - 10:00 AM</Text>
              </View>
              <Text style={styles.subtitle}>John Doe, Jane Smith</Text>
              {/* <Image source={require('./vector-200-5.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>🗓️</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Tuesday</Text>
                <Text style={styles.subtitle}>2:00 PM - 5:00 PM</Text>
              </View>
              <Text style={styles.subtitle}>David Johnson, Ashley Brown</Text>
              {/* <Image source={require('./vector-200-6.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>🗓️</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Wednesday</Text>
                <Text style={styles.subtitle}>9:00 AM - 11:00 AM</Text>
              </View>
              <Text style={styles.subtitle}>
                Michael Wilson, Emily Anderson
              </Text>
              {/* <Image source={require('./vector-200-7.svg')} style={styles.vector} /> */}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.div}>
              <Text style={styles.title}>Student Management</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>View All</Text>
              <Image
                source={require('../assets/icon-right.png')}
                style={styles.buttonIcon}
              />
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>👤</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>John Doe</Text>
                <Text style={styles.subtitle}>Membership: Platinum</Text>
              </View>
              <Text style={styles.subtitle}>3 months remaining</Text>
              {/* <Image source={require('./vector-200-8.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>👤</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Jane Smith</Text>
                <Text style={styles.subtitle}>Membership: Gold</Text>
              </View>
              <Text style={styles.subtitle}>1 month remaining</Text>
              {/* <Image source={require('./vector-200.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>👤</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>David Johnson</Text>
                <Text style={styles.subtitle}>Membership: Silver</Text>
              </View>
              <Text style={styles.subtitle}>6 months remaining</Text>
              {/* <Image source={require('./image.svg')} style={styles.vector} /> */}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.div}>
              <Text style={styles.title}>Quick Resources</Text>
            </View>
          </View>
          <View style={styles.list}>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>📋</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Training Routines</Text>
              </View>
              {/* <Image source={require('./vector-200-2.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>🍽️</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>Meal Plans</Text>
              </View>
              {/* <Image source={require('./vector-200-3.svg')} style={styles.vector} /> */}
            </View>
            <View style={styles.item}>
              <View style={styles.iconWrapper}>
                <Text style={styles.icon}>ℹ️</Text>
              </View>
              <View style={styles.div}>
                <Text style={styles.itemTitle}>More Resources</Text>
              </View>
              {/* <Image source={require('./vector-200-4.svg')} style={styles.vector} /> */}
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNav}>
        <View style={styles.tab}>
          <Text style={styles.icon}>🏠</Text>
          <Text style={styles.tabTitle}>Home</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.icon}>🗒️</Text>
          <Text style={styles.tabTitle}>Activities</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.icon}>👥</Text>
          <Text style={styles.tabTitle}>Students</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.icon}>⚙️</Text>
          <Text style={styles.tabTitle}>Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // paddingVertical: 30,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingTop: 16,
  },
  div: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 24,
    letterSpacing: 0,
    marginTop: -1,
    marginRight: 0, // Removed marginRight
  },
  text: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    flexGrow: 1,
  },
  data: {
    fontSize: 30,
    fontWeight: 'bold',
    marginRight: 10,
  },
  change: {
    fontSize: 16,
    color: 'red',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
  },
  list: {
    marginBottom: 30,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconWrapper: {
    backgroundColor: '#f2f2f2',
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  icon: {
    fontSize: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#00000080', // Updated color
    letterSpacing: 0,
  },
  vector: {
    width: 20,
    height: 20,
    marginLeft: 'auto',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabTitle: {
    fontSize: 12,
  },
  tabGroup: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    paddingHorizontal: 12,
    position: 'relative',
  },
  tabTab: {
    alignItems: 'center',
    borderColor: '#0000001a',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'column',
    flexGrow: 1,
    padding: 4,
    position: 'relative',
  },
  frame: {
    backgroundColor: '#0000000d',
    borderRadius: 24,
    height: 48,
    position: 'relative',
    width: 48,
  },
  iconTab: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 30,
    fontWeight: '400',
    height: 48,
    left: 0,
    letterSpacing: 0,
    lineHeight: 48,
    position: 'absolute',
    textAlign: 'center',
    top: -1,
    width: 48,
  },
  titleTab: {
    alignSelf: 'stretch',
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 10,
    fontWeight: '400',
    height: 28,
    letterSpacing: 0,
    lineHeight: 14,
    textAlign: 'center',
  },
  listList: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 12,
  },
  row: {
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexDirection: 'row',
    width: '100%',
  },
  metric: {
    alignItems: 'flex-start',
    borderColor: '#0000001a',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'column',
    flexGrow: 1,
    padding: 12,
  },
  dataList: {
    color: '#000000',
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 28,
    width: 23,
  },
  changeList: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    width: 27,
  },
  textWrapper: {
    color: '#000000',
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    width: 22,
  },
});

export default CoachHome;
