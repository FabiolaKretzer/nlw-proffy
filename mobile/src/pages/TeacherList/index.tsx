import React, { useState } from 'react';
import{ View, Text, ScrollView, TextInput, Picker } from 'react-native';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [isFilterVisible, setIsFiltersVisible] = useState(false);
    
    const [subject, setSubject] = useState("");
    const [week_day, setWeekday] = useState("");
    const [time, setTime] = useState("");

    useFocusEffect(() => {
          loadFavorites();
    });

    function loadFavorites() {
        AsyncStorage.getItem("favorites").then((response) => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id;
                    }
                );
        
                setFavorites(favoritedTeachersIds);
            }
        });
      }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFilterVisible);
    }

    async function handelFiltersSubmit() {    
        const response = await api.get("classes", {
            params: {
                subject,
                week_day,
                time,
            },
        });
        console.log(response.data)
        setIsFiltersVisible(false);
        setTeachers(response.data)
      }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Proffis disponíveis'
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#fff" />
                    </BorderlessButton>
                )}
            >   
                { isFilterVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>

                        <View style={styles.inputPicker}>
                        <Picker
                            selectedValue={subject}
                            onValueChange={itemValue => setSubject(itemValue)}
                            style={{ color: '#c1bccc' }}
                        >
                            <Picker.Item label="Qual é a matéria?" value="" />
                            <Picker.Item label="Artes" value="Artes" />
                            <Picker.Item label="Biologia" value="Biologia" />
                            <Picker.Item label="Sociologia" value="Sociologia" />
                        </Picker>
						</View>

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <View style={styles.inputPicker}>
									<Picker
										selectedValue={week_day}
										onValueChange={itemValue =>
											setWeekday(String(itemValue))
                                        }
                                        style={{ color: '#c1bccc' }}
										itemStyle={{ backgroundColor: 'grey' }}
									>
                                        <Picker.Item label="Qual é o dia?" value="" />
										<Picker.Item label="Domingo" value="0" />
										<Picker.Item label="Segunda-feira" value="1" />
										<Picker.Item label="Terça-feira" value="2" />
										<Picker.Item label="Quarta-feira" value="3" />
										<Picker.Item label="Quinta-feira" value="4" />
										<Picker.Item label="Sexta-feira" value="5" />
										<Picker.Item label="Sábado" value="6" />
									</Picker>
								</View>
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>

                                <TextInput
                                    style={styles.input}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#c1bccc"
                                    value={time}
                                    onChangeText={(text) => setTime(text)}
                                />
                            </View>
                        </View>
                        <RectButton
                            style={styles.submitButton}
                            onPress={handelFiltersSubmit}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>
            
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                return (
                    <TeacherItem
                        key={teacher.id}
                        teacher={teacher}
                        favorited={favorites.includes(teacher.id)}
                    />
                );
        })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;