import { api } from "../../config/api";

export async function addTransaction(from: string, payload: any) {
    const response = await api.post(`/wallet/add_transaction/${from}`, payload);
    return response.data;
}
