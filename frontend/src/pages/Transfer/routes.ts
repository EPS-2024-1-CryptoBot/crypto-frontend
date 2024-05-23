import { api } from "../../config/api";

export async function addTransaction(from: string, payload: any) {
    const response = await api.post(`/wallet/add_transaction/${from}`, payload);
    return response.data;
}

export async function getUserDestination(firebaseUid: string) {
    const response = await api.get(`/users/destination/${firebaseUid}`);
    return response.data;
  }