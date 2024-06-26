import { api } from '../../config/api';

export async function addApiKeyBinanceToUser(user: any, apiKey: any){
  const response = await api.post(`/consultant/binance_api_key/${user.firebaseUid}/${apiKey}`, user);
  return response.data;
}

export async function decryptApiKeyBinance(user: any) {
  const response = await api.post(`/consultant/decrypt_binance_api_key/${user.firebaseUid}`, user);
  return response.data;
}
