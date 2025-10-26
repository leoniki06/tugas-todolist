import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const STORAGE_KEY = '@todos_v1';
const THEME_KEY = '@theme_v1';

export default function App() {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        const theme = await AsyncStorage.getItem(THEME_KEY);
        if (saved) setTodos(JSON.parse(saved));
        if (theme) setDark(theme === 'dark');
      } catch (e) {
        console.warn('Failed loading data', e);
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    AsyncStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

 const addTodo = () => {
  if (!text.trim()) return;
  const newTodo = { id: Date.now().toString(), text: text.trim(), done: false };
  setTodos([newTodo, ...todos]);
  setText('');
};

  const removeTodo = (id) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const toggleDone = (id) => {
  setTodos(todos.map(t => t.id === id ? { ...t, done: !t.done } : t));
};


  const theme = dark ? themes.dark : themes.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <StatusBar barStyle={dark ? 'light-content' : 'dark-content'} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>To‑Do (Dark Mode)</Text>
        <TouchableOpacity onPress={() => setDark(d => !d)} style={styles.themeBtn}>
          <Ionicons name={dark ? 'moon' : 'sunny'} size={22} color={theme.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Add a task..."
          placeholderTextColor={theme.placeholder}
          style={[styles.input, { backgroundColor: theme.inputBg, color: theme.text }]}
          onSubmitEditing={addTodo}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addTodo} style={[styles.addBtn, { backgroundColor: theme.primary }]}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
  data={todos}
  keyExtractor={item => item.id}
  contentContainerStyle={{ padding: 16 }}
  renderItem={({ item }) => (
    <View style={[styles.todoItem, { backgroundColor: theme.card }]}>
      <TouchableOpacity onPress={() => toggleDone(item.id)} style={{ flex: 1 }}>
        <Text
          style={[
            styles.todoText,
            { 
              color: item.done ? theme.placeholder : theme.text,
              textDecorationLine: item.done ? 'line-through' : 'none'
            }
          ]}
        >
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeTodo(item.id)}>
        <Ionicons name="trash" size={20} color={theme.icon} />
      </TouchableOpacity>
    </View>
  )}
/>
    </SafeAreaView>
  );
}

const themes = {
  dark: {
    bg: '#0f1724',
    text: '#e6eef8',
    card: '#15202b',
    inputBg: '#0b1220',
    placeholder: '#95a0b0',
    primary: '#2563eb',
    icon: '#cbd5e1'
  },
  light: {
    bg: '#f7f9fc',
    text: '#0b1220',
    card: '#ffffff',
    inputBg: '#ffffff',
    placeholder: '#6b7280',
    primary: '#2563eb',
    icon: '#374151'
  }
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '700' },
  themeBtn: { padding: 6, borderRadius: 8 },
  inputRow: { flexDirection: 'row', paddingHorizontal: 16, alignItems: 'center' },
  input: { flex: 1, padding: 12, borderRadius: 10, marginRight: 8 },
  addBtn: { padding: 12, borderRadius: 10 },
  todoItem: { padding: 12, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  todoText: { fontSize: 16 }
});
