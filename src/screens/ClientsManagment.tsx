import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {TopBarNav} from '../components/TopBarNav';
import {List} from '../components/List';
import {IClient} from '../interfaces/API/User';
import {useAuth} from '../config/AuthContext';
import {fetchCoachClients} from '../api/coach';
const ClientsManagment = () => {
  const [students, setStudents] = useState<IClient[]>([]);
  const {user} = useAuth();

  useEffect(() => {
    async function fetchData() {
      const studentsApi = await fetchCoachClients(user.id);
      if (studentsApi) {
        setStudents(studentsApi);
      }
    }
    fetchData();
  }, [user.id]);

  return (
    <SafeAreaView>
      <View>
        {/* <TopBarNav pageName={'clientManagment'} /> */}
        <View>
          <List students={students} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ClientsManagment;
