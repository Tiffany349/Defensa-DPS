import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function configurarNotificaciones() {

  const { status } =
    await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Debes permitir las notificaciones');
  }

  if (Platform.OS === 'android') {

    await Notifications.setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      }
    );

  }
}

export async function enviarNotificacion(
  titulo,
  mensaje
) {

  await Notifications.scheduleNotificationAsync({
    content: {
      title: titulo,
      body: mensaje,
    },
    trigger: null,
  });

}