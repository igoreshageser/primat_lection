import axios from "axios";
import { WEEK_URL } from "../../.env.js";

/* eslint-disable */
export function getWeekNumber() {
    return new Promise((resolve, reject) => {
        axios.get(WEEK_URL).then(({ data }) => resolve(data)).catch((err) => reject(err))
    })
}
