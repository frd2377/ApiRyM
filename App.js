import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Switch, Text, View } from 'react-native';

export default function App() {
  const [datos, setDatos] = useState([])
  const [dark, setDark] = useState(false)
  useEffect(() => {
    peticionGet('https://rickandmortyapi.com/api/character').then(res => setDatos(res))
  }, [])

  return (
    <View style={{ backgroundColor: dark ? 'black' : '#f8f8ff' }}>
      <View style={{ marginTop: 30, marginBottom: 50, padding: 5 }}>
        <CambiarModo dark={dark} setDark={setDark}/>
        <FlatList data={datos} renderItem={({ index, item }) => <Descripcion item={item} dark={dark} />}>
        </FlatList>
        <StatusBar style='auto' />
      </View>
    </View>
  )
}

function Descripcion({ item, dark ,setDark}) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15, borderWidth: 1, borderRadius: 10, borderColor: dark ? 'white' : 'black', backgroundColor: dark ? '#f8f8ff' : 'white' }}>
      <View>
        <Text style={{ fontSize: 15 }}>{item.name}</Text>
        <Text style={{ fontSize: 14, color: item.status == 'Alive' ? 'green' : 'red' }}>{item.status == 'Alive' ? 'Vivo' : 'Muerto'} - {item.species}</Text>
        <Text style={{ fontSize: 14, marginTop: 10, color: 'gray' }}>Última ubicación conocida:</Text>
        <Text style={{ fontSize: 11 }}>{item.location.name}</Text>
      </View>
      <View>
        <Image source={{ uri: item.image }} style={{ width: 120, height: 120, borderRadius: 70 }}></Image>
      </View>
    </View>
  )
}

function CambiarModo({ dark, setDark }) {
  return (
    <View style={{ justifyContent: 'space-around', flexDirection: 'row' }}>
      <Text style={{ color: dark ? 'white' : 'black', fontSize: 14 }}>Activar modo {dark ? 'claro' : 'oscuro'}: </Text>
      <Switch value={dark} onChange={(e) => setDark(!dark)} />
    </View>
  )
}

async function peticionGet(url) {
  const res = await fetch(url)
  const data = await res.json()
  return data.results
}

const styles = StyleSheet.create({
})
