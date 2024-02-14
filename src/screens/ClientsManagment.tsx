import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {TopBarNav} from '../components/TopBarNav';
import {List} from '../components/List';
import {IClient} from '../interfaces/API/User';
import {apiUrl} from '../config/global';
import {useAuth} from '../config/AuthContext';
const ClientsManagment = () => {
  const [students, setStudents] = useState<IClient[]>([]);
  const {user} = useAuth();
  useEffect(() => {
    const fetchStudents = async () => {
      const response = await fetch(`${apiUrl}/subscription/coach/${user.id}`);
      const data = await response.json();
      console.log('data :', data);
      //   const students = data.filter(
      //     (student: IClient) => student.userType === EUserType.Client,
      //   );
      setStudents(data);
    };
    fetchStudents();
  }, [user.id]);
  return (
    <SafeAreaView>
      <View>
        <TopBarNav pageName={'clientManagment'} />
        <ScrollView>
          <List students={students} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ClientsManagment;
