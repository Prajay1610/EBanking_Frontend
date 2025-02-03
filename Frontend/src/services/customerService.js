import { createUrl } from "../utils";
import axios from "axios";

export const getAllTransactions = async (userId) => {
    try {
        const url = createUrl(`customer/transactions?userId=${userId}`);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error;
    }
};